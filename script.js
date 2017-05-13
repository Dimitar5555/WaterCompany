function gEBI(a) {
	var b = document.getElementById(a);
	return b;
}
var sync = 1;

function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "k", "m", "b", "t", "q"];
    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
             number = Math.round(number*decPlaces/size)/decPlaces;
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }
             number += abbrev[i];
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
		incRateHouses = a[22];
		priceIncWaterU = a[23];
		priceIncRateHouses = a[24];
		priceDecBP = a[25];
		priceDecPP = a[26];
		priceIncWaterProd = a[27];
		priceIncTreatProd = a[28];
		pumpCost = a[29];
		treatCost = a[30];
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
		if(!selectedCity){selectedCity = "London";}
		houses = 1000;
		HPP = 2;
		WPH = 5;
		price = 0.30;
		PP = 5;
		PO = 5;
		money = 30;
		priceIncP = 100;
		priceDecPPP = 10000;
		pricePPM = 1000;
		pricePPP = 100;
		hour = 0;
		day = 0;
		var todayE = gEBI("wtod").innerHTML;
		var tomE = "bud";
		incRateHouses = 105;
		priceIncWaterU = 1000000;
		priceIncRateHouses = 100;
		priceDecBP = 10000;
		priceDecPP = 10000;
		priceIncWaterProd = 100000;
		priceIncTreatProd = 100000;
		pumpCost = [1,5,10,100];
		treatCost = [2,10,20,200];
		var local = [pumps, pumpProd, pumpPrice, treatPla, treatProd, treatPrice, selectedCity, houses, HPP, WPH, price, PP, PO, money, priceIncP, priceDecPPP, pricePPM, pricePPP, hour, day, todayE, tomE, incRateHouses, priceIncWaterU, priceIncRateHouses, priceDecBP, priceDecPP, priceIncWaterProd, priceIncTreatProd, pumpCost, treatCost];
		localStorage.setItem("a", JSON.stringify(local));
		once();
	}
}
HardReset = 0; 
function save() {
	var todayE = gEBI("wtod").innerHTML;
	var tomE = "fdg";
	var local = [pumps, pumpProd, pumpPrice, treatPla, treatProd, treatPrice, selectedCity, houses, HPP, WPH, price, PP, PO, money, priceIncP, priceDecPPP, pricePPM, pricePPP, hour, day, todayE, tomE, incRateHouses, priceIncWaterU, priceIncRateHouses, priceDecBP, priceDecPP, priceIncWaterProd, priceIncTreatProd, pumpCost, treatCost];
	localStorage.setItem("a", JSON.stringify(local));
	
}
window.setInterval(function() {save()}, 30000);
function weather() {
	var w = Math.floor(Math.random()*5);
	switch (w) {
		case 0:
			var weathera = "Sunny";
			break;
		case 1:
			var weathera = "Sunny with clouds";
			break;
		case 2:
			var weathera = "Cloudy without rain";
			break;
		case 4:
			var weathera = "Cloudy with light rain";
			break;
		case 5:
			var weathera = "Thunderstorm";
			break;
		default:
			var weathera = "Sunny with clouds";
			break;
	}
	switch (weathera){
		case "Sunny":
			var extraWA = 0.25;
			break;
		case "Sunny with clouds":
			var extraWA = 0.125;
			break;
		case "Cloudy without rain":
			var extraWA = 0.125;
			break;
		case "Cloudy with light rain":
			var extraWA = 0.5;
			break;
		case "Thunderstorm":
			var extraWA = 0.75;
			break;
	}
	var t = [weathera, extraWA];
	return t;
}
function changeweat() {
	var a = weather();
	gEBI("wtod").innerHTML = a[0];
	extraWA = a[1];
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
	var b = extraWA * HPP * PP;
	gEBI("extraW").innerHTML = abbrNum(b.toFixed(2),2);
		if(UW > PW){
			var SW = PW;
			if(PW>(TW+b)){
				var fine = PW - TW;
			}
			else if(TW+b>=PW){
				var fine = 0;
			}
		}
		else if(UW <= PW){
			var SW = UW;
			if(TW<=(UW+b)){
				var fine = (UW+b) - TW;
			}
			else if(TW>(UW+b)){
				var fine = 0;
			}
		}
		
	
	add = SW * price - (fine/1000)*100;
	money = money  + add;
	gEBI("income").innerHTML = abbrNum(add.toFixed(2),2);
	gEBI("money").innerHTML = abbrNum(money.toFixed(2),2);
	gEBI("fines").innerHTML = "-" + abbrNum(((fine/100)*10).toFixed(2),2);
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
	houses = Math.floor((houses/100)*incRateHouses);
	gEBI("houses").innerHTML = abbrNum(houses,2);
},10000);

/*
btoa encode
tboa decode
*/

		
