function buyPipe(a) {
	if(money>= a*pricePPM) {
		if(houses/2>=PO+PP+a){
			var a=a;
			var b=PP;
			var c=PO;
			PO = Number(c) + Number(a);
			money = money - a*pricePPM;
			gEBI("PM").innerHTML = PO;
			refMoney();
			updatePipes();
		}
		else{
			Error("Not enough houses");
		}
	}
	else {Error("Not enough money to buy " + abbrNum(a,0) + " pipes")}
}
function placePipe(a) {
	if(money>=a*pricePPP) {
		if(PO >= a){
			var a=a;
			var b=PP;
			var c=PO;
			PP = Number(PP) + Number(a);
			PO = Number(PO) - Number(a);
			money = money - a*pricePPP;
			gEBI("PM").innerHTML = s(PO);
			gEBI("PP").innerHTML = s(PP);
			gEBI("sup").innerHTML = s(HPP*PP);
			gEBI("money").innerHTML = s(money);
			refMoney();
			gEBI("prd").innerHTML = s(PW);
			gEBI("trt").innerHTML = s(TW);
			UW = HPP * WPH * PP;
			gEBI("NW").innerHTML = s(UW);
			addWater = s(extraWA * HPP * PP);
			gEBI("extraW").innerHTML = s(extraWA * HPP * PP);
			updatePipes();
		}
		else{Error("Not enough owned pipes");}
	}
	else {Error("Not enough money");}
}
function buyHpipes(a){
	if(money>=a*HPOprice){
		if(houses/2>=HPO+HPPP+a){
			HPO = HPO + a;
			money = money - HPOprice*a;
			refHPipes();
			refMoney();
		}
		else{
			Error("Not enough houses");
		}
	}
	else{
		Error("Not enough money");
	}
	updatePipes();
}
function placeHpipes(a){
	if(money>=a*HPPprice){
		if(HPO-a>=0){
			HPPP = HPPP + a;
			HPO = HPO - a;
			money = money - HPPprice*a;
			refHPipes();
			refMoney();
			updatePipes();
		}
		else{
			Error("Not enough owned heat pipes");
		}
	}
	else{
		Error("Not enough money");
	}
}

function buyUt(build, price, count, tier){
	var builda = window[build][tier];
	var pricea = window[price][tier];
	if(money>=count*pricea){
		window[build][tier] = builda + count;
		money = money - count * pricea;
		refHeat();
		refMoney();
		updatePipes();
		refHPipes();
		refTreatment();
		refReserv();
		refFin();
		refPumps();
	}
	else{
		Error("Not enough money");
	}
}
function sellUt(build, price, count, tier){
	if(window[build][tier]>=count){
		window[build][tier] = window[build][tier] -  count;
		money = money + count * window[price][tier];
		refHeat();
		refMoney();
		updatePipes();
		refHPipes();
		refTreatment();
		refReserv();
		refFin();
		refPumps();
		
	}
}