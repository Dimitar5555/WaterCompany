function chTr(b){
	var x = document.getElementsByClassName("numTr");
	x[0].innerHTML = abbrNum(b,2);
	x[1].innerHTML = abbrNum(b,2);
	x[2].innerHTML = abbrNum(b,2);
	x[3].innerHTML = abbrNum(b,2);
	gEBI("tr0").innerHTML = s(treatPrice[0]*b);
	gEBI("tr1").innerHTML = s(treatPrice[1]*b);
	gEBI("tr2").innerHTML = s(treatPrice[2]*b);
	gEBI("tr3").innerHTML = s(treatPrice[3]*b);
	TreatPlB = b;
	
}
function chP(b) {
	var x = document.getElementsByClassName("numP");
	x[0].innerHTML = abbrNum(b,2);
	x[1].innerHTML = abbrNum(b,2);
	x[2].innerHTML = abbrNum(b,2);
	x[3].innerHTML = abbrNum(b,2);
	gEBI("pr0").innerHTML = s(pumpPrice[0]*b);
	gEBI("pr1").innerHTML = s(pumpPrice[1]*b);
	gEBI("pr2").innerHTML = s(pumpPrice[2]*b);
	gEBI("pr3").innerHTML = s(pumpPrice[3]*b);
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
		gEBI("paap").innerHTML = s(pricePPM * b);
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
		gEBI("pppp").innerHTML = s(b * pricePPP);
	}
}
function chPiPPiO(b) {
	var x = gEBI("numPiP");
	x.innerHTML = abbrNum(b,2);
	PiP = b;
	gEBI("pppp").innerHTML = s(b * pricePPP);
	var x = gEBI("numPiO");
	x.innerHTML = abbrNum(b,2);
	PiO = b;
	gEBI("paap").innerHTML = s(pricePPM * b);
}
function chPS(b) {
	var x = document.getElementsByClassName("numPS");
	x[0].innerHTML = abbrNum(b,2);
	x[1].innerHTML = abbrNum(b,2);
	x[2].innerHTML = abbrNum(b,2);
	x[3].innerHTML = abbrNum(b,2);
	PuS = b;
}
function chTrS(b) {
	var x = document.getElementsByClassName("numTrS");
	x[0].innerHTML = abbrNum(b,2);
	x[1].innerHTML = abbrNum(b,2);
	x[2].innerHTML = abbrNum(b,2);
	x[3].innerHTML = abbrNum(b,2);
	TrPS = b;
}
function chBS(b) {
	var x = document.getElementsByClassName("numBS");
	x[0].innerHTML = abbrNum(b,2);
	x[1].innerHTML = abbrNum(b,2);
	x[2].innerHTML = abbrNum(b,2);
	x[3].innerHTML = abbrNum(b,2);
	gEBI("SSPrice").innerHTML = s(stWPrice[0]);
	gEBI("MSPrice").innerHTML = s(stWPrice[1]);
	gEBI("BSPrice").innerHTML = s(stWPrice[2]);
	gEBI("VBSPrice").innerHTML = s(stWPrice[3]);
	gEBI("ss0").innerHTML = s(stWPrice[0]*b);
	gEBI("ss1").innerHTML = s(stWPrice[1]*b);
	gEBI("ss2").innerHTML = s(stWPrice[2]*b);
	gEBI("ss3").innerHTML = s(stWPrice[3]*b);
	sBS = b;
}
function chSS(b) {
	var x = document.getElementsByClassName("numSS");
	x[0].innerHTML = abbrNum(b,2);
	x[1].innerHTML = abbrNum(b,2);
	x[2].innerHTML = abbrNum(b,2);
	x[3].innerHTML = abbrNum(b,2);
	sBS = b;
}