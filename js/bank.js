function invest(a) {
	if(a<=money){
		curBalance = curBalance + a;
		money = money - a;
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("money").innerHTML = s(money);
		gEBI("fIntInc").innerHTML = s((curBalance/100)*(100+interest)-curBalance);
	}
	else{NEMshow();}
}
function withdraw(a) {
	if(a<=curBalance){
		curBalance = curBalance - a;
		money = money + a;
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("money").innerHTML = s(money);
		gEBI("fIntInc").innerHTML = s((curBalance/100)*(100+interest)-curBalance);
	}
	else{
		otherError("Not enough bank balance");
	}
}

function autoIncBal() {
	var oldBalance = curBalance;
	curBalance = (curBalance/100)*(100+interest);
	gEBI("curBalance").innerHTML = s(curBalance);
	gEBI("fIntInc").innerHTML = s((curBalance/100)*(100+interest)-curBalance);
	if(curBalance-oldBalance>0){
		Success("Your bank balance has been increased by $" + s(curBalance - oldBalance));
	}
}
function retLoanAuto() {
	if(loan==0){}
	else if(0 <= money - (loan/100)){
		loan = loan - (loan/100);
		money = money - (loan/100);
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("money").innerHTML = s(money);
		gEBI("curTaxL").innerHTML = s(loan/100);
		gEBI("fLoanTax").innerHTML = s(loan/100);
		Success("Your bank tax for the loan has been paid.");
	}
	else{
		var oldLoan = loan;
		loan = loan*(loanInterest+1);
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("curTaxL").innerHTML = s(loan/100);
		gEBI("fLoanTax").innerHTML = s(loan/100);
		Error("Not enough money to pay your loan tax! Your loan was increased from $" + s(oldLoan) + " to $" + s(loan));
	}
}

function getLoan(a) {
	if(loan+a<=100000){//100 000 to a changeble value
		loan = loan + a;
		money = money + a;
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("money").innerHTML = s(money);
		gEBI("curTaxL").innerHTML = s(loan/100);
		gEBI("fLoanTax").innerHTML = s(loan/100);
		
	}
	else{
		money = money + (100000 - loan);
		loan = 100000;
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("money").innerHTML = s(money);
		gEBI("curTaxL").innerHTML = s(loan/100);
		gEBI("fLoanTax").innerHTML = s(loan/100);
		
	}
}
function returnLoan(a){
	if(loan - a >= 0){
		if(money - a >= 0){
			loan = loan - a;
			money = money - a;
			gEBI("curLoan").innerHTML = s(loan);
			gEBI("money").innerHTML = s(money);
			gEBI("curTaxL").innerHTML = s(loan/100);
			gEBI("fLoanTax").innerHTML = s(loan/100);
		}
		else{
			NEMshow();
		}
	}
	else{
		YWGMBshow();
	}
}
function investMAX() {
	if(money>0){
		curBalance = curBalance + money;
		money = 0;
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("money").innerHTML = s(money);
	}
}
function withdrawMAX() {
	if(curBalance>0){
		money = money + curBalance;
		curBalance = 0;
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("money").innerHTML = s(money);
	}
}
