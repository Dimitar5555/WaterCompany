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
			day:1,
			mounth:1,
			year:1,
			hour:0,
			name:"",
			rate:1.1,
		},
		bank:{
			loan:0,
			loaninterest:10,
			maxloan:100000,
			balance:0,
			interest:1,
			money:p(p(p(p(500000)))),
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
			year:1,
			hour:0,
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
		id2w('tab1city', inputValue);
	});
}
id2w("money", sn2(game.bank.money));
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
		
		id2w('headercdused', sn2(usedcoldwater) + " m<sup>3</sup>");
		id2w('headercdpumped', sn2(prodcoldwater) + " m<sup>3</sup>");
		id2w('headercdtreated', sn2(treatcoldwater) + " m<sup>3</sup>");
		id2w('headerhdused', sn2(usedhotwater) + " m<sup>3</sup>");
		id2w('headerhdheated', sn2(prodheathotwater) + " m<sup>3</sup>");
		id2w('headerhdpumped', sn2(prodhotwater) + " m<sup>3</sup>");
		
		
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
		id2w("money", sn2(game.bank.money));
		if(totincome - totexpense<0){
			id2w("income", "-$" + sn2((totincome - totexpense)*(-1)));
		}
		else{
			id2w("income", "+$" + sn2(totincome - totexpense));
		}
		id2w("finsellcoldwater", "$" + sn2(24*coldwaterincome));
		id2w("finsellhotwater", "$" + sn2(24*hotwaterincome));
		id2w("fincoldwaterexp", "$" + sn2(24*coldexpense));
		id2w("finhotwaterexp", "$" + sn2(24*heatexpense));
		id2w("fintotwaterexp", "$" + sn2(24*totexpense));
		id2w("fintotwaterinc", "$" + sn2(24*totincome+((game.bank.balance/100)*game.bank.interest)/384));
		id2w("finintbank", "$" + sn2(((game.bank.balance/100)*game.bank.interest)/384));
		id2w("finfines", "$" + sn2(fine));
		id2w("profit", "$" + sn2(totincome*24 - totexpense*24+((game.bank.balance/100)*game.bank.interest)/384));
		var totcap = 0;
		for(i=0;i<cd.storage.length;i++){
			var totcap = totcap + cd.storage[i] * cd.storageprod[i];
		}
		if(game.coldwater.stored>totcap){
			game.coldwater.stored = totcap;
		}
		id2w('headercdstored', sn2(game['coldwater']['stored']) + " m<sup>3</sup>/" + sn2(totcap) + " m<sup>3</sup>");
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
	id2w('headerhour', game.time.hour);
	id2w('headerday', game.time.day);
	id2w('headermonth', game.time.month);
	id2w('headeryear', game.time.year);
	if(interestratetimer>=24){
		interestratetimer = interestratetimer-24;
		var temp = game.bank.balance;
		game.bank.balance = game.bank.balance + ((game.bank.balance/100)*game.bank.interest)/384;
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
		id2w("money", sn2(game.bank.money));
		game.city.house = game.city.house + ((game.city.house/100)*game.city.rate)/32;
		refreshcity();
	}
},500);
function refreshupgrades(){
	var cd = game.coldwater;
	var hd = game.hotwater;
	var up = game.upgrades;
	//cold water pumps, storage and water treatment plants operating costs and production display
	id2w("uptab1coldwaterprodb0", sn2(cd.pumpprod[0]));
	id2w("uptab1coldwaterprodb1", sn2(cd.pumpprod[1]));
	id2w("uptab1coldwaterprodb2", sn2(cd.pumpprod[2]));
	id2w("uptab1coldwaterprodb3", sn2(cd.pumpprod[3]));
	
	id2w("uptab1coldwaterproda0", sn2(cd.pumpprod[0]*1.1));
	id2w("uptab1coldwaterproda1", sn2(cd.pumpprod[1]*1.1));
	id2w("uptab1coldwaterproda2", sn2(cd.pumpprod[2]*1.1));
	id2w("uptab1coldwaterproda3", sn2(cd.pumpprod[3]*1.1));
	
	id2w("uptab1coldwatercostb0", sn2(cd.pumpcost[0]));
	id2w("uptab1coldwatercostb1", sn2(cd.pumpcost[1]));
	id2w("uptab1coldwatercostb2", sn2(cd.pumpcost[2]));
	id2w("uptab1coldwatercostb3", sn2(cd.pumpcost[3]));
	
	id2w("uptab1coldwatercosta0", sn2(cd.pumpcost[0]*0.9));
	id2w("uptab1coldwatercosta1", sn2(cd.pumpcost[1]*0.9));
	id2w("uptab1coldwatercosta2", sn2(cd.pumpcost[2]*0.9));
	id2w("uptab1coldwatercosta3", sn2(cd.pumpcost[3]*0.9));
	
	id2w("uptab2coldwaterprodb0", sn2(cd.treatmentplantprod[0]));
	id2w("uptab2coldwaterprodb1", sn2(cd.treatmentplantprod[1]));
	id2w("uptab2coldwaterprodb2", sn2(cd.treatmentplantprod[2]));
	id2w("uptab2coldwaterprodb3", sn2(cd.treatmentplantprod[3]));
	
	id2w("uptab2coldwaterproda0", sn2(cd.treatmentplantprod[0]*1.1));
	id2w("uptab2coldwaterproda1", sn2(cd.treatmentplantprod[1]*1.1));
	id2w("uptab2coldwaterproda2", sn2(cd.treatmentplantprod[2]*1.1));
	id2w("uptab2coldwaterproda3", sn2(cd.treatmentplantprod[3]*1.1));
	
	id2w("uptab2coldwatercostb0", sn2(cd.treatmentplantcost[0]));
	id2w("uptab2coldwatercostb1", sn2(cd.treatmentplantcost[1]));
	id2w("uptab2coldwatercostb2", sn2(cd.treatmentplantcost[2]));
	id2w("uptab2coldwatercostb3", sn2(cd.treatmentplantcost[3]));
	
	id2w("uptab2coldwatercosta0", sn2(cd.treatmentplantcost[0]*0.9));
	id2w("uptab2coldwatercosta1", sn2(cd.treatmentplantcost[1]*0.9));
	id2w("uptab2coldwatercosta2", sn2(cd.treatmentplantcost[2]*0.9));
	id2w("uptab2coldwatercosta3", sn2(cd.treatmentplantcost[3]*0.9));
	
	id2w("uptab3coldwaterprodb0", sn2(cd.storageprod[0]));
	id2w("uptab3coldwaterprodb1", sn2(cd.storageprod[1]));
	id2w("uptab3coldwaterprodb2", sn2(cd.storageprod[2]));
	id2w("uptab3coldwaterprodb3", sn2(cd.storageprod[3]));
	
	id2w("uptab3coldwaterproda0", sn2(cd.storageprod[0]*1.1));
	id2w("uptab3coldwaterproda1", sn2(cd.storageprod[1]*1.1));
	id2w("uptab3coldwaterproda2", sn2(cd.storageprod[2]*1.1));
	id2w("uptab3coldwaterproda3", sn2(cd.storageprod[3]*1.1));
	
	id2w("uptab3coldwatercostb0", sn2(cd.storagecost[0]));
	id2w("uptab3coldwatercostb1", sn2(cd.storagecost[1]));
	id2w("uptab3coldwatercostb2", sn2(cd.storagecost[2]));
	id2w("uptab3coldwatercostb3", sn2(cd.storagecost[3]));
	
	id2w("uptab3coldwatercosta0", sn2(cd.storagecost[0]*0.9));
	id2w("uptab3coldwatercosta1", sn2(cd.storagecost[1]*0.9));
	id2w("uptab3coldwatercosta2", sn2(cd.storagecost[2]*0.9));
	id2w("uptab3coldwatercosta3", sn2(cd.storagecost[3]*0.9));
	
	id2w("uptab4coldwaterpipesbuyb", sn2(cd.pipeprice[0]));
	id2w("uptab4coldwaterpipesbuya", sn2(cd.pipeprice[0]*0.975));
	id2w("uptab4coldwaterpipesplaceb", sn2(cd.pipeprice[1]));
	id2w("uptab4coldwaterpipesplacea", sn2(cd.pipeprice[1]*0.975));
	//prices display
	id2w("coldwaterpumpprod", sn2(up.increase.coldwaterpumpprod));
	id2w("coldwaterpumpcost", sn2(up.decrease.coldwaterpumpcost));
	id2w("coldwatertreatmentplantprod", sn2(up.increase.coldwatertreatmentplantprod));
	id2w("coldwatertreatmentplantcost", sn2(up.decrease.coldwatertreatmentplantcost));
	id2w("coldwaterstoragemax", sn2(up.increase.coldwaterstoragemax));
	id2w("coldwaterstoragecost", sn2(up.decrease.coldwaterstoragecost));
	id2w("coldwaterpipebuy", sn2(up.decrease.coldwaterpipebuy));
	id2w("coldwaterpipeplace", sn2(up.decrease.coldwaterpipeplace));
	
	//hot water pumps, heating plants operating costs and production display
	id2w("uptab5hotwaterprodb0", sn2(hd.pumpprod[0]));
	id2w("uptab5hotwaterprodb1", sn2(hd.pumpprod[1]));
	id2w("uptab5hotwaterprodb2", sn2(hd.pumpprod[2]));
	id2w("uptab5hotwaterprodb3", sn2(hd.pumpprod[3]));
	id2w("uptab5hotwaterproda0", sn2(hd.pumpprod[0]*1.1));
	id2w("uptab5hotwaterproda1", sn2(hd.pumpprod[1]*1.1));
	id2w("uptab5hotwaterproda2", sn2(hd.pumpprod[2]*1.1));
	id2w("uptab5hotwaterproda3", sn2(hd.pumpprod[3]*1.1));
	id2w("uptab5hotwatercostb0", sn2(hd.pumpcost[0]));
	id2w("uptab5hotwatercostb1", sn2(hd.pumpcost[1]));
	id2w("uptab5hotwatercostb2", sn2(hd.pumpcost[2]));
	id2w("uptab5hotwatercostb3", sn2(hd.pumpcost[3]));
	id2w("uptab5hotwatercosta0", sn2(hd.pumpcost[0]*0.9));
	id2w("uptab5hotwatercosta1", sn2(hd.pumpcost[1]*0.9));
	id2w("uptab5hotwatercosta2", sn2(hd.pumpcost[2]*0.9));
	id2w("uptab5hotwatercosta3", sn2(hd.pumpcost[3]*0.9));
	id2w("uptab6hotwaterprodb0", sn2(hd.heatingplantprod[0]));
	id2w("uptab6hotwaterprodb1", sn2(hd.heatingplantprod[1]));
	id2w("uptab6hotwaterprodb2", sn2(hd.heatingplantprod[2]));
	id2w("uptab6hotwaterprodb3", sn2(hd.heatingplantprod[3]));
	id2w("uptab6hotwaterproda0", sn2(hd.heatingplantprod[0]*1.1));
	id2w("uptab6hotwaterproda1", sn2(hd.heatingplantprod[1]*1.1));
	id2w("uptab6hotwaterproda2", sn2(hd.heatingplantprod[2]*1.1));
	id2w("uptab6hotwaterproda3", sn2(hd.heatingplantprod[3]*1.1));
	id2w("uptab6hotwatercostb0", sn2(hd.heatingplantcost[0]));
	id2w("uptab6hotwatercostb1", sn2(hd.heatingplantcost[1]));
	id2w("uptab6hotwatercostb2", sn2(hd.heatingplantcost[2]));
	id2w("uptab6hotwatercostb3", sn2(hd.heatingplantcost[3]));
	id2w("uptab6hotwatercosta0", sn2(hd.heatingplantcost[0]*0.9));
	id2w("uptab6hotwatercosta1", sn2(hd.heatingplantcost[1]*0.9));
	id2w("uptab6hotwatercosta2", sn2(hd.heatingplantcost[2]*0.9));
	id2w("uptab6hotwatercosta3", sn2(hd.heatingplantcost[3]*0.9));
	id2w("uptab7hotwaterpricebuyb", sn2(hd.pipeprice[0]));
	id2w("uptab7hotwaterpricebuya", sn2(hd.pipeprice[0]*0.95));
	id2w("uptab7hotwaterpriceplaceb", sn2(hd.pipeprice[1]));
	id2w("uptab7hotwaterpriceplacea", sn2(hd.pipeprice[1]*0.95));
	
	//houses
	id2w("uptab8coldwaterpriceb", sn2(cd.waterprice));
	id2w("uptab8coldwaterpricea", sn2(cd.waterprice*1.05));
	id2w("uptab8hotwaterpriceb", sn2(hd.waterprice));
	id2w("uptab8hotwaterpricea", sn2(hd.waterprice*1.05));
	id2w("uptab8coldwaterusedb", sn2(cd.waterperhouse));
	id2w("uptab8coldwateruseda", sn2(cd.waterperhouse*1.05));
	id2w("uptab8hotwaterusedb", sn2(hd.waterperhouse));
	id2w("uptab8hotwateruseda", sn2(hd.waterperhouse*1.05));
	id2w("uptab8houserateb", sn2(game.city.rate));
	id2w("uptab8houseratea", sn2(game.city.rate*1.1));
	id2w("uptab9intb", sn2(game.bank.interest));
	id2w("uptab9inta", sn2(game.bank.interest*1.05));
	id2w("uptab9maxloanb", sn2(game.bank.maxloan));
	id2w("uptab9maxloana", sn2(game.bank.maxloan*2));
	
	id2w("hotwaterpumpprod", sn2(up.increase.hotwaterpumpprod));
	id2w("hotwaterpumpcost", sn2(up.decrease.hotwaterpumpcost));
	id2w("hotwaterheatingplantprod", sn2(up.increase.hotwaterheatingplantprod));
	id2w("hotwaterheatingplantcost", sn2(up.decrease.hotwaterheatingplantcost));
	id2w("hotwaterpipebuy", sn2(up.decrease.hotwaterpipebuy));
	id2w("hotwaterpipeplace", sn2(up.decrease.hotwaterpipeplace));
	
	id2w("coldwaterprice", sn2(up.increase.coldwaterprice));
	id2w("hotwaterprice", sn2(up.increase.hotwaterprice));
	id2w("coldwaterperhouse", sn2(up.increase.coldwaterperhouse));
	id2w("hotwaterperhouse", sn2(up.increase.hotwaterperhouse));
	id2w("houserate", sn2(up.increase.houserate));
	id2w("loaninterestrate", sn2(up.increase.loaninterestrate));
	id2w("maxloan", sn2(up.increase.maxloan));
}
function refreshwater() {
	var cd = game.coldwater;
	var hd = game.hotwater;
	//water pumping
	id2w("tab3pprice0", "$" + sn2(cd.pumpprice[0]));
	id2w("tab3pprice1", "$" + sn2(cd.pumpprice[1]));
	id2w("tab3pprice2", "$" + sn2(cd.pumpprice[2]));
	id2w("tab3pprice3", "$" + sn2(cd.pumpprice[3]));
	
	id2w("tab3powned0", sn(cd.pump[0], 0));
	id2w("tab3powned1", sn(cd.pump[1], 0));
	id2w("tab3powned2", sn(cd.pump[2], 0));
	id2w("tab3powned3", sn(cd.pump[3], 0));
	
	id2w("tab3pprodu0", sn2(cd.pumpprod[0]) + " m<sup>3</sup>");
	id2w("tab3pprodu1", sn2(cd.pumpprod[1]) + " m<sup>3</sup>");
	id2w("tab3pprodu2", sn2(cd.pumpprod[2]) + " m<sup>3</sup>");
	id2w("tab3pprodu3", sn2(cd.pumpprod[3]) + " m<sup>3</sup>");
	
	id2w("tab3ptprod0", sn2(cd.pumpprod[0]*cd.pump[0]) + " m<sup>3</sup>");
	id2w("tab3ptprod1", sn2(cd.pumpprod[1]*cd.pump[1]) + " m<sup>3</sup>");
	id2w("tab3ptprod2", sn2(cd.pumpprod[2]*cd.pump[2]) + " m<sup>3</sup>");
	id2w("tab3ptprod3", sn2(cd.pumpprod[3]*cd.pump[3]) + " m<sup>3</sup>");
	
	id2w("tab3popeco0", "$" + sn2(cd.pumpcost[0]));
	id2w("tab3popeco1", "$" + sn2(cd.pumpcost[1]));
	id2w("tab3popeco2", "$" + sn2(cd.pumpcost[2]));
	id2w("tab3popeco3", "$" + sn2(cd.pumpcost[3]));
	
	id2w("tab3ptopec0", "$" + sn2(cd.pumpcost[0]*cd.pump[0]));
	id2w("tab3ptopec1", "$" + sn2(cd.pumpcost[1]*cd.pump[1]));
	id2w("tab3ptopec2", "$" + sn2(cd.pumpcost[2]*cd.pump[2]));
	id2w("tab3ptopec3", "$" + sn2(cd.pumpcost[3]*cd.pump[3]));
	
	//watertreatment
	id2w("tab3tprice0", "$" + sn2(cd.treatmentplantprice[0]));
	id2w("tab3tprice1", "$" + sn2(cd.treatmentplantprice[1]));
	id2w("tab3tprice2", "$" + sn2(cd.treatmentplantprice[2]));
	id2w("tab3tprice3", "$" + sn2(cd.treatmentplantprice[3]));
	
	id2w("tab3towned0", sn(cd.treatmentplant[0],0));
	id2w("tab3towned1", sn(cd.treatmentplant[1],0));
	id2w("tab3towned2", sn(cd.treatmentplant[2],0));
	id2w("tab3towned3", sn(cd.treatmentplant[3],0));
	
	id2w("tab3tprodu0", sn2(cd.treatmentplantprod[0]) + " m<sup>3</sup>");
	id2w("tab3tprodu1", sn2(cd.treatmentplantprod[1]) + " m<sup>3</sup>");
	id2w("tab3tprodu2", sn2(cd.treatmentplantprod[2]) + " m<sup>3</sup>");
	id2w("tab3tprodu3", sn2(cd.treatmentplantprod[3]) + " m<sup>3</sup>");
	
	id2w("tab3ttprod0", sn2(cd.treatmentplantprod[0]*cd.treatmentplant[0]) + " m<sup>3</sup>");
	id2w("tab3ttprod1", sn2(cd.treatmentplantprod[1]*cd.treatmentplant[1]) + " m<sup>3</sup>");
	id2w("tab3ttprod2", sn2(cd.treatmentplantprod[2]*cd.treatmentplant[2]) + " m<sup>3</sup>");
	id2w("tab3ttprod3", sn2(cd.treatmentplantprod[3]*cd.treatmentplant[3]) + " m<sup>3</sup>");
	
	id2w("tab3topeco0", "$" + sn2(cd.treatmentplantcost[0]));
	id2w("tab3topeco1", "$" + sn2(cd.treatmentplantcost[1]));
	id2w("tab3topeco2", "$" + sn2(cd.treatmentplantcost[2]));
	id2w("tab3topeco3", "$" + sn2(cd.treatmentplantcost[3]));
	
	id2w("tab3ttopec0", "$" + sn2(cd.treatmentplantcost[0]*cd.treatmentplant[0]));
	id2w("tab3ttopec1", "$" + sn2(cd.treatmentplantcost[1]*cd.treatmentplant[1]));
	id2w("tab3ttopec2", "$" + sn2(cd.treatmentplantcost[2]*cd.treatmentplant[2]));
	id2w("tab3ttopec3", "$" + sn2(cd.treatmentplantcost[3]*cd.treatmentplant[3]));
	
	//storage
	id2w("tab3sprice0", "$" + sn2(cd.storageprice[0]));
	id2w("tab3sprice1", "$" + sn2(cd.storageprice[1]));
	id2w("tab3sprice2", "$" + sn2(cd.storageprice[2]));
	id2w("tab3sprice3", "$" + sn2(cd.storageprice[3]));
	
	id2w("tab3sowned0", sn(cd.storage[0], 0));
	id2w("tab3sowned1", sn(cd.storage[1], 0));
	id2w("tab3sowned2", sn(cd.storage[2], 0));
	id2w("tab3sowned3", sn(cd.storage[3], 0));
	
	id2w("tab3sprodu0", sn2(cd.storageprod[0]) + " m<sup>3</sup>");
	id2w("tab3sprodu1", sn2(cd.storageprod[1]) + " m<sup>3</sup>");
	id2w("tab3sprodu2", sn2(cd.storageprod[2]) + " m<sup>3</sup>");
	id2w("tab3sprodu3", sn2(cd.storageprod[3]) + " m<sup>3</sup>");
	
	id2w("tab3stprod0", sn2(cd.storageprod[0]*cd.storage[0]) + " m<sup>3</sup>");
	id2w("tab3stprod1", sn2(cd.storageprod[1]*cd.storage[1]) + " m<sup>3</sup>");
	id2w("tab3stprod2", sn2(cd.storageprod[2]*cd.storage[2]) + " m<sup>3</sup>");
	id2w("tab3stprod3", sn2(cd.storageprod[3]*cd.storage[3]) + " m<sup>3</sup>");
	
	id2w("tab3sopeco0", "$" + sn2(cd.storagecost[0]));
	id2w("tab3sopeco1", "$" + sn2(cd.storagecost[1]));
	id2w("tab3sopeco2", "$" + sn2(cd.storagecost[2]));
	id2w("tab3sopeco3", "$" + sn2(cd.storagecost[3]));
	
	id2w("tab3stopec0", "$" + sn2(cd.storagecost[0]*cd.storage[0]));
	id2w("tab3stopec1", "$" + sn2(cd.storagecost[1]*cd.storage[1]));
	id2w("tab3stopec2", "$" + sn2(cd.storagecost[2]*cd.storage[2]));
	id2w("tab3stopec3", "$" + sn2(cd.storagecost[3]*cd.storage[3]));
	
	//hot water
	
	//pumping
	id2w("tab5hpprice0", "$" + sn2(hd.pumpprice[0]));
	id2w("tab5hpprice1", "$" + sn2(hd.pumpprice[1]));
	id2w("tab5hpprice2", "$" + sn2(hd.pumpprice[2]));
	id2w("tab5hpprice3", "$" + sn2(hd.pumpprice[3]));
	
	id2w("tab5hpowned0", sn(hd.pump[0], 0));
	id2w("tab5hpowned1", sn(hd.pump[1], 0));
	id2w("tab5hpowned2", sn(hd.pump[2], 0));
	id2w("tab5hpowned3", sn(hd.pump[3], 0));
	
	id2w("tab5hpprodu0", sn2(hd.pumpprod[0]) + " m<sup>3</sup>");
	id2w("tab5hpprodu1", sn2(hd.pumpprod[1]) + " m<sup>3</sup>");
	id2w("tab5hpprodu2", sn2(hd.pumpprod[2]) + " m<sup>3</sup>");
	id2w("tab5hpprodu3", sn2(hd.pumpprod[3]) + " m<sup>3</sup>");
	
	id2w("tab5hptprod0", sn2(hd.pumpprod[0]*hd.pump[0]) + " m<sup>3</sup>");
	id2w("tab5hptprod1", sn2(hd.pumpprod[1]*hd.pump[1]) + " m<sup>3</sup>");
	id2w("tab5hptprod2", sn2(hd.pumpprod[2]*hd.pump[2]) + " m<sup>3</sup>");
	id2w("tab5hptprod3", sn2(hd.pumpprod[3]*hd.pump[3]) + " m<sup>3</sup>");
	
	id2w("tab5hpopeco0", "$" + sn2(hd.pumpcost[0]));
	id2w("tab5hpopeco1", "$" + sn2(hd.pumpcost[1]));
	id2w("tab5hpopeco2", "$" + sn2(hd.pumpcost[2]));
	id2w("tab5hpopeco3", "$" + sn2(hd.pumpcost[3]));
	
	id2w("tab5hptopec0", "$" + sn2(hd.pumpcost[0]*hd.pump[0]));
	id2w("tab5hptopec1", "$" + sn2(hd.pumpcost[1]*hd.pump[1]));
	id2w("tab5hptopec2", "$" + sn2(hd.pumpcost[2]*hd.pump[2]));
	id2w("tab5hptopec3", "$" + sn2(hd.pumpcost[3]*hd.pump[3]));
	
	//heating
	id2w("tab6hpprice0", "$" + sn2(hd.heatingplantprice[0]));
	id2w("tab6hpprice1", "$" + sn2(hd.heatingplantprice[1]));
	id2w("tab6hpprice2", "$" + sn2(hd.heatingplantprice[2]));
	id2w("tab6hpprice3", "$" + sn2(hd.heatingplantprice[3]));
	
	id2w("tab6hpowned0", sn(hd.heatingplant[0], 0));
	id2w("tab6hpowned1", sn(hd.heatingplant[1], 0));
	id2w("tab6hpowned2", sn(hd.heatingplant[2], 0));
	id2w("tab6hpowned3", sn(hd.heatingplant[3], 0));
	
	id2w("tab6hpprodu0", sn2(hd.heatingplantprod[0]) + " m<sup>3</sup>");
	id2w("tab6hpprodu1", sn2(hd.heatingplantprod[1]) + " m<sup>3</sup>");
	id2w("tab6hpprodu2", sn2(hd.heatingplantprod[2]) + " m<sup>3</sup>");
	id2w("tab6hpprodu3", sn2(hd.heatingplantprod[3]) + " m<sup>3</sup>");
	
	id2w("tab6hptprod0", sn2(hd.heatingplantprod[0]*hd.heatingplant[0]) + " m<sup>3</sup>");
	id2w("tab6hptprod1", sn2(hd.heatingplantprod[1]*hd.heatingplant[1]) + " m<sup>3</sup>");
	id2w("tab6hptprod2", sn2(hd.heatingplantprod[2]*hd.heatingplant[2]) + " m<sup>3</sup>");
	id2w("tab6hptprod3", sn2(hd.heatingplantprod[3]*hd.heatingplant[3]) + " m<sup>3</sup>");
	
	id2w("tab6hpopeco0", "$" + sn2(hd.heatingplantcost[0]));
	id2w("tab6hpopeco1", "$" + sn2(hd.heatingplantcost[1]));
	id2w("tab6hpopeco2", "$" + sn2(hd.heatingplantcost[2]));
	id2w("tab6hpopeco3", "$" + sn2(hd.heatingplantcost[3]));
	
	id2w("tab6hptopec0", "$" + sn2(hd.heatingplantcost[0]*hd.heatingplant[0]));
	id2w("tab6hptopec1", "$" + sn2(hd.heatingplantcost[1]*hd.heatingplant[1]));
	id2w("tab6hptopec2", "$" + sn2(hd.heatingplantcost[2]*hd.heatingplant[2]));
	id2w("tab6hptopec3", "$" + sn2(hd.heatingplantcost[3]*hd.heatingplant[3]));
}
function refreshbank() {
	id2w('tab5loan', "$" + sn2(game.bank.loan));
	id2w('tab5maxloan', "$" + sn2(game.bank.maxloan));
	id2w('tab5balance', "$" + sn2(game.bank.balance));
	id2w('tab5loaninterest', sn2(game.bank.loaninterest) + "%");
	id2w('tab5balanceinterest', sn2(game.bank.interest) + "%");
}
function refreshcity(){
	id2w('tab1city', game.city.name);
	id2w('tab1population', sn2(game.city.house));
	id2w('tab1populationgrowth', sn2(game.city.rate) + "%");
	id2w('tab1coldpipecoverage', sn2(((game['coldwater']['pipe'][1])/(game.city.house))*100) + "%");
	id2w('tab1hotpipecoverage', sn2(((game['hotwater']['pipe'][1])/(game.city.house))*100) + "%");
	var cd = game['coldwater'];
	var prodcoldwater = cd.pumpprod[0] * cd.pump[0] + cd.pumpprod[1] * cd.pump[1] + cd.pumpprod[2] * cd.pump[2] + cd.pumpprod[3] * cd.pump[3];
	if((prodcoldwater/game.coldwater.pipe[1]*game.coldwater.waterperhouse)*100>100){
		id2w('tab1coldwatercoverage', "100%");
	}
	else{
		id2w('tab1coldwatercoverage', sn2((prodcoldwater/game.coldwater.pipe[1]*game.coldwater.waterperhouse)*100) + "%");
	}
	var hd = game['hotwater'];
	var prodhotwater = hd.pumpprod[0] * hd.pump[0] + hd.pumpprod[1] * hd.pump[1] + hd.pumpprod[2] * hd.pump[2] + hd.pumpprod[3] * hd.pump[3];
	if((prodhotwater/game.hotwater.pipe[1]*game.hotwater.waterperhouse)*100>100){
		id2w('tab1hotwatercoverage', "100%");
	}
	else{
		id2w('tab1hotwatercoverage', sn2((prodhotwater/game.hotwater.pipe[1]*game.hotwater.waterperhouse)*100) + "%");
	}
	id2w('tab1coldwaterprice', "$" + sn2(game.coldwater.waterprice));
	id2w('tab1coldwaterusage', sn2(game.coldwater.waterperhouse) + " m<sup>3</sup>");
	id2w('tab1hotwaterprice', "$" + sn2(game.hotwater.waterprice));
	id2w('tab1hotwaterusage', sn2(game.hotwater.waterperhouse) + " m<sup>3</sup>");
}
refreshupgrades();
refreshwater();
refreshbank();
refreshcity();

function refnumber(id, number, name, total, where, price){
	if(number>999){
		id2w(id + "0", sn2(number));
		id2w(id + "1", sn2(number));
		id2w(id + "2", sn2(number));
		id2w(id + "3", sn2(number));
	}
	else{
		id2w(id + "0", sn(number, 0));
		id2w(id + "1", sn(number, 0));
		id2w(id + "2", sn(number, 0));
		id2w(id + "3", sn(number, 0));
	}
	window[name] = number;
	id2w(total + "0", sn2(window['game'][where][price][0]*number));
	id2w(total + "1", sn2(window['game'][where][price][1]*number));
	id2w(total + "2", sn2(window['game'][where][price][2]*number));
	id2w(total + "3", sn2(window['game'][where][price][3]*number));
}

//buy
refnumber('watertab1number', 1, 'watertab1number', 'watertab1total', 'coldwater', 'pumpprice');
refnumber('watertab2number', 1, 'watertab2number', 'watertab2total', 'coldwater', 'storageprice');
refnumber('watertab3number', 1, 'watertab3number', 'watertab3total', 'coldwater', 'treatmentplantprice');
refnumber('watertab5number', 1, 'watertab5number', 'watertab5total', 'hotwater', 'pumpprice');
refnumber('watertab6number', 1, 'watertab6number', 'watertab6total', 'hotwater', 'heatingplantprice');

