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
function IncWaterProd() {
	if(0<=(money-priceIncWaterProd)){
		pumpProd[0] = pumpProd[0]*1.1;
		pumpProd[1] = pumpProd[1]*1.1;
		pumpProd[2] = pumpProd[2]*1.1;
		pumpProd[3] = pumpProd[3]*1.1;
		money = money - priceIncWaterProd;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		priceIncWaterProd = priceIncWaterProd * 1.5;
		refUpgrades();
		refPumps();
		updatePipes();
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
		refUpgrades();
		refTreatment();
		updatePipes();
	}
	else{NEMshow();}
}
function incInr() {
	if(0<=(money-priceIncInt)) {
		if(interest<15){
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
function decPumpOpCost() {
	if(money>=priceDecPumpOpCost){
		money = money - priceDecPumpOpCost;
		priceDecPumpOpCost = priceDecPumpOpCost*1.5;
		pumpCost[0] = pumpCost[0]*0.9;
		pumpCost[1] = pumpCost[1]*0.9;
		pumpCost[2] = pumpCost[2]*0.9;
		pumpCost[3] = pumpCost[3]*0.9;
		refPumps();
		refFin();
		refUpgrades();
	}
}
function decTrOpCost() {
	if(money>=priceDecTrOpCost){
		money = money - priceDecTrOpCost;
		priceDecTrOpCost = priceDecTrOpCost*1.5;
		treatCost[0] = treatCost[0]*0.9;
		treatCost[1] = treatCost[1]*0.9;
		treatCost[2] = treatCost[2]*0.9;
		treatCost[3] = treatCost[3]*0.9;
		refTreatment();
		refFin();
		refUpgrades();
	}
}
function decSOpCost() {
	if(money>=priceDecSOpCost){
		money = money - priceDecSOpCost;
		priceDecSOpCost = priceDecSOpCost*1.5;
		stWCost[0] = stWCost[0]*0.9;
		stWCost[1] = stWCost[1]*0.9;
		stWCost[2] = stWCost[2]*0.9;
		stWCost[3] = stWCost[3]*0.9;
		refReserv();
		refFin();
		refUpgrades();
	}
}
function incMaxLoan() {
	if(money>=priceIncMaxL){
		maxLoan = maxLoan*2;
		priceIncMaxL = priceIncMaxL*2;
		refUpgrades();
	}
}