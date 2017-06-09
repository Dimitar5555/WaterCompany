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
		SWHprice = other[16];
		
		var prices = JSON.parse(localStorage.prices);
		pricePPM = prices[0];
		pricePPP = prices[1];
		loan = prices[2];
		loanInterest = prices[3];
		priceDecPumpOpCost = prices[4];
		priceDecTrOpCost = prices[5];
		priceDecSOpCost = prices[6];
		priceIncMaxL = prices[7];
		maxLoan = prices[8];
		
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
		priceIncStSt = upgradesPrices[9];
		priceIncHW = upgradesPrices[10];
		decPriceHPipesBuy = upgradesPrices[11];
		decPriceHpipesPlace = upgradesPrices[12];
		PriceincProdHWpumps = upgradesPrices[13];
		priceDecHWpumpOpC = upgradesPrices[14];
		priceIncHeatHeatingFac = upgradesPrices[15];
		fast = 500;
		
		var heatWater = JSON.parse(localStorage.hotWater);
		HWpumpProd = [heatWater[0][0], heatWater[0][1], heatWater[0][2], heatWater[0][3]];
		HWpump = [heatWater[1][0], heatWater[1][1], heatWater[1][2], heatWater[1][3]];
		HWpumpPrice = [heatWater[2][0], heatWater[2][1], heatWater[2][2], heatWater[2][3]];
		HWpumpOpC = [heatWater[3][0], heatWater[3][1], heatWater[3][2], heatWater[3][3]];
		HWHFProd = [heatWater[4][0], heatWater[4][1], heatWater[4][2], heatWater[4][3]];
		HWHFPrice = [heatWater[5][0], heatWater[5][1], heatWater[5][2], heatWater[5][3]];
		HWHFOpC = [heatWater[6][0], heatWater[6][1], heatWater[6][2], heatWater[6][3]];
		HWHF = [heatWater[7][0], heatWater[7][1], heatWater[7][2], heatWater[7][3]];
		HPO = heatWater[8];
		HPPP = heatWater[9];
		HPOprice = heatWater[10];
		HPPprice = heatWater[11];
		
		Alert("WARNING! This is a experimetal version of the game. Some features can not work properly and it could break your game!");
		
		formatNumber = localStorage.number;
		var time = localStorage.offTime;
		var oldBalance = curBalance;
		var oldLoan = loan;
		checkVars();
		once();
		
		
		var times = Math.floor(((Date.now()-time)/500/10));
		if(Date.now()-time>24*60*60*60*1000){
			times = 24*60*60*60*1000;
		}
		else if(Date.now()-time<1000*180){
			times = 0;
		}
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
			hour = hour + 1;
			if(hour>=24){
				hour=hour-24;
				day=day+1;
				changeweat();
				retLoanAuto();
				autoIncBal();
			if(loan==0){}
			else if(0 <= money - (loan/100)){
				loan = loan - (loan/100);
				money = money - (loan/100);
			}
			else{
				loan = (loan/100)*(loanInterest+100);
			}
			}
			if(day>=366){
				year = year + 1;
				day = day - 365;
			}
		}
		gEBI("time").innerHTML = hour + ":00";
		gEBI("NW").innerHTML = s(UW);
		gEBI("stW").innerHTML = s(stW);
		refMoney();
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
		else{}
		updatePipes();
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("curTaxL").innerHTML = s(loan/100);
		refFin();
		gEBI("date").innerHTML = day;
		gEBI("year").innerHTML = year;
		gEBI("month").innerHTML = month;
	}
	
	else {
		pumps = [1, 0, 0, 0];
		pumpProd = [100, 500, 5000, 10000];
		pumpPrice = [1500, 4750, 10000, 25000];
		treatPla = [1, 0, 0, 0];
		treatProd = [100, 500, 5000, 10000];
		treatPrice = [3000, 9500, 20000, 50000];
		houses = 1000;
		HPP = 2;
		WPH = 3;
		priceDecHWpumpOpC = 100000;
		SWHprice = 10;
		priceIncHW = 10000;
		price = 0.3;
		PP = 10;
		PO = 0;
		money = 0;
		priceIncP = 100;
		decPriceHpipesPlace = 10000;
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
		pumpCost = [5 ,20 ,180 ,340];
		treatCost = [10 ,40 ,360 ,680];
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
		priceIncHeatHeatingFac = 100000;
		priceDecPumpOpCost = 10000;
		priceDecTrOpCost = 10000;
		priceDecSOpCost = 10000;
		year = 0;
		fast = 500;
		month = 0;
		priceIncMaxL = 200000;
		maxLoan = 50000;
		selectedCity = prompt("Where do you want to start you water company?");
		var time = Date.now();
		HWpumpProd = [50, 250, 2500, 5000];
		HWpump = [0,0,0,0];
		HWpumpPrice = [10000,40000,360000,700000];
		HWpumpOpC = [100,400,3500,6800];
		HWHFProd = [50, 250, 2500, 5000];
		HWHFPrice = [20000,80000,720000,1400000];
		HWHFOpC = [200,800,7000,13600];
		HWHF = [0,0,0,0];
		HPO = 0;
		HPPP = 0;
		HPOprice = 10000;
		HPPprice = 1000;
		priceIncStSt = 10000;
		PriceincProdHWpumps = 100000;
		decPriceHPipesBuy = 100000;
		localStorage.setItem("offTime", time);
		save();
		loadSets();
	}
}
HardReset = 0; 
function save() {
	saveSets();
	var time = Date.now();
	localStorage.setItem("offTime", time);
	var upgradesPrices = [priceIncP, priceDecPPP, priceIncWaterU, priceIncRateHouses, priceDecBP, priceDecPP, priceIncWaterProd, priceIncTreatProd, priceIncInt, priceIncStSt, priceIncHW, decPriceHPipesBuy, decPriceHpipesPlace, PriceincProdHWpumps, priceDecHWpumpOpC, priceIncHeatHeatingFac];
	var pumptreat = [pumps, pumpProd, pumpPrice, treatPla, treatProd, treatPrice, pumpCost, treatCost, stWCost, stWPrice, stWProd, stWC];
	var prices = [pricePPM, pricePPP, loan, loanInterest, priceDecPumpOpCost, priceDecTrOpCost, priceDecSOpCost, priceIncMaxL, maxLoan];
	var other = [selectedCity, houses, HPP, WPH, price, PP, PO, money, hour, day, incRateHouses, curBalance, interest, stW, year, month, SWHprice];
	var heatWater = [HWpumpProd, HWpump, HWpumpPrice, HWpumpOpC, HWHFProd, HWHFPrice, HWHFOpC, HWHF, HPO, HPPP, HPOprice, HPPprice];
	
	localStorage.setItem("upgradesPrices", JSON.stringify(upgradesPrices));
	localStorage.setItem("pumptreat", JSON.stringify(pumptreat));
	localStorage.setItem("prices", JSON.stringify(prices));
	localStorage.setItem("other", JSON.stringify(other));
	localStorage.setItem("hotWater", JSON.stringify(heatWater));
}

