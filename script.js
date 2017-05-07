function gEBI(a) {
	var b = document.getElementById(a);
	return b;
}
var sync = 1;

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "k", "m", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
}
function chechSaveFile() {
	if(localStorage.a) {
		var a = JSON.parse(localStorage.a);
		pumps = [a[0][0], a[0][1], a[0][2], a[0][3]];
		pumpProd = [a[1][0], a[1][1], a[1][2], a[1][3]];
		pumpPrice = [a[2][0], a[2][1], a[2][2], a[2][3]];
		treatPla = [a[3][0], a[3][1], a[3][2], a[3][3]];
		treatProd = [a[4][0], a[4][1], a[4][2], a[4][3]];
		treatPrice = [a[5][0], a[5][1], a[5][2], a[5][3]];
		
		selectedCity = a[6];
		houses = a[7];
		HPP = a[8];
		WPH = a[9];
		price = a[10];
		PP = a[11];
		PO = a[12];
		
		money = a[13];
		priceIncP = a[14];
		priceDecPPP = a[15];
		pricePPM = a[16];
		pricePPP = a[17];
		hour = Number(a[18]);
		day = Number(a[19]);
		gEBI("wtod").innetHTML = a[20];
		gEBI("wtom").innetHTML = a[21];
		once();
	}
	else {
		pumps = [1, 0, 0, 0];
		pumpProd = [100, 1000, 10000, 100000];
		pumpPrice = [1000, 5000, 10000, 100000];
		treatPla = [1, 0, 0, 0];
		treatProd = [100, 1000, 10000, 100000];
		treatPrice = [1000, 5000, 10000, 100000];
		selectedCity = prompt("In which city do you want to start your company?");
		houses = 10000;
		HPP = 2;
		WPH = 1;
		price = 0.50;
		PP = 1;
		PO = 1;
		money = 10;
		priceIncP = 100;
		priceDecPPP = 10000;
		pricePPM = 1000;
		pricePPP = 100;
		hour = 0;
		day = 0;
		var todayE = gEBI("wtod").innerHTML;
		var tomE = gEBI("wtom").innerHTML;
		var local = [pumps, pumpProd, pumpPrice, treatPla, treatProd, treatPrice, selectedCity, houses, HPP, WPH, price, PP, PO, money, priceIncP, priceDecPPP, pricePPM, pricePPP, hour, day, todayE, tomE];
		localStorage.setItem("a", JSON.stringify(local));
		once();
	}
}
HardReset = 0; 
function save() {
	var todayE = gEBI("wtod").innerHTML;
	var tomE = gEBI("wtom").innerHTML;
	var local = [pumps, pumpProd, pumpPrice, treatPla, treatProd, treatPrice, selectedCity, houses, HPP, WPH, price, PP, PO, money, priceIncP, priceDecPPP, pricePPM, pricePPP, hour, day, todayE, tomE];
	localStorage.setItem("a", JSON.stringify(local));
	
}
window.setInterval(function() {save()}, 30000);
function weather() {
	var w=Math.random()*5;
	var v=Math.round(w);
	switch (v) {
		case 0:
			var weathera = "Sunny";
			var extraWA = "0";
			break;
		case 1:
			var weathera = "Sunny with clouds";
			var extraWA = "0";
			break;
		case 2:
			var weathera = "Cloudy without rain";
			var extraWA = "0";
			break;
		case 4:
			var weathera = "Cloudy with light rain";
			var extraWA = "0.25";
			break;
		case 5:
			var weathera = "Tunderstorm";
			var extraWA = "0.5";
			break;
	}
	return [weathera, extraWA];
}
function changeweat() {
	var todayE = gEBI("wtod");
	var tomE = gEBI("wtom");
	todayE.innerHTML = tomE.innerHTML;
	var x = weather();
	tomE.innerHTML = x[0];
	extraWA = x[1];
	var addWater = extraWA * HPP * PP;
	gEBI("extraW").innerHTML = abbrNum((extraWA * HPP * PP).toFixed(2),2);
}

