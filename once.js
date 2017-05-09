function once() {
	//pumps&treatpla
	gEBI("Spump").innerHTML = abbrNum(pumps[0].toFixed(0),0);
	gEBI("Mpump").innerHTML = abbrNum(pumps[1].toFixed(0),0);
	gEBI("Bpump").innerHTML = abbrNum(pumps[2].toFixed(0),0);
	gEBI("VBpump").innerHTML = abbrNum(pumps[3].toFixed(0),0);
	gEBI("STpump").innerHTML = abbrNum(treatPla[0].toFixed(0),0);
	gEBI("MTpump").innerHTML = abbrNum(treatPla[1].toFixed(0),0);
	gEBI("BTpump").innerHTML = abbrNum(treatPla[2].toFixed(0),0);
	gEBI("VBTpump").innerHTML = abbrNum(treatPla[3].toFixed(0),0);
	
	//treatment production, total production abd price
	gEBI("STpumpProd").innerHTML = abbrNum(treatProd[0].toFixed(0),2) + " m<sup>3</sup>";
	gEBI("MTpumpProd").innerHTML = abbrNum(treatProd[1].toFixed(0),2) + " m<sup>3</sup>";
	gEBI("BTpumpProd").innerHTML = abbrNum(treatProd[2].toFixed(0),2) + " m<sup>3</sup>";
	gEBI("VBTpumpProd").innerHTML = abbrNum(treatProd[3].toFixed(0),2) + " m<sup>3</sup>";
	gEBI("STpumpTotProd").innerHTML = abbrNum((treatProd[0]*treatPla[0]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("MTpumpTotProd").innerHTML = abbrNum((treatProd[1]*treatPla[1]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("BTpumpTotProd").innerHTML = abbrNum((treatProd[2]*treatPla[2]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("VBTpumpTotProd").innerHTML = abbrNum((treatProd[3]*treatPla[3]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("STpumpPrice").innerHTML = abbrNum(treatPrice[0].toFixed(0),2);
	gEBI("MTpumpPrice").innerHTML = abbrNum(treatPrice[1].toFixed(0),2);
	gEBI("BTpumpPrice").innerHTML = abbrNum(treatPrice[2].toFixed(0),2);
	gEBI("VBTpumpPrice").innerHTML = abbrNum(treatPrice[3].toFixed(0),2);
	//pump production, total production abd price
	gEBI("SpumpPrice").innerHTML = abbrNum(pumpPrice[0].toFixed(0),2);
	gEBI("MpumpPrice").innerHTML = abbrNum(pumpPrice[1].toFixed(0),2);
	gEBI("BpumpPrice").innerHTML = abbrNum(pumpPrice[2].toFixed(0),2);
	gEBI("VBpumpPrice").innerHTML = abbrNum(pumpPrice[3].toFixed(0),2);
	gEBI("SpumpTotProd").innerHTML = abbrNum((pumpProd[0]*pumps[0]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("MpumpTotProd").innerHTML = abbrNum((pumpProd[1]*pumps[1]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("BpumpTotProd").innerHTML = abbrNum((pumpProd[2]*pumps[2]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("VBpumpTotProd").innerHTML = abbrNum((pumpProd[3]*pumps[3]).toFixed(0),2) + " m<sup>3</sup>";
	gEBI("SpumpProd").innerHTML = abbrNum(pumpProd[0].toFixed(0),2) + " m<sup>3</sup>";
	gEBI("MpumpProd").innerHTML = abbrNum(pumpProd[1].toFixed(0),2) + " m<sup>3</sup>";
	gEBI("BpumpProd").innerHTML = abbrNum(pumpProd[2].toFixed(0),2) + " m<sup>3</sup>";
	gEBI("VBpumpProd").innerHTML = abbrNum(pumpProd[3].toFixed(0),2) + " m<sup>3</sup>";
	//...
	chP(1);
	chTr(1);
	chPiO(1);
	chPiP(1);
	chTrS(1);
	chPS(1);
	//abbrnum
	gEBI("priceBefore").innerHTML = abbrNum(price.toFixed(2),2);
	gEBI("priceAfter").innerHTML = abbrNum(((price/100)*105).toFixed(2),2);
	gEBI("houses").innerHTML = abbrNum(houses,2);
	gEBI("pricem3").innerHTML =  "$" + abbrNum((price.toFixed(2)),2);
	gEBI("bpb").innerHTML = pricePPM.toFixed(2);
	gEBI("bpa").innerHTML = ((pricePPM/100)*99).toFixed(2);
	gEBI("IncPP").innerHTML = abbrNum(priceIncP.toFixed(2),2);
	PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
	TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
	UW = HPP * WPH * PP;
//other
	gEBI("sup").innerHTML = HPP*PP;
	document.getElementsByClassName("city").item(0).innerHTML = selectedCity;
	document.getElementsByTagName("title").item(0).innerHTML = "Water Company - " + selectedCity;
	gEBI("PPM").innerHTML = abbrNum(pricePPM.toFixed(2),2);
	gEBI("PPP").innerHTML = abbrNum(pricePPP.toFixed(2),2);
	gEBI("PM").innerHTML = PO;
	gEBI("PP").innerHTML = PP;
	gEBI("PPH").innerHTML = HPP;
	gEBI("WPH").innerHTML = WPH.toFixed(2);
	gEBI("date").innerHTML = day;
	gEBI("prd").innerHTML = PW;
	gEBI("trt").innerHTML = TW;
	gEBI("NW").innerHTML = UW;
	gEBI("waterUB").innerHTML = WPH.toFixed(2);
	gEBI("priceIncWater").innerHTML = abbrNum(priceIncWaterU,2);
	gEBI("waterUA").innerHTML = ((WPH/100)*102.5).toFixed(2);
	
	gEBI("priceIncRateHouses").innerHTML = abbrNum((priceIncRateHouses.toFixed(2)),2);
	gEBI("rateHB").innerHTML = incRateHouses.toFixed(2);
	gEBI("rateHA").innerHTML = (incRateHouses + 0.1).toFixed(2);
	gEBI("priceDecPlP").innerHTML = abbrNum(priceDecPP.toFixed(2),2);
	gEBI("ppb").innerHTML = abbrNum(pricePPP.toFixed(2));
	gEBI("ppa").innerHTML = abbrNum(((pricePPP/100)*99).toFixed(2));
	gEBI("dcbpp").innerHTML = abbrNum(priceDecBP.toFixed(2),2);
	
	gEBI("priceIncWaterProd").innerHTML = abbrNum(priceIncWaterProd.toFixed(2),2);
	gEBI("pumpProdB1").innerHTML = abbrNum(pumpProd[0].toFixed(2),2);
	gEBI("pumpProdB2").innerHTML = abbrNum(pumpProd[1].toFixed(2),2);
	gEBI("pumpProdB3").innerHTML = abbrNum(pumpProd[2].toFixed(2),2);
	gEBI("pumpProdB4").innerHTML = abbrNum(pumpProd[3].toFixed(2),2);
	gEBI("pumpProdA1").innerHTML = abbrNum((pumpProd[0]*1.1).toFixed(2),2);
	gEBI("pumpProdA2").innerHTML = abbrNum((pumpProd[1]*1.1).toFixed(2),2);
	gEBI("pumpProdA3").innerHTML = abbrNum((pumpProd[2]*1.1).toFixed(2),2);
	gEBI("pumpProdA4").innerHTML = abbrNum((pumpProd[3]*1.1).toFixed(2),2);
	gEBI("priceIncTreatProd").innerHTML = abbrNum(priceIncTreatProd.toFixed(2),2);
	gEBI("treatProdB1").innerHTML = abbrNum(treatProd[0].toFixed(2),2);
	gEBI("treatProdB2").innerHTML = abbrNum(treatProd[1].toFixed(2),2);
	gEBI("treatProdB3").innerHTML = abbrNum(treatProd[2].toFixed(2),2);
	gEBI("treatProdB4").innerHTML = abbrNum(treatProd[3].toFixed(2),2);
	gEBI("treatProdA1").innerHTML = abbrNum((treatProd[0]*1.1).toFixed(2),2);
	gEBI("treatProdA2").innerHTML = abbrNum((treatProd[1]*1.1).toFixed(2),2);
	gEBI("treatProdA3").innerHTML = abbrNum((treatProd[2]*1.1).toFixed(2),2);
	gEBI("treatProdA4").innerHTML = abbrNum((treatProd[3]*1.1).toFixed(2),2);
	changeweat();
	start();
}