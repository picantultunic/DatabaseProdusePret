const altex=require('./ApiAltex');
 
setImmediate(async()=>{
   console.log(await altex.linkPreluareCod("https://altex.ro/router-wireless-gigabit-tp-link-archer-c64-dual-band-400-867-mbps-negru/cpd/ROUARCHERC64/"));
   console.log(await altex.ProdusPreluarePret("ROUARCHERC64")); 
})