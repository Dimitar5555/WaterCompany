function checkVar(a) {
	if(isInteger(a) || isFloat(a)){
		var b = true;
	}
	else{
		var b = false;
	}
	return b;
}

if(checkVar(priceDecPumpOpCost)){
	priceDecPumpOpCost = 10000;
}
if(checkVar(priceDecTrOpCost)){
	priceDecTrOpCost = 10000;
}
if(checkVar(priceDecSOpCost)){
	priceDecSOpCost = 10000;
}