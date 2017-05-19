function invest(a) {
	if(a<=money){
		curBalance = curBalance + a;
		money = money - a;
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("money").innerHTML = s(money);
		refFin();
		updatePipes();
	}
	else{NEMshow();}
}
function withdraw(a) {
	if(a<=curBalance){
		curBalance = curBalance - a;
		money = money + a;
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("money").innerHTML = s(money);
		refFin();
		updatePipes();
	}
		else{
			otherError("Not enough bank balance");
		}
}

function autoIncBal() {
	var g = (((curBalance/100)*(100+interest)-curBalance)/31);
	money = money + g;
	gEBI("money").innerHTML = s(money);
	refFin();
	if(g>0){
		Success("You got $" + s(g) + " from interest from your bank balance" );
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
		refFin();
		Success("Your bank tax for the loan has been paid.");
		updatePipes();
	}
	else{
		var oldLoan = loan;
		loan = (loan/100)*(loanInterest+100);
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("curTaxL").innerHTML = s(loan/100);
		refFin();
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
		refFin();
		updatePipes();
		}
	else{
		money = money + (100000 - loan);
		loan = 100000;
		gEBI("curLoan").innerHTML = s(loan);
		gEBI("money").innerHTML = s(money);
		gEBI("curTaxL").innerHTML = s(loan/100);
		refFin();
		updatePipes();
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
			refFin();
			updatePipes();
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
		refFin();
		updatePipes();
	}
}
function withdrawMAX() {
	if(curBalance>0){
		money = money + curBalance;
		curBalance = 0;
		gEBI("curBalance").innerHTML = s(curBalance);
		gEBI("money").innerHTML = s(money);
		refFin();
		updatePipes();
	}
}