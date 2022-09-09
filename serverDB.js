const express = require('express')
const app = express()
var mysql = require('mysql');
const funcSQL= require('./functiSQL');
const { default: axios } = require("axios");
const apiMagazine=[require('./ApiAltex'),require('./ApiEmag')]//ca sa pot sa le accesez in loop
console.log(apiMagazine[0].magazinNume)
console.log(apiMagazine[1].magazinNume)


const serverCheie="123456789";
const portServer=3000;
const accesDbFiltru=(req,res,next)=>{
   const {key,id}=req.params;
   //key!=serverCheie||
   if(key!=serverCheie||key==undefined){
      res.status(404).send(null);
      console.log("respins")
      return;}
   next();
}
var condb = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "produsesipreturi"
});
var conUser = mysql.createConnection({
   host: "127.0.0.1",
   user: "root",
   password: "password",
   database: "utilizatori"
 });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// con.connect(function(err) {
//    if (err) throw err;
//  });

 app.use(express.json());
app.get("/data",(req,res)=>{
   const info={
      "Data":"acesta este mesajul De la server",
      "id":123
   }
   
   res.json(info);
   console.log("cineva a cerut date");
})
app.get("/test",(req,res)=>{
   const info={
      "Data":"acesta este mesajul De la server",
      "id":123
   }
   
   res.json(info);
   condb.query("SELECT * FROM magazin;", function (err, result, fields) {
      //   if (err) throw err;
        console.log(result);
      });
   condb.query("SELECT * FROM pret;", function (err, result, fields) {
      //   if (err) throw err;
        console.log(result);
      }); 
})
app.get("/api/loginVerify/:key/?",accesDbFiltru,(req,res)=>{
   const {username,password}=req.query;
   //filtru pentru injection
   if(username==""||username==undefined||password==""||password==undefined||username.indexOf(';')!=-1||password.indexOf(';')!=-1){
      res.sendStatus(404).send(null);
      return;
   }
   conUser.query(funcSQL.cautaUtilizator(username,password),(err, result, fields)=>{
      if(result.length!=1){
         console.log("login o puscat");
         res.status(404).send(null);
         // return;
      }else{
         console.log("login nu e nul");
         res.sendStatus(200);
      }
   })
   // console.log(username+" "+password);
})
app.get("/api/cautaMagazineProdus/:key/:id/",accesDbFiltru,(req,res)=>{
   const {key,id}=req.params;
   //key!=serverCheie||
   
   //tot ce e mai jos ii degeaba pt ca poti sa faci cu view
   condb.query(funcSQL.retMagazineProdus(id),(err, result, fields)=>{
      if(err){
         res.status(404).send("naspa coaie");
         return;
      }
      res.json(result);
   })
})
app.get("/api/existentaProdusului/:key/:codProdus",accesDbFiltru,(req,res)=>{
   const {codProdus}=req.params;
   if(codProdus==undefined||codProdus==""){
      res.sendStatus(404);
      return;
   }
   condb.query(funcSQL.aflaIdProdus(codProdus),(err,result)=>{
      if(result.length>0)
      res.sendStatus(200)
      else
      res.sendStatus(404);
   })
})
app.get("/api/preiaProdusCuPreturi/:key/:magazin/:codProdus",accesDbFiltru,async (req,res)=>{
   var preturiProdusMagazine=Array(3)
   var {codProdus,magazin}=req.params;
   condb.query(funcSQL.preiaPretProdusLaMagazin(codProdus,magazin),(err,result,fields)=>{
      console.log("in queri")
      if(err){
         console.log("eroare:"+err)
         res.sendStatus(404);
         return;
      }
      console.log(result)
      res.json(result);
   })
   // let preiaId= async (callback)=>{
   //    var data = await condb.query(funcSQL.aflaIdProdus(codProdus),(err,result,fields)=>{
   //       return callback({id:result[0].id_produs})
   //    })
   // }
   // preiaId(function(result){
   //    console.log(result)
   //    var istoricPreturiProdus=Array(apiMagazine.length);
   //    for(i=0;i<apiMagazine.length;i++){
   //       istoricPreturiProdus[i]= () => {return Promise()}
   //    }
   // });



   // console.log(x)
   // res.send("da")
   // for(i=0;i<apiMagazine.length;i++){
   //    preturiProdusMagazine[i]=await 
   //    async()=>{
         
   //    }
   // }
})
app.get("/",(req,res)=>{
   const id=req.query.id;
   if(id!==undefined)
   console.log(id);
   res.send("ok");
})
app.get("/api/infoProdus/:key/:codProdus",accesDbFiltru,async (req,res)=>{
   const {codProdus}=req.params;
   if(codProdus==""||codProdus==undefined){
      res.status(403).json(null);
      return;
   }
   //aici trebuie restructurat deoarece fiecare are cate un magazin de origine
   // var magazine = await axios.get(`http://localhost:${portServer}/api/cautaMagazineProdus/${serverCheie}/${codProdus}`)
   // .then(r=>{
   //    console.log(r.data)
   //    var magazine=r.data.map(x=>x.nume_magazin);
   //    console.log(magazine)
   //    if(magazine.length<1){
   //       return null;
   //    }
   //    return magazine;
   // })
   // if(magazine==null){
   //    res.sendStatus(404)
   //    return;
   // }
   // for(i=0;i<apiMagazine.length;i++)
   //    if(magazine[i]==apiMagazine[i].magazinNume){
   //       console.log("magazin :"+magazine[i])
   //       console.log("magazinapi :"+apiMagazine[i].magazinNume)
   //       var info = await apiMagazine[i].preiaDateProdus(codProdus);
   //       console.log(info)
   //       res.json(info)
   //       return;
   //    }
   condb.query(funcSQL.magazinOrigineProdus(codProdus),(err,result)=>{
      if(err||result.length<1){
         res.status(403).json(null);
         return;
      }
      console.log("magazin : "+result[0].magazinOrigine)
      for(i=0;i<apiMagazine.length;i++)
         if(result[0].magazinOrigine==apiMagazine[i].magazinNume){
            var func = async ()=>{
               console.log("magazinapi :"+apiMagazine[i].magazinNume)
               var info = await apiMagazine[i].preiaDateProdus(codProdus);
               console.log(info)
               res.json(info)
            }
            func();
            break;
         }
   })
   
})
app.post('/api/adaugaProdus/:key/',accesDbFiltru,(req,res)=>{
   console.log("cineva vrea sa adauge un produs")
   console.log(req.body)
   const codProdus=req.body.codProdus,numeMagazin=req.body.numeMagazin;
   console.log(`codul produsului {${codProdus}} ; magazinul :{${numeMagazin}}`)
   if(codProdus==undefined||numeMagazin==undefined){
      console.log("nedefinit")
      res.sendStatus(403)
      return;
   }  
   console.log(`codul produsului {${codProdus}} ; magazinul :{${numeMagazin}}`)
   condb.query(funcSQL.cautaProdus(codProdus),(err, result, fields)=>{
      if(result.length>0){
         res.sendStatus(403)
      return;}
      else{
      console.log("se pare ca nu exista in baza de date acest produs")
      condb.query(funcSQL.adaugaProdus(codProdus,numeMagazin),(err)=>{
         if(err)
         res.sendStatus(403);
         else
         res.sendStatus(200)
      })}
   })
})
app.listen(3000,()=>{
   console.log("db server on ...");
})

//o sa ai nevoie de streamuri 