function saveSets() {
	if(document.getElementById('f').checked){sync=1} else{sync=0}
	var bankpercent = Number(gEBI('bankpercent').value);
	if(bankpercent>100){bankpercent = 100;} 
	else if(bankpercent<0){bankpercent=0;}
	else if(!bankpercent){bankpercent=0;}
	if(gEBI('notBH').checked){notBH = 1;} else{notBH = 0;}
	if(gEBI('notBI').checked){notBI = 1;} else{notBI = 0;}
	if(gEBI('notPL').checked){notPL = 1;} else{notPL = 0;}
	if(gEBI('notAS').checked){notAS = 1;} else{notAS = 0;}
	if(gEBI('INTBANK').checked){INTBANK = 1;}else{INTBANK = 0;}
	if(gEBI('a').checked){
		bankpercentOn = 1;
		gEBI('warnAll').style.display = 'block';
		gEBI('percentBankUpper').innerHTML = bankpercent;
	}
	else{
		bankpercentOn = 0;
		gEBI('warnAll').style.display = 'none';
		gEBI('percentBankUpper').innerHTML = bankpercent;
	}
	if(gEBI('Hf').checked){syncH=1} else{syncH=0}
	if(gEBI('buyMaxH').checked){buyMaxH=1} else{buyMaxH=0}
	
	var e = document.getElementById('selecetTheme');
	var theme = (e.options[e.selectedIndex].value).toLowerCase();
	if(gEBI('buyMax').checked){buyMax=1} else{buyMax=0}
	var localSets = [sync, bankpercent, notBH, notBI, notPL, INTBANK, bankpercentOn, buyMax, theme, notAS, syncH, buyMaxH];
	localStorage.setItem("settings", JSON.stringify(localSets));
}
function loadSets() {
	if(!JSON.parse(localStorage.settings)){
		saveSets();
		loadSets();
	}
	else{
		var settings = JSON.parse(localStorage.settings);
		sync = settings[0];
		bankpercent = settings[1];
		notBH = settings[2];
		notBI = settings[3];
		notPL = settings[4];
		INTBANK = settings[5];
		bankpercentOn = settings[6];
		buyMax = settings[7];
		theme = settings[8];
		notAS = settings[9];
		syncH = settings[10];
		buyMaxH = settings[11];
		var styleel = 'css/bootstrap-' + theme + '.css';
		gEBI('STYLE-EL').href = styleel;
		if(sync==1){
			gEBI("f").checked = true;
		}
		else{
			gEBI("f").checked = false;
		}
		if(bankpercent>0 && bankpercentOn==1){
			gEBI('warnAll').style.display = 'block';
			gEBI('percentBankUpper').innerHTML = bankpercent;
			gEBI('bankpercent').value = bankpercent;
		}
		else{
			gEBI('warnAll').style.display = 'none';
			gEBI('percentBankUpper').innerHTML = bankpercent;
		}
		if(notBH==1){
			gEBI("notBH").checked = true;
		}
		else{
			gEBI("notBH").checked = false;
		}
		if(notBI==1){
			gEBI("notBI").checked = true;
		}
		else{
			gEBI("notBI").checked = false;
		}
		if(notPL==1){
			gEBI("notPL").checked = true;
		}
		else{
			gEBI("notPL").checked = false;
		}
		if(INTBANK==1){
			gEBI("INTBANK").checked = true;
		}
		else{
			gEBI("INTBANK").checked = false;
		}
		if(notAS==1){
			gEBI("notAS").checked = true;
		}
		else{
			gEBI("notAS").checked = false;
		}
		if(buyMaxH==1){
			gEBI("buyMaxH").checked = true;
		}
		else{
			gEBI("buyMaxH").checked = false;
		}
		if(syncH==1){
			gEBI("Hf").checked = true;
		}
		else{
			gEBI("Hf").checked = false;
		}
	}
}