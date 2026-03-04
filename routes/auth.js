const authenticateToken = require("../middleware/authMiddleware")
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

let currentUser = null;

function generateCode(){
return "HL"+Math.floor(1000 + Math.random()*9000);
}

router.post("/register", async (req,res)=>{

try{

let code = generateCode();

let hashedPassword = await bcrypt.hash(req.body.password,10);

let user = new User({

username:req.body.username,
email:req.body.email,
password:hashedPassword,
partnerCode:code,
partner:null

});

await user.save();

res.json({message:"Account created",code:code});

}catch(err){

console.log(err);
res.json({message:"Registration error"});

}

});

router.post("/login", async (req,res)=>{

try{

let user = await User.findOne({email:req.body.email})

if(!user){
return res.json({message:"Invalid email or password"})
}

let match = await bcrypt.compare(req.body.password,user.password)

if(!match){
return res.json({message:"Invalid email or password"})
}

let token = jwt.sign(
{
id:user._id,
email:user.email
},
process.env.JWT_SECRET,
{expiresIn:"1d"}
)

res.json({
message:"Login successful",
token:token
})

}catch(err){

console.log(err)
res.json({message:"Login error"})

}

});

router.post("/connect", authenticateToken, async (req,res)=>{

let currentEmail = req.user.email

let partner = await User.findOne({partnerCode:req.body.code})

if(!partner){
return res.json({message:"Partner not found"})
}

await User.updateOne(
{email:currentEmail},
{$set:{partner:partner.email}}
)

await User.updateOne(
{email:partner.email},
{$set:{partner:currentEmail}}
)

res.json({message:"Partner connected ❤️"})

})
router.post("/location", authenticateToken, async (req,res)=>{

let currentEmail = req.user.email

await User.updateOne(
{email:currentEmail},
{
$set:{
latitude:req.body.lat,
longitude:req.body.lon
}
}
)

res.json({message:"Location updated"})

})

router.get("/partner-location", authenticateToken, async (req,res)=>{

if(!currentUser){
return res.json({message:"Login required"});
}

let partner = await User.findOne({email:currentUser.partner});

if(!partner){
return res.json({message:"Partner not connected"});
}

res.json({
lat:partner.latitude,
lon:partner.longitude
});

});

module.exports = router;