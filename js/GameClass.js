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
    
        setInterval(() => {
            this.currentTime++;
            
            this.snake.moveForward();
            this.snake.draw();

            this.snakebody.moveForward();
            this.snakebody.draw();
            
            this.collectItemAndAddStaticObstacle();

            this.addMovingObstacles();
            this.removeMovingObstacles();

            this.hitWallOrStaticObstacleOrMovingObstacle();
            
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
        if (this.score > 100 && this.score < 200 && this.currentTime % 25 === 0) {
            let newMovingObstacle = new MovingObstacle ();
            newMovingObstacle.create();
            this.movingObstaclesArray.push(newMovingObstacle);
            console.log(this.movingObstaclesArray);
        }

        if (this.score >= 200 && this.currentTime % 10 === 0) {
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

    hitWallOrStaticObstacleOrMovingObstacle () { // SHOULD REWRITE THIS METHOD -> TOO REPETITIVE
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

    // addEventListeners () {
    //     document.addEventListener('keydown', (event) => {
    //         if(event.key === 'ArrowLeft') {
    //             if (this.snake.direction === 'Right') {
    //                 return;
    //             }
    //             this.snake.direction = 'Left';
    //             this.snakebody.direction = 'Left';
    //     }   else if (event.key === 'ArrowRight') {
    //             if (this.snake.direction === 'Left') {
    //                 return;
    //             }
    //             this.snake.direction = 'Right';
    //             this.snakebody.direction = 'Right';
    //     }   else if (event.key === 'ArrowUp') {
    //             if (this.snake.direction === 'Down') {
    //                 return;
    //             }
    //             this.snake.direction = 'Up';
    //             this.snakebody.direction = 'Up';
    //     }   else if (event.key === 'ArrowDown') {
    //          if (this.snake.direction === 'Up') {
    //                 return;
    //             }
    //             this.snake.direction = 'Down';
    //             this.snakebody.direction = 'Down';
    //     }
    //     })
    // }

    // addEventListenersNextLevel () {
    //     document.addEventListener('keydown', (event) => {
    //         if(event.key === 'ArrowLeft') {
    //             if (this.snake.direction === 'Left') {
    //                 return;
    //             }
    //             this.snake.direction = 'Right';
    //             this.snakebody.direction = 'Right';
    //     }   else if (event.key === 'ArrowRight') {
    //             if (this.snake.direction === 'Right') {
    //                 return;
    //             }
    //             this.snake.direction = 'Left';
    //             this.snakebody.direction = 'Left';
    //     }   else if (event.key === 'ArrowUp') {
    //             if (this.snake.direction === 'Up') {
    //                 return;
    //             }
    //             this.snake.direction = 'Down';
    //             this.snakebody.direction = 'Down';
    //     }   else if (event.key === 'ArrowDown') {
    //          if (this.snake.direction === 'Down') {
    //                 return;
    //             }
    //             this.snake.direction = 'Up';
    //             this.snakebody.direction = 'Up';
    //     }
    //     })
    // }

    // SOUND EFFECTS

    playLostSound () {
        document.getElementById('lost-sound').play();
    }
}

export default Game;