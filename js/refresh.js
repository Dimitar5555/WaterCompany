function refPumps() {
	gEBI("Spump").innerHTML = abbrNum(pumps[0].toFixed(0),0);
	gEBI("Mpump").innerHTML = abbrNum(pumps[1].toFixed(0),0);
	gEBI("Bpump").innerHTML = abbrNum(pumps[2].toFixed(0),0);
	gEBI("VBpump").innerHTML = abbrNum(pumps[3].toFixed(0),0);
	
	gEBI("SpumpPrice").innerHTML = s(pumpPrice[0]);
	gEBI("MpumpPrice").innerHTML = s(pumpPrice[1]);
	gEBI("BpumpPrice").innerHTML = s(pumpPrice[2]);
	gEBI("VBpumpPrice").innerHTML = s(pumpPrice[3]);
	
	gEBI("SpumpTotProd").innerHTML = s(pumpProd[0]*pumps[0]) + " m<sup>3</sup>";
	gEBI("MpumpTotProd").innerHTML = s(pumpProd[1]*pumps[1]) + " m<sup>3</sup>";
	gEBI("BpumpTotProd").innerHTML = s(pumpProd[2]*pumps[2]) + " m<sup>3</sup>";
	gEBI("VBpumpTotProd").innerHTML = s(pumpProd[3]*pumps[3]) + " m<sup>3</sup>";
	
	gEBI("SpumpProd").innerHTML = s(pumpProd[0]) + " m<sup>3</sup>";
	gEBI("MpumpProd").innerHTML = s(pumpProd[1]) + " m<sup>3</sup>";
	gEBI("BpumpProd").innerHTML = s(pumpProd[2]) + " m<sup>3</sup>";
	gEBI("VBpumpProd").innerHTML = s(pumpProd[3]) + " m<sup>3</sup>";
	
	gEBI("SpumpOpC").innerHTML = "$" + s(pumpCost[0]);
	gEBI("MpumpOpC").innerHTML = "$" + s(pumpCost[1]);
	gEBI("BpumpOpC").innerHTML = "$" + s(pumpCost[2]);
	gEBI("VBpumpOpC").innerHTML = "$" + s(pumpCost[3]);
	
	gEBI("SpumpTotOpC").innerHTML = "$" + s(pumpCost[0]*pumps[0]);
	gEBI("MpumpTotOpC").innerHTML = "$" + s(pumpCost[1]*pumps[1]);
	gEBI("BpumpTotOpC").innerHTML = "$" + s(pumpCost[2]*pumps[2]);
	gEBI("VBpumpTotOpC").innerHTML = "$" + s(pumpCost[3]*pumps[3]);
	
}
function refTreatment() {
	gEBI("STpump").innerHTML = abbrNum(treatPla[0].toFixed(0),0);
	gEBI("MTpump").innerHTML = abbrNum(treatPla[1].toFixed(0),0);
	gEBI("BTpump").innerHTML = abbrNum(treatPla[2].toFixed(0),0);
	gEBI("VBTpump").innerHTML = abbrNum(treatPla[3].toFixed(0),0);
	
	gEBI("STpumpProd").innerHTML = s(treatProd[0]) + " m<sup>3</sup>";
	gEBI("MTpumpProd").innerHTML = s(treatProd[1]) + " m<sup>3</sup>";
	gEBI("BTpumpProd").innerHTML = s(treatProd[2]) + " m<sup>3</sup>";
	gEBI("VBTpumpProd").innerHTML = s(treatProd[3]) + " m<sup>3</sup>";
	
	gEBI("STpumpTotProd").innerHTML = s(treatProd[0]*treatPla[0]) + " m<sup>3</sup>";
	gEBI("MTpumpTotProd").innerHTML = s(treatProd[1]*treatPla[1]) + " m<sup>3</sup>";
	gEBI("BTpumpTotProd").innerHTML = s(treatProd[2]*treatPla[2]) + " m<sup>3</sup>";
	gEBI("VBTpumpTotProd").innerHTML = s(treatProd[3]*treatPla[3]) + " m<sup>3</sup>";
	
	gEBI("STpumpPrice").innerHTML = s(treatPrice[0]);
	gEBI("MTpumpPrice").innerHTML = s(treatPrice[1]);
	gEBI("BTpumpPrice").innerHTML = s(treatPrice[2]);
	gEBI("VBTpumpPrice").innerHTML = s(treatPrice[3]);
	
	gEBI("STpumpTotOpCost").innerHTML = "$" + s(treatCost[0]*treatPla[0]);
	gEBI("MTpumpTotOpCost").innerHTML = "$" + s(treatCost[1]*treatPla[1]);
	gEBI("BTpumpTotOpCost").innerHTML = "$" + s(treatCost[2]*treatPla[2]);
	gEBI("VBTpumpTotOpCost").innerHTML = "$" + s(treatCost[3]*treatPla[3]);
	
	gEBI("STpumpOpCost").innerHTML = "$" + s(treatCost[0]);
	gEBI("MTpumpOpCost").innerHTML = "$" + s(treatCost[1]);
	gEBI("BTpumpOpCost").innerHTML = "$" + s(treatCost[2]);
	gEBI("VBTpumpOpCost").innerHTML = "$" + s(treatCost[3]);
}
function refReserv() {
	gEBI("SS").innerHTML = abbrNum(stWC[0],0);
	gEBI("MS").innerHTML = abbrNum(stWC[1],0);
	gEBI("BS").innerHTML = abbrNum(stWC[2],0);
	gEBI("VBS").innerHTML = abbrNum(stWC[3],0);
	
	gEBI("SSTotProd").innerHTML = abbrNum(stWC[0]*stWProd[0],0) + " m<sup>3</sup>";
	gEBI("MSTotProd").innerHTML = abbrNum(stWC[1]*stWProd[1],0) + " m<sup>3</sup>";
	gEBI("BSTotProd").innerHTML = abbrNum(stWC[2]*stWProd[2],0) + " m<sup>3</sup>";
	gEBI("VBSTotProd").innerHTML = abbrNum(stWC[3]*stWProd[3],0) + " m<sup>3</sup>";
	
	gEBI("SSProd").innerHTML = abbrNum(stWProd[0],0) + " m<sup>3</sup>";
	gEBI("MSProd").innerHTML = abbrNum(stWProd[1],0) + " m<sup>3</sup>";
	gEBI("BSProd").innerHTML = abbrNum(stWProd[2],0) + " m<sup>3</sup>";
	gEBI("VBSProd").innerHTML = abbrNum(stWProd[3],0) + " m<sup>3</sup>";
	
	gEBI("SSOpC").innerHTML = "$" + s(stWCost[0]);
	gEBI("MSOpC").innerHTML = "$" + s(stWCost[1]);
	gEBI("BSOpC").innerHTML = "$" + s(stWCost[2]);
	gEBI("VBSOpC").innerHTML = "$" + s(stWCost[3]);
	
	gEBI("SSTotOpC").innerHTML = "$" + s(stWCost[0]*stWC[0]);
	gEBI("MSTotOpC").innerHTML = "$" + s(stWCost[1]*stWC[1]);
	gEBI("BSTotOpC").innerHTML = "$" + s(stWCost[2]*stWC[2]);
	gEBI("VBSTotOpC").innerHTML = "$" + s(stWCost[3]*stWC[3]);
	
	gEBI("SSPrice").innerHTML = s(stWPrice[0]);
	gEBI("MSPrice").innerHTML = s(stWPrice[1]);
	gEBI("BSPrice").innerHTML = s(stWPrice[2]);
	gEBI("VBSPrice").innerHTML = s(stWPrice[3]);
}
function refFin() {
	var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
	gEBI("fopC").innerHTML = s(opC*24);
	gEBI("fFines").innerHTML = s(((fine/10000)*1000)*24);
	var g = (((curBalance/100)*(100+interest)-curBalance)/31);
	gEBI("fIntInc").innerHTML = s(g);
	gEBI("fProfit").innerHTML = s(add*24+g-loan/100);
	gEBI("fWater").innerHTML = s((add + (fine/10000)*1000 + opC)*24);
	gEBI("fLoanTax").innerHTML = s(loan/100);
}
function refUpgrades() {
	gEBI("priceBefore").innerHTML = abbrNum(price.toFixed(2),2);
	gEBI("priceAfter").innerHTML = abbrNum(((price/100)*105).toFixed(2),2);
	gEBI("bpb").innerHTML = pricePPM.toFixed(2);
	gEBI("bpa").innerHTML = ((pricePPM/100)*99).toFixed(2);
	gEBI("dcbpp").innerHTML = abbrNum(priceDecBP.toFixed(2),2);
	gEBI("priceDecPlP").innerHTML = abbrNum(priceDecPP.toFixed(2),2);
	gEBI("ppb").innerHTML = abbrNum(pricePPP.toFixed(2));
	gEBI("ppa").innerHTML = abbrNum(((pricePPP/100)*97.5).toFixed(2));
	gEBI("IncPP").innerHTML = abbrNum(priceIncP.toFixed(2),2);
	gEBI("priceIncWater").innerHTML = abbrNum(priceIncWaterU,2);
	gEBI("waterUB").innerHTML = WPH.toFixed(2);
	gEBI("waterUA").innerHTML = ((WPH/100)*102.5).toFixed(2);
	gEBI("priceIncWaterProd").innerHTML = s(priceIncWaterProd.toFixed(2),2);
	gEBI("pumpProdB1").innerHTML = s(pumpProd[0]);
	gEBI("pumpProdB2").innerHTML = s(pumpProd[1]);
	gEBI("pumpProdB3").innerHTML = s(pumpProd[2]);
	gEBI("pumpProdB4").innerHTML = s(pumpProd[3]);
	gEBI("pumpProdA1").innerHTML = s(pumpProd[0]*1.1);
	gEBI("pumpProdA2").innerHTML = s(pumpProd[1]*1.1);
	gEBI("pumpProdA3").innerHTML = s(pumpProd[2]*1.1);
	gEBI("pumpProdA4").innerHTML = s(pumpProd[3]*1.1);
	gEBI("priceIncTreatProd").innerHTML = s(priceIncTreatProd);
	gEBI("treatProdB1").innerHTML = s(treatProd[0]);
	gEBI("treatProdB2").innerHTML = s(treatProd[1]);
	gEBI("treatProdB3").innerHTML = s(treatProd[2]);
	gEBI("treatProdB4").innerHTML = s(treatProd[3]);
	gEBI("treatProdA1").innerHTML = s((treatProd[0]*1.1));
	gEBI("treatProdA2").innerHTML = s((treatProd[1]*1.1));
	gEBI("treatProdA3").innerHTML = s((treatProd[2]*1.1));
	gEBI("treatProdA4").innerHTML = s((treatProd[3]*1.1));
	gEBI("priceIncRateHouses").innerHTML = abbrNum((priceIncRateHouses.toFixed(2)),2);
	gEBI("rateHB").innerHTML = incRateHouses.toFixed(2);
	gEBI("rateHA").innerHTML = (incRateHouses + 0.25).toFixed(2);
	gEBI("priceIncInt").innerHTML = s(priceIncInt);
	gEBI("intNow").innerHTML = s(interest);
	gEBI("intAft").innerHTML = s(interest+0.25);
	gEBI("opCPB1").innerHTML = s(pumpCost[0]);
	gEBI("opCPB2").innerHTML = s(pumpCost[1]);
	gEBI("opCPB3").innerHTML = s(pumpCost[2]);
	gEBI("opCPB4").innerHTML = s(pumpCost[3]);
	gEBI("opCPA1").innerHTML = s(pumpCost[0]*0.9);
	gEBI("opCPA2").innerHTML = s(pumpCost[1]*0.9);
	gEBI("opCPA3").innerHTML = s(pumpCost[2]*0.9);
	gEBI("opCPA4").innerHTML = s(pumpCost[3]*0.9);
	gEBI("priceDecOpPump").innerHTML = s(priceDecPumpOpCost);
	gEBI("opCTB1").innerHTML = s(treatCost[0]);
	gEBI("opCTB2").innerHTML = s(treatCost[1]);
	gEBI("opCTB3").innerHTML = s(treatCost[2]);
	gEBI("opCTB4").innerHTML = s(treatCost[3]);
	gEBI("opCTA1").innerHTML = s(treatCost[0]*0.9);
	gEBI("opCTA2").innerHTML = s(treatCost[1]*0.9);
	gEBI("opCTA3").innerHTML = s(treatCost[2]*0.9);
	gEBI("opCTA4").innerHTML = s(treatCost[3]*0.9);
	gEBI("priceDecOpTreat").innerHTML = s(priceDecTrOpCost);
	gEBI("opCstWB1").innerHTML = s(stWCost[0]);
	gEBI("opCstWB2").innerHTML = s(stWCost[1]);
	gEBI("opCstWB3").innerHTML = s(stWCost[2]);
	gEBI("opCstWB4").innerHTML = s(stWCost[3]);
	gEBI("opCstWA1").innerHTML = s(stWCost[0]*0.9);
	gEBI("opCstWA2").innerHTML = s(stWCost[1]*0.9);
	gEBI("opCstWA3").innerHTML = s(stWCost[2]*0.9);
	gEBI("opCstWA4").innerHTML = s(stWCost[3]*0.9);
	gEBI("priceDecOpStW").innerHTML = s(priceDecSOpCost);
	gEBI("priceIncMaxL").innerHTML = s(priceIncMaxL);
	gEBI("maxLoanB").innerHTML = s(maxLoan);
	gEBI("maxLoanA").innerHTML = s(maxLoan*2);
	gEBI("maxLoanBank").innerHTML = s(maxLoan);
	gEBI("pricem3").innerHTML =  "$" + s(price);
}
function refPipes() {
	gEBI("PPM").innerHTML = abbrNum(pricePPM.toFixed(2),2);
	gEBI("PPP").innerHTML = abbrNum(pricePPP.toFixed(2),2);
	gEBI("PM").innerHTML = abbrNum(PO,0);
	gEBI("PP").innerHTML = abbrNum(PP,0);
	maxPipes = Math.floor((houses/HPP) - (PO + PP));
	maxP = Math.floor(money/pricePPP);
	maxB = Math.floor(money/pricePPM);
	if(maxB>maxPipes){
		maxB = maxPipes;
	}
	
	
	if(maxP>=PO){
		maxP = PO;
		if(maxP>maxPipes){
			maxP = maxPipes;
		}
	}
	else if(maxP>=maxPipes){
		maxP = maxPipes;
		if(maxP>PO){
			maxP = PO;
		}
	}
	
	
	gEBI("bmp").innerHTML = abbrNum(maxB,0);
	gEBI("pmp").innerHTML = abbrNum(maxP,0);
	var maxPP = Math.floor(money/(pricePPM+pricePPP));
	if(maxPP>maxPipes){
		maxPP = maxPipes;
	}
	gEBI("bppM").innerHTML = s(maxPP);
}
function refUpper() {
	gEBI("money").innerHTML = s(money);
	gEBI("prd").innerHTML = s(PW);
	gEBI("trt").innerHTML = s(TW);
	gEBI("NW").innerHTML = s(UW);
	gEBI("capacitystW").innerHTML = s(stWC[0]*stWProd[0] + stWC[1]*stWProd[1] + stWC[2]*stWProd[2] + stWC[3]*stWProd[3]);
	
}
function refBank() {
	gEBI("curBalance").innerHTML = s(curBalance);
	gEBI("interestRate").innerHTML = s(interest);
	gEBI("curLoan").innerHTML = s(loan);
	gEBI("lInt").innerHTML = s(loanInterest);
	gEBI("curTaxL").innerHTML = s(loan/100);
}
function refMoney() {
	if(add>0){
		gEBI("income").innerHTML = "+" + "$<span style='color: green;'>" + s(add) + "</span>";
	} 
	else if(add<0){
		add = add* (-1);
		gEBI("income").innerHTML = "-" + "$<span style='color: red;'>" + s(add) + "</span>";
		add = add*(-1);
	}
	else if(add==0){
		gEBI("income").innerHTML = "+" + "$" + s(add);
	}
	gEBI("money").innerHTML = s(money);
}