const socket = io();
async function register(){

let username=document.getElementById("username").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

let res=await fetch("/register",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,email,password})

})

let data=await res.json()

document.getElementById("result").innerHTML =
"Account created ❤️<br>Your Partner Code: "+data.code

}


async function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

let res=await fetch("/login",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})

})

let data=await res.json()

if(data.token){

localStorage.setItem("token",data.token)

window.location="dashboard.html"

}else{

alert(data.message)

}

}


async function connectPartner(){

let code=document.getElementById("partnerCode").value

let token = localStorage.getItem("token")

let res=await fetch("/connect",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token
},

body:JSON.stringify({code:code})

})

let data=await res.json()

document.getElementById("status").innerHTML=data.message

}

function getLocation(){

if(navigator.geolocation){

navigator.geolocation.watchPosition(function(position){

let lat = position.coords.latitude
let lon = position.coords.longitude

socket.emit("send-location",{lat,lon})

})

}

}


async function showPartner(){

let token = localStorage.getItem("token")

let res = await fetch("/partner-location",{

headers:{
"Authorization":"Bearer "+token
}

})

let data = await res.json()

if(data.message){
alert(data.message)
return
}

let plat = data.lat
let plon = data.lon

document.getElementById("map").src =
"https://www.google.com/maps?q="+plat+","+plon+"&output=embed"

}
socket.on("receive-location",(data)=>{

let lat = data.lat
let lon = data.lon

document.getElementById("map").src =
"https://www.google.com/maps?q="+lat+","+lon+"&output=embed"

})