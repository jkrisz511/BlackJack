
let player_values =0;
let dealer_values =0;

function main() {
    startGame();
    changeBet();
}

function startGame() {
    let startButton = document.getElementById('start');
    startButton.addEventListener('click', getStarterCards);
    startButton.addEventListener('click', playersValue);
    startButton.addEventListener('click', dealersValue);
    hitCard()

}

function random() {
    let cards = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S",
                "7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","AC","AD","AH","AS",
                "JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS"];

    return cards[Math.floor(Math.random() * cards.length)]
}

function getValues(card) {
    let values = {
        "2C":2,"2D":2,"2H":2,"2S":2,"3C":3,"3D":3,"3H":3,"3S":3,"4C":4,"4D":4,"4H":4,"4S":4,"5C":5,"5D":5,
        "5H":5,"5S":5,"6C":6,"6D":6,"6H":6,"6S":6,"7C":7,"7D":7,"7H":7,"7S":7,"8C":8,"8D":8,"8H":8,"8S":8,
        "9C":9,"9D":9,"9H":9,"9S":9,"10C":10,"10D":10,"10H":10,"10S":10,"AC":11,"AD":11,"AH":11,"AS":11,
        "JC":10,"JD":10,"JH":10,"JS":10,"KC":10,"KD":10,"KH":10,"KS":10,"QC":10,"QD":10,"QH":10,"QS":10};
    return values[card]

}

function getDealersCard() {
    let card = random();
    dealer_values += getValues(card);
    let dealer = document.getElementById("dealer");
    dealer.insertAdjacentHTML("beforeend", `<div class="card"><img src="/static/img/${card}.png" height="135px" width="85px"></div>`);
    dealer.insertAdjacentHTML("beforeend", `<div class="card"><img src="/static/img/green_back.png" height="135px" width="85px"></div>`);
}

function getPlayersCard() {
    let card = random();
    player_values += getValues(card);
    let player = document.getElementById("player");
    player.insertAdjacentHTML("beforeend", `<div class="card"><img src="/static/img/${card}.png" height="135px" width="85px"></div>`);
}

function hitCard() {
    let hitButton = document.getElementById('hit');
    hitButton.addEventListener('click', getPlayersCard);
    hitButton.addEventListener('click', playersValue);
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

function getStarterCards() {
    getDealersCard();
    for (let i=0; i<2; i++){
        getPlayersCard();
    }
}

function playersValue() {
    document.getElementById("playerValue").innerHTML = player_values;
}

function dealersValue() {
    document.getElementById("dealerValue").innerHTML = dealer_values;
}

main();
