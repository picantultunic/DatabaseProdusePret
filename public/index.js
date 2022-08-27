var cookie=document.cookie
.split(';')
.map(cookie => cookie.split('='))
.reduce((accumulator, [key, value]) => 
({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
;
var log=cookie.isLog;
var siteIp="http://localhost:5000"
async function adaugaelement(){
   var y=document.getElementById("textbox").value;
   console.log(`numar : ${y}`);
   console.log("tipul lui y este : "+ typeof y);
   
   var url=`${siteIp}/data/`+y;
   console.log(url)
   let x = await fetch(url,{method:'GET'}).then(res=>{
      if(res.ok)
         return res.json();
   })
   // let data = await x.json();
   console.log(x)
   document.getElementById("produse-container").innerHTML=(x.info);
}
async function logOut(){
   console.log("da")
   document.cookie="isLog= false";
   document.cookie="username=";
   location.reload();
}
async function test(url){
   // var url="/api/get/database/123/321";
   console.log(url)
   let x = await fetch(url,{method:'GET'}).then(res=>{
         return res.json;
   })
   console.log(x.cod);
}
async function aflaMagazineProdus(id_input){
   var displaybox=document.getElementById(id_input).value
   var dataAfisare="";
   let magazine = await fetch(`${siteIp}/api/get/database/produsmagazine/${displaybox}`)
      .then(info=>{
         if(info.status==404){
            document.getElementById("produse-container").innerHTML="nu s-a gasit"
         return;}
         return info.json();
      })
   dataAfisare="magazinele sunt : "+magazine.join(", ")
   document.getElementById("produse-container").innerHTML=dataAfisare;
}
function displaylog(){
   var cokie=document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
   if(cokie.isLog=="true"){
      document.getElementById("loginbtn").style.display="none";
      document.getElementById("usernameUser").style.display="flex";
      document.getElementById("usernameUserUser").innerHTML=cookie.username;
   }else{
      document.getElementById("loginbtn").style.display="flex";
      document.getElementById("usernameUser").style.display="none";
   }
}
displaylog()