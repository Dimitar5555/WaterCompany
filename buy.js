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
				gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
			}
		}
		else {gEBI("NEM").style.display = "block";}
	}
	else{
		gEBI("TLH").display = "block";
	}
}
function placePipe(a) {
	if(money>=a*pricePPP && PO >= a) {
		var a=a;
		var b=PP;
		var c=PO;
		if(houses >= (b+c-a)*2){	
			PP = PP + a;
			PO = PO - a;
			money = money - a*pricePPP;
			gEBI("PM").innerHTML = PO;
			gEBI("PP").innerHTML = PP;
			gEBI("sup").innerHTML = abbrNum(HPP*PP.toFixed(2),2);
			gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
			gEBI("income").innerHTML= abbrNum(add.toFixed(2),2);
			gEBI("prd").innerHTML = abbrNum(PW.toFixed(2),2);
			gEBI("trt").innerHTML = abbrNum(TW.toFixed(2),2);
			UW = HPP * WPH * PP;
			gEBI("NW").innerHTML = abbrNum(UW.toFixed(2),2);
			addWater = extraWA * HPP * PP;
			gEBI("extraW").innerHTML = abbrNum((extraWA * HPP * PP).toFixed(2),2);
		}
			gEBI("income").innerHTML=abbrNum(add.toFixed(2),2);
	}
	else {NEMshow();}
}
function buyPump(a,b) {
	switch(a) {
	case a=0:
		var Wprice = 1000;
		break;
	case a=1:
		var Wprice=5000;
		break;
	case a=2:
		var Wprice=10000;
		break;
	case a=3:
		var Wprice=100000;
		break;
	}
	if(money>=(Wprice*b)) {
		var x=pumps[a];
		pumps[a] = x+b;
		money = money - Wprice*b;
		gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("Spump").innerHTML = pumps[0];
		gEBI("Mpump").innerHTML = pumps[1];
		gEBI("Bpump").innerHTML = pumps[2];
		gEBI("VBpump").innerHTML = pumps[3];
		PW = Number(pumps[0]) * Number(pumpProd[0]) + Number(pumps[1]) * Number(pumpProd[1]) + Number(pumps[2]) * Number(pumpProd[2]) + Number(pumps[3]) * Number(pumpProd[3]);
		gEBI("prd").innerHTML = abbrNum(PW.toFixed(2),2);
		gEBI("SpumpTotProd").innerHTML = abbrNum((pumpProd[0]*pumps[0]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("MpumpTotProd").innerHTML = abbrNum((pumpProd[1]*pumps[1]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("BpumpTotProd").innerHTML = abbrNum((pumpProd[2]*pumps[2]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("VBpumpTotProd").innerHTML = abbrNum((pumpProd[3]*pumps[3]).toFixed(0),2) + " m<sup>3</sup>";
	}
	else{NEMshow();}
}
function buyTreatmentPlant(a,b) {
	switch(a) {
	case a=0:
		var TrPprice = 1000;
		break;
	case a=1:
		var TrPprice=5000;
		break;
	case a=2:
		var TrPprice=10000;
		break;
	case a=3:
		var TrPprice=100000;
		break;
	}
	if(money>=TrPprice*b){
		var x = parseInt(treatPla[a]);
		treatPla[a] = x+b;
		money = money - TrPprice*b;
		gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("STpump").innerHTML = treatPla[0];
		gEBI("MTpump").innerHTML = treatPla[1];
		gEBI("BTpump").innerHTML = treatPla[2];
		gEBI("VBTpump").innerHTML = treatPla[3];
		gEBI("STpumpProd").innerHTML = abbrNum(treatProd[0].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("MTpumpProd").innerHTML = abbrNum(treatProd[1].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("BTpumpProd").innerHTML = abbrNum(treatProd[2].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("VBTpumpProd").innerHTML = abbrNum(treatProd[3].toFixed(0),2) + " m<sup>3</sup>";
		TW = Number(treatPla[0]) * Number(treatProd[0]) + Number(treatPla[1]) * Number(treatProd[1]) + Number(treatPla[2]) * Number(treatProd[2]) + Number(treatPla[3]) * Number(treatProd[3]);
		gEBI("trt").innerHTML = abbrNum(TW.toFixed(2),2);
		gEBI("STpumpTotProd").innerHTML = abbrNum(treatProd[0]*treatPla[0].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("MTpumpTotProd").innerHTML = abbrNum(treatProd[1]*treatPla[1].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("BTpumpTotProd").innerHTML = abbrNum(treatProd[2]*treatPla[2].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("VBTpumpTotProd").innerHTML = abbrNum(treatProd[3]*treatPla[3].toFixed(0),2) + " m<sup>3</sup>";
	}
	else{NEMshow();}
}
