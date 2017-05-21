function chechSaveFile() {
	if(localStorage.upgradesPrices && localStorage.pumptreat && localStorage.prices && localStorage.other){
		var pumptreat = JSON.parse(localStorage.pumptreat);
		pumps = [pumptreat[0][0], pumptreat[0][1], pumptreat[0][2], pumptreat[0][3]];
		pumpProd = [pumptreat[1][0], pumptreat[1][1], pumptreat[1][2], pumptreat[1][3]];
		pumpPrice = [pumptreat[2][0], pumptreat[2][1], pumptreat[2][2], pumptreat[2][3]];
		treatPla = [pumptreat[3][0], pumptreat[3][1], pumptreat[3][2], pumptreat[3][3]];
		treatProd = [pumptreat[4][0], pumptreat[4][1], pumptreat[4][2], pumptreat[4][3]];
		treatPrice =[pumptreat[5][0], pumptreat[5][1], pumptreat[5][2], pumptreat[5][3]];
		pumpCost = [pumptreat[6][0], pumptreat[6][1], pumptreat[6][2], pumptreat[6][3]];
		treatCost = [pumptreat[7][0], pumptreat[7][1], pumptreat[7][2], pumptreat[7][3]];
		stWCost = [pumptreat[8][0], pumptreat[8][1], pumptreat[8][2], pumptreat[8][3]];
		stWPrice = [pumptreat[9][0], pumptreat[9][1], pumptreat[9][2], pumptreat[9][3]];
		stWProd = [pumptreat[10][0], pumptreat[10][1], pumptreat[10][2], pumptreat[10][3]];
		stWC = [pumptreat[11][0], pumptreat[11][1], pumptreat[11][2], pumptreat[11][3]];
		
		var other = JSON.parse(localStorage.other);
		selectedCity = other[0];
		houses = other[1];
		HPP = other[2];
		WPH = other[3];
		price = other[4];
		PP = other[5];
		PO = other[6];
		money = other[7];
		hour = other[8];
		day = other[9];
		incRateHouses = other[10];
		curBalance = other[11];
		interest = other[12];
		stW = other[13];
		year = other[14];
		month = other[15];
		
		var prices = JSON.parse(localStorage.prices);
		pricePPM = prices[0];
		pricePPP = prices[1];
		loan = prices[2];
		loanInterest = prices[3];
		
		var upgradesPrices = JSON.parse(localStorage.upgradesPrices);
		priceIncP = upgradesPrices[0];
		priceDecPPP = upgradesPrices[1];
		priceIncWaterU = upgradesPrices[2];
		priceIncRateHouses =upgradesPrices[3];
		priceDecBP = upgradesPrices[4];
		priceDecPP = upgradesPrices[5];
		priceIncWaterProd = upgradesPrices[6];
		priceIncTreatProd = upgradesPrices[7];
		priceIncInt = upgradesPrices[8];
		fast = 500;
		
		
		
		formatNumber = localStorage.number;
		var time = localStorage.offTime;
		var oldBalance = curBalance;
		var oldLoan = loan;
		once();
		
		
		var times = Math.floor(((Date.now()-time)/500/10));
		UW = HPP * WPH * PP;
		PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
		TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
		b = extraWA * HPP * PP;
		gEBI("extraW").innerHTML = s(b);
		MSW = stWC[0]*stWProd[0] + stWC[1]*stWProd[1] + stWC[2]*stWProd[2] + stWC[3]*stWProd[3];
		var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
			
		for(i=0;i<times;i++){
			stWB = stW;
			stW = stW + PW;
			if(stW-UW>=0){
				SW = UW;
				stW = stW - UW;
				if(UW>TW){
					fine = UW - TW;
				}
				else{
					fine = 0;
				}
			}
			else{
				SW = stW;
				stW = 0;
				if(SW>TW){
					fine = SW - TW;
				}
				else{
					fine = 0;
				}
			}
			add = SW * price - (fine/10000)*1000 - opC;
			money = money + add;
			if(allBank==1){
				investMAX();
				gEBI("warnAll").style.display = "block";
			}
			else{
				gEBI("warnAll").style.display = "none";
			}
			gEBI("money").innerHTML = s(money);
			hour = hour + 1;
			gEBI("time").innerHTML = hour + ":00";
			gEBI("NW").innerHTML = s(UW);
			gEBI("stW").innerHTML = s(stW);
			if(hour>=24){
				hour=hour-24;
				day=day+1;
				changeweat();
				retLoanAuto();
			if(loan==0){}
			else if(0 <= money - (loan/100)){
				loan = loan - (loan/100);
				money = money - (loan/100);
			}
			else{
				loan = (loan/100)*(loanInterest+100);
			}
			autoIncBal();
			}
			if(day>=365){
				year = year + 1;
				day = day - 365;
			}
		}
		gEBI("trt").innerHTML = s(TW);
		gEBI("prd").innerHTML = s(PW);
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("fIntInc").innerHTML = s((curBalance/100)*(100+interest)-curBalance);
		if(add*times<0){
			Error("While you were away, you lost $" + s((-1)*add*times));
		}
		else {
			Success("While you were away, you gained $" + s(add*times));
		}
		if(oldLoan>loan){
			Error("Not enough money to pay your loan tax! Your loan was increased from $" + s(oldLoan) + " to $" + s(loan));
		}
		else if(oldLoan<loan) {
			Success("While you were away, your loan taxes have been payed. Your loan has decreased by $" + s(oldLoan-loan));
		}
		if(curBalance>oldBalance){
			Log("While you were away, your earned $" + s(curBalance-oldBalance) + " from bank account interest", "success", 0);
		}
		else{}
		updatePipes();
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("money").innerHTML = s(money);
		gEBI("curTaxL").innerHTML = s(loan/100);
		refFin();
		gEBI("date").innerHTML = day;
		gEBI("year").innerHTML = year;
		gEBI("month").innerHTML = month;
	}
	
	else {
		Alert("WARNING! This is a experimetal version of the game. Some features can not work properly and it could break your game!");
		pumps = [1, 0, 0, 0];
		pumpProd = [100, 500, 5000, 10000];
		pumpPrice = [1500, 4750, 10000, 25000];
		treatPla = [1, 0, 0, 0];
		treatProd = [100, 500, 5000, 10000];
		treatPrice = [3000, 9500, 20000, 50000];
		houses = 1000;
		HPP = 2;
		WPH = 3;
		price = 0.30;
		PP = 10;
		PO = 0;
		money = 30;
		priceIncP = 100;
		priceDecPPP = 10000;
		pricePPM = 1000;
		pricePPP = 100;
		hour = 0;
		day = 0;
		var todayE = gEBI("wtod").innerHTML;
		var tomE = "bud";
		incRateHouses = 101;
		priceIncWaterU = 10000;
		priceIncRateHouses = 100;
		priceDecBP = 10000;
		priceDecPP = 10000;
		priceIncWaterProd = 100000;
		priceIncTreatProd = 100000;
		pumpCost = [5 ,20 ,180 ,400];
		treatCost = [10 ,40 ,360 ,800];
		curBalance = 0;
		interest = 0.5;
		priceIncInt = 10000;
		stW = 0;
		stWCost = [5, 45, 200, 380];
		stWPrice = [10000, 100000, 500000, 1000000];
		stWProd =  [1000, 10000, 50000, 100000];
		stWC = [0, 0, 0 , 0];
		loan = 0;
		loanInterest = 11;
		year = 0;
		fast = 500;
		month = 0;
		selectedCity = prompt("Where do you want to start you company?");
		var time = Date.now();
		localStorage.setItem("offTime", time);
		formatNumber = "standard";
		
		save();
		once();
	}
}

HardReset = 0; 
function save() {
	var time = Date.now();
	localStorage.setItem("offTime", time);
	if(!formatNumber){formatNumber = "standard";}
	var upgradesPrices = [priceIncP, priceDecPPP, priceIncWaterU, priceIncRateHouses, priceDecBP, priceDecPP, priceIncWaterProd, priceIncTreatProd, priceIncInt];
	var pumptreat = [pumps, pumpProd, pumpPrice, treatPla, treatProd, treatPrice, pumpCost, treatCost, stWCost, stWPrice, stWProd, stWC];
	var prices = [pricePPM, pricePPP, loan, loanInterest];
	var other = [selectedCity, houses, HPP, WPH, price, PP, PO, money, hour, day, incRateHouses, curBalance, interest, stW, year, month];
	localStorage.setItem("upgradesPrices", JSON.stringify(upgradesPrices));
	localStorage.setItem("pumptreat", JSON.stringify(pumptreat));
	localStorage.setItem("prices", JSON.stringify(prices));
	localStorage.setItem("other", JSON.stringify(other));
	
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
			var extraWA = 0.125;
			break;
		case "Sunny with clouds":
			var extraWA = 0.25;
			break;
		case "Cloudy without rain":
			var extraWA = 0.5;
			break;
		case "Cloudy with light rain":
			var extraWA = 0.75;
			break;
		case "Thunderstorm":
			var extraWA = 2.75;
			break;
	}
	var t = [weathera, extraWA];
	return t;
}
function changeweat() {
	var a = weather();
	gEBI("wtod").innerHTML = a[0];
	extraWA = a[1];
	gEBI("extraW").innerHTML = s(extraWA * HPP * PP);
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
	updateStatsUpper();
	var b = extraWA * HPP * PP;
	gEBI("extraW").innerHTML = s(b);
		
	MSW = stWC[0]*stWProd[0] + stWC[1]*stWProd[1] + stWC[2]*stWProd[2] + stWC[3]*stWProd[3];
	var stWB = stW;
	stW = stW + PW;

	if(stW-UW>=0){
		SW = UW;
		stW = stW - UW;
		if(UW>TW){
			fine = UW - TW;
		}
		else{
			fine = 0;
		}
	}
	else{
		SW = stW;
		stW = 0;
		if(SW>TW){
			fine = SW - TW;
		}
		else{
			fine = 0;
		}
	}
	
	var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
	add = SW * price - (fine/10000)*1000 - opC;
	money = money + add;
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
	
	if(stW>stWB){
		gEBI("stWInc").innerHTML = "+<span style='color: green;'>" + s(PW-SW) + "</span>";
	} 
	else if(stW<stWB){ 
		gEBI("stWInc").innerHTML = "-" + "<span style='color: red;'>" + s(SW-PW) + "</span>";
	}
	else if(stW==stWB){
		gEBI("stWInc").innerHTML = "+" + s(0);
	}
	if(stW>MSW){
		stW = MSW;
	}
	hour = hour + 1;
	gEBI("time").innerHTML = hour + ":00";
	updateStatsUpper();
	refFin();
	updatePipes();
	if(hour>=24){
		hour=hour-24;
		day=day+1;
		changeweat();
		retLoanAuto();
		incHouses();
		autoIncBal();
	}
	if(allBank==1){
		investMAX();
		gEBI("warnAll").style.display = "block";
	}
	else{
		gEBI("warnAll").style.display = "none";
	}
	if(day>=31){
		month = month + 1;
		day = day - 31;
		gEBI("month").innerHTML = month;
	}
	if(month>=12){
		year = year + 1;
		month = month - 12;
	}
		gEBI("date").innerHTML = day;
		gEBI("year").innerHTML = year;
	}
, fast)};
function incHouses(){
	houses = Math.floor((houses/100)*incRateHouses);
	gEBI("houses").innerHTML = s(houses);
}

/*
btoa encode
tboa decode
*/
