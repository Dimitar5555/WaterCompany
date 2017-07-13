function sn(number, decPlaces) {var iso = 0;if(number<0){var number = number*(-1);var iso = 1;}var number = parseFloat(number);var abbR = ["", "K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","ODc","NDc","Vi","UVi","DVi","TVi","QaVi","QiVi","SxVi","SpVi","OVi","NVi","Tg","UTg","DTg","TTg","QaTg","QiTg","SxTg","SpTg","OTg","NTg","Qd","UQd","DQd","TQd","QaQd","QiQd","SxQd","SpQd","OQd","NQd","Qq","UQq","DQq","TQq","QaQq","QiQq","SxQq","SpQq","OQq","NQq","Sg","USg","DSg","TSg","QaSg","QiSg","SxSg","SpSg","OSg","NSg","St","USt","DSt","TSt","QaSt","QiSt","SxSt","SpSt","OSt","NSt","Og","UOg","DOg","TOg","QaOg","QiOg","SxOg","SpOg","OOg","NOg"];for(i=0;number>=999;i++){var number = number/1000;}if(iso==1){var number = number*(-1);var iso = 0;}var number = number.toFixed(decPlaces);var number = number + abbR[i];return number;}
function sn2(a){var b = sn(a,2); return b;}
function id2w(a, b){return document.getElementById(a).innerHTML = b;}
function p(a){return a*a;}
function buypipes(count, water, tier){
	var price = game[water]['pipeprice'][tier];
	if(tier==0){
		if((game.city.house / 2) >= (count + game[water]['pipe'][1]+game[water]['pipe'][0])){
			if(price*count<=game.bank.money){
				game.bank.money = game.bank.money - price*count;
				window['game'][water]['pipe'][tier] = game[water]['pipe'][tier] + count;
				refpipes();
			}
			else{
				Error("Money printer broken", "Not enough money.");
			}
		}
		else{
			Error("Cloning machine broken", "Not enough houses in the city.");
		}
	}
	else{
		if(price*count<=game.bank.money){
			if(game[water]['pipe'][0]>=count){
				game.bank.money = game.bank.money - price*count;
				window['game'][water]['pipe'][1] = game[water]['pipe'][1] + count;
				window['game'][water]['pipe'][0] = game[water]['pipe'][0] - count;
				refpipes();
			}
			else{
				Error("China plastic production shortage", "Not enough owned pipes.");
			}
		}
		else{
			Error("Money printer broken", "Not enough money.");
		}
	}	
	refreshcity();
}
function upgrade(where, what, multiplier, price, pricemultiplier, number){
	if(multiplier>1){
		var pricea = window['game']['upgrades']['increase'][price];
	}
	else{
		var pricea = window['game']['upgrades']['decrease'][price];
	}
	if(game.bank.money>=pricea){
		game.bank.money = game.bank.money - pricea;
		if(multiplier>1){
			window['game']['upgrades']['increase'][price] = pricea * pricemultiplier;
		}
		else{
			window['game']['upgrades']['decrease'][price] = pricea * pricemultiplier;
		}
		if(number>1){
			for(i=0;i<number;i++){
				window['game'][where][what][i] = window['game'][where][what][i] * multiplier;
			}
		}
		else{
			window['game'][where][what] = window['game'][where][what] * multiplier;
		}
		id2w("money", sn2(game.bank.money));
	}
	else{
		Error("Money printer broken", "Not enough money.");
	}
	refreshupgrades();
	refreshwater();
	refreshbank();
	refreshcity();
}
function buy(water, thing, number, tier){
	if(game[water][thing + 'price'][tier]*number<=game.bank.money){
		game.bank.money = game.bank.money - game[water][thing + 'price'][tier]*number;
		game[water][thing][tier] = game[water][thing][tier] + number;
		id2w("money", sn2(game.bank.money));
		refreshwater();
		refreshcity();
	}
	else{
		Error("Money printer broken", "Not enough money.");
	}
}
function sell(water, thing, number, tier){
	var price = game[water][thing + "price"][tier];
	if(game[water][thing][tier]>=number){
		game[water][thing][tier] = game[water][thing][tier] - number;
		game.bank.money = game.bank.money + number * price;
		refreshwater();
		refreshcity();
		id2w("money", sn2(game.bank.money));
	}
	else{
		Error("IRS audit", "Not enough utilites to sell.");
	}
}
//water, price name, tier
function decpipeprice(a, b, c){
	var price = game['upgrades']['decrease'][b];
	if(price<=game.bank.money){
		game[a]['pipeprice'][c] = game[a]['pipeprice'][c] - (game[a]['pipeprice'][c]/100)*2.5;
		game.bank.money = game.bank.money - price;
		game['upgrades']['decrease'][b] = game['upgrades']['decrease'][b] * 1.5;
		refreshupgrades();
		refpipesnumber('watertab4buy', 'watertab4buyprice', 'coldwater', 0, watertab4buynumber, 'watertab4buynumber');
		refpipesnumber('watertab4place', 'watertab4placeprice', 'coldwater', 1, watertab4placenumber, 'watertab4placenumber');
		refpipesnumber('watertab7buy', 'watertab7buyprice', 'hotwater', 0, watertab7buynumber, 'watertab7buynumber');
		refpipesnumber('watertab7place', 'watertab7placeprice', 'hotwater', 1, watertab7placenumber, 'watertab7placenumber');
	}
	else{
		Error("Money printer broken", "Not enough money.");
	}
}

function Error(title1, text1){
	swal({
		title: title1,
		text: text1,
		type: "error",
		confirmButtonText: "Okay"
	})
}
function increaseinterest(){
	if(game.bank.interest+0.5<=25){
		if(game.bank.money>=game.upgrades.increase.balanceinterestrate){
			game.bank.money = game.bank.money - game.upgrades.increase.balanceinterestrate;
			game.bank.interest = game.bank.interest + 0.5;
			game.upgrades.increase.balanceinterestrate = game.upgrades.increase.balanceinterestrate * 10;
		}
		else{
			Error("Money printer broken", "Not enough money.");
		}
	}
	refreshupgrades();
	refreshwater();
	refreshbank();
	refreshcity();
}
function increasepopincrease() {
	if(game.bank.money>=game.upgrades.increase.houserate){
		if(game.city.rate+0.1<=10){
			game.bank.money = game.bank.money - game.upgrades.increase.houserate;
			game.city.rate = game.city.rate + 0.1;
			game.upgrades.increase.houserate = game.upgrades.increase.houserate * 2;
			refreshupgrades();
			refreshwater();
			refreshbank();
			refreshcity();
		}
		else{
			Error("Green activists problems", "You can't upgrade more the population increase rate.");
		}
	}
	else{
		Error("Money printer broken", "Not enough money.");
	}
}