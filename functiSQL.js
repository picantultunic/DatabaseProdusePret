module.exports={
   retMagazineProdus : function (x){
      return `select distinct p.cod_produs , m.nume_magazin
      from produs as p , magazin as m , pret as pr
      where p.id_produs = pr.id_produs and m.id_magazin = pr.magazin and p.cod_produs = "${x}";`;
   },
   cautaUtilizator : function(user,pass){
      return `select * from utilizator where username="${user}" and password="${pass}";`;
   },
   cautaProdus : function(produs){
      return `select cod_produs from produs where cod_produs="${produs};"`;
   },
   adaugaProdus : function(produs,magazinOrigine){
      return `insert into produs(cod_produs,magazinOrigine) values("${produs}","${magazinOrigine}"); `
   },
   aflaIdProdus : function(cod){
      return `select id_produs from produs where cod_produs="${cod}";`
   }
   ,
   preiaPretProdusLaMagazin:function(cod,magazin){
      //poate o sa fie adaugat si un interval deoarece o sa se adune datele
      return `select p.cod_produs , pr.timp , pr.pret , m.nume_magazin 
      from produs as p , magazin as m , pret as pr
      where p.cod_produs = "${cod}" and pr.id_produs = pr.id_produs  and pr.magazin = m.id_magazin and m.nume_magazin = "${magazin}";`
   },
   magazinOrigineProdus:function(cod){
      return `select magazinOrigine from produs where cod_produs="${cod}";`
   }
}

