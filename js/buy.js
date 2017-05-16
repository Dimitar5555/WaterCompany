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
			}
		}
		else {NEMshow();}
	}
	else{
		gEBI("TLH").display = "block";
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
					gEBI("income").innerHTML = "-" + "$<span style='color: red;'>" + s(add) + "</span>";
				}
				else if(add==0){
					gEBI("income").innerHTML = "+" + "$" + s(add);
				}
				gEBI("prd").innerHTML = s(PW);
				gEBI("trt").innerHTML = s(TW);
				UW = HPP * WPH * PP;
				gEBI("NW").innerHTML = s(UW.toFixed);
				addWater = s(extraWA * HPP * PP);
				gEBI("extraW").innerHTML = s(extraWA * HPP * PP);
			}
			else{Notifier.error("", "Not enough houses");}
		}
		else{Notifier.error("", "Not enough buyed pipes");}
	}
	else {Notifier.error("", "Not enough money");}
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
		gEBI("Spump").innerHTML = pumps[0];
		gEBI("Mpump").innerHTML = pumps[1];
		gEBI("Bpump").innerHTML = pumps[2];
		gEBI("VBpump").innerHTML = pumps[3];
		PW = Number(pumps[0]) * Number(pumpProd[0]) + Number(pumps[1]) * Number(pumpProd[1]) + Number(pumps[2]) * Number(pumpProd[2]) + Number(pumps[3]) * Number(pumpProd[3]);
		gEBI("prd").innerHTML = s(PW);
		gEBI("SpumpTotProd").innerHTML =  abbrNum((pumpProd[0]*pumps[0]),2) + " m<sup>3</sup>";
		gEBI("MpumpTotProd").innerHTML =  abbrNum((pumpProd[1]*pumps[1]),2) + " m<sup>3</sup>";
		gEBI("BpumpTotProd").innerHTML =  abbrNum((pumpProd[2]*pumps[2]),2) + " m<sup>3</sup>";
		gEBI("VBpumpTotProd").innerHTML = abbrNum((pumpProd[3]*pumps[3]),2) + " m<sup>3</sup>";
		gEBI("SpumpTotOpC").innerHTML  = "$" + s(pumpCost[0]*pumps[0]);
		gEBI("MpumpTotOpC").innerHTML  = "$" + s(pumpCost[1]*pumps[1]);
		gEBI("BpumpTotOpC").innerHTML  = "$" + s(pumpCost[2]*pumps[2]);
		gEBI("VBpumpTotOpC").innerHTML = "$" + s(pumpCost[3]*pumps[3]);
		var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
		gEBI("fopC").innerHTML =    s(opC);
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
		gEBI("STpump").innerHTML = treatPla[0];
		gEBI("MTpump").innerHTML = treatPla[1];
		gEBI("BTpump").innerHTML = treatPla[2];
		gEBI("VBTpump").innerHTML = treatPla[3];
		TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
		gEBI("trt").innerHTML = s(TW);
		gEBI("STpumpTotProd").innerHTML =  abbrNum((treatProd[0]*treatPla[0]),2) + " m<sup>3</sup>";
		gEBI("MTpumpTotProd").innerHTML =  abbrNum((treatProd[1]*treatPla[1]),2) + " m<sup>3</sup>";
		gEBI("BTpumpTotProd").innerHTML =  abbrNum((treatProd[2]*treatPla[2]),2) + " m<sup>3</sup>";
		gEBI("VBTpumpTotProd").innerHTML = abbrNum((treatProd[3]*treatPla[3]),2) + " m<sup>3</sup>";
		gEBI("STpumpTotOpCost").innerHTML  = "$" + s(treatCost[0]*treatPla[0]);
		gEBI("MTpumpTotOpCost").innerHTML  = "$" + s(treatCost[1]*treatPla[1]);
		gEBI("BTpumpTotOpCost").innerHTML  = "$" + s(treatCost[2]*treatPla[2]);
		gEBI("VBTpumpTotOpCost").innerHTML = "$" + s(treatCost[3]*treatPla[3]);
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
		gEBI("SS").innerHTML = s(stWC[0]);
		gEBI("MS").innerHTML = s(stWC[1]);
		gEBI("BS").innerHTML = s(stWC[2]);
		gEBI("VBS").innerHTML = s(stWC[3]);
		gEBI("SSTotProd").innerHTML =  abbrNum((stWC[0]*stWProd[0]),2) + " m<sup>3</sup>";
		gEBI("MSTotProd").innerHTML =  abbrNum((stWC[1]*stWProd[1]),2) + " m<sup>3</sup>";
		gEBI("BSTotProd").innerHTML =  abbrNum((stWC[2]*stWProd[2]),2) + " m<sup>3</sup>";
		gEBI("VBSTotProd").innerHTML = abbrNum((stWC[3]*stWProd[3]),2) + " m<sup>3</sup>";
		gEBI("SSProd").innerHTML = s(stWProd[0]) + " m<sup>3</sup>";
		gEBI("MSProd").innerHTML = s(stWProd[1]) + " m<sup>3</sup>";
		gEBI("BSProd").innerHTML = s(stWProd[2]) + " m<sup>3</sup>";
		gEBI("VBSProd").innerHTML = s(stWProd[3]) + " m<sup>3</sup>";
		gEBI("SSTotOpC").innerHTML = "$" + s(stWCost[0]*stWC[0]);
		gEBI("MSTotOpC").innerHTML = "$" + s(stWCost[1]*stWC[1]);
		gEBI("BSTotOpC").innerHTML = "$" + s(stWCost[2]*stWC[2]);
		gEBI("VBSTotOpC").innerHTML = "$" + s(stWCost[3]*stWC[3]);
		var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
		gEBI("fopC").innerHTML = s(opC);
	}
}