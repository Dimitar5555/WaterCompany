function once() {
	//pumps&treatpla
	refPumps();
	refTreatment();
	refReserv();
	refBank();
	refHPipes();
	//treatment production, total production abd price
	//pump production, total production abd price
	gEBI("year").innerHTML = year;
	//...
	changeB('pump', pumpPrice, 1, 'numP', 'PuB');
	changeS(1, 'numPS', 'PuS');
	changeB('Tpump', treatPrice, 1, 'numTr', 'TreatPlB');
	changeS(1, 'numTrS', 'TrPS');
	changeB('st', stWPrice, 1, 'numBS', 'sBS');
	changeS(1, 'numSS', 'sSS');
	changeB('HP', HWpumpPrice, 1, 'numBHWP', 'BHP');
	changeS(1, 'numSWHP', 'SHP');
	changeB('HHP', HWHFPrice, 1, 'numBHHP', 'BHHP');
	changeS(1, 'numSHHP', 'SHHP');
	
	
	chPiO(1);
	chPiP(1);
	chHPiO(1);
	chHPiP(1);
	//abbrnum
	refUpgrades();
	
	
	
	gEBI("houses").innerHTML = abbrNum(houses,2);
	gEBI("pricem3").innerHTML =  "$" + s(price);
	PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
	TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
	UW = HPP * WPH * PP;
//other
	gEBI("sup").innerHTML = s(HPP*PP);
	gEBI("PPM").innerHTML = abbrNum(pricePPM.toFixed(2),2);
	gEBI("PPP").innerHTML = abbrNum(pricePPP.toFixed(2),2);
	gEBI("PM").innerHTML = abbrNum(PO,0);
	gEBI("PP").innerHTML = abbrNum(PP,0);
	gEBI("PPH").innerHTML = HPP;
	gEBI("WPH").innerHTML = WPH.toFixed(2);
	gEBI("date").innerHTML = day;
	changeweat();
	gEBI("month").innerHTML = month;
	start();
	
	refUpper();
	refHeat();
	
	gEBI("inv").value = 0;
	gEBI("wd").value = 0;
	document.getElementsByClassName("city").item(0).innerHTML = selectedCity;
	document.getElementsByTagName("title").item(0).innerHTML = "Water Company - " + selectedCity;
	refFin();
}