function sellPump(a,b){
	if(pumps[a]>=b){
		pumps[a] = pumps[a] - b;
		money = money + pumpPrice[a]*b;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		
		PW = Number(pumps[0]) * Number(pumpProd[0]) + Number(pumps[1]) * Number(pumpProd[1]) + Number(pumps[2]) * Number(pumpProd[2]) + Number(pumps[3]) * Number(pumpProd[3]);
		gEBI("prd").innerHTML = abbrNum(PW.toFixed(2),2);
		gEBI("SpumpTotProd").innerHTML = abbrNum((pumpProd[0]*pumps[0]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("MpumpTotProd").innerHTML = abbrNum((pumpProd[1]*pumps[1]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("BpumpTotProd").innerHTML = abbrNum((pumpProd[2]*pumps[2]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("VBpumpTotProd").innerHTML = abbrNum((pumpProd[3]*pumps[3]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("Spump").innerHTML = pumps[0];
		gEBI("Mpump").innerHTML = pumps[1];
		gEBI("Bpump").innerHTML = pumps[2];
		gEBI("VBpump").innerHTML = pumps[3];
		gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
	}
}
function sellTrP(a,b){
	if(treatPla[a]>=b){
		treatPla[a] = treatPla[a] - b;
		money = money + treatPrice[a]*b;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
		gEBI("trt").innerHTML = TW;
		gEBI("STpump").innerHTML = abbrNum(treatPla[0].toFixed(0),0);
		gEBI("MTpump").innerHTML = abbrNum(treatPla[1].toFixed(0),0);
		gEBI("BTpump").innerHTML = abbrNum(treatPla[2].toFixed(0),0);
		gEBI("VBTpump").innerHTML = abbrNum(treatPla[3].toFixed(0),0);
		gEBI("STpumpTotProd").innerHTML = abbrNum((treatProd[0]*treatPla[0]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("MTpumpTotProd").innerHTML = abbrNum((treatProd[1]*treatPla[1]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("BTpumpTotProd").innerHTML = abbrNum((treatProd[2]*treatPla[2]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("VBTpumpTotProd").innerHTML = abbrNum((treatProd[3]*treatPla[3]).toFixed(0),2) + " m<sup>3</sup>";
	}
}