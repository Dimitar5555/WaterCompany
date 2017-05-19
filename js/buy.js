function buyPipe(a) {
	if(houses>= ((HPP*PP)+(HPP*PO))){
		if(money>= a*pricePPM) {
			var a=a;
			var b=PP;
			var c=PO;
			if(houses >= (b+c+a)*2){
				PO = c + a;
				money = money - a*pricePPM;
				gEBI("PM").innerHTML = PO;
				gEBI("money").innerHTML = s(money);
				updatePipes();
			}
		}
		else {NEMshow();}
	}
	else{
		;
	}
}
function placePipe(a) {
	if(money>=a*pricePPP) {
		if(PO >= a){
			var a=a;
			var b=PP;
			var c=PO;
			if(houses >= (b+c-a)*2){	
				PP = PP + a;
				PO = PO - a;
				money = money - a*pricePPP;
				gEBI("PM").innerHTML = PO;
				gEBI("PP").innerHTML = PP;
				gEBI("sup").innerHTML = s(HPP*PP);
				gEBI("money").innerHTML = s(money);
				if(add>0){
					gEBI("income").innerHTML = "+" + "$<span style='color: green;'>" + s(add) + "</span>";
				} 
				else if(add<0){
					add = add*(-1);
					gEBI("income").innerHTML = "-" + "$<span style='color: red;'>" + s(add) + "</span>";
					add = add*(-1);
				}
				else if(add==0){
					gEBI("income").innerHTML = "+" + "$" + s(add);
				}
				gEBI("prd").innerHTML = s(PW);
				gEBI("trt").innerHTML = s(TW);
				UW = HPP * WPH * PP;
				gEBI("NW").innerHTML = s(UW);
				addWater = s(extraWA * HPP * PP);
				gEBI("extraW").innerHTML = s(extraWA * HPP * PP);
				updatePipes();
			}
			else{Error("Not enough houses");}
		}
		else{Error("Not enough owned pipes");}
	}
	else {Error("Not enough money");}
}
function buyPump(a,b) {
	var Wprice = pumpPrice[a];
	if(money>=(Wprice*b)) {
		var x=pumps[a];
		pumps[a] = x+b;
		money = money - Wprice*b;
		
	if(add>0){
		gEBI("income").innerHTML = "+" + "$<span style='color: green;'>" + s(add) + "</span>";
	} 
	else if(add<0){ 
		gEBI("income").innerHTML = "-" + "$<span style='color: red;'>" + s(add) + "</span>";
	}
	else if(add==0){
		gEBI("income").innerHTML = "+" + "$" + s(add);
	}
		gEBI("money").innerHTML = s(money);
		refPumps();
		PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
		gEBI("prd").innerHTML = s(PW);
		var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
		gEBI("fopC").innerHTML = s(opC);
	}
	else{NEMshow();}
}
function buyTreatmentPlant(a,b) {
	var TrPprice = treatPrice[a];
	if(money>=TrPprice*b){
		var x = parseInt(treatPla[a]);
		treatPla[a] = x+b;
		money = money - TrPprice*b;
		gEBI("money").innerHTML = s(money);
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
		stWC[a] = stWC[a] + b;
		gEBI("capacitystW").innerHTML = s(stWC[0]*stWProd[0] + stWC[1]*stWProd[1] + stWC[2]*stWProd[2] + stWC[3]*stWProd[3]);
		refReserv();
		var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
		gEBI("fopC").innerHTML = s(opC);
	}
}