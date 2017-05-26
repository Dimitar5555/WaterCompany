function checkVar(a) {
	if(typeof a==='undefined'){
		var b = false;
	}
	else {
		var b = true;
	}
	return b;
}
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
	if(typeof priceIncTreatProd=='undefined'){
		priceIncTreatProd = 10000;
	}
	once();
}