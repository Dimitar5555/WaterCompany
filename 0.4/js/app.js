if(localStorage.save){
	game = JSON.parse(localStorage.save);
}
else{
	game = {
		coldwater:{
			pipe:[0, 10],
			pipeprice:[1000, 100],
			pump:[1, 0, 0, 0],
			pumpprod:[100, 500, 5000, 10000],
			pumpprice:[1500, 4750, 10000, 25000],
			pumpcost:[5 ,20 ,180 ,340],
			treatmentplant:[1, 0, 0, 0],
			treatmentplantprod:[100, 500, 5000, 10000],
			treatmentplantprice:[3000, 9500, 20000, 50000],
			treatmentplantcost:[10 ,40 ,360 ,680],
			storage:[0, 0, 0 , 0],
			storageprod:[1000, 10000, 50000, 100000],
			storageprice:[10000, 100000, 500000, 1000000],
			storagecost:[5, 45, 200, 380],
			waterprice:0.45,
			waterperhouse:2,
			stored:0,
		},
		hotwater:{
			pipe:[0, 1],
			pipeprice:[10000, 1000],
			pump:[0, 0, 0, 0],
			pumpprod:[100, 500, 5000, 10000],
			pumpprice:[10000,40000,360000,700000],
			pumpcost:[100,400,3500,6800],
			heatingplant:[0, 0, 0, 0],
			heatingplantprod:[100, 500, 5000, 10000],
			heatingplantprice:[20000,80000,720000,1400000],
			heatingplantcost:[200,800,7000,13600],
			waterprice:10,
			waterperhouse:2,
		},
		city:{
			house:1000,
			name:"",
			rate:1.1,
		},
		bank:{
			loan:0,
			loaninterest:10,
			maxloan:100000,
			balance:0,
			interest:1,
			money:0,
		},
		upgrades:{
			decrease:{
				coldwaterpipebuy:10000,
				coldwaterpipeplace:10000,
				coldwaterpumpcost:10000,
				coldwatertreatmentplantcost:10000,
				coldwaterstoragecost:10000,
				hotwaterpipebuy:100000,
				hotwaterpipeplace:100000,
				hotwaterpumpcost:100000, 
				hotwaterheatingplantcost:100000,
			},
			increase:{
				coldwaterprice:100,
				coldwaterpumpprod:100000,
				coldwatertreatmentplantprod:100000,
				coldwaterstoragemax:10000,
				hotwaterprice:10000,
				houserate:100,
				coldwaterperhouse:10000,
				hotwaterpumpprod:100000, 
				hotwaterperhouse:50000,
				hotwaterheatingplantprod:100000,
				balanceinterestrate:10000000,
				loaninterestrate:8000000,
				maxloan:1000000,
			}
		},
		time:{
			day:1,
			month:1,
			year:1960,
			hour:0,
		},
		uncloked:{
			hotwater:0,
			bank:0,
			waterstorage:0,
		},
		stats:{
			totalearnedmoney:0,
		}
	}
	swal({
		title: "City name",
		text: "How will be your city called?",
		type: "input",
		showCancelButton: false,
		closeOnConfirm: false,
		confirmButtonText: "Name city"
	},
	function(inputValue){
		if (inputValue === false) return false;
		
		if (inputValue === "") {
			swal.showInputError("You need to write something!");
			return false
		}
		
		swal("Nice!", "You city is called: " + inputValue + ".");
		game.city.name = inputValue;
		localStorage.setItem("save", JSON.stringify(game));
		set_text('tab1city', inputValue);
	});
}

