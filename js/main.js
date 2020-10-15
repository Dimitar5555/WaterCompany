function abbrNum(number, decPlaces) {
		if(number<0){
			var number = number*(-1);
			var iso = 1;
		}
		var number = parseFloat(number);
		var abbR = ["", "K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","ODc","NDc","Vi","UVi","DVi","TVi","QaVi","QiVi","SxVi","SpVi","OVi","NVi","Tg","UTg","DTg","TTg","QaTg","QiTg","SxTg","SpTg","OTg","NTg","Qd","UQd","DQd","TQd","QaQd","QiQd","SxQd","SpQd","OQd","NQd","Qq","UQq","DQq","TQq","QaQq","QiQq","SxQq","SpQq","OQq","NQq","Sg","USg","DSg","TSg","QaSg","QiSg","SxSg","SpSg","OSg","NSg","St","USt","DSt","TSt","QaSt","QiSt","SxSt","SpSt","OSt","NSt","Og","UOg","DOg","TOg","QaOg","QiOg","SxOg","SpOg","OOg","NOg"];
		for(i=0;number>=999;i++){
			var number = number/1000;
		}
		if(iso==1){
			var number = number*(-1);
			var iso = 0;
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
	return parseFloat(number);
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
	var maxPipes = (houses/2) - (PO+PP);
	var maxPipes = Math.floor(maxPipes);
	var maxP = Math.floor(money/pricePPP);
	var maxB = Math.floor(money/pricePPM);
	if(maxB>maxPipes){
		var maxB = maxPipes
	}
	if(PO<maxP){
		var maxP = PO;
	}
	var maxPP = Math.floor(money/(pricePPM+pricePPP));
	if(maxPP>maxPipes){
		var maxPP = maxPipes;
	}
	gEBI("bmp").innerHTML = s(maxB);
	gEBI("pmp").innerHTML = s(maxP);
	gEBI("bppM").innerHTML = s(maxPP);
	var maxHPipes = Math.floor((houses/2) - (HPO + HPPP));
	var maxHBP = Math.floor(money/HPOprice);
	var maxHPP = Math.floor(money/HPPprice);
	var maxHPBP = Math.floor(money/(HPOprice+HPPprice));
	
	
	if(maxHPBP>maxHPipes){
		maxHPBP = maxHPipes;
	}
	if(maxHPP>HPO){
			maxHPP = HPO;
	}
	if(maxHBP>maxHPipes){
		maxHBP = maxHPipes;
	}
	gEBI("maxHPP").innerHTML = s(maxHPP);
	gEBI("maxHBP").innerHTML = s(maxHBP);
	gEBI("maxHPBP").innerHTML = s(maxHPBP);
	gEBI("maxHPPButton").setAttribute("onclick", "placeHpipes(" + Number(maxHPP) + ");");
	gEBI("maxHBPButton").setAttribute("onclick", "buyHpipes(" + Number(maxHBP) + ");");
	gEBI("maxHPBPButton").setAttribute("onclick", "buyHpipes(" + Number(maxHPBP) + "); placeHpipes(" + maxHPBP + ");");
	
	
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
function getMaxPipes() {
	var maxPipes = (houses/2) - (PO+PP);
	var maxPipes = Math.floor(maxPipes);
	var maxP = Math.floor(money/pricePPP);
	var maxB = Math.floor(money/pricePPM);
	if(maxB>maxPipes){
		var maxB = maxPipes
	}
	if(PO<maxP){
		var maxP = PO;
	}
	var maxPP = Math.floor(money/(pricePPM+pricePPP));
	if(maxPP>maxPipes){
		var maxPP = maxPipes;
	}
	var result = [maxP, maxB, maxPP];
	return result;
}
