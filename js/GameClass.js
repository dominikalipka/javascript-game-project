import {Snake, SnakeBody} from "./SnakeClass.js";
import {Item, StaticObstacle, MovingObstacle} from "./ItemClass.js";

let gameBoard = document.getElementById('board');
let scoreElm = document.getElementById('score');

class Game {
    constructor () {
        this.gameBoard = gameBoard;
        this.snake = null;
        this.snakebody = null;
        this.item = null;
        this.staticObstaclesArray = [];
        this.movingObstaclesArray = [];
        this.currentTime = 0;
        this.score = 0;
    }

    startGame () {
        this.snake = new Snake ();
        this.snake.create();
        this.snake.draw();

        this.snakebody = new SnakeBody ();
        this.snakebody.create();
        this.snakebody.draw();

        this.item = new Item ();
        this.item.create();
        this.item.draw();

        this.addEventListeners();
        
    
        this.gameInterval = setInterval(() => {
            this.currentTime++;
            
            this.snake.moveForward();
            this.snake.draw();

            this.snakebody.moveForward();
            this.snakebody.draw();
            
            this.collectItemAndAddStaticObstacle();

            this.addMovingObstacles();
            this.removeMovingObstacles();

            this.hitWallOrStaticObstacleOrMovingObstacle();

            this.showWinScreen();
            
         }, 100);
    }

    collectItemAndAddStaticObstacle () {
        if (this.snake.x === this.item.x && this.snake.y === this.item.y) {
            this.score += 10;
            scoreElm.innerHTML = this.score;
            this.item.remove();
            this.item = new Item ();
            this.item.create();
            this.item.draw();
            this.addStaticObstacles();
            this.changeNavigation();
        }
    }

    addStaticObstacles () {
        if (this.score > 30 && this.score < 150) {
                let newObstacle = new StaticObstacle ();
                newObstacle.create();
                newObstacle.draw();
                this.staticObstaclesArray.push(newObstacle);
        } 
    }

    removeStaticObstacles () {
        this.staticObstaclesArray.forEach ((obstacle) =>  {
            obstacle.remove();
        })
        this.staticObstaclesArray = [];
    }

    addMovingObstacles () {
        if (this.score > 100 && this.score < 200 && this.currentTime % 30 === 0) {
            let newMovingObstacle = new MovingObstacle ();
            newMovingObstacle.create();
            this.movingObstaclesArray.push(newMovingObstacle);
            console.log(this.movingObstaclesArray);
        }

        if (this.score >= 200 && this.currentTime % 15 === 0) {
            let newMovingObstacle = new MovingObstacle ();
            newMovingObstacle.create();
            this.movingObstaclesArray.push(newMovingObstacle);
            console.log(this.movingObstaclesArray);
        }

        this.movingObstaclesArray.forEach( (obstacle) => {
            obstacle.moveDown();
            obstacle.draw();
        });
    }

    removeMovingObstacles () {
        this.movingObstaclesArray.forEach ((obstacle) => {
            if (obstacle.y === 600) {
                obstacle.remove();
                this.movingObstaclesArray.shift();
            }
        })
    }

    hitWallOrStaticObstacleOrMovingObstacle () {
        // HIT WALL
        if (this.snake.x + this.snake.width > 600  || this.snake.x < 0 || this.snake.y + this.snake.height > 600 || this.snake.y < 0) {
            this.restartGame();
        }

        // HIT STATIC OBSTACLES
        this.staticObstaclesArray.forEach ((obstacle) => {
            if (this.snake.x === obstacle.x && this.snake.y === obstacle.y) {
                this.restartGame();
                }
        })

        // HIT MOVING OBSTACLES
        this.movingObstaclesArray.forEach ((obstacle) => {
            if (this.snake.x < obstacle.x + obstacle.width &&
                this.snake.x + obstacle.width > obstacle.x &&
                this.snake.y < obstacle.y + obstacle.height &&
                this.snake.y + this.snake.height > obstacle.y) {
                this.restartGame();
            }
        })
    }

    restartGame () {
        this.playLostSound();
        alert("You lost :( Let's try one more time, shall we?");
        this.snake.x = 300;
        this.snake.y = 300;
        this.snakebody.x = 300;
        this.snakebody.y = 300;
        this.score = 0;
        scoreElm.innerHTML = this.score;
        this.removeStaticObstacles();
        this.movingObstaclesArray.forEach ((obstacle) =>  {
            obstacle.remove();
        })
        this.movingObstaclesArray = [];
    }

    addEventListeners () {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                if (this.score < 300) {
                    if (this.snake.direction === 'Right') {
                    return;
                    }
                    this.snake.direction = 'Left';
                    this.snakebody.direction = 'Left';
                } else {
                    if (this.snake.direction === 'Left') {
                    return;
                    }
                    this.snake.direction = 'Right';
                    this.snakebody.direction = 'Right';
                }
            } else if (event.key === 'ArrowRight') {
                if (this.score < 300) {
                    if (this.snake.direction === 'Left') {
                    return;
                    }
                    this.snake.direction = 'Right';
                    this.snakebody.direction = 'Right';
                } else {
                    if (this.snake.direction === 'Right') {
                    return;
                    }
                    this.snake.direction = 'Left';
                    this.snakebody.direction = 'Left';
                }
            }   else if (event.key === 'ArrowUp') {
                if (this.score < 300) {
                    if (this.snake.direction === 'Down') {
                    return;
                    }
                    this.snake.direction = 'Up';
                    this.snakebody.direction = 'Up';
                } else {
                    if (this.snake.direction === 'Up') {
                    return;
                    }
                    this.snake.direction = 'Down';
                    this.snakebody.direction = 'Down';
                }
            }   else if (event.key === 'ArrowDown') {
                if (this.score < 300) {
                    if (this.snake.direction === 'Up') {
                    return;
                    }
                    this.snake.direction = 'Down';
                    this.snakebody.direction = 'Down';
                } else {
                    if (this.snake.direction === 'Down') {
                    return;
                    }
                    this.snake.direction = 'Up';
                    this.snakebody.direction = 'Up';
                }
            }   
        })
    }

    changeNavigation () {
        if (this.score === 300) {
            //PAUSE THE GAME:
            alert('Oh no! You flew too close to the black hole and now the spaceship navigation is all messed up... Learn quickly how to steer it and collect the second part of the stars. You are half way through!')
            
            // REMOVE ALL STATIC OBSTACLES:
            this.staticObstaclesArray.forEach ((obstacle) =>  {
            obstacle.remove();
            })
            this.staticObstaclesArray = [];

            // REMOVE ALL MOVING OBSTACLES:
            this.movingObstaclesArray.forEach ((obstacle) =>  {
               obstacle.remove();
            })
            this.movingObstaclesArray = [];
        }
        
    }

    playLostSound () {
        document.getElementById('lost-sound').play();
    }

    showWinScreen () {
        if (this.score === 500) {
            this.snake = null;
            this.modal = document.getElementById('modal-with-background');
            this.modal.style.visibility = 'visible';
            this.modalBtn = document.getElementById('modal-btn');
            this.modalBtn.addEventListener('click', () => {
              location.reload();
            
            })
        }

    }
}

export default Game;