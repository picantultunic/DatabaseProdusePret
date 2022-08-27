//librari
const express = require('express')
const app = express()
const axios= require("axios");
const fetch=require('node-fetch');
const path=require('path');
const Cookie=require('cookie-parser');
//const jwt;
//variabile
var svUrl="http://localhost:3000";
var svCheie="123456789";
var tokenGlobal="1234";//este provizoriu

async function sendRequestData(x){
    const response = await fetch(x)
       .then(res=>{
          console.log("aaa a mers")
          return res.json();
       })
       .catch(()=>{
        console.log("aaa nu a mers");
        return null;
        })
    
    return response
 }
const magazineNume=()=>{
    return ["altex","emag","pcgarage"];
}
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
  }))
app.use(Cookie());
app.get('/test',(req,res)=>{
    sendRequestData("http://localhost:3000/data")
    .then(data=>{
        console.log(data)
        res.send(data);
    }).catch(err=>{
        res.status(404).json(null);
    })
    
})
// app.get('/api/get/database/:cod/:zileinurma',(req,res)=>{
//     const cod = req.params.cod;
//     const zile_in_urma = req.params.zileinurma;
//     if(cod==null && zile_in_urma==null)
//         res.status(404).send("nu ati introdus toate datele");

//     console.log(`cod : ${cod} ; data_inceput: ${zile_in_urma}`);
//     res.json(`cod : ${cod} ; zile in urma: ${zile_in_urma}`)

// })
app.get("/api/get/database/produsmagazine/:cod_produs",(req,res)=>{
    const cod=req.params.cod_produs;
    console.log(req.cookies);
    // console.log(cod)
    if(cod==undefined){
        console.log(1)
        res.send("nu");
        return;
    }
    axios.get(`${svUrl}/api/cautaMagazineProdus/${svCheie}/${cod}/`).then(r=>{
        if(r==undefined){
            console.log(2)
            res.sendStatus(404);
            return;
        }
        console.log(3)
        var magazine=(r.data).map(x=>x.nume_magazin)
        // console.log(magazine);
        // console.log(r)
        res.json(magazine);
    }).catch(err=>{
        console.log("eroare")
        res.status(404).json("nu a mers");
    })
})
app.get('/data/:id',(req,res)=>{
    //asta ii pentru teste
    const array =["a fost odata ca nici o data", "asta ii o alta pozitie ", "esti prost","a mers pana la urma acest array","de ce tot imi ceri asta"]
    function isNumeric(value) {
        return /^-?\d+$/.test(value);c
    }
    console.log(req.url);
    var {id}=req.params;
    console.log(`{${req.url};${id}}`)
    let data={
        "info":"a fost odata ca nici odata o prea frumoasa fata ",
        "t":123
    };
    if(isNumeric(id)){
        id=parseInt(id);
        console.log("sunt in if "+id)
        if(id<array.length){
            console.log("sunt in al doilea if")
            data.info=array[id];
        }
    }
    res.json(data);
    console.log("sfarsit")
})
// app.get("/adaugaproduse",(req,res)=>{})

app.post('/api/post/login/',(req,res)=>{
    // console.log(req)
    const {username,password}=req.body;
    console.log(username+" "+password);
    if(username==""||password==""){
        res.status(404).send("baaaa")
        return;
    }
    axios.get(`${svUrl}/api/loginVerify/${svCheie}/?username=${username}&password=${password}`)
    .then(raspuns=>{
        if(raspuns.status==404)
        console.log("nu sa gasit persoana");
        res.cookie("token",tokenGlobal);//provizoriu pana implementez jwt
        res.cookie("isLog",true)
        res.cookie("username",username);
        res.redirect("/");
    })
    .catch(err=>{
        console.log("nu s-a gasit utilizatorul");
        res.send(null)
    })
    // res.cookie("prajitura","bucuresti cu baclava");
    // res.cookie("nume","biris adrian")
    
})
app.use(express.json());
app.post('/api/post/adaugareProdus/:cod',(req,res)=>{
    const token = req.cookies.token;
    console.log("inainte de token");
    if(token!=tokenGlobal){
        res.status(403).json({"err":"ceva nu a mers token"})
        console.log("tokenul invalid")
        return;
    }
    const codProdus=req.params.cod;
    console.log("inainte"+codProdus);
    if(codProdus==undefined||codProdus==""){
        res.status(404).json({"err":"ceva nu a mers"})
        return;
    }
    console.log("dupa"+codProdus);
    if(codProdus.search("https:")!=-1){
        async ()=>{
            //aici preiei codul produsului 
            var magazinIndex;
            for(i=0;i<magazineNume.length;i++)
                if(codProdus.search(magazineNume[i])!=-1){
                    magazinIndex=i;
                    break;
                }
            switch(i){
                case 0:
                    const altex=require('./ApiAltex')
                    codProdus=await altex.linkPreluareCod(codProdus);
                break;
                case 1:;
                case 2:;
                default:
                    res.sendStatus(400);
                    return;
            }
            // axios.post(`${svUrl}/api/adaugaProdus/${svCheie}/${codProdus}`);
            console.log(codProdus);
        }
    }else{
    //axios.post(`${svUrl}/api/adaugaProdus/${svCheie}/${codProdus}`)
    console.log("a introdus dar fara url")}
    res.sendStatus(200);
})


app.post('/api/post/adaugareProdusJSON/',(req,res)=>{
    const token = req.cookies.token;
    if(token!=tokenGlobal){
        res.status(403).json({"err":"ceva nu a mers token"})
        console.log("tokenul invalid")
        return;
    }

    var codProdus=req.body.cod;
    if(codProdus==undefined||codProdus==""){
        res.status(404).json({"err":"ceva nu a mers"})
        return;
    }
    
    if(codProdus.search("https:")!=-1){
        console.log("if")
        const func=async ()=>{
            //aici preiei codul produsului 
            var magazinIndex;
            for(i=0;i<magazineNume.length;i++)
                if(codProdus.search(magazineNume[i])!=-1){
                    magazinIndex=i;
                    break;
                }
            switch(i){
                case 0:
                    const altex=require('./ApiAltex')
                    codProdus= await altex.linkPreluareCod(codProdus);
                break;
                case 1:;
                case 2:;
                default:
                    res.sendStatus(400);
                    return;
            }
            axios.post(`${svUrl}/api/adaugaProdus/${svCheie}/${codProdus}`);
            console.log("codProdus:"+codProdus);
        }
        func();
    }else{
    axios.post(`${svUrl}/api/adaugaProdus/${svCheie}/${codProdus}`)
    console.log("a introdus dar fara url")}
    res.sendStatus(200);
})

app.get('*',(req,res)=>{
    res.status(404).send("ceva nu a mers")
})

app.listen(5000,()=>{
    console.log("server is up");
})