if(!game.unlocked){
	game.unlocked = {
			hotwater:0,
			bank:0,
			waterstorage:0,
		}
}
if(!game.stats){
	game['stats'] = {
		totalearnedmoney:0,
	};
}
document.getElementById('hotwatertab').style.display = "none";
document.getElementById('banktab').style.display = "none";
if(game['stats']['totalearnedmoney']>=100000){
	game['unlocked']['hotwater'] = 1;
}
if(game['unlocked']['hotwater'] == 1){
	document.getElementById('hotwatertab').style.display = "inherit";
}
if(game['stats']['totalearnedmoney']>=1000){
	game['unlocked']['bank'] = 1;
}
if(game['unlocked']['bank'] == 1){
	document.getElementById('banktab').style.display = "inherit";
}
update_money();
var timenow = Date.now();
var timepassed = 0;
var interestratetimer = 0;
setInterval(function(){
	timepassed = timepassed + (Date.now() - timenow);
	timenow = Date.now();
	interestratetimer = interestratetimer + 1;
	while(timepassed>500){
		timepassed = timepassed - 500;
		var cd = game.coldwater;
		var hd = game.hotwater;
		
		//calc water
		var usedcoldwater = cd.pipe[1] * 2 * cd.waterperhouse;
		var usedhotwater = hd.pipe[1] * 2 * hd.waterperhouse;
		var prodcoldwater = cd.pumpprod[0] * cd.pump[0] + cd.pumpprod[1] * cd.pump[1] + cd.pumpprod[2] * cd.pump[2] + cd.pumpprod[3] * cd.pump[3];
		var treatcoldwater = cd.treatmentplantprod[0] * cd.treatmentplant[0] + cd.treatmentplantprod[1] * cd.treatmentplant[1] + cd.treatmentplantprod[2] * cd.treatmentplant[2] + cd.treatmentplantprod[3] * cd.treatmentplant[3];
		var prodhotwater = hd.pumpprod[0] * hd.pump[0] + hd.pumpprod[1] * hd.pump[1] + hd.pumpprod[2] * hd.pump[2] + hd.pumpprod[3] * hd.pump[3];
		var prodheathotwater = hd.heatingplantprod[0] * hd.heatingplant[0] + hd.heatingplantprod[1] * hd.heatingplant[1] + hd.heatingplantprod[2] * hd.heatingplant[2] + hd.heatingplantprod[3] * hd.heatingplant[3];
		game.coldwater.stored = game.coldwater.stored + prodcoldwater;
		
		set_text('headercdused', round_to_2_decimals(usedcoldwater));
		set_text('headercdpumped', round_to_2_decimals(prodcoldwater));
		set_text('headercdtreated', round_to_2_decimals(treatcoldwater));
		set_text('headerhdused', round_to_2_decimals(usedhotwater));
		set_text('headerhdheated', round_to_2_decimals(prodheathotwater));
		set_text('headerhdpumped', round_to_2_decimals(prodhotwater));
		
		
		//determinite used water
		if(game.coldwater.stored>=usedcoldwater){
			game.coldwater.stored = game.coldwater.stored - usedcoldwater;
		}
		else{
			var usedcoldwater = game.coldwater.stored;
			game.coldwater.stored = 0;
		}
		
		
		if(prodheathotwater>prodhotwater){
			var prodhotwatert = prodhotwater;
		}
		else{
			var prodhotwatert = prodheathotwater;
		}
		
		
		if(prodhotwatert>usedhotwater){
			var usedhotwater = usedhotwater;
		}
		else{
			var usedhotwater = prodhotwatert;
		}
		
		//expences calc
		var coldexpense = 0;
		for(i=0;i<cd.pump.length;i++){
			var coldexpense = coldexpense + cd.pump[i] * cd.pumpcost[i] + cd.treatmentplant[i] * cd.treatmentplantcost[i] + cd.storage[i] * cd.storagecost[i];
		}
		var heatexpense = 0;
		for(i=0;i<hd.pump.length;i++){
			var heatexpense = heatexpense + hd.pump[i] * hd.pumpcost[i] + hd.heatingplant[i] * hd.heatingplantcost[i];
		}
		if(treatcoldwater<usedcoldwater){
			var fine = usedcoldwater - treatcoldwater;
		}
		else{
			var fine = 0;
		}
		var totexpense = coldexpense + heatexpense + fine;
		
		//income calc
		var coldwaterincome = cd.waterprice * usedcoldwater;
		var hotwaterincome = hd.waterprice * usedhotwater;
		var totincome = coldwaterincome + hotwaterincome;
		game.bank.money += totincome - totexpense;
		update_money();
		set_text("income", format_money(totincome - totexpense, true));
		game['stats']['totalearnedmoney'] = game['stats']['totalearnedmoney'] + totincome - totexpense;
		if(game['stats']['totalearnedmoney']>=100000){
			game['unlocked']['hotwater'] = 1;
		}
		if(game['unlocked']['hotwater'] == 1){
			document.getElementById('hotwatertab').style.display = "inherit";
		}
		if(game['stats']['totalearnedmoney']>=1000){
			game['unlocked']['bank'] = 1;
		}
		if(game['unlocked']['bank'] == 1){
			document.getElementById('banktab').style.display = "inherit";
		}
		set_text("finsellcoldwater", format_money(24*coldwaterincome));
		set_text("finsellhotwater", format_money(24*hotwaterincome));
		set_text("fincoldwaterexp", format_money(24*coldexpense));
		set_text("finhotwaterexp", format_money(24*heatexpense));
		set_text("fintotwaterexp", format_money(24*totexpense));
		set_text("fintotwaterinc", format_money(24*totincome+((game.bank.balance/100)*game.bank.interest)/384));
		set_text("finintbank", format_money(((game.bank.balance/100)*game.bank.interest)/384));
		set_text("finfines", format_money(fine*24));
		set_text("profit", format_money(totincome*24 - totexpense*24+((game.bank.balance/100)*game.bank.interest)/384));
		var totcap = 0;
		for(i=0;i<cd.storage.length;i++){
			var totcap = totcap + cd.storage[i] * cd.storageprod[i];
		}
		if(game.coldwater.stored>totcap){
			game.coldwater.stored = totcap;
		}
		set_text('headercdstoredcurr', round_to_2_decimals(game['coldwater']['stored']));
		set_text('headercdstoredcap', round_to_2_decimals(totcap));
	}
	game.time.hour = game.time.hour + 1;
	while(game.time.hour>=24){
		game.time.hour = game.time.hour - 24;
		game.time.day = game.time.day + 1;
		
	}
	while(game.time.day>=32){
		game.time.day = game.time.day - 32;
		game.time.month = game.time.month + 1;
		
	}
	while(game.time.month>=12){
		game.time.month = game.time.month - 12;
		game.time.year = game.time.year + 1;
	}
	set_text('headerhour', game.time.hour);
	set_text('headerday', game.time.day);
	set_text('headermonth', game.time.month);
	set_text('headeryear', game.time.year);
	if(interestratetimer>=24){
		interestratetimer = interestratetimer-24;
		var temp = game.bank.balance;
		if(game['stats']['totalearnedmoney']*0.4>=((game.bank.balance/100)*game.bank.interest)/384){
			game.bank.balance = game.bank.balance + ((game.bank.balance/100)*game.bank.interest)/384;
		}
		else{
			game.bank.balance = game.bank.balance + game['stats']['totalearnedmoney']*0.4;
		}
		refreshbank();
		if(game.bank.loan>0){
			if(game.bank.loan/365<=game.bank.money){
				var sum = game.bank.loan/365;
				game.bank.loan = game.bank.loan-sum;
				game.bank.money = game.bank.money-sum;
				refreshbank();
			}
		}
		localStorage.setItem("save", JSON.stringify(game));
		update_money();
		game.city.house = game.city.house + ((game.city.house/100)*game.city.rate)/32;
		refreshcity();
	}
},500);
function refreshupgrades(){
	var cd = game.coldwater;
	var hd = game.hotwater;
	var up = game.upgrades;
	//cold water pumps, storage and water treatment plants operating costs and production display

	for(let i=0;i<4;i++) {
		// water pumps
		set_text(`uptab1coldwaterprodb${i}`, round_to_2_decimals(cd.pumpprod[i]));
		set_text(`uptab1coldwaterproda${i}`, round_to_2_decimals(cd.pumpprod[i] * 1.1));
		set_text(`uptab1coldwatercostb${i}`, round_to_2_decimals(cd.pumpcost[i]));
		set_text(`uptab1coldwatercosta${i}`, round_to_2_decimals(cd.pumpcost[i] * 0.9));

		// water storage
		set_text(`uptab2coldwaterprodb${i}`, round_to_2_decimals(cd.treatmentplantprod[i]));
		set_text(`uptab2coldwaterproda${i}`, round_to_2_decimals(cd.treatmentplantprod[i] * 1.1));
		set_text(`uptab2coldwatercostb${i}`, round_to_2_decimals(cd.treatmentplantcost[i]));
		set_text(`uptab2coldwatercosta${i}`, round_to_2_decimals(cd.treatmentplantcost[i] * 0.9));

		// water treatment plants
		set_text(`uptab3coldwaterprodb${i}`, round_to_2_decimals(cd.storageprod[i]));
		set_text(`uptab3coldwaterproda${i}`, round_to_2_decimals(cd.storageprod[i] * 1.1));
		set_text(`uptab3coldwatercostb${i}`, round_to_2_decimals(cd.storagecost[i]));
		set_text(`uptab3coldwatercosta${i}`, round_to_2_decimals(cd.storagecost[i] * 0.9));

		// hot water pumps
		set_text(`uptab5hotwaterprodb${i}`, round_to_2_decimals(hd.pumpprod[i]));
		set_text(`uptab5hotwaterproda${i}`, round_to_2_decimals(hd.pumpprod[i] * 1.1));
		set_text(`uptab5hotwatercostb${i}`, round_to_2_decimals(hd.pumpcost[i]));
		set_text(`uptab5hotwatercosta${i}`, round_to_2_decimals(hd.pumpcost[i] * 0.9));

		// hot water heating plants
		set_text(`uptab6hotwaterprodb${i}`, round_to_2_decimals(hd.heatingplantprod[i]));
		set_text(`uptab6hotwaterproda${i}`, round_to_2_decimals(hd.heatingplantprod[i] * 1.1));
		set_text(`uptab6hotwatercostb${i}`, round_to_2_decimals(hd.heatingplantcost[i]));
		set_text(`uptab6hotwatercosta${i}`, round_to_2_decimals(hd.heatingplantcost[i] * 0.9));
	}
	
	// cold water pipes price
	set_text("uptab4coldwaterpipesbuyb", round_to_2_decimals(cd.pipeprice[0]));
	set_text("uptab4coldwaterpipesbuya", round_to_2_decimals(cd.pipeprice[0]*0.975));
	set_text("uptab4coldwaterpipesplaceb", round_to_2_decimals(cd.pipeprice[1]));
	set_text("uptab4coldwaterpipesplacea", round_to_2_decimals(cd.pipeprice[1]*0.975));

	//prices display
	set_text("coldwaterpumpprod", round_to_2_decimals(up.increase.coldwaterpumpprod));
	set_text("coldwaterpumpcost", round_to_2_decimals(up.decrease.coldwaterpumpcost));
	set_text("coldwatertreatmentplantprod", round_to_2_decimals(up.increase.coldwatertreatmentplantprod));
	set_text("coldwatertreatmentplantcost", round_to_2_decimals(up.decrease.coldwatertreatmentplantcost));
	set_text("coldwaterstoragemax", round_to_2_decimals(up.increase.coldwaterstoragemax));
	set_text("coldwaterstoragecost", round_to_2_decimals(up.decrease.coldwaterstoragecost));
	set_text("coldwaterpipebuy", round_to_2_decimals(up.decrease.coldwaterpipebuy));
	set_text("coldwaterpipeplace", round_to_2_decimals(up.decrease.coldwaterpipeplace));
	
	// hot water pipes price
	set_text("uptab7hotwaterpricebuyb", round_to_2_decimals(hd.pipeprice[0]));
	set_text("uptab7hotwaterpricebuya", round_to_2_decimals(hd.pipeprice[0]*0.95));
	set_text("uptab7hotwaterpriceplaceb", round_to_2_decimals(hd.pipeprice[1]));
	set_text("uptab7hotwaterpriceplacea", round_to_2_decimals(hd.pipeprice[1]*0.95));
	
	//houses
	set_text("uptab8coldwaterpriceb", round_to_2_decimals(cd.waterprice));
	set_text("uptab8coldwaterpricea", round_to_2_decimals(cd.waterprice*1.05));
	set_text("uptab8hotwaterpriceb", round_to_2_decimals(hd.waterprice));
	set_text("uptab8hotwaterpricea", round_to_2_decimals(hd.waterprice*1.05));
	set_text("uptab8coldwaterusedb", round_to_2_decimals(cd.waterperhouse));
	set_text("uptab8coldwateruseda", round_to_2_decimals(cd.waterperhouse*1.05));
	set_text("uptab8hotwaterusedb", round_to_2_decimals(hd.waterperhouse));
	set_text("uptab8hotwateruseda", round_to_2_decimals(hd.waterperhouse*1.05));
	set_text("uptab8houserateb", round_to_2_decimals(game.city.rate));
	set_text("uptab8houseratea", round_to_2_decimals(game.city.rate+0.1));
	set_text("uptab9intb", round_to_2_decimals(game.bank.interest));
	set_text("uptab9inta", round_to_2_decimals(game.bank.interest+0.5));
	set_text("uptab9maxloanb", round_to_2_decimals(game.bank.maxloan));
	set_text("uptab9maxloana", round_to_2_decimals(game.bank.maxloan*2));
	
	set_text("hotwaterpumpprod", round_to_2_decimals(up.increase.hotwaterpumpprod));
	set_text("hotwaterpumpcost", round_to_2_decimals(up.decrease.hotwaterpumpcost));
	set_text("hotwaterheatingplantprod", round_to_2_decimals(up.increase.hotwaterheatingplantprod));
	set_text("hotwaterheatingplantcost", round_to_2_decimals(up.decrease.hotwaterheatingplantcost));
	set_text("hotwaterpipebuy", round_to_2_decimals(up.decrease.hotwaterpipebuy));
	set_text("hotwaterpipeplace", round_to_2_decimals(up.decrease.hotwaterpipeplace));
	
	set_text("coldwaterprice", round_to_2_decimals(up.increase.coldwaterprice));
	set_text("hotwaterprice", round_to_2_decimals(up.increase.hotwaterprice));
	set_text("coldwaterperhouse", round_to_2_decimals(up.increase.coldwaterperhouse));
	set_text("hotwaterperhouse", round_to_2_decimals(up.increase.hotwaterperhouse));
	set_text("houserate", round_to_2_decimals(up.increase.houserate));
	set_text("balanceinterestrate", round_to_2_decimals(up.increase.balanceinterestrate));
	set_text("maxloan", round_to_2_decimals(up.increase.maxloan));
}
function refreshwater() {
	var cd = game.coldwater;
	var hd = game.hotwater;
	
	for(let i=0;i<4;i++) {
		// water pumps
		set_text(`tab3pprice${i}`, format_money(cd.pumpprice[i]));
		set_text(`tab3powned${i}`, round_count(cd.pump[i]));
		set_text(`tab3pprodu${i}`, round_to_2_decimals(cd.pumpprod[i]));
		set_text(`tab3ptprod${i}`, round_to_2_decimals(cd.pumpprod[i] * cd.pump[i]));
		set_text(`tab3popeco${i}`, format_money(cd.pumpcost[i]));
		set_text(`tab3ptopec${i}`, format_money(cd.pumpcost[i] * cd.pump[i]));

		// water storage
		set_text(`tab3sprice${i}`, format_money(cd.storageprice[i]));
		set_text(`tab3sowned${i}`, round_count(cd.storage[i]));
		set_text(`tab3sprodu${i}`, round_to_2_decimals(cd.storageprod[i]));
		set_text(`tab3stprod${i}`, round_to_2_decimals(cd.storageprod[i] * cd.storage[i]));
		set_text(`tab3sopeco${i}`, format_money(cd.storagecost[i]));
		set_text(`tab3stopec${i}`, format_money(cd.storagecost[i] * cd.storage[i]));

		// water treatment plants
		set_text(`tab3tprice${i}`, format_money(cd.treatmentplantprice[i]));
		set_text(`tab3towned${i}`, round_count(cd.treatmentplant[i]));
		set_text(`tab3tprodu${i}`, round_to_2_decimals(cd.treatmentplantprod[i]));
		set_text(`tab3ttprod${i}`, round_to_2_decimals(cd.treatmentplantprod[i] * cd.treatmentplant[i]));
		set_text(`tab3topeco${i}`, format_money(cd.treatmentplantcost[i]));
		set_text(`tab3ttopec${i}`, format_money(cd.treatmentplantcost[i] * cd.treatmentplant[i]));

		// hot water pumps
		set_text(`tab5hpprice${i}`, format_money(hd.pumpprice[i]));
		set_text(`tab5hpowned${i}`, round_count(hd.pump[i]));
		set_text(`tab5hpprodu${i}`, round_to_2_decimals(hd.pumpprod[i]));
		set_text(`tab5hptprod${i}`, round_to_2_decimals(hd.pumpprod[i] * hd.pump[i]));
		set_text(`tab5hpopeco${i}`, format_money(hd.pumpcost[i]));
		set_text(`tab5hptopec${i}`, format_money(hd.pumpcost[i] * hd.pump[i]));

		// hot water heating plants
		set_text(`tab6hpprice${i}`, format_money(hd.heatingplantprice[i]));
		set_text(`tab6hpowned${i}`, round_count(hd.heatingplant[i]));
		set_text(`tab6hpprodu${i}`, round_to_2_decimals(hd.heatingplantprod[i]));
		set_text(`tab6hptprod${i}`, round_to_2_decimals(hd.heatingplantprod[i] * hd.heatingplant[i]));
		set_text(`tab6hpopeco${i}`, format_money(hd.heatingplantcost[i]));
		set_text(`tab6hptopec${i}`, format_money(hd.heatingplantcost[i] * hd.heatingplant[i]));
	}
}
function refreshbank() {
	set_text('tab5loan', format_money(game.bank.loan));
	set_text('tab5maxloan', format_money(game.bank.maxloan));
	set_text('tab5balance', format_money(game.bank.balance));
	set_text('tab5loaninterest', round_to_2_decimals(game.bank.loaninterest) + "%");
	set_text('tab5balanceinterest', round_to_2_decimals(game.bank.interest) + "%");
}
function refreshcity(){
	set_text('tab1city', game.city.name);
	set_text('tab1population', round_to_2_decimals(game.city.house));
	set_text('tab1populationgrowth', round_to_2_decimals(game.city.rate) + "%");
	set_text('tab1coldpipecoverage', round_to_2_decimals(((game['coldwater']['pipe'][1]*2)/(game.city.house))*100) + "%");
	set_text('tab1hotpipecoverage', round_to_2_decimals(((game['hotwater']['pipe'][1]*2)/(game.city.house))*100) + "%");
	var cd = game['coldwater'];
	var prodcoldwater = cd.pumpprod[0] * cd.pump[0] + cd.pumpprod[1] * cd.pump[1] + cd.pumpprod[2] * cd.pump[2] + cd.pumpprod[3] * cd.pump[3];
	if((prodcoldwater/game.coldwater.pipe[1]*game.coldwater.waterperhouse)*100>100){
		set_text('tab1coldwatercoverage', "100%");
	}
	else{
		set_text('tab1coldwatercoverage', round_to_2_decimals((prodcoldwater/game.coldwater.pipe[1]*game.coldwater.waterperhouse)*100) + "%");
	}
	var hd = game['hotwater'];
	var prodhotwater = hd.pumpprod[0] * hd.pump[0] + hd.pumpprod[1] * hd.pump[1] + hd.pumpprod[2] * hd.pump[2] + hd.pumpprod[3] * hd.pump[3];
	if((prodhotwater/game.hotwater.pipe[1]*game.hotwater.waterperhouse)*100>100){
		set_text('tab1hotwatercoverage', "100%");
	}
	else{
		set_text('tab1hotwatercoverage', round_to_2_decimals((prodhotwater/game.hotwater.pipe[1]*game.hotwater.waterperhouse)*100) + "%");
	}
	set_text('tab1coldwaterprice', format_money(game.coldwater.waterprice));
	set_text('tab1coldwaterusage', round_to_2_decimals(game.coldwater.waterperhouse));
	set_text('tab1hotwaterprice', format_money(game.hotwater.waterprice));
	set_text('tab1hotwaterusage', round_to_2_decimals(game.hotwater.waterperhouse));
}
refreshupgrades();
refreshwater();
refreshbank();
refreshcity();

