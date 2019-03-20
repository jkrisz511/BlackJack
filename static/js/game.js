function main() {
    let startButton = document.getElementById('start');
    startButton.addEventListener('click', getDealersCard);
    startButton.addEventListener('click', getPlayersCard);
    hitCard();
    changeBet();
}


function random() {
    let cards = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S",
                "7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","AC","AD","AH","AS",
                "JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS"];
    return cards[Math.floor(Math.random() * cards.length)]
}

function getDealersCard() {
    let card = random();
    let dealer = document.getElementById("dealer");
    dealer.insertAdjacentHTML("beforeend", `<div class="card"><img src="/static/img/${card}.png"></div>`);
}

function getPlayersCard() {
    let card = random();
    let player = document.getElementById("player");
    player.insertAdjacentHTML("beforeend", `<div class="card"><img src="/static/img/${card}.png" height="135px" width="85px"></div>`);
}

function hitCard() {
    let hitButton = document.getElementById('hit');
    hitButton.addEventListener('click', getPlayersCard);
}

function changeBet() {
    let amount = 50;
    let amountContainer = document.getElementById('betAmount');
    let raiseButton = document.getElementById('up');
    console.log(raiseButton)
    let decreaseButton = document.getElementById('down');

    raiseButton.addEventListener('click', function() {
       amount += 10;
       amountContainer.innerHTML = `Bet:<span>${amount} $</span>`;
    })

    decreaseButton.addEventListener('click', function() {
       amount -= 10;
       amountContainer.innerHTML = `Bet:<span>${amount} $</span>`;
    })
}

main();