/*
PPM price per meter pipe
PPP price for placing pipe
UW used water
PW produced wate
SW sold water
WPH water per house(m3)
HPP houses per house
price price per m3
PO pipes owned
PP pipes placed
TW treated water
extraWA extra water rain
*/
function start() {
window.setInterval(function(){
	UW = HPP * WPH * PP;
	PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
	TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
	gEBI("trt").innerHTML = abbrNum(TW.toFixed(2),2);
	gEBI("prd").innerHTML = abbrNum(PW.toFixed(2),2);
		if(UW > PW){
			var SW = PW;
			if(PW>TW){
				var fine = PW - TW;
			}
			else if(TW=>PW){
				var fine = 0;
			}
		}
		else if(UW <= PW){
			var SW = UW;
			if(TW<=UW){
				var fine = UW - TW;
			}
			else if(TW>UW){
				var fine = 0;
			}
		}
		
	
	add = SW * price - (fine/100)*10;
	money = money  + add;
	gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
	gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
	hour = hour + 1;
	gEBI("time").innerHTML = hour + ":00";
	gEBI("NW").innerHTML = abbrNum(UW.toFixed(2),2);
	
	if (hour==24){
		hour=0;
		day=day+1;
		gEBI("date").innerHTML = day;
		changeweat();
	}
}, 500);
}
window.setInterval(function(){
	houses = Math.floor((houses/100)*101);
	gEBI("houses").innerHTML = abbrNum(houses,2);
},10000);
function buyPipe(a) {
	if(money>= a*1000) {
		var a=a;
		var b=PP;
		var c=PO;
		if(houses >= (b+c+a)*2){
			PO = c + a;
			money = money - a*1000;
			gEBI("PM").innerHTML = PO;
			gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		}
	}
	else {}
}
function placePipe(a) {
	if(money>=a*100 && PO >= a) {
		var a=a;
		var b=PP;
		var c=PO;
		if(houses >= (b+c-a)*2){	
			PP = PP + a;
			PO = PO - a;
			money = money - a*100;
			gEBI("PM").innerHTML = PO;
			gEBI("PP").innerHTML = PP;
			gEBI("sup").innerHTML = HPP*PP;
			gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
			gEBI("income").innerHTML= abbrNum(add.toFixed(2),2);
			gEBI("prd").innerHTML = abbrNum(PW.toFixed(2),2);
			gEBI("trt").innerHTML = abbrNum(TW.toFixed(2),2);
			UW = HPP * WPH * PP;
			gEBI("NW").innerHTML = abbrNum(UW.toFixed(2),2);
			addWater = extraWA * HPP * PP;
		}
			gEBI("income").innerHTML=abbrNum(add.toFixed(2),2);
	}
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
		gEBI("STpumpTotProd").innerHTML = abbrNum((pumpProd[0]*pumps[0]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("MTpumpTotProd").innerHTML = abbrNum((pumpProd[1]*pumps[1]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("BTpumpTotProd").innerHTML = abbrNum((pumpProd[2]*pumps[2]).toFixed(0),2) + " m<sup>3</sup>";
		gEBI("VBTpumpTotProd").innerHTML = abbrNum((pumpProd[3]*pumps[3]).toFixed(0),2) + " m<sup>3</sup>";
	}
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
		gEBI("STpump").innerHTML = abbrNum(treatProd[0].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("MTpump").innerHTML = abbrNum(treatProd[1].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("BTpump").innerHTML = abbrNum(treatProd[2].toFixed(0),2) + " m<sup>3</sup>";
		gEBI("VBTpump").innerHTML = abbrNum(treatProd[3].toFixed(0),2) + " m<sup>3</sup>";
		TW = Number(treatPla[0]) * Number(treatProd[0]) + Number(treatPla[1]) * Number(treatProd[1]) + Number(treatPla[2]) * Number(treatProd[2]) + Number(treatPla[3]) * Number(treatProd[3]);
		gEBI("trt").innerHTML = abbrNum(TW.toFixed(2),2);
	}
}

function IncWaterPrice() {
	if(0 <= (money - priceIncP)){
		price = (price/100)*110;
		money = money - priceIncP;
		priceIncP = (priceIncP/100)*150;
		gEBI("IncPP").innerHTML = abbrNum(priceIncP.toFixed(2),2);
		gEBI("priceBefore").innerHTML = price.toFixed(2);
		gEBI("priceAfter").innerHTML = ((price/100)*110).toFixed(2);
		gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
		gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
		gEBI("pricem3").innerHTML =  "$" + abbrNum((price.toFixed(2)),2);
	}
}
function DecPPP() {
	if(0 <= (money - priceDecPPP)){
		priceDecPPP = (priceDecPPP/100)*150;
		gEBI("dcbpp").innerHTML = abbrNum(priceDecPPP.toFixed(2),2);
		money = money - priceDecPPP;
		pricePPM = (pricePPM/100)*95;
		pricePPP = (pricePPP/100)*95;
		gEBI("PPM").innerHTML = (abbrNum(pricePPM,2)).toFixed(2);
		gEBI("PPP").innerHTML = (abbrNum(pricePPP,2)).toFixed(2);
		
		gEBI("bpb").innerHTML = pricePPM.toFixed(2);
		gEBI("bpa").innerHTML = ((pricePPM/100)*95).toFixed(2);
		gEBI("ppb").innerHTML = pricePPP.toFixed(2);
		gEBI("ppa").innerHTML = ((pricePPP/100)*95).toFixed(2);
		chPiP(1);
		chPiO(1);
	}
}
/*
btoa encode
tboa decode
*/

function chTr(b){
	var x = document.getElementsByClassName("numTr");
	x[0].innerHTML = abbrNum(b.toFixed(0),2);
	x[1].innerHTML = abbrNum(b.toFixed(0),2);
	x[2].innerHTML = abbrNum(b.toFixed(0),2);
	x[3].innerHTML = abbrNum(b.toFixed(0),2);
	gEBI("tr0").innerHTML = abbrNum((treatPrice[0]*b).toFixed(0),2);
	gEBI("tr1").innerHTML = abbrNum((treatPrice[1]*b).toFixed(0),2);
	gEBI("tr2").innerHTML = abbrNum((treatPrice[2]*b).toFixed(0),2);
	gEBI("tr3").innerHTML = abbrNum((treatPrice[3]*b).toFixed(0),2);
	TreatPlB = b;
	
}
function chP(b) {
	var x = document.getElementsByClassName("numP");
	x[0].innerHTML = abbrNum(b.toFixed(0),2);
	x[1].innerHTML = abbrNum(b.toFixed(0),2);
	x[2].innerHTML = abbrNum(b.toFixed(0),2);
	x[3].innerHTML = abbrNum(b.toFixed(0),2);
	gEBI("pr0").innerHTML = abbrNum((pumpPrice[0]*b).toFixed(0),2);
	gEBI("pr1").innerHTML = abbrNum((pumpPrice[1]*b).toFixed(0),2);
	gEBI("pr2").innerHTML = abbrNum((pumpPrice[2]*b).toFixed(0),2);
	gEBI("pr3").innerHTML = abbrNum((pumpPrice[3]*b).toFixed(0),2);
	PuB = b;
}
function chPiO(b) {
	if(sync==1){
		chPiPPiO(b);
	}
	else{
		var x = gEBI("numPiO");
		x.innerHTML = abbrNum(b,2);
		PiO = b;
		gEBI("paap").innerHTML = abbrNum((pricePPM * b).toFixed(2),2);
	}
}
function chPiP(b) {
	if(sync==1){
		chPiPPiO(b);
	}
	else{
		var x = gEBI("numPiP");
		x.innerHTML = abbrNum(b,2);
		PiP = b;
		gEBI("pppp").innerHTML = abbrNum((b * pricePPP).toFixed(2),2);
	}
}
function chPiPPiO(b) {
	var x = gEBI("numPiP");
	x.innerHTML = abbrNum(b,2);
	PiP = b;
	gEBI("pppp").innerHTML = abbrNum((b * pricePPP).toFixed(2),2);
	var x = gEBI("numPiO");
	x.innerHTML = abbrNum(b,2);
	PiO = b;
	gEBI("paap").innerHTML = abbrNum((pricePPM * b).toFixed(2),2);
}

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
	chP(1);
	chTr(1);
	chPiO(1);
	chPiP(1);
	
	//abbrnum
	gEBI("priceBefore").innerHTML = abbrNum(price.toFixed(2),2);
	gEBI("priceAfter").innerHTML = abbrNum(((price/100)*110).toFixed(2),2);
	gEBI("houses").innerHTML = abbrNum(houses,2);
	gEBI("pricem3").innerHTML =  "$" + abbrNum((price.toFixed(2)),2);
	gEBI("bpb").innerHTML = pricePPM.toFixed(2);
	gEBI("bpa").innerHTML = ((pricePPM/100)*95).toFixed(2);
	gEBI("ppb").innerHTML = pricePPP.toFixed(2);
	gEBI("ppa").innerHTML = ((pricePPP/100)*95).toFixed(2);
	gEBI("IncPP").innerHTML = abbrNum(priceIncP.toFixed(2),2);
	start();
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
	gEBI("WPH").innerHTML = WPH;
	gEBI("date").innerHTML = day;
	gEBI("dcbpp").innerHTML = abbrNum((priceDecPPP.toFixed(2)),2);
	gEBI("prd").innerHTML = PW;
	gEBI("trt").innerHTML = TW;
	gEBI("NW").innerHTML = UW;
	}
		
