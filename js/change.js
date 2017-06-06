function chPiO(b) {
	if(sync==1){
		chPiPPiO(b);
	}
	else{
		var x = gEBI("numPiO");
		x.innerHTML = abbrNum(b,0);
		PiO = b;
		gEBI("paap").innerHTML = s(pricePPM * b);
	}
}
function chPiP(b) {
	if(sync==1){
		chPiPPiO(b);
	}
	else{
		var x = gEBI("numPiP");
		x.innerHTML = abbrNum(b,0);
		PiP = b;
		gEBI("pppp").innerHTML = s(b * pricePPP);
	}
}
function chPiPPiO(b) {
	var x = gEBI("numPiP");
	x.innerHTML = abbrNum(b,0);
	PiP = b;
	gEBI("pppp").innerHTML = s(b * pricePPP);
	var x = gEBI("numPiO");
	x.innerHTML = abbrNum(b,0);
	PiO = b;
	gEBI("paap").innerHTML = s(pricePPM * b);
}

function changeB(id, price, count, el, val) {
	gEBI("S" + id + "Tprice").innerHTML = abbrNum(price[0]*count,0);
	gEBI("M" + id + "Tprice").innerHTML = abbrNum(price[1]*count,0);
	gEBI("B" + id + "Tprice").innerHTML = abbrNum(price[2]*count,0);
	gEBI("VB" + id + "Tprice").innerHTML = abbrNum(price[3]*count,0);
	var x = document.getElementsByClassName(el);
	x[0].innerHTML = abbrNum(count,0);
	x[1].innerHTML = abbrNum(count,0);
	x[2].innerHTML = abbrNum(count,0);
	x[3].innerHTML = abbrNum(count,0);
	window[val] = count;
}
function changeS(count, el, val) {
	var x = document.getElementsByClassName(el);
	x[0].innerHTML = abbrNum(count,0);
	x[1].innerHTML = abbrNum(count,0);
	x[2].innerHTML = abbrNum(count,0);
	x[3].innerHTML = abbrNum(count,0);
	window[val] = count;
}
function chHPiO(b) {
	if(syncH==1){
		chHPiOPiP(b);
	}
	else{
		gEBI("buyHpipes").innerHTML = abbrNum(b,0);
		gEBI("buyHpipesPrice").innerHTML = s(b*HPOprice);
		buyHpipesNumber = b;
	}
}
function chHPiP(b) {
	if(syncH==1){
		chHPiOPiP(b);
	}
	else{
		gEBI("placeHpipes").innerHTML = abbrNum(b,0);
		gEBI("placeHpipesPrice").innerHTML = s(b*HPPprice);
		placeHpipesNumber = b;
	}
}
function chHPiOPiP(b) {
	gEBI("placeHpipes").innerHTML = abbrNum(b,0);
	gEBI("placeHpipesPrice").innerHTML = s(b*HPPprice);
	placeHpipesNumber = b;
	gEBI("buyHpipes").innerHTML = abbrNum(b,0);
	gEBI("buyHpipesPrice").innerHTML = s(b*HPOprice);
	buyHpipesNumber = b;
}