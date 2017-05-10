function IncWaterPrice() {
	if(0 <= (money - priceIncP)){
		price = (price/100)*105;
		money = money - priceIncP;
		priceIncP = (priceIncP/100)*150;
		gEBI("IncPP").innerHTML = abbrNum(priceIncP.toFixed(2),2);
		gEBI("priceBefore").innerHTML = price.toFixed(2);
		gEBI("priceAfter").innerHTML = ((price/100)*110).toFixed(2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
		gEBI("pricem3").innerHTML =  "$" + abbrNum((price.toFixed(2)),2);
	}
	else{NEMshow();}
}
function DecPP() {
	if(0<= (money-priceDecPP)){
		money = money - priceDecPP;
		priceDecPP = (priceDecPP/100)*150;
		pricePPP = (pricePPP/100)*99;
		gEBI("priceDecPlP").innerHTML = abbrNum(priceDecPP.toFixed(2),2);
		gEBI("ppb").innerHTML = abbrNum(pricePPP.toFixed(2),2);
		gEBI("ppa").innerHTML = abbrNum(((pricePPP/100)*99).toFixed(2),2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("PPP").innerHTML = abbrNum(pricePPP.toFixed(2),2);
	}
	else{NEMshow();}
}
function DecBP() {
	if(0<=money-priceDecBP){
		money = money - priceDecBP;
		pricePPM = (pricePPM/100)*99;
		priceDecBP = priceDecBP*1.5;
		gEBI("bpb").innerHTML = abbrNum(pricePPM.toFixed(2),2);
		gEBI("bpa").innerHTML = abbrNum(((pricePPM/100)*99).toFixed(2),2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("PPM").innerHTML = abbrNum(pricePPM.toFixed(2),2);
		gEBI("dcbpp").innerHTML = abbrNum(priceDecBP.toFixed(2),2);
	}
	else{NEMshow();}
}
function IncWaterNeeded() {
	if(0 <= (money-priceIncWaterU)){
		money = money - priceIncWaterU;
		priceIncWaterU = priceIncWaterU*2;
		WPH = (WPH/100)*102.5;
		gEBI("priceIncWater").innerHTML = abbrNum(priceIncWaterU,2);
		gEBI("waterUB").innerHTML = WPH.toFixed(2);
		gEBI("waterUA").innerHTML = ((WPH/100)*102.5).toFixed(2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
	}
	else{NEMshow();}
}
function IncRateHouses() {
	if(0<=(money-priceIncRateHouses)){
		money = money - priceIncRateHouses;
		incRateHouses = incRateHouses + 0.1;
		priceIncRateHouses = priceIncRateHouses*10;
		gEBI("priceIncRateHouses").innerHTML = abbrNum((priceIncRateHouses.toFixed(2)),2);
		gEBI("rateHB").innerHTML = (incRateHouses).toFixed(2);
		gEBI("rateHA").innerHTML = (incRateHouses + 0.1).toFixed(2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
	}
	else{NEMshow();}
}
function IncWaterProd() {
	if(0<=(money-priceIncWaterProd)){
		pumpProd[0] = pumpProd[0]*1.1;
		pumpProd[1] = pumpProd[1]*1.1;
		pumpProd[2] = pumpProd[2]*1.1;
		pumpProd[3] = pumpProd[3]*1.1;
		money = money - priceIncWaterProd;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		priceIncWaterProd = priceIncWaterProd * 1.5;
		gEBI("priceIncWaterProd").innerHTML = abbrNum(priceIncWaterProd.toFixed(2),2);
		gEBI("pumpProdB1").innerHTML = abbrNum(pumpProd[0].toFixed(2),2);
		gEBI("pumpProdB2").innerHTML = abbrNum(pumpProd[1].toFixed(2),2);
		gEBI("pumpProdB3").innerHTML = abbrNum(pumpProd[2].toFixed(2),2);
		gEBI("pumpProdB4").innerHTML = abbrNum(pumpProd[3].toFixed(2),2);
		gEBI("pumpProdA1").innerHTML = abbrNum((pumpProd[0]*1.1).toFixed(2),2);
		gEBI("pumpProdA2").innerHTML = abbrNum((pumpProd[1]*1.1).toFixed(2),2);
		gEBI("pumpProdA3").innerHTML = abbrNum((pumpProd[2]*1.1).toFixed(2),2);
		gEBI("pumpProdA4").innerHTML = abbrNum((pumpProd[3]*1.1).toFixed(2),2);
	}
	else{NEMshow();}
}
function IncTreatProd() {
	if(0<=(money-priceIncTreatProd)){
		treatProd[0] = treatProd[0]*1.1;
		treatProd[1] = treatProd[1]*1.1;
		treatProd[2] = treatProd[2]*1.1;
		treatProd[3] = treatProd[3]*1.1;
		money = money - priceIncTreatProd;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		priceIncTreatProd = priceIncTreatProd * 1.5;
		gEBI("priceIncTreatProd").innerHTML = abbrNum(priceIncTreatProd.toFixed(2),2);
		gEBI("treatProdB1").innerHTML = abbrNum(treatProd[0].toFixed(2),2);
		gEBI("treatProdB2").innerHTML = abbrNum(treatProd[1].toFixed(2),2);
		gEBI("treatProdB3").innerHTML = abbrNum(treatProd[2].toFixed(2),2);
		gEBI("treatProdB4").innerHTML = abbrNum(treatProd[3].toFixed(2),2);
		gEBI("treatProdA1").innerHTML = abbrNum((treatProd[0]*1.1).toFixed(2),2);
		gEBI("treatProdA2").innerHTML = abbrNum((treatProd[1]*1.1).toFixed(2),2);
		gEBI("treatProdA3").innerHTML = abbrNum((treatProd[2]*1.1).toFixed(2),2);
		gEBI("treatProdA4").innerHTML = abbrNum((treatProd[3]*1.1).toFixed(2),2);
	}
	else{NEMshow();}
}