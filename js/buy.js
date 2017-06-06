function buyPipe(a) {
	if(money>= a*pricePPM) {
		if(houses/2>=PO+PP+a){
			var a=a;
			var b=PP;
			var c=PO;
			PO = Number(c) + Number(a);
			money = money - a*pricePPM;
			gEBI("PM").innerHTML = PO;
			refMoney();
			updatePipes();
		}
		else{
			Error("Not enough houses");
		}
	}
	else {Error("Not enough money to buy " + abbrNum(a,0) + " pipes")}
}
function placePipe(a) {
	if(money>=a*pricePPP) {
		if(PO >= a){
			var a=a;
			var b=PP;
			var c=PO;
			PP = Number(PP) + Number(a);
			PO = Number(PO) - Number(a);
			money = money - a*pricePPP;
			gEBI("PM").innerHTML = s(PO);
			gEBI("PP").innerHTML = s(PP);
			gEBI("sup").innerHTML = s(HPP*PP);
			gEBI("money").innerHTML = s(money);
			refMoney();
			gEBI("prd").innerHTML = s(PW);
			gEBI("trt").innerHTML = s(TW);
			UW = HPP * WPH * PP;
			gEBI("NW").innerHTML = s(UW);
			addWater = s(extraWA * HPP * PP);
			gEBI("extraW").innerHTML = s(extraWA * HPP * PP);
			updatePipes();
		}
		else{Error("Not enough owned pipes");}
	}
	else {Error("Not enough money");}
}
function buyPump(a,b) {
	var Wprice = pumpPrice[a];
	if(money>=(Wprice*b)) {
		var x = parseInt(pumps[a]);
		pumps[a] = x + b;
		money = money - Wprice*b;
		refMoney();
		refPumps();
		PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
		gEBI("prd").innerHTML = s(PW);
		refFin();
	}
	else{NEMshow();}
}
function buyTreatmentPlant(a,b) {
	var TrPprice = treatPrice[a];
	if(money>=TrPprice*b){
		var x = parseInt(treatPla[a]);
		treatPla[a] = x + b;
		money = money - TrPprice*b;
		refMoney();
		refTreatment();
		TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
		gEBI("trt").innerHTML = s(TW);
		var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
		gEBI("fopC").innerHTML = s(opC);
	}
	else{NEMshow();}
}
function buyReserv(a,b) {
	var ResPrice = stWPrice[a]
	if(money-ResPrice*b>=0){
		money = money - ResPrice*b;
		refMoney();
		stWC[a] = stWC[a] + b;
		gEBI("capacitystW").innerHTML = s(stWC[0]*stWProd[0] + stWC[1]*stWProd[1] + stWC[2]*stWProd[2] + stWC[3]*stWProd[3]);
		refReserv();
		var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
		gEBI("fopC").innerHTML = s(opC);
	}
}
function buyHpipes(a){
	if(money>=a*HPOprice){
		if(houses/2>=HPO+HPPP+a){
			HPO = HPO + a;
			money = money - HPOprice*a;
			refHPipes();
			refMoney();
		}
		else{
			Error("Not enough houses");
		}
	}
	else{
		Error("Not enough money");
	}
	updatePipes();
}
function placeHpipes(a){
	if(money>=a*HPPprice){
		if(HPO-a>=0){
			HPPP = HPPP + a;
			HPO = HPO - a;
			money = money - HPPprice*a;
			refHPipes();
			refMoney();
			updatePipes();
		}
		else{
			Error("Not enough owned heat pipes");
		}
	}
	else{
		Error("Not enough money");
	}
}

function buyCCP(a,b){
	if(money>=b*HWHFPrice[a]){
		HWHF[a] = HWHF[a] + b;
		money = money - HWHFPrice[a]*b;
		refHeat();
		refMoney();
		updatePipes();
		refHPipes();
	}
	else{
		Error("Not enough money");
	}
}
function buyCCPpump(a,b){
	if(money>=b*HWpumpPrice[a]){
		money = money - HWpumpPrice[a]*b;
		HWpump[a] = HWpump[a] + b;
		refHeat();
		refMoney();
		updatePipes();
		refHPipes();
	}
	updatePipes();
}