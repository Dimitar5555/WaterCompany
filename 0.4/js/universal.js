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
		update_money();
	}
	else{
		Error("Money printer broken", "Not enough money.");
	}
	refreshupgrades();
	refreshwater();
	refreshbank();
	refreshcity();
}

function buy_sell(data_attr, tier) {
	// data_attr = "[hot/cold]_[pump/treatmentplant/heatingplant/storage]_[buy/sell]"
	[main_type, sub_type, action] = data_attr.split('_');
	const count = window[`${data_attr}_count`];
	const price = game[`${main_type}water`][`${sub_type}price`][tier];
	const total_price = price * count;

	if(action === 'buy') {
		if(has_enough_money(total_price)) {
			game[`${main_type}water`][sub_type][tier] += count;
			game.bank.money -= total_price;
		}
	}
	else if(action === 'sell') {
		if(game[`${main_type}water`][sub_type][tier] >= count) {
			game[`${main_type}water`][sub_type][tier] -= count;
			game.bank.money += total_price;
		}
	}
	update_money();
	refreshwater();
	refreshcity();
}

function buy_place_pipes(data_attr) {
	// data_attr = "[hot/cold]_[buy/place]"
	[main_type, _, action] = data_attr.split('_');
	const count = window[`${data_attr}_count`];
	const price = game[`${main_type}water`]['pipeprice'][action === 'buy' ? 0 : 1];
	const total_price = price * count;

	if(!has_enough_money(total_price)) {
		return;
	}

	if(action === 'buy') {
		game[`${main_type}water`]['pipe'][0] += count;
	}
	else if(action === 'place') {
		if(game[`${main_type}water`]['pipe'][0] >= count) {
			game[`${main_type}water`]['pipe'][0] -= count;
			game[`${main_type}water`]['pipe'][1] += count;
		}
	}
	game.bank.money -= total_price;
	update_money();
	refreshcity();
	refpipes();	
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

function update_buy_sell_count(data_attr, count) {
	if(typeof count === 'string') {
		count = Number(count);
	}

	if(count > 0) {
		window[`${data_attr}_count`] = count;
		
		// data_attr = "[hot/cold]_[pump/treatmentplant/heatingplant/storage/pipe]_[buy/sell/place]"
		[main_type, sub_type, action] = data_attr.split('_');

		const els_to_update = Array.from(document.querySelectorAll(`[data-type="${data_attr}"]`));
		const counters = els_to_update.filter(el => el.dataset.subType === 'counter');
		const totals = els_to_update.filter(el => el.dataset.subType === 'total');

		counters.forEach(el => el.textContent = count);
		totals.forEach((el, i) => {
			let price;
			if(sub_type === 'pipe'){
				price = game[`${main_type}water`][`pipeprice`][action === 'buy' ? 0 : 1];
			}
			else{
				price = game[`${main_type}water`][`${sub_type}price`][i];
			}
			const total = price * count;
			el.textContent = format_money(total)
	});

	}
}