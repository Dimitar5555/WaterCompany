function checkVars() {
	if(typeof priceDecPumpOpCost=='undefined'){
		priceDecPumpOpCost = 10000;
	}
	if(typeof priceDecTrOpCost=='undefined'){
		priceDecTrOpCost = 10000;
	}
	if(typeof priceDecSOpCost=='undefined'){
		priceDecSOpCost = 10000;
	}
	if(typeof priceIncWaterU=='undefined'){
		priceIncWaterU = 10000;
	}
	if(typeof priceIncRateHouses=='undefined'){
		priceIncRateHouses = 100;
	}
	if(typeof priceDecBP=='undefined'){
		priceDecBP = 10000;
	}
	if(typeof priceDecPP=='undefined'){
		priceDecPP = 10000;
	}
	if(typeof priceIncWaterProd=='undefined'){
		priceIncWaterProd = 10000;
	}
	if(typeof HWpumpProd=='undefined'){
		HWpumpProd = [50, 250, 2500, 5000];
	}
	if(typeof HWpump=='undefined'){
		HWpump = [0,0,0,0];
	}
	if(typeof HWpumpPrice=='undefined'){
		HWpumpPrice = [10000,40000,360000,700000];
	}
	if(typeof HWpumpOpC=='undefined'){
		HWpumpOpC = [100,400,3500,6800];
	}
	if(typeof HWHFProd=='undefined'){
		HWHFProd = [50, 250, 2500, 5000];
	}
	if(typeof HWHFPrice=='undefined'){
		HWHFPrice = [20000,80000,720000,1400000];
	}
	if(typeof HWHFOpC=='undefined'){
		HWHFOpC = [200,800,7000,13600];
	}
	if(typeof HWHF=='undefined'){
		HWHF = [0,0,0,0];;
	}
	if(typeof HPO=='undefined'){
		HPO = 0;
	}
	if(typeof HPPP=='undefined'){
		HPPP = 0;
	}
	if(typeof HPOprice=='undefined'){
		HPOprice = 10000;
	}
	if(typeof HPPprice=='undefined'){
		HPPprice = 1000;
	}
	if(typeof SWHprice=='undefined'){
		SWHprice = 10;
	}
	if(typeof priceIncStSt=='undefined'){
		priceIncStSt = 10000;
	}
	if(typeof priceIncHW=='undefined'){
		priceIncHW = 10000;
	}
	if(typeof decPriceHPipesBuy=='undefined'){
		decPriceHPipesBuy = 100000;
	}
	if(typeof decPriceHpipesPlace=='undefined'){
		decPriceHpipesPlace = 10000;
	}
	if(typeof PriceincProdHWpumps=='undefined'){
		PriceincProdHWpumps = 100000;
	}
	if(typeof priceDecHWpumpOpC=='undefined'){
		priceDecHWpumpOpC = 100000;
	}
	if(typeof priceIncHeatHeatingFac=='undefined'){
		priceIncHeatHeatingFac = 100000;
	}
}
checkVars();