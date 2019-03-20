function random() {
    let cards = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S",
                "7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","AC","AD","AH","AS",
                "JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS"];
    return cards[Math.floor(Math.random() * cards.length)]

}

function getCard() {
    let card = random();
    let card1 = document.getElementById("board1");
    card1.insertAdjacentHTML("beforeend", `<img src="/static/img/`card`.png" height="135px" width="85px">`);
}

function img_create(src) {
   (new Image()).src ="static/img/"+src+".png";

}

