function update_money() {
    document.querySelector('#money').textContent = format_money(game.bank.money);
}