function once() {
	//pumps&treatpla
	refPumps();
	refTreatment();
	refReserv();
	refBank();
	//treatment production, total production abd price
	//pump production, total production abd price
	gEBI("year").innerHTML = year;
	//...
	chP(1);
	chTr(1);
	chPiO(1);
	chPiP(1);
	chTrS(1);
	chPS(1);
	chSS(1);
	chBS(1);
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
	
	gEBI("inv").value = 0;
	gEBI("wd").value = 0;
	document.getElementsByClassName("city").item(0).innerHTML = selectedCity;
	document.getElementsByTagName("title").item(0).innerHTML = "Water Company - " + selectedCity;
	refFin();
}