//buy
update_buy_sell_count('cold_pump_buy', 1);
update_buy_sell_count('cold_storage_buy', 1);
update_buy_sell_count('cold_treatmentplant_buy', 1);
update_buy_sell_count('hot_pump_buy', 1);
update_buy_sell_count('hot_heatingplant_buy', 1);

//sell
update_buy_sell_count('cold_pump_sell', 1);
update_buy_sell_count('cold_storage_sell', 1);
update_buy_sell_count('cold_treatmentplant_sell', 1);
update_buy_sell_count('hot_pump_sell', 1);
update_buy_sell_count('hot_heatingplant_sell', 1);


function refpipes(){
	set_text("watertab4owned", round_number(game.coldwater.pipe[0], 0));
	set_text("watertab4placed", round_number(game.coldwater.pipe[1], 0));
	set_text("watertab7owned", round_number(game.hotwater.pipe[0], 0));
	set_text("watertab7placed", round_number(game.hotwater.pipe[1], 0));
}
refpipes();

update_buy_sell_count('cold_pipe_buy', 1);
update_buy_sell_count('cold_pipe_place', 1);
update_buy_sell_count('hot_pipe_buy', 1);
update_buy_sell_count('hot_pipe_place', 1);

/**
 * Handles bank transactions for loan and balance.
 *
 * @param {"loan" | "balance"} main_type - The type of transaction. Allowed values: "loan", "balance".
 * @param {"withdraw" | "deposit" | "take" | "return"} direction - The direction of the transaction. Allowed values: "in", "out".
 * @param {number} amount - The amount of money to be transacted.
 *
 * @throws Will throw an error if there are insufficient funds, if the loan limit is exceeded, or if there is an outstanding loan.
 */
