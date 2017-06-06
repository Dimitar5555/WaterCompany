function sellPump(a,b){
	if(pumps[a]>=b){
		pumps[a] = pumps[a] - b;
		money = money + pumpPrice[a]*b;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		
		PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
		gEBI("prd").innerHTML = s(PW);
		refPumps();
	}
}
function sellTrP(a,b){
	if(treatPla[a]>=b){
		treatPla[a] = treatPla[a] - b;
		money = money + treatPrice[a]*b;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
		gEBI("trt").innerHTML = TW;
		refTreatment();
	}
}
function sellSt(a,b){
	if(stWC[a]>=b){
		stWC[a] = stWC[a] - b;
		money = money + treatPrice[a]*b;
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		MSW = stWC[0]*stWProd[0] + stWC[1]*stWProd[1] + stWC[2]*stWProd[2] + stWC[3]*stWProd[3];
		if(stW>MSW){
			stW = MSW;
		}
		gEBI("stW").innerHTML = s(stW);
		gEBI("capacitystW").innerHTML = s(MSW);
		refReserv();
	}
}
function sellCCP(a,b){
	if(HWHF[a]>=b){
		HWHF[a] = HWHF[a]-b;
		money = money + HWHFPrice[a]*b;
		refMoney();
		refHPipes();
		refHeat();
	}
}
function sellCCPpump(a,b){
	if(HWpump[a]>=b){
		HWpump[a] = HWpump[a] -b;
		money = money - HWpumpPrice[a]*b;
		refMoney();
		refHeat();
		refHPipes();
	}
}