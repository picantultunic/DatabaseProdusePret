var cookie=document.cookie
.split(';')
.map(cookie => cookie.split('='))
.reduce((accumulator, [key, value]) => 
({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
if(cookie.isLog=="false"||cookie.isLog==undefined){
   document.location.href="/";
   alert("nu esti logat")
}
var siteIp="http://localhost:5000"
function adaugaProdus(id){
   var produsCod=document.getElementById("textbox").value;
   fetch(`${siteIp}/api/post/adaugareProdusJSON/`,{
      method:'POST',
      body:JSON.stringify({cod:`${produsCod}`}),
      headers: {
         'Content-Type': 'application/json'
       },
   }).then(res=>{
      if(res.status==200)
         alert("sa introdus in baza de date")
      else
         alert("ceva nu a mers bine")
   })
}