const express = require('express')
const app = express()
var mysql = require('mysql');
const funcSQL= require('./functiSQL');
const { default: axios } = require("axios");

const serverCheie="123456789";
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
app.get("/",(req,res)=>{
   const id=req.query.id;
   if(id!==undefined)
   console.log(id);
   res.send("ok");
})
app.post('/api/adaugaProdus/:key/:cod',accesDbFiltru,(req,res)=>{
   const cod=req.params.cod;
   if(cod==undefined){
      return;
   }
   condb.query(funcSQL.cautaProdus(cod),(err, result, fields)=>{
      if(result.length>0)
      return;
      else
      condb.query(funcSQL.adaugaProdus(cod));
   })
})
app.listen(3000,()=>{
   console.log("db server on ...");
})

//o sa ai nevoie de streamuri 