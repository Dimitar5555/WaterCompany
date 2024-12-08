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
function upgrade_decrease_pipe_price(water_type, price_name, tier){
	var price = game['upgrades']['decrease'][price_name];
	if(has_enough_money(price)){
		game[water_type]['pipeprice'][tier] = game[water_type]['pipeprice'][tier] - (game[water_type]['pipeprice'][tier]/100)*2.5;
		game.bank.money = game.bank.money - price;
		game['upgrades']['decrease'][price_name] = game['upgrades']['decrease'][price_name] * 1.5;
		refreshupgrades();
		update_buy_sell_count('cold_pipe_buy', 1);
		update_buy_sell_count('cold_pipe_place', 1);
		update_buy_sell_count('hot_pipe_buy', 1);
		update_buy_sell_count('hot_pipe_sell', 1);
	}
}