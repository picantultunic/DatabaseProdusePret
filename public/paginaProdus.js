var cookie=document.cookie
.split(';')
.map(cookie => cookie.split('='))
.reduce((accumulator, [key, value]) => 
({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

var siteIp="http://localhost:5000"
var codProdus=cookie.codProdus;
async function dateProdus(cod){
   var data = await fetch(`${siteIp}/api/get/preiaDateProdus`)
   .then((r)=>{
      return r.json();})
   return data;
}
function renderSite(){
   dateProdus(codProdus).then(r=>{
      if(r==null)
      return;
      document.getElementById("pozaProdus").src=r.imagineProdus
      document.getElementById("numeProdus").innerHTML=r.numeProdus
      console.log(r)
   })

}
renderSite()