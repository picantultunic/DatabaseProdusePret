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

async function cautaProdus(){
   var produsCod=document.getElementById("textbox").value;
   console.log(produsCod)
   fetch(`${siteIp}/api/get/existentaProdusului/${produsCod}`).then(res=>{
      if(res.status==200)
      return true;
      else
      return false;
   }).then(r=>{
      if(r){
         var redirectLink="<a href=\"paginaProdus.html\">link catre produsul dumneavoastra</a>";
         document.getElementById("produse-container").innerHTML=redirectLink;
         document.cookie=`codProdus=${produsCod}`;
      }else{
         document.getElementById("produse-container").innerHTML="nu s-a gasit";
         //sa afisieze ca nu s-a gasit
      }
   })
   //din pacate nu pot sa utilizez asta deoarece nu ma lasa sa trimit
   //json in body , nu stiu cum sa rezolv dar 
   // fetch(`${siteIp}/api/get/database/cautaProdus`,{
   //    method:'get',
   //    body:JSON.stringify({cod:`${produsCod}`}),
   //    headers: {
   //       'Content-Type': 'application/json'
   //     },
   // }).then(res=>{
   //    if(res.status==200)
   //       alert("sa introdus in baza de date")
   //    else
   //       alert("ceva nu a mers bine")
   // })
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
   fetch(`${siteIp}/api/get/database/produsmagazine/${displaybox}`)
      .then(info=>{
         if(info.status==404){
            document.getElementById("produse-container").innerHTML="nu s-a gasit"
         return;}
         return info.json();
      }).then(res=>{
         console.log(res)
         dataAfisare="magazinele sunt : "+res.join(", ")
         document.getElementById("produse-container").innerHTML=dataAfisare;
      })
}
// async function cautaProdus(id_input){
//    var displaybox=document.getElementById(id_input).value
//    var dataAfisare="";
//    fetch(`${siteIp}/api/get/database/produsmagazine/${displaybox}`)
//       .then(info=>{
//          console.log(info.body)
//          if(info.status==404){
//             document.getElementById("produse-container").innerHTML="nu s-a gasit"
//          return;}
//          return info.json();
//       }).then(res=>{
//          console.log(res)
//          dataAfisare="magazinele sunt : "+res.join(", ")
//          document.getElementById("produse-container").innerHTML=dataAfisare;
//       })
// }

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