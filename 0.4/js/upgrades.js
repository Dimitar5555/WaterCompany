function upgrade_increase_max_loan() {
	if(game.bank.loan>0) {
		Error('Cheat detected', 'You can not increase max loan size if you are in debt');
        return;
	}
    if(has_enough_money(game.upgrades.increase.maxloan)) {
        game.bank.money = game.bank.money - game.upgrades.increase.maxloan;
        game.upgrades.increase.maxloan = game.upgrades.increase.maxloan * 3;
        game.bank.maxloan = game.bank.maxloan * 2;
        refreshupgrades();
        refreshwater();
        refreshbank();
        refreshcity();
    }
}

function upgrade_population_growth() {
	if(has_enough_money(game.upgrades.increase.houserate)){
		if(game.city.rate+0.1<=10) {
			game.bank.money = game.bank.money - game.upgrades.increase.houserate;
			game.city.rate = game.city.rate + 0.1;
			game.upgrades.increase.houserate = game.upgrades.increase.houserate * 2;
			refreshupgrades();
			refreshwater();
			refreshbank();
			refreshcity();
		}
		else {
			Error("Green activists problems", "You can't upgrade more the population increase rate.");
		}
	}
}

function upgrade_bank_interest_rate() {
	if(game.bank.interest+0.5<=25) {
		if(has_enough_money(game.upgrades.increase.balanceinterestrate)){
			game.bank.money = game.bank.money - game.upgrades.increase.balanceinterestrate;
			game.bank.interest = game.bank.interest + 0.5;
			game.upgrades.increase.balanceinterestrate = game.upgrades.increase.balanceinterestrate * 10;
			refreshupgrades();
			refreshwater();
			refreshbank();
			refreshcity();
		}
	}
	refreshupgrades();
	refreshwater();
	refreshbank();
	refreshcity();
}

//water, price name, tier
function upgrade_decrease_pipe_price(data_attr) {
	// data_attr = "[hot/cold]_[buy/place]"
	[water_type, price_type] = data_attr.split('_');
	const price = game['upgrades']['decrease'][`${water_type}waterpipe${price_type}`];
	if(!has_enough_money(price)) return;
	
	game.bank.money = game.bank.money - price;
	game[`${water_type}water`]['pipeprice'][price_type == 'buy'?0:1] *= 0.95;
	game['upgrades']['decrease'][`${water_type}waterpipe${price_type}`] *= 1.5;
	refreshupgrades();
	update_buy_sell_count('cold_pipe_buy', cold_pipe_buy_count);
	update_buy_sell_count('cold_pipe_place', cold_pipe_place_count);
	update_buy_sell_count('hot_pipe_buy', hot_pipe_buy_count);
	update_buy_sell_count('hot_pipe_place', hot_pipe_place_count);
}

function upgrade_decrease_operating_costs(data_attr) {
	// data_attr = "[hot/cold]_[pump/treatmentplant/heatingplant/storage]"
	[main_type, sub_type] = data_attr.split('_');
	const price = game['upgrades']['decrease'][`${main_type}water${sub_type}cost`];
	if(!has_enough_money(price)) return;

	game.bank.money -= price;
	game['upgrades']['increase'][`${main_type}water${sub_type}cost`] *= 1.2;
	for(let i=0;i<4;i++){
		game[`${main_type}water`][`${sub_type}cost`][i] *= 0.9;
	}
}

function upgrade_increase_production(data_attr) {
	// data_attr = "[hot/cold]_[pump/treatmentplant/heatingplant/storage]"
	[main_type, sub_type] = data_attr.split('_');
	const price = game['upgrades']['increase'][`${main_type}water${sub_type}prod`];
	if(!has_enough_money(price)) return;

	game.bank.money -= price;
	game['upgrades']['increase'][`${main_type}water${sub_type}prod`] *= 1.2;
	for(let i=0;i<4;i++){
		game[`${main_type}water`][`${sub_type}prod`][i] *= 1.1;
	}
}