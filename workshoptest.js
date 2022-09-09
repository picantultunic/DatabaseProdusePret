const altex=require('./ApiAltex');
const email=require('./ApiEmag')
const axios=require('axios')
const magazine=[altex,email]
// setImmediate(async()=>{
//    // console.log(await altex.linkPreluareCod("https://altex.ro/router-wireless-gigabit-tp-link-archer-c64-dual-band-400-867-mbps-negru/cpd/ROUARCHERC64/"));
//    // console.log(await altex.ProdusPreluarePret("ROUARCHERC64"));
//    // console.log(await altex.linkPreluareImagine("ROUARCHERC64"))
//    console.log(await magazine[0].preiaDateProdus("82NL000YRM"))
// })
var siteIp="http://localhost:5000"

async function dateProdus(cod){
   var data = await axios.get(`${siteIp}/api/get/preiaDateProdus`)
   .then(r=>{
      // console.log(r)
      return r.data;
   })
   .catch(err=>{console.log(err)})
   console.log(data)
}
dateProdus("82NL000YRM")