function handle_bank_transactions(type, direction, amount){
	amount = Number(amount);
	if(type == "loan" && direction == "return") {
		// no loan to return
		if(game.bank.loan == 0) {
			Error("Your bank file is empty", "You don't have loan to return.");
			return;
		}

		// if the player wants to return more than the loan, return the loan
		if(game.bank.loan - amount < 0) {
			amount = game.bank.loan;
		}

		if(game.bank.money >= amount) {
			game.bank.loan -= amount;
			game.bank.money -= amount;
		}
		else {
			Error("Insufficient funds", "Not enough money.");
		}
	}
	else if(type == "loan" && direction == "take") {
		if(game.bank.balance == 0) {
			if(game.bank.loan + amount <= game.bank.maxloan){
				game.bank.loan += amount;
				game.bank.money += amount;
			}
			else {
				Error("Loan limit exceeded", "You will exceed your loan limit if you get that much money. Try a smaller amount.");
			}
		}
		else {
			Error("Sufficient funds available", "You don't need a loan. You have money in the bank. Use them first, before making it into bankruptcy.");
		}
	}
	else if(type == "balance" && direction == "deposit") {
		if(game.bank.loan == 0) {
			if(game.bank.money >= amount) {
				game.bank.balance += amount;
				game.bank.money -= amount;
			}
			else {
				Error("Insufficient funds", "Not enough money.");
			}
		}
		else {
			Error("Outstanding loan", "Outstanding loan must be repaid before investing");
		}
	}
	else if(type == "balance" && direction == "withdraw") {
		if(game.bank.balance >= amount) {
			game.bank.balance -= amount;
			game.bank.money += amount;
		}
		else {
			Error("Insufficient bank balance", "You don't have enough money in the bank balance.");
		}
	}
	update_money();
	refreshbank();
}
