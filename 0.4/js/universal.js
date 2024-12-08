function round_number(number, dec_places) {
	const shortcuts = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "ODc", "NDc", "Vi", "UVi", "DVi", "TVi", "QaVi", "QiVi", "SxVi", "SpVi", "OVi", "NVi", "Tg", "UTg", "DTg", "TTg", "QaTg", "QiTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd", "DQd", "TQd", "QaQd", "QiQd", "SxQd", "SpQd", "OQd", "NQd", "Qq", "UQq", "DQq", "TQq", "QaQq", "QiQq", "SxQq", "SpQq", "OQq", "NQq", "Sg", "USg", "DSg", "TSg", "QaSg", "QiSg", "SxSg", "SpSg", "OSg", "NSg", "St", "USt", "DSt", "TSt", "QaSt", "QiSt", "SxSt", "SpSt", "OSt", "NSt", "Og", "UOg", "DOg", "TOg", "QaOg", "QiOg", "SxOg", "SpOg", "OOg", "NOg"];
	let abbr_index = 0;
	while(Math.abs(number) >= 1000 && abbr_index < shortcuts.length) {
		number /= 1000;
		abbr_index++;
	}
	return `${number.toFixed(dec_places)} ${shortcuts[abbr_index]}`;
}

function format_money(number, include_sign=false) {
	const sign = number>0?'+':'-';
	return `${include_sign?sign:''}$${round_number(number, 2)}`;
}

function round_count(number) {
	if(number < 1000) {
		return number;
	}
	return round_number(number, 2);
}

function round_to_2_decimals(number) {
	return round_number(number, 2);
}

function set_text(id, text) {
	document.querySelector(`#${id}`).innerText = text;
}

function goTab(tab){
	for(i=1;i<=4;i++){
		if(tab==i){
			document.getElementById("upgradestabs" + i).classList.remove('hidden');
		}
		else{
			document.getElementById("upgradestabs" + i).classList.add('hidden');
		}
	}
}
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
		set_text("money", format_money(game.bank.money));
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
		set_text("money", format_money(game.bank.money));
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
		set_text("money", format_money(game.bank.money));
	}
	else{
		Error("IRS audit", "Not enough utilites to sell.");
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

function has_enough_money(required_amount) {
	if(game.bank.money >= required_amount) {
		return true;
	}
	Error("Money printer broken", "Not enough money.");
	return false;
}