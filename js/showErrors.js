function NEMshow() {
	alertify.error("Not enough money");
}
function Error(a) {
	alertify.error(a);
}
function YWGMBshow() {
	gEBI("YWGMB").style.display = "block";
	setTimeout(function(){gEBI("YWGMB").style.display = "none";}, 2500);
}
function Success(a) {
	alertify.success(a);
}