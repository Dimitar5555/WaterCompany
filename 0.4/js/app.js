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
	set_text("uptab1coldwaterprodb0", round_to_2_decimals(cd.pumpprod[0]));
	set_text("uptab1coldwaterprodb1", round_to_2_decimals(cd.pumpprod[1]));
	set_text("uptab1coldwaterprodb2", round_to_2_decimals(cd.pumpprod[2]));
	set_text("uptab1coldwaterprodb3", round_to_2_decimals(cd.pumpprod[3]));
	
	set_text("uptab1coldwaterproda0", round_to_2_decimals(cd.pumpprod[0]*1.1));
	set_text("uptab1coldwaterproda1", round_to_2_decimals(cd.pumpprod[1]*1.1));
	set_text("uptab1coldwaterproda2", round_to_2_decimals(cd.pumpprod[2]*1.1));
	set_text("uptab1coldwaterproda3", round_to_2_decimals(cd.pumpprod[3]*1.1));
	
	set_text("uptab1coldwatercostb0", round_to_2_decimals(cd.pumpcost[0]));
	set_text("uptab1coldwatercostb1", round_to_2_decimals(cd.pumpcost[1]));
	set_text("uptab1coldwatercostb2", round_to_2_decimals(cd.pumpcost[2]));
	set_text("uptab1coldwatercostb3", round_to_2_decimals(cd.pumpcost[3]));
	
	set_text("uptab1coldwatercosta0", round_to_2_decimals(cd.pumpcost[0]*0.9));
	set_text("uptab1coldwatercosta1", round_to_2_decimals(cd.pumpcost[1]*0.9));
	set_text("uptab1coldwatercosta2", round_to_2_decimals(cd.pumpcost[2]*0.9));
	set_text("uptab1coldwatercosta3", round_to_2_decimals(cd.pumpcost[3]*0.9));
	
	set_text("uptab2coldwaterprodb0", round_to_2_decimals(cd.treatmentplantprod[0]));
	set_text("uptab2coldwaterprodb1", round_to_2_decimals(cd.treatmentplantprod[1]));
	set_text("uptab2coldwaterprodb2", round_to_2_decimals(cd.treatmentplantprod[2]));
	set_text("uptab2coldwaterprodb3", round_to_2_decimals(cd.treatmentplantprod[3]));
	
	set_text("uptab2coldwaterproda0", round_to_2_decimals(cd.treatmentplantprod[0]*1.1));
	set_text("uptab2coldwaterproda1", round_to_2_decimals(cd.treatmentplantprod[1]*1.1));
	set_text("uptab2coldwaterproda2", round_to_2_decimals(cd.treatmentplantprod[2]*1.1));
	set_text("uptab2coldwaterproda3", round_to_2_decimals(cd.treatmentplantprod[3]*1.1));
	
	set_text("uptab2coldwatercostb0", round_to_2_decimals(cd.treatmentplantcost[0]));
	set_text("uptab2coldwatercostb1", round_to_2_decimals(cd.treatmentplantcost[1]));
	set_text("uptab2coldwatercostb2", round_to_2_decimals(cd.treatmentplantcost[2]));
	set_text("uptab2coldwatercostb3", round_to_2_decimals(cd.treatmentplantcost[3]));
	
	set_text("uptab2coldwatercosta0", round_to_2_decimals(cd.treatmentplantcost[0]*0.9));
	set_text("uptab2coldwatercosta1", round_to_2_decimals(cd.treatmentplantcost[1]*0.9));
	set_text("uptab2coldwatercosta2", round_to_2_decimals(cd.treatmentplantcost[2]*0.9));
	set_text("uptab2coldwatercosta3", round_to_2_decimals(cd.treatmentplantcost[3]*0.9));
	
	set_text("uptab3coldwaterprodb0", round_to_2_decimals(cd.storageprod[0]));
	set_text("uptab3coldwaterprodb1", round_to_2_decimals(cd.storageprod[1]));
	set_text("uptab3coldwaterprodb2", round_to_2_decimals(cd.storageprod[2]));
	set_text("uptab3coldwaterprodb3", round_to_2_decimals(cd.storageprod[3]));
	
	set_text("uptab3coldwaterproda0", round_to_2_decimals(cd.storageprod[0]*1.1));
	set_text("uptab3coldwaterproda1", round_to_2_decimals(cd.storageprod[1]*1.1));
	set_text("uptab3coldwaterproda2", round_to_2_decimals(cd.storageprod[2]*1.1));
	set_text("uptab3coldwaterproda3", round_to_2_decimals(cd.storageprod[3]*1.1));
	
	set_text("uptab3coldwatercostb0", round_to_2_decimals(cd.storagecost[0]));
	set_text("uptab3coldwatercostb1", round_to_2_decimals(cd.storagecost[1]));
	set_text("uptab3coldwatercostb2", round_to_2_decimals(cd.storagecost[2]));
	set_text("uptab3coldwatercostb3", round_to_2_decimals(cd.storagecost[3]));
	
	set_text("uptab3coldwatercosta0", round_to_2_decimals(cd.storagecost[0]*0.9));
	set_text("uptab3coldwatercosta1", round_to_2_decimals(cd.storagecost[1]*0.9));
	set_text("uptab3coldwatercosta2", round_to_2_decimals(cd.storagecost[2]*0.9));
	set_text("uptab3coldwatercosta3", round_to_2_decimals(cd.storagecost[3]*0.9));
	
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
	
	//hot water pumps, heating plants operating costs and production display
	set_text("uptab5hotwaterprodb0", round_to_2_decimals(hd.pumpprod[0]));
	set_text("uptab5hotwaterprodb1", round_to_2_decimals(hd.pumpprod[1]));
	set_text("uptab5hotwaterprodb2", round_to_2_decimals(hd.pumpprod[2]));
	set_text("uptab5hotwaterprodb3", round_to_2_decimals(hd.pumpprod[3]));
	set_text("uptab5hotwaterproda0", round_to_2_decimals(hd.pumpprod[0]*1.1));
	set_text("uptab5hotwaterproda1", round_to_2_decimals(hd.pumpprod[1]*1.1));
	set_text("uptab5hotwaterproda2", round_to_2_decimals(hd.pumpprod[2]*1.1));
	set_text("uptab5hotwaterproda3", round_to_2_decimals(hd.pumpprod[3]*1.1));
	set_text("uptab5hotwatercostb0", round_to_2_decimals(hd.pumpcost[0]));
	set_text("uptab5hotwatercostb1", round_to_2_decimals(hd.pumpcost[1]));
	set_text("uptab5hotwatercostb2", round_to_2_decimals(hd.pumpcost[2]));
	set_text("uptab5hotwatercostb3", round_to_2_decimals(hd.pumpcost[3]));
	set_text("uptab5hotwatercosta0", round_to_2_decimals(hd.pumpcost[0]*0.9));
	set_text("uptab5hotwatercosta1", round_to_2_decimals(hd.pumpcost[1]*0.9));
	set_text("uptab5hotwatercosta2", round_to_2_decimals(hd.pumpcost[2]*0.9));
	set_text("uptab5hotwatercosta3", round_to_2_decimals(hd.pumpcost[3]*0.9));
	set_text("uptab6hotwaterprodb0", round_to_2_decimals(hd.heatingplantprod[0]));
	set_text("uptab6hotwaterprodb1", round_to_2_decimals(hd.heatingplantprod[1]));
	set_text("uptab6hotwaterprodb2", round_to_2_decimals(hd.heatingplantprod[2]));
	set_text("uptab6hotwaterprodb3", round_to_2_decimals(hd.heatingplantprod[3]));
	set_text("uptab6hotwaterproda0", round_to_2_decimals(hd.heatingplantprod[0]*1.1));
	set_text("uptab6hotwaterproda1", round_to_2_decimals(hd.heatingplantprod[1]*1.1));
	set_text("uptab6hotwaterproda2", round_to_2_decimals(hd.heatingplantprod[2]*1.1));
	set_text("uptab6hotwaterproda3", round_to_2_decimals(hd.heatingplantprod[3]*1.1));
	set_text("uptab6hotwatercostb0", round_to_2_decimals(hd.heatingplantcost[0]));
	set_text("uptab6hotwatercostb1", round_to_2_decimals(hd.heatingplantcost[1]));
	set_text("uptab6hotwatercostb2", round_to_2_decimals(hd.heatingplantcost[2]));
	set_text("uptab6hotwatercostb3", round_to_2_decimals(hd.heatingplantcost[3]));
	set_text("uptab6hotwatercosta0", round_to_2_decimals(hd.heatingplantcost[0]*0.9));
	set_text("uptab6hotwatercosta1", round_to_2_decimals(hd.heatingplantcost[1]*0.9));
	set_text("uptab6hotwatercosta2", round_to_2_decimals(hd.heatingplantcost[2]*0.9));
	set_text("uptab6hotwatercosta3", round_to_2_decimals(hd.heatingplantcost[3]*0.9));
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
	//water pumping
	set_text("tab3pprice0", format_money(cd.pumpprice[0]));
	set_text("tab3pprice1", format_money(cd.pumpprice[1]));
	set_text("tab3pprice2", format_money(cd.pumpprice[2]));
	set_text("tab3pprice3", format_money(cd.pumpprice[3]));
	
	set_text("tab3powned0", round_count(cd.pump[0]));
	set_text("tab3powned1", round_count(cd.pump[1]));
	set_text("tab3powned2", round_count(cd.pump[2]));
	set_text("tab3powned3", round_count(cd.pump[3]));
	
	set_text("tab3pprodu0", round_to_2_decimals(cd.pumpprod[0]));
	set_text("tab3pprodu1", round_to_2_decimals(cd.pumpprod[1]));
	set_text("tab3pprodu2", round_to_2_decimals(cd.pumpprod[2]));
	set_text("tab3pprodu3", round_to_2_decimals(cd.pumpprod[3]));
	
	set_text("tab3ptprod0", round_to_2_decimals(cd.pumpprod[0]*cd.pump[0]));
	set_text("tab3ptprod1", round_to_2_decimals(cd.pumpprod[1]*cd.pump[1]));
	set_text("tab3ptprod2", round_to_2_decimals(cd.pumpprod[2]*cd.pump[2]));
	set_text("tab3ptprod3", round_to_2_decimals(cd.pumpprod[3]*cd.pump[3]));
	
	set_text("tab3popeco0", format_money(cd.pumpcost[0]));
	set_text("tab3popeco1", format_money(cd.pumpcost[1]));
	set_text("tab3popeco2", format_money(cd.pumpcost[2]));
	set_text("tab3popeco3", format_money(cd.pumpcost[3]));
	
	set_text("tab3ptopec0", format_money(cd.pumpcost[0]*cd.pump[0]));
	set_text("tab3ptopec1", format_money(cd.pumpcost[1]*cd.pump[1]));
	set_text("tab3ptopec2", format_money(cd.pumpcost[2]*cd.pump[2]));
	set_text("tab3ptopec3", format_money(cd.pumpcost[3]*cd.pump[3]));
	
	//watertreatment
	set_text("tab3tprice0", format_money(cd.treatmentplantprice[0]));
	set_text("tab3tprice1", format_money(cd.treatmentplantprice[1]));
	set_text("tab3tprice2", format_money(cd.treatmentplantprice[2]));
	set_text("tab3tprice3", format_money(cd.treatmentplantprice[3]));
	
	set_text("tab3towned0", round_count(cd.treatmentplant[0]));
	set_text("tab3towned1", round_count(cd.treatmentplant[1]));
	set_text("tab3towned2", round_count(cd.treatmentplant[2]));
	set_text("tab3towned3", round_count(cd.treatmentplant[3]));
	
	set_text("tab3tprodu0", round_to_2_decimals(cd.treatmentplantprod[0]));
	set_text("tab3tprodu1", round_to_2_decimals(cd.treatmentplantprod[1]));
	set_text("tab3tprodu2", round_to_2_decimals(cd.treatmentplantprod[2]));
	set_text("tab3tprodu3", round_to_2_decimals(cd.treatmentplantprod[3]));
	
	set_text("tab3ttprod0", round_to_2_decimals(cd.treatmentplantprod[0]*cd.treatmentplant[0]));
	set_text("tab3ttprod1", round_to_2_decimals(cd.treatmentplantprod[1]*cd.treatmentplant[1]));
	set_text("tab3ttprod2", round_to_2_decimals(cd.treatmentplantprod[2]*cd.treatmentplant[2]));
	set_text("tab3ttprod3", round_to_2_decimals(cd.treatmentplantprod[3]*cd.treatmentplant[3]));
	
	set_text("tab3topeco0", format_money(cd.treatmentplantcost[0]));
	set_text("tab3topeco1", format_money(cd.treatmentplantcost[1]));
	set_text("tab3topeco2", format_money(cd.treatmentplantcost[2]));
	set_text("tab3topeco3", format_money(cd.treatmentplantcost[3]));
	
	set_text("tab3ttopec0", format_money(cd.treatmentplantcost[0]*cd.treatmentplant[0]));
	set_text("tab3ttopec1", format_money(cd.treatmentplantcost[1]*cd.treatmentplant[1]));
	set_text("tab3ttopec2", format_money(cd.treatmentplantcost[2]*cd.treatmentplant[2]));
	set_text("tab3ttopec3", format_money(cd.treatmentplantcost[3]*cd.treatmentplant[3]));
	
	//storage
	set_text("tab3sprice0", format_money(cd.storageprice[0]));
	set_text("tab3sprice1", format_money(cd.storageprice[1]));
	set_text("tab3sprice2", format_money(cd.storageprice[2]));
	set_text("tab3sprice3", format_money(cd.storageprice[3]));
	
	set_text("tab3sowned0", round_count(cd.storage[0]));
	set_text("tab3sowned1", round_count(cd.storage[1]));
	set_text("tab3sowned2", round_count(cd.storage[2]));
	set_text("tab3sowned3", round_count(cd.storage[3]));
	
	set_text("tab3sprodu0", round_to_2_decimals(cd.storageprod[0]));
	set_text("tab3sprodu1", round_to_2_decimals(cd.storageprod[1]));
	set_text("tab3sprodu2", round_to_2_decimals(cd.storageprod[2]));
	set_text("tab3sprodu3", round_to_2_decimals(cd.storageprod[3]));
	
	set_text("tab3stprod0", round_to_2_decimals(cd.storageprod[0]*cd.storage[0]));
	set_text("tab3stprod1", round_to_2_decimals(cd.storageprod[1]*cd.storage[1]));
	set_text("tab3stprod2", round_to_2_decimals(cd.storageprod[2]*cd.storage[2]));
	set_text("tab3stprod3", round_to_2_decimals(cd.storageprod[3]*cd.storage[3]));
	
	set_text("tab3sopeco0", format_money(cd.storagecost[0]));
	set_text("tab3sopeco1", format_money(cd.storagecost[1]));
	set_text("tab3sopeco2", format_money(cd.storagecost[2]));
	set_text("tab3sopeco3", format_money(cd.storagecost[3]));
	
	set_text("tab3stopec0", format_money(cd.storagecost[0]*cd.storage[0]));
	set_text("tab3stopec1", format_money(cd.storagecost[1]*cd.storage[1]));
	set_text("tab3stopec2", format_money(cd.storagecost[2]*cd.storage[2]));
	set_text("tab3stopec3", format_money(cd.storagecost[3]*cd.storage[3]));
	
	//hot water
	
	//pumping
	set_text("tab5hpprice0", format_money(hd.pumpprice[0]));
	set_text("tab5hpprice1", format_money(hd.pumpprice[1]));
	set_text("tab5hpprice2", format_money(hd.pumpprice[2]));
	set_text("tab5hpprice3", format_money(hd.pumpprice[3]));
	
	set_text("tab5hpowned0", round_count(hd.pump[0]));
	set_text("tab5hpowned1", round_count(hd.pump[1]));
	set_text("tab5hpowned2", round_count(hd.pump[2]));
	set_text("tab5hpowned3", round_count(hd.pump[3]));
	
	set_text("tab5hpprodu0", round_to_2_decimals(hd.pumpprod[0]));
	set_text("tab5hpprodu1", round_to_2_decimals(hd.pumpprod[1]));
	set_text("tab5hpprodu2", round_to_2_decimals(hd.pumpprod[2]));
	set_text("tab5hpprodu3", round_to_2_decimals(hd.pumpprod[3]));
	
	set_text("tab5hptprod0", round_to_2_decimals(hd.pumpprod[0]*hd.pump[0]));
	set_text("tab5hptprod1", round_to_2_decimals(hd.pumpprod[1]*hd.pump[1]));
	set_text("tab5hptprod2", round_to_2_decimals(hd.pumpprod[2]*hd.pump[2]));
	set_text("tab5hptprod3", round_to_2_decimals(hd.pumpprod[3]*hd.pump[3]));
	
	set_text("tab5hpopeco0", format_money(hd.pumpcost[0]));
	set_text("tab5hpopeco1", format_money(hd.pumpcost[1]));
	set_text("tab5hpopeco2", format_money(hd.pumpcost[2]));
	set_text("tab5hpopeco3", format_money(hd.pumpcost[3]));
	
	set_text("tab5hptopec0", format_money(hd.pumpcost[0]*hd.pump[0]));
	set_text("tab5hptopec1", format_money(hd.pumpcost[1]*hd.pump[1]));
	set_text("tab5hptopec2", format_money(hd.pumpcost[2]*hd.pump[2]));
	set_text("tab5hptopec3", format_money(hd.pumpcost[3]*hd.pump[3]));
	
	//heating
	set_text("tab6hpprice0", format_money(hd.heatingplantprice[0]));
	set_text("tab6hpprice1", format_money(hd.heatingplantprice[1]));
	set_text("tab6hpprice2", format_money(hd.heatingplantprice[2]));
	set_text("tab6hpprice3", format_money(hd.heatingplantprice[3]));
	
	set_text("tab6hpowned0", round_count(hd.heatingplant[0]));
	set_text("tab6hpowned1", round_count(hd.heatingplant[1]));
	set_text("tab6hpowned2", round_count(hd.heatingplant[2]));
	set_text("tab6hpowned3", round_count(hd.heatingplant[3]));
	
	set_text("tab6hpprodu0", round_to_2_decimals(hd.heatingplantprod[0]));
	set_text("tab6hpprodu1", round_to_2_decimals(hd.heatingplantprod[1]));
	set_text("tab6hpprodu2", round_to_2_decimals(hd.heatingplantprod[2]));
	set_text("tab6hpprodu3", round_to_2_decimals(hd.heatingplantprod[3]));
	
	set_text("tab6hptprod0", round_to_2_decimals(hd.heatingplantprod[0]*hd.heatingplant[0]));
	set_text("tab6hptprod1", round_to_2_decimals(hd.heatingplantprod[1]*hd.heatingplant[1]));
	set_text("tab6hptprod2", round_to_2_decimals(hd.heatingplantprod[2]*hd.heatingplant[2]));
	set_text("tab6hptprod3", round_to_2_decimals(hd.heatingplantprod[3]*hd.heatingplant[3]));
	
	set_text("tab6hpopeco0", format_money(hd.heatingplantcost[0]));
	set_text("tab6hpopeco1", format_money(hd.heatingplantcost[1]));
	set_text("tab6hpopeco2", format_money(hd.heatingplantcost[2]));
	set_text("tab6hpopeco3", format_money(hd.heatingplantcost[3]));
	
	set_text("tab6hptopec0", format_money(hd.heatingplantcost[0]*hd.heatingplant[0]));
	set_text("tab6hptopec1", format_money(hd.heatingplantcost[1]*hd.heatingplant[1]));
	set_text("tab6hptopec2", format_money(hd.heatingplantcost[2]*hd.heatingplant[2]));
	set_text("tab6hptopec3", format_money(hd.heatingplantcost[3]*hd.heatingplant[3]));
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
