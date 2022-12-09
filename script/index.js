
const screenPlay = document.querySelector("#screen-play");
const gameBoard = document.querySelector("#game-board"); //our parent
const startBtn = document.querySelector("#start-btn");
const playAgainBtn = document.querySelector("#play-again-btn");
const cards = document.getElementsByClassName("card") //array of all the div with class card
const displayedCategory = document.querySelector("#displayed-category");
const message = document.querySelector("#message");
const gameStatusMessage = document.querySelector("#game-status-message");
const countdown = document.querySelector("#countdown");
const timer = document.querySelector("#timer");
let gamesPlayed = 0;
let clock;

const categories = ["Chihuahua", "Muffin"];

const imagesChiMuf = [
    {name: "chihuahua-1", src:"chihuahua-1.jpg", alt:"chihuahua"},
    {name: "chihuahua-2", src:"chihuahua-2.jpg", alt:"chihuahua"},
    {name: "chihuahua-3", src:"chihuahua-3.jpg", alt:"chihuahua"},
    {name: "chihuahua-4", src:"chihuahua-4.jpg", alt:"chihuahua"},
    {name: "chihuahua-5", src:"chihuahua-5.jpg", alt:"chihuahua"},
    {name: "chihuahua-6", src:"chihuahua-6.jpg", alt:"chihuahua"},
    {name: "chihuahua-7", src:"chihuahua-7.jpg", alt:"chihuahua"},
    {name: "chihuahua-8", src:"chihuahua-8.jpg", alt:"chihuahua"},
    {name: "muffin-1", src:"muffin-1.jpg", alt:"muffin"},
    {name: "muffin-2", src:"muffin-2.jpg", alt:"muffin"},
    {name: "muffin-3", src:"muffin-3.jpg", alt:"muffin"},
    {name: "muffin-4", src:"muffin-4.jpg", alt:"muffin"},
    {name: "muffin-5", src:"muffin-5.jpg", alt:"muffin"},
    {name: "muffin-6", src:"muffin-6.jpg", alt:"muffin"},
    {name: "muffin-7", src:"muffin-7.jpg", alt:"muffin"},
    {name: "muffin-8", src:"muffin-8.jpg", alt:"muffin"},
]


class gameArea {
    constructor(images, width, height, category, cardsClicked, gameFinished) {
        this.images = [];
        this.category = "";
        this.cardsClicked = [];
        this.timer = 7;

    }

    hidePlayAgainBtn() {
        playAgainBtn.style.display = "none";
        this.createAppendDiv();
    }

    hideStartBtn() {
        //hide all non necessary buttons/writings at the start
        gamesPlayed += 1;
        startBtn.style.display = "none";
        gameStatusMessage.style.display = "none";
        countdown.style.display = "block";
        displayedCategory.style.display = "block";
        this.createAppendDiv();
    }
    
    shuffleCards(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
    }

    createAppendDiv() {
            gameBoard.style.display = "flex";
            const shuffledImages = this.shuffleCards(imagesChiMuf);
            shuffledImages.forEach(img => {
                const newDiv = document.createElement("div");
                newDiv.classList.add("card");
                newDiv.setAttribute("category", `${img.alt}`);
                newDiv.style.backgroundImage = `url(./images/${img.src})`;
                gameBoard.appendChild(newDiv);
                this.images.push(newDiv);
            })
        
        this.startCountdown();
        this.displayCategory();
        
    }

    displayCategory () {
        //pick a random category between chihuahua and muffin
        //display inside the h1 tag in #screen-play
        this.category = categories[Math.floor(Math.random()*categories.length)];
        const thisCategoryLow = this.category.toLowerCase()
        displayedCategory.innerText = `Get all the ${thisCategoryLow}s!`;
        this.attachClickEvent();
    }

    attachClickEvent () {
        this.images.forEach((image) => {
            image.addEventListener("click", (event) => {
                let clickedCard = event.target

                let clickedCategory = clickedCard.getAttribute("category");

                const thisCategoryLow = this.category.toLowerCase()
                if (clickedCategory === thisCategoryLow) {
                    message.innerHTML = `Yay! It's a ${thisCategoryLow}! :)`;
                    clickedCard.style.filter = "grayscale(100%)";
                    clickedCard.style.opacity = 0.3;
                    this.cardsClicked.push(clickedCard);
                    this.checkGameWon();
                }
                if (clickedCategory !== thisCategoryLow) {
                    message.style.display = "block";
                    message.innerHTML = `Are you sure that was a ${thisCategoryLow}? :( `
                    countdown.style.display = "none";
                    console.log("message: ", message, "countdown: ", countdown);
                    
                    this.displayGameOver();
                    
                }
            })
        })
    }

    checkGameWon () {
        if (this.cardsClicked.length === 8) {
            this.displayGameWon();            
        }
        console.log(this.cardsClicked.length, "test");
    }

    displayGameWon () {
        countdown.innerHTML = "";
        countdown.style.display = "none";
        displayedCategory.style.display = "none";
        setTimeout(() => {
            message.style.display = "none";
        },2000)        
        gameStatusMessage.style.display = "block";
        gameStatusMessage.innerHTML = "You won!"
        this.playAgain();
 
    }
 
    displayGameOver () {
        countdown.innerHTML = "";
        countdown.style.display = "none";
        displayedCategory.style.display = "none";
        setTimeout(() => {
            message.style.display = "none";
        },2000)
        
        gameStatusMessage.style.display = "block";
        gameStatusMessage.innerHTML = "Game over!" 
        this.playAgain();
        
    }


    playAgain () {    
            this.images = [];
            this.cardsClicked = [];
            this.timer = 7;
            clearInterval(clock);
            gameBoard.innerHTML = "";
            gameBoard.style.display = "none";
           
            
            setTimeout(() => {
                message.style.display = "none";
                gameStatusMessage.innerHTML = "Play again?";
                startBtn.style.display = "block";
                startBtn.innerHTML = "Play again";
            }, 2000)

    }


    startCountdown () {

        clock = setInterval(() => {
            if (this.timer >= 0) {
                
                countdown.innerHTML = `Time: ${this.timer}`;
                this.timer--;
            } else if(this.timer <0) {
                countdown.innerHTML = "Oh oh, time's out!"
                setTimeout(() => {
                    this.displayGameOver();
                }, 2000)
                
            }
            
        }, 1000);
    }

}

const theGameArea = new gameArea();

window.addEventListener('load', () => {
    console.log("page is loaded");
    gameBoard.style.display = "none";
    startBtn.innerHTML = "Start the game";

})

startBtn.addEventListener('click', (event) => {
    theGameArea.hideStartBtn();
});






  





    