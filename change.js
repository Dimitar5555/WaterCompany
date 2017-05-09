function chTr(b){
	var x = document.getElementsByClassName("numTr");
	x[0].innerHTML = abbrNum(b.toFixed(0),2);
	x[1].innerHTML = abbrNum(b.toFixed(0),2);
	x[2].innerHTML = abbrNum(b.toFixed(0),2);
	x[3].innerHTML = abbrNum(b.toFixed(0),2);
	gEBI("tr0").innerHTML = abbrNum((treatPrice[0]*b).toFixed(0),2);
	gEBI("tr1").innerHTML = abbrNum((treatPrice[1]*b).toFixed(0),2);
	gEBI("tr2").innerHTML = abbrNum((treatPrice[2]*b).toFixed(0),2);
	gEBI("tr3").innerHTML = abbrNum((treatPrice[3]*b).toFixed(0),2);
	TreatPlB = b;
	
}
function chP(b) {
	var x = document.getElementsByClassName("numP");
	x[0].innerHTML = abbrNum(b.toFixed(0),2);
	x[1].innerHTML = abbrNum(b.toFixed(0),2);
	x[2].innerHTML = abbrNum(b.toFixed(0),2);
	x[3].innerHTML = abbrNum(b.toFixed(0),2);
	gEBI("pr0").innerHTML = abbrNum((pumpPrice[0]*b).toFixed(0),2);
	gEBI("pr1").innerHTML = abbrNum((pumpPrice[1]*b).toFixed(0),2);
	gEBI("pr2").innerHTML = abbrNum((pumpPrice[2]*b).toFixed(0),2);
	gEBI("pr3").innerHTML = abbrNum((pumpPrice[3]*b).toFixed(0),2);
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
		gEBI("paap").innerHTML = abbrNum((pricePPM * b).toFixed(2),2);
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
		gEBI("pppp").innerHTML = abbrNum((b * pricePPP).toFixed(2),2);
	}
}
function chPiPPiO(b) {
	var x = gEBI("numPiP");
	x.innerHTML = abbrNum(b,2);
	PiP = b;
	gEBI("pppp").innerHTML = abbrNum((b * pricePPP).toFixed(2),2);
	var x = gEBI("numPiO");
	x.innerHTML = abbrNum(b,2);
	PiO = b;
	gEBI("paap").innerHTML = abbrNum((pricePPM * b).toFixed(2),2);
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