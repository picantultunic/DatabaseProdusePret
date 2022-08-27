const axios=require('axios');
const cheerio = require('cheerio')
//se poate adauga un parametru obtional pentru a partaja direct pagina ca sa nu faci atatea requesturi 
//poate in viitor o sa fie o clasa de functii pentru a permite sa salvezi siteul
module.exports={
   siteCodToUniversal : function(cod){return cod.substring(3);},
   linkPreluareCod:async function(link){
      var cod = await axios.get(link).then(res=>{
         const html = res.data;
         const site = cheerio.load(html)
         try{
            var cod = site('div[class="inline-block p-1 text-xs md:text-sm font-semibold rounded-sm bg-gray-300"]').text();
         }catch(e){
            return null;
         }
         cod = cod.substring(12+3)//+3 pt ca altex mai adauga 
         return cod;
      }).catch((err)=>{
         return null;
      })
      return cod;
   },
   ProdusPreluarePret:async function(cod){
      var pret=await axios.get(`https://fenrir.altex.ro/catalog/search/${cod}`).then(res=>{
         const produs=res.data.products;
         if(produs.length!=1){
            console.log("err cautare Produs : nu s-a gasit sau sunt mai multe")
            return;
         }
         return produs[0].price;
         // return produs.product[]
      })
      return pret;
   },
}