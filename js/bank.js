function invest(a) {
	if(a<=money){
		curBalance = curBalance + a;
		money = money - a;
		refBank();
		refFin();
		updatePipes();
		refMoney();
	}
	else{NEMshow();}
}
function withdraw(a) {
	if(a<=curBalance){
		curBalance = curBalance - a;
		money = money + a;
		refBank();
		refFin();
		updatePipes();
		refMoney();
	}
		else{
			otherError("Not enough bank balance");
		}
}

function autoIncBal() {
	var g = (((curBalance/100)*(100+interest)-curBalance)/31);
	if(INTBANK==0){
		money = money + g;
		refFin();
		refBank();
		refMoney();
		if(g>0 && notBI==0){
			Success("You got $" + s(g) + " from interest from your bank balance");
		}
	}
	else{
		curBalance = curBalance + g;
		refFin();
		refBank();
		if(g>0 && notBI==0){
			Success("Your bank balance has been increased by $" + s(g));
		}
		
	}
}
function retLoanAuto() {
	if(loan==0){}
	else if(0 <= money - (loan/100)){
		loan = loan - (loan/100);
		money = money - (loan/100);
		refMoney();
		refFin();
		refBank();
		if(notPL=0){
			Success("Your bank tax for the loan has been paid.");
		}
		updatePipes();
	}
	else{
		var oldLoan = loan;
		loan = (loan/100)*(loanInterest+100);
		refBank();
		refFin();
		Error("Not enough money to pay your loan tax! Your loan was increased from $" + s(oldLoan) + " to $" + s(loan));
	}
}

function getLoan(a) {
	if(loan+a<=maxLoan){
		loan = loan + a;
		money = money + a;
		refBank();
		refMoney();
		refFin();
		updatePipes();
		}
	else{
		money = money + (maxLoan - loan);
		loan = maxLoan;
		refBank();
		refMoney();
		refFin();
		updatePipes();
	}
}
function returnLoan(a){
	if(loan - a >= 0){
		if(money - a >= 0){
			loan = loan - a;
			money = money - a;
			refBank();
			refMoney();
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
		refBank();
		refMoney();
		refFin();
		updatePipes();
	}
}
function withdrawMAX() {
	if(curBalance>0){
		money = money + curBalance;
		curBalance = 0;
		refBank();
		refMoney();
		refFin();
		updatePipes();
	}
}