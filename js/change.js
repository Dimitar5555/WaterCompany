function chTr(b){
	var x = document.getElementsByClassName("numTr");
	x[0].innerHTML = abbrNum(b,0);
	x[1].innerHTML = abbrNum(b,0);
	x[2].innerHTML = abbrNum(b,0);
	x[3].innerHTML = abbrNum(b,0);
	gEBI("tr0").innerHTML = abbrNum((treatPrice[0]*b),0);
	gEBI("tr1").innerHTML = abbrNum((treatPrice[1]*b),0);
	gEBI("tr2").innerHTML = abbrNum((treatPrice[2]*b),0);
	gEBI("tr3").innerHTML = abbrNum((treatPrice[3]*b),0);
	TreatPlB = b;
	
}
function chP(b) {
	var x = document.getElementsByClassName("numP");
	x[0].innerHTML = abbrNum(b,0);
	x[1].innerHTML = abbrNum(b,0);
	x[2].innerHTML = abbrNum(b,0);
	x[3].innerHTML = abbrNum(b,0);
	gEBI("pr0").innerHTML = abbrNum((pumpPrice[0]*b),0);
	gEBI("pr1").innerHTML = abbrNum((pumpPrice[1]*b),0);
	gEBI("pr2").innerHTML = abbrNum((pumpPrice[2]*b),0);
	gEBI("pr3").innerHTML = abbrNum((pumpPrice[3]*b),0);
	PuB = b;
}
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
function chPS(b) {
	var x = document.getElementsByClassName("numPS");
	x[0].innerHTML = abbrNum(b,0);
	x[1].innerHTML = abbrNum(b,0);
	x[2].innerHTML = abbrNum(b,0);
	x[3].innerHTML = abbrNum(b,0);
	PuS = b;
}
function chTrS(b) {
	var x = document.getElementsByClassName("numTrS");
	x[0].innerHTML = abbrNum(b,0);
	x[1].innerHTML = abbrNum(b,0);
	x[2].innerHTML = abbrNum(b,0);
	x[3].innerHTML = abbrNum(b,0);
	TrPS = b;
}
function chBS(b) {
	var x = document.getElementsByClassName("numBS");
	x[0].innerHTML = abbrNum(b,0);
	x[1].innerHTML = abbrNum(b,0);
	x[2].innerHTML = abbrNum(b,0);
	x[3].innerHTML = abbrNum(b,0);
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
	x[0].innerHTML = abbrNum(b,0);
	x[1].innerHTML = abbrNum(b,0);
	x[2].innerHTML = abbrNum(b,0);
	x[3].innerHTML = abbrNum(b,0);
	sSS = b;
}