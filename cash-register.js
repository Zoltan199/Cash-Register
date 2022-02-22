function checkCashRegister(price, cash, cid) {
  let monedas = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED0": 10000
  }
  let cambio = cash*100 - price *100;
  let totalCid = 0;
  for(let element of cid) {
    totalCid += element[1]*100;
  }
  //console.log(totalCid);//console.log

  if(cambio>totalCid) return {status: "INSUFFICIENT_FUNDS", change: []}; //Si no existe suficente dinero en cid para dar cambio

  else if(cambio===totalCid)return {status: "CLOSED", change: cid}; //Si el dinero de cid es igual al cambio

  else{ //Si hay suficiente dinero en cid para dar cambio
    let result = [];
    cid=cid.reverse(); //Mayor a menor
    //console.log(cid); //console.log
    for(let element of cid){ //Recorrer cada moneda de la cid
      let cambioArr = [element[0], 0];
      element[1] = element[1]*100;
      while(cambio>= monedas[element[0]] && element[1]>0){
        cambio -= monedas[element[0]];//Restar el cambio sobrante
        element[1] -= monedas[element[0]]; 
        cambioArr[1] += monedas[element[0]]/100;
        //console.log(element[0]);
      }
      if(cambioArr[1]>0)result.push(cambioArr);
    }
    if(cambio>0) return {status: "INSUFFICIENT_FUNDS", change: []};
    
    //console.log(cid);
    return {status: "OPEN", change: result};
  }
};

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
