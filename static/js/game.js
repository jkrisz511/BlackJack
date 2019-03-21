
let player_values =0;
let dealer_values =0;
let dace1 = false;
let ace1 = false;
let ace2 = false;
let amount = 0;
let balance = 500;

function main() {
    startGame();
    changeBet();
}

function startGame() {

    let standButton = document.getElementById('stand');
    let betButton = document.getElementById("ok");

    betButton.addEventListener("click", bet);
    betButton.addEventListener('click', getStarterCards);
    betButton.addEventListener('click', playersValue);
    betButton.addEventListener('click', dealersValue);
    betButton.addEventListener('click', showFakeCard);
    standButton.addEventListener('click', dealerMoves);
    standButton.addEventListener('click', dealersValue);
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
    let future_value =dealer_values + getValues(card);
    if ((card === "AC" || card === "AD" || card === "AH" || card === "AS") && future_value>21){
        dealer_values += 1;
    } else {
        dealer_values += getValues(card);
    }
    let dealer = document.getElementById("dealer");
    dealer.insertAdjacentHTML("beforeend", `<div class="card" id="boardCards"><img src="/static/img/${card}.png"></div>`);
}

function checkAcesForPlayer(card) {
    let future_value =player_values + getValues(card);
    let aceCard = (card === "AC" || card === "AD" || card === "AH" || card === "AS");
    if (ace1 ===false && !aceCard){
        player_values += getValues(card);
    }else if (ace1 === false && aceCard && player_values <= 10){
        player_values += getValues(card);
        ace1 = true;
    }else if (ace1 === false && aceCard && future_value > 21){
        player_values += 1;
        ace1 =true;
        ace2 = true;
    }else if (ace1 === true && aceCard && player_values > 21){
        player_values += 1;
        ace2 = true;
    }else if (ace1 === true && ace2 === false &&!aceCard && future_value > 21){
        player_values -= 10;
        player_values += getValues(card);
        ace2 = true;
    }else if (ace1 === true && ace2 === false &&!aceCard){
        player_values += getValues(card);
    }else if (ace1 === true && ace2 === true &&!aceCard){
        player_values += getValues(card);
    }else if (ace1 === true && ace2 === true &&!aceCard && future_value > 21) {
        player_values += getValues(card);
        ace2 = true;
    }else if (ace1 === true && ace2 === true &&aceCard && future_value > 21) {
        player_values += 1;
        ace2 = true;
    }
}


function getPlayersCard() {
    let card = random();
    checkAcesForPlayer(card);
    let player = document.getElementById("player");
    player.insertAdjacentHTML("beforeend", `<div class="card" id="boardCards"><img src="/static/img/${card}.png"></div>`);
    if (player_values === 21){
        winPopup();
        closePopup();
    }
    if (player_values > 21){
        losePopup();
        closePopup();
    }
}

function hitCard() {
    let hitButton = document.getElementById('hit');
    hitButton.addEventListener('click', getPlayersCard);
    hitButton.addEventListener('click', playersValue);

}

function changeBet() {
    let balanceContainer = document.getElementById('balance');
    let amountContainer = document.getElementById('betAmount');
    let raiseButton = document.getElementById('up');
    let decreaseButton = document.getElementById('down');

    raiseButton.addEventListener('click', function() {
       if (balance > 0) {
           amount += 10;
           balance -= 10;
           amountContainer.innerHTML = `Bet: <span>${amount} $</span>`;
           balanceContainer.innerHTML = `Balance: <span>${balance} $</span>`;
       }
    })

    decreaseButton.addEventListener('click', function() {
       if (amount > 0) {
           amount -= 10;
           balance += 10;
           amountContainer.innerHTML = `Bet:<span>${amount} $</span>`;
           balanceContainer.innerHTML = `Balance: <span>${balance} $</span>`;
       }
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

function changeCard() {
    let element = document.getElementById("back");
    element.parentNode.removeChild(element);
    let card = random();
    dealer_values += getValues(card);
    let dealer = document.getElementById("dealer");
    dealer.insertAdjacentHTML("beforeend", `<div class="card" id="boardCards"><img src="/static/img/${card}.png"></div>`);
}

function tiePopup() {
    let popup = document.querySelector('.popup-container');
    let tieMessage = document.querySelector('.tie');
    let closeIcon = document.getElementById('second-close-icon');
    let balanceContainer = document.getElementById('balance');
    popup.classList.remove('hidden');
    tieMessage.classList.remove('hidden');
    closeIcon.classList.remove('hidden');
    balanceContainer.innerHTML = `Balance: <span>${balance + amount} $</span>`;
}

function winPopup() {
    let popup = document.querySelector('.popup-container');
    let winMessage = document.querySelector('.win');
    let closeIcon = document.getElementById('second-close-icon');
    let balanceContainer = document.getElementById('balance');

    popup.classList.remove('hidden');
    winMessage.classList.remove('hidden');
    closeIcon.classList.remove('hidden');
    amount *= 2;
    console.log(amount);
    balanceContainer.innerHTML = `Balance: <span>${balance + amount} $</span>`;
}


function losePopup() {
    let popup = document.querySelector('.popup-container');
    let loseMessage = document.querySelector('.lose');
    let closeIcon = document.getElementById('second-close-icon');
    popup.classList.remove('hidden');
    loseMessage.classList.remove('hidden');
    closeIcon.classList.remove('hidden');


}

function dealerMoves() {
    changeCard();
    while (dealer_values <= 16) {
        getDealersCard();
    }

    if (dealer_values === player_values) {
        tiePopup();
        closePopup();
    }
    if (dealer_values <= 21 && dealer_values > player_values) {
        losePopup();
        closePopup();
    }
    if ((player_values > dealer_values && player_values <= 21) || dealer_values > 21) {
        winPopup();
        closePopup();
    }
}

function showFakeCard() {
    dealer.insertAdjacentHTML("beforeend", `<div class="card" id="back"><img src="/static/img/green_back.png"></div>`);
}

function setupNextRound() {
    amount = 0;
    player_values =0;
    dealer_values =0;
    document.getElementById("playerValue").innerHTML = player_values;
    document.getElementById("dealerValue").innerHTML = dealer_values;

    let dealer = document.getElementById("dealer");
    dealer.innerHTML = '';
    let player = document.getElementById("player");
    player.innerHTML = '';

    let closeIcon = document.getElementById("second-close-icon");
    let popup = document.querySelector('.popup-container');
    let loseMessage = document.querySelector('.lose');
    let winMessage = document.querySelector('.win');
    let tieMessage = document.querySelector('.tie');
    let betButton = document.getElementById("ok");
    let upButton = document.getElementById("up");
    let downButton = document.getElementById("down");
    let amountContainer = document.getElementById('betAmount');

    amountContainer.innerHTML = `Bet: <span>${amount} $</span>`;

    popup.classList.add('hidden');
    loseMessage.classList.add('hidden');
    winMessage.classList.add('hidden');
    tieMessage.classList.add('hidden');
    closeIcon.classList.add('hidden');

    betButton.classList.remove("hidden");
    upButton.classList.remove("hidden");
    downButton.classList.remove("hidden");

}

function resetGame() {
    balance = 500;
    setupNextRound();
}

function closePopup() {
    let closeIcon = document.getElementById("second-close-icon");
    closeIcon.addEventListener("click", setupNextRound);
}

function bet() {
    let betButton = document.getElementById("ok");
    let upButton = document.getElementById("up");
    let downButton = document.getElementById("down");

    betButton.classList.add("hidden");
    upButton.classList.add("hidden");
    downButton.classList.add("hidden");

}



main();

