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
      return `select cod_produs from produs where cod_produs="${produs}"`;
   },
   adaugaProdus : function(produs){
      return `insert into produs(cod_produs) values("${produs}"); `
   }
}

