function abbrNum(number, decPlaces) {
	var number = parseFloat(number);
	var abbR = ["", "K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","ODc","NDc","Vi","UVi","DVi","TVi","QaVi","QiVi","SxVi","SpVi","OVi","NVi","Tg","UTg","DTg","TTg","QaTg","QiTg","SxTg","SpTg","OTg","NTg","Qd","UQd","DQd","TQd","QaQd","QiQd","SxQd","SpQd","OQd","NQd","Qq","UQq","DQq","TQq","QaQq","QiQq","SxQq","SpQq","OQq","NQq","Sg","USg","DSg","TSg","QaSg","QiSg","SxSg","SpSg","OSg","NSg","St","USt","DSt","TSt","QaSt","QiSt","SxSt","SpSt","OSt","NSt","Og","UOg","DOg","TOg","QaOg","QiOg","SxOg","SpOg","OOg","NOg"];
	for(i=0;number>=999;i++){
		var number = number/1000;
	}
	for(i=i;abbR.length<i;i--){
			number = number * 1000;
	}
	var number = number.toFixed(decPlaces);
	var number = number + abbR[i];
    return number;
}
function unAbbrNum(number, decPlaces) {
		var abbR = ["", "K","M","B","T","QA","QI","SX","SP","OC","NO","DC","UDC","DDC","TDC","QADC","QIDC","SXDC","SPDC","ODC","NDC","VI","UVI","DVI","TVI","QAVI","QIVI","SXVI","SPVI","OVI","NVI","TG","UTG","DTG","TTG","QATG","QITG","SXTG","SPTG","OTG","NTG","QD","UQD","DQD","TQD","QAQD","QIQD","SXQD","SPQD","OQD","NQD","QQ","UQQ","DQQ","TQQ","QAQQ","QIQQ","SXQQ","SPQQ","OQQ","NQQ","SG","USG","DSG","TSG","QASG","QISG","SXSG","SPSG","OSG","NSG","ST","UST","DST","TST","QAST","QIST","SXST","SPST","OST","NST","OG","UOG","DOG","TOG","QAOG","QIOG","SXOG","SPOG","OOG","NOG"];
		var number = number.toUpperCase();
		for(i=0;i<abbR.length;i++){
			if(parseFloat(number) + abbR[i]===number){
				var number = parseFloat(number);
				var number = number * (Math.pow(1000,i));
			}
		}
	return number;
}
function s(a) {
	var c = abbrNum(a,2);
	return c;
}
function gEBI(a) {
	var b = document.getElementById(a);
	return b;
}
function updatePipes() {
	maxPipes = Math.floor(houses/HPP) - (PO + PP);
	maxP = Math.floor(money/pricePPP);
	maxB = Math.floor(money/pricePPM);
	
	maxAHouses = Math.floor(houses/HPP - PP - PO);
	if(maxB>maxAHouses){
		maxB = maxAHouses
	}
	if(PO<maxP){
		maxP = PO;
	}
	gEBI("bmp").innerHTML = s(maxB);
	gEBI("pmp").innerHTML = s(maxP);
	var maxPP = Math.floor(money/(pricePPM+pricePPP));
	if(maxPP>maxAHouses){
		maxPP = maxAHouses;
	}
	gEBI("bppM").innerHTML = s(maxPP);
}
function unabbrNum(number) {
	var abbrev = ['k', 'm', 'b', 't', 'q'];
	number = number.toLowerCase();
	var cut = number.slice(-1);
	number = parseFloat(number);
	for(i=0;i<abbrev.length;i++){
		if(abbrev[i]===cut){
			var number = number * Math.pow(1000,i + 1);
		}
	}
return number;
}
function updateStatsUpper(){
	var UW = HPP * WPH * PP;
	var PW = pumps[0] * pumpProd[0] + pumps[1] * pumpProd[1] + pumps[2] * pumpProd[2] + pumps[3] * pumpProd[3];
	var TW = treatPla[0] * treatProd[0] + treatPla[1] * treatProd[1] + treatPla[2] * treatProd[2] + treatPla[3] * treatProd[3];
	gEBI("money").innerHTML = s(money);
	gEBI("NW").innerHTML = s(UW);
	gEBI("stW").innerHTML = s(stW);
	gEBI("trt").innerHTML = s(TW);
	gEBI("prd").innerHTML = s(PW);
}