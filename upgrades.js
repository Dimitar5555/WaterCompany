function IncWaterPrice() {
	if(0 <= (money - priceIncP)){
		price = (price/100)*110;
		money = money - priceIncP;
		priceIncP = (priceIncP/100)*150;
		gEBI("IncPP").innerHTML = abbrNum(priceIncP.toFixed(2),2);
		gEBI("priceBefore").innerHTML = price.toFixed(2);
		gEBI("priceAfter").innerHTML = ((price/100)*110).toFixed(2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
		gEBI("pricem3").innerHTML =  "$" + abbrNum((price.toFixed(2)),2);
	}
	else{
		gEBI("NEM").style.display = "block";
	}
}
function DecPP() {
	if(0<= (money-priceDecPP)){
		money = money - priceDecPP;
		priceDecPP = (priceDecPP/100)*150;
		pricePPP = (pricePPP/100)*95;
		gEBI("priceDecPlP").innerHTML = abbrNum(priceDecPP.toFixed(2),2);
		gEBI("ppb").innerHTML = abbrNum(pricePPP.toFixed(2),2);
		gEBI("ppa").innerHTML = abbrNum(((pricePPP/100)*95).toFixed(2),2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("PPP").innerHTML = abbrNum(pricePPP.toFixed(2),2);
	}
	else{
		gEBI("NEM").style.display = "block";
	}
}
function DecBP() {
	if(0<=money-priceDecBP){
		money = money - priceDecBP;
		pricePPM = (pricePPM/100)*95;
		priceDecBP = priceDecBP*1.5;
		gEBI("bpb").innerHTML = abbrNum(pricePPM.toFixed(2),2);
		gEBI("bpa").innerHTML = abbrNum(((pricePPM/100)*95).toFixed(2),2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("PPM").innerHTML = abbrNum(pricePPM.toFixed(2),2);
		gEBI("dcbpp").innerHTML = abbrNum(priceDecBP.toFixed(2),2);
	}
	else{
		gEBI("NEM").style.display = "block";
	}
}
function IncWaterNeeded() {
	if(0 <= (money-priceIncWaterU)){
		money = money - priceIncWaterU;
		priceIncWaterU = priceIncWaterU*2;
		WPH = (WPH/100)*110;
		gEBI("priceIncWater").innerHTML = abbrNum(priceIncWaterU,2);
		gEBI("waterUB").innerHTML = WPH.toFixed(2);
		gEBI("waterUA").innerHTML = (WPH*1.1).toFixed(2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
	}
	else{
		gEBI("NEM").style.display = "block";
	}
}
function IncRateHouses() {
	if(0<=(money-priceIncRateHouses)){
		money = money - priceIncRateHouses;
		incRateHouses = incRateHouses + 2.5;
		priceIncRateHouses = priceIncRateHouses*10;
		gEBI("priceIncRateHouses").innerHTML = abbrNum((priceIncRateHouses.toFixed(2)),2);
		gEBI("rateHB").innerHTML = incRateHouses;
		gEBI("rateHA").innerHTML = incRateHouses+2.5;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
	}
	else{
		gEBI("NEM").style.display = "block";
	}
}