//sell
refnumber('watertab1numbersell', 1, 'watertab1numbersell', 'watertab1totalsell', 'coldwater', 'pumpprice');
refnumber('watertab2numbersell', 1, 'watertab2numbersell', 'watertab2totalsell', 'coldwater', 'storageprice');
refnumber('watertab3numbersell', 1, 'watertab3numbersell', 'watertab3totalsell', 'coldwater', 'treatmentplantprice');
refnumber('watertab5numbersell', 1, 'watertab5numbersell', 'watertab5totalsell', 'hotwater', 'pumpprice');
refnumber('watertab6numbersell', 1, 'watertab6numbersell', 'watertab6totalsell', 'hotwater', 'heatingplantprice');


function refpipes(){
	id2w("watertab4owned", sn(game.coldwater.pipe[0], 0));
	id2w("watertab4placed", sn(game.coldwater.pipe[1], 0));
	id2w("watertab7owned", sn(game.hotwater.pipe[0], 0));
	id2w("watertab7placed", sn(game.hotwater.pipe[1], 0));
}
refpipes();
function refpipesnumber(id1, id2, water, price, number, vara){
	id2w(id1, sn(number, 0));
	window[vara] = number;
	var base = game;
	id2w(id2, sn2(base[water]['pipeprice'][price]*number));
}
refpipesnumber('watertab4buy', 'watertab4buyprice', 'coldwater', 0, 1, 'watertab4buynumber');
refpipesnumber('watertab4place', 'watertab4placeprice', 'coldwater', 1, 1, 'watertab4placenumber');
refpipesnumber('watertab7buy', 'watertab7buyprice', 'hotwater', 0, 1, 'watertab7buynumber');
refpipesnumber('watertab7place', 'watertab7placeprice', 'hotwater', 1, 1, 'watertab7placenumber');


function Bank(a, b, c){
	/*
	a=0 loan
	a=1 balance
	b=0 in
	b=1 out
	c amount of money
	*/
	var c = Number(c);
	if(a==0 && b==0 && game.bank.money>=c && game.bank.loan-c>=0){
		game.bank.loan = game.bank.loan - c;
		game.bank.money = game.bank.money - c;
	}
	else if(a==0 && b==1 && game.bank.loan+c<=game.bank.maxloan){
		game.bank.loan = game.bank.loan + c;
		game.bank.money = game.bank.money + c;
	}
	else if(a==1 && b==0 && game.bank.money>=c){
		game.bank.balance= game.bank.balance + c;
		game.bank.money = game.bank.money - c;
	}
	else if(a==1 && b==1 && game.bank.balance>=c){
		game.bank.balance = game.bank.balance - c;
		game.bank.money = game.bank.money + c;
	}
	id2w("money", sn2(game.bank.money));
	refreshbank();
}