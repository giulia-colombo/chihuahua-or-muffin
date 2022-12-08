//TO DO:
//1. when clicking start button
//start with a clear game area
//1.a display imgs - done
//1.b display a random category - done
//1.c start timer

//2. when img clicked
// nb the array that contains the cards could be shuffled everytime the play button is played
//2.a check category, display right or wrong message - done
//2.b shade img - done
//2.c if category right, display category - done
//2.d if all cards clicked - game finished - done
//2.e if category wrong,  game finished/over // done

//4. if time runs out
//game game finished/over - DONE

//3a. if game finished/won, 
//stop timer
//hide everything
//display play again button

//4a. if game finished/over, 
//display play again page w button

//5a. if play again,
//restart game board by either
// a) generating a new board using the class, or
// b) clearing the board 

//different cases are
//1 - we click on all the right images: game won - needs work
//2 - we click on one wrong image: game lost - WORKS, but not showing play again
//3 - time runs out: game lost - WORKS, but not showing play again



const screenPlay = document.querySelector("#screen-play");
const gameBoard = document.querySelector("#game-board"); //our parent
const startBtn = document.querySelector("#start-btn");
const playAgainBtn = document.querySelector("#play-again-btn");
const cards = document.getElementsByClassName("card") //array of all the div with class card
// console.log(cards);
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
        this.width = "300px"
        this.height = "300px";
        this.category = "";
        this.cardsClicked = [];
        this.gameFinished = false;
        this.gameStatus = "";
        this.timer = 10;

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
            // console.log(shuffledImages);
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


    // shuffleImages () {
        //function that shuffles the array of images
    // }

    displayCategory () {
        //pick a random category between chihuahua and muffin
        //display inside the h1 tag in #screen-play
        this.category = categories[Math.floor(Math.random()*categories.length)];
        displayedCategory.innerText = `Get all the ${this.category}s!`;
        this.attachClickEvent();
    }

    attachClickEvent () {
        this.images.forEach((image) => {
            image.addEventListener("click", (event) => {
                let clickedCard = event.target
                // console.log(clickedCard);
                let clickedCategory = clickedCard.getAttribute("category");
                // console.log(clickedCategory);
                // console.log(this.category);
                const thisCategoryLow = (this.category).toLowerCase()
                if (clickedCategory === thisCategoryLow) {
                    message.innerHTML = `Yay! It's a ${thisCategoryLow}! :)`;
                    clickedCard.style.opacity = "0.8"
                    this.cardsClicked.push(clickedCard);
                    // this.gameStatus = "won";
                    this.checkGameWon();
                }
                if (clickedCategory !== thisCategoryLow) {
                    message.innerHTML = `Are you sure that was a ${thisCategoryLow}? :( `
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
        // gameBoard.style.display = "none";
        countdown.style.display = "none";
        displayedCategory.style.display = "none";
        gameStatusMessage.style.display = "block";
        gameStatusMessage.innerHTML = "You won!"
        message.style.display = "none";
        setTimeout(() => {
            this.playAgain();
        }, 2000);
    }
 
    displayGameOver () {
        // gameBoard.style.display = "none";
        countdown.style.display = "none";
        displayedCategory.style.display = "none";
        gameStatusMessage.style.display = "block";
        gameStatusMessage.innerHTML = "Game over!" //too fast

        // this.gameFinished = true;
        setTimeout(() => {
            this.playAgain();
        }, 2000);
        
    }


    playAgain () {
        // what happens when game is finished (this.gameFinished === true), and we ask if player wants to play again
            //make the game-board go away
            this.images = [];
            this.cardsClicked = [];
            this.timer = 10;
            clearInterval(clock);
            gameBoard.innerHTML = "";
            message.style.display = "none";
            gameStatusMessage.innerHTML = "Play again?";
            startBtn.style.display = "block";
            startBtn.innerHTML = "Play again";
            //create button to restart/play again
            //display "Play again button?"
        
    }


    startCountdown () {
        //start from 10 - done
        //decrease by 1 until 0 - done
        //display updated value each time by updating value of the countdown div - done
        //timer needs to stop also if wrong card is clicked
        //when counter reaches 0, display game over

        clock = setInterval(() => {
            if (this.timer >= 0) {
                countdown.innerHTML = this.timer;
            } else {
                this.displayGameOver();
            }

            this.timer--;
        }, 1000);
        // displayGameOver();
    }

}

const theGameArea = new gameArea();

window.addEventListener('load', () => {
    console.log("page is loaded");
    startBtn.innerHTML = "Start the game";

})

startBtn.addEventListener('click', (event) => {
    theGameArea.hideStartBtn();
});







  





    