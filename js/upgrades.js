function IncWaterPrice() {
	if(0 <= (money - priceIncP)){
		price = (price/100)*105;
		money = money - priceIncP;
		priceIncP = (priceIncP/100)*150;
		refUpgrades();
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("pricem3").innerHTML =  "$" + abbrNum((price.toFixed(2)),2);
		updatePipes();
	}
	else{NEMshow();}
}
function decHWPprice() {
	if(money>=decPriceHPipesBuy){
		money = money - decPriceHPipesBuy;
		decPriceHPipesBuy = decPriceHPipesBuy * 1.5;
		HPOprice = HPOprice*0.95;
		refUpgrades();
		refUpper();
		chHPiO(buyHpipesNumber);
		refMoney();
	}
}
function decHWPpriceplace() {
	if(money>=decPriceHpipesPlace){
		money = money - decPriceHpipesPlace;
		decPriceHpipesPlace = decPriceHpipesPlace * 1.5;
		HPPprice = HPPprice*0.95;
		refUpgrades();
		refUpper();
		chHPiP(placeHpipesNumber);
		refMoney();
	}
}
function incMaxLoan() {
	if(money>=priceIncMaxL){
		maxLoan = maxLoan*2;
		priceIncMaxL = priceIncMaxL*2;
		refUpgrades();
	}
}
function incHWprice() {
	if(money>=priceIncHW){
		money = money - priceIncHW;
		priceIncHW = priceIncHW * 1.5;
		SWHprice = SWHprice*1.05;
		refUpgrades();
		refMoney();
		refFin();
		refHPipes();
	}
}
function incInr() {
	if(0<=(money-priceIncInt)) {
		if(interest<25){
			money = money - priceIncInt;
			gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
			interest = interest + 0.25;
			priceIncInt = (priceIncInt/100)*125;
			gEBI("interestRate").innerHTML = abbrNum(interest.toFixed(2),2);
			refUpgrades();
			updatePipes();
		}
		else{
			Error("Max value of interest reached.");
		}
	}
	else{NEMshow();}
}
function DecPP() {
	if(0<= (money-priceDecPP)){
		money = money - priceDecPP;
		priceDecPP = (priceDecPP/100)*150;
		pricePPP = (pricePPP/100)*97.5;
		refUpgrades();
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("PPP").innerHTML = abbrNum(pricePPP.toFixed(2),2);
		updatePipes();
	}
	else{NEMshow();}
}
function DecBP() {
	if(0<=money-priceDecBP){
		money = money - priceDecBP;
		pricePPM = (pricePPM/100)*97.5;
		priceDecBP = priceDecBP*1.5;
		refUpgrades();
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("PPM").innerHTML = abbrNum(pricePPM.toFixed(2),2);
		updatePipes();
	}
	else{NEMshow();}
}
function IncWaterNeeded() {
	if(0 <= (money-priceIncWaterU)){
		money = money - priceIncWaterU;
		priceIncWaterU = priceIncWaterU*2;
		WPH = (WPH/100)*102.5;
		refUpgrades();
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		updatePipes();
	}
	else{NEMshow();}
}
function IncRateHouses() {
	if(0<=(money-priceIncRateHouses)){
		money = money - priceIncRateHouses;
		incRateHouses = incRateHouses + 0.25;
		priceIncRateHouses = priceIncRateHouses*10;
		refUpgrades();
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		updatePipes();
	}
	else{NEMshow();}
}


function incProd(prod, price){
	var pricea = window[price];
	if(money>=pricea){
		money = money - pricea;
		window[price] = window[price] * 1.5;
		window[prod][0] = window[prod][0] * 1.1;
		window[prod][1] = window[prod][1] * 1.1;
		window[prod][2] = window[prod][2] * 1.1;
		window[prod][3] = window[prod][3] * 1.1;
		refUpgrades();
		refUpper();
		refMoney();
		refUpper();
		refHeat();
		refPumps();
		updatePipes();
		refReserv();
	}
	else{
		Error("Not enough money");
	}
}
function decopc(opc, price){
	var pricea = window[price];
	if(money>=pricea){
		money = money - pricea;
		window[price] = pricea * 1.5;
		window[opc][0] = window[opc][0] * 0.9;
		window[opc][1] = window[opc][1] * 0.9;
		window[opc][2] = window[opc][2] * 0.9;
		window[opc][3] = window[opc][3] * 0.9;
		refUpgrades();
		refUpper();
		refMoney();
		refUpper();
		refHeat();
		refPumps();
		updatePipes();
		refReserv();
	}
	else{
		Error("Not enough money");
	}
}