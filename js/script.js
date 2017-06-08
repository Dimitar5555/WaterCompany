window.setInterval(function() {
	if(notAS==0){
		save();
	}
	else{}
	}, 30000);
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
	
	
	
	
	if(PW>UW){
		SW=UW;
		stW = PW + stW - UW;
	}
	else{
		stW = stW + PW;
		if(UW>stW){
			SW = stW;
			stW = 0;
		}
		else{
			SW = UW;
			stW = stW - UW;
		}
	}
	
	if(SW>TW){
		fine = SW-TW;
	}
	else{
		fine = 0;
	}
	if(stW>MSW){
		stW = MSW;
	}
	PWH = HWpump[0]*HWpumpProd[0] + HWpump[1]*HWpumpProd[1] + HWpump[2]*HWpumpProd[2] + HWpump[3]*HWpumpProd[3];
	UWH = HPPP*HPP*0.5;
	HWH = HWHF[0]*HWHFProd[0] + HWHF[1]*HWHFProd[1] + HWHF[2]*HWHFProd[2] + HWHF[3]*HWHFProd[3];
	if(PWH>HWH){
		maxSHW = HWH;
	}
	else{
		maxSHW = PWH;
	}
	if(UWH<maxSHW){
		SWH = UWH;
	}
	else{
		SWH = maxSHW;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var opC = pumps[0] * pumpCost[0] + pumps[1] * pumpCost[1] + pumps[2] * pumpCost[2] + pumps[3] * pumpCost[3]	+ treatPla[0] * treatCost[0] + treatPla[1] * treatCost[1] + treatPla[2] * treatCost[2] + treatPla[3] * treatCost[3] + stWC[0] * stWCost[0] + stWC[1] * stWCost[1] + stWC[2] * stWCost[2] + stWC[3] * stWCost[3];
	var opCHeat = HWpumpOpC[0]*HWpump[0] + HWpumpOpC[1]*HWpump[1] + HWpumpOpC[2]*HWpump[2] + HWpumpOpC[3]*HWpump[3] + HWHF[0]*HWHFOpC[0] + HWHF[1]*HWHFOpC[1] + HWHF[2]*HWHFOpC[2] + HWHF[3]*HWHFOpC[3];
	add = SW * price - (fine/10000)*1000 - opC - opCHeat + SWH*SWHprice;
	money = money + add;
	refMoney();
	
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
	if(hour>=24){
		incHouses();
		hour=hour-24;
		day=day+1;
		changeweat();
		retLoanAuto();
		autoIncBal();
		var PPTemp = PP;
		var HPPTemp = parseInt(HPPP);
		var hbc = 0;
		var hbh = 0;
		if(buyMax>0){
			gEBI("btnBPpipes").click();
			if(PPTemp<PP){
				var hbc = 1;
			}
		}
		if(buyMaxH>0){
			gEBI("maxHPBPButton").click();
			if(HPPP>HPPTemp){
				var hbh = 1;
			}
		}
		if(hbh==1 && hbc==1){
			Success(s(PP-PPTemp) + " cold water pipes and " + s(HPPP-HPPTemp) + " hot water pipes have been build");
		}
		else if(hbc==1){
			Success(s(PP-PPTemp) + " cold water pipes have been build");
		}
		else if(hbh==1){
			Success(s(HPPP-HPPTemp) + " hot water pipes have been build");
		}
	}
	if(bankpercent>0){
		if(bankpercentOn>0){
			if(add>0){
				invest((add/100)*bankpercent);
			}
		}
	}
	else{
		gEBI("warnAll").style.display = "none";
	}
	if(day>=32){
		month = month + 1;
		day = day - 31;
	}
	if(month>=13){
		year = year + 1;
		month = month - 12;
	}
		gEBI("date").innerHTML = day;
		gEBI("year").innerHTML = year;
		gEBI("month").innerHTML = month;
		updatePipes();
	}, fast);}
	
	
function incHouses(){
	oldhouses = houses;
	houses = houses + (((houses/100)*incRateHouses)-houses)/372;
	gEBI("houses").innerHTML = s(houses);
	if(oldhouses<houses && notBH == 0){
		Success(abbrNum(houses-oldhouses,0) + " new houses have been build");
	}
	updatePipes();
}

/*
btoa encode
tboa decode
*/