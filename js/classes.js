let gameBoard = document.getElementById('board');
let scoreElm = document.getElementById('score');

class Game {
    constructor () {
        this.gameBoard = gameBoard;
        this.snake = null;
        this.snakebody = null;
        this.item = null;
        this.obstaclesArray = [];
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
            
            this.eatItem();


            // HIT WALL
            if (this.snake.x + this.snake.width > 600  || this.snake.x < 0 || this.snake.y + this.snake.height > 600 || this.snake.y < 0) {
                alert('You lost!');
                window.location.reload();
                // this.restartGame();
                // this.restartScore();
                // this.removeStaticObstacles ();
            }

            // HIT STATIC OBSTACLES
            this.obstaclesArray.forEach ((obstacle) => {
                if (this.snake.x === obstacle.x && this.snake.y === obstacle.y) {
                    alert('You lost!');
                    window.location.reload();
                    // this.restartGame();
                    // this.restartScore();
                    // this.removeStaticObstacles ();
                    }
            })


            // CREATE MOVING OBSTACLES
            if (this.score > 10 && this.currentTime % 25 === 0) {
                let newMovingObstacle = new MovingObstacle ();
                newMovingObstacle.create();
                this.movingObstaclesArray.push(newMovingObstacle);
            }

            this.movingObstaclesArray.forEach( (obstacle) => {
                //update obstacle positions
                obstacle.moveDown();
                obstacle.draw();
            });

            // HIT MOVING OBSTACLES
            this.movingObstaclesArray.forEach ((obstacle) => {
                if (this.snake.x === obstacle.x && this.snake.y === obstacle.y ) {
                    alert('You lost!');
                    window.location.reload();
                }
            })

            // DELETE MOVING OBSTACLES
            this.movingObstaclesArray.forEach ((obstacle) => {
                if (obstacle.y === 600) {
                    obstacle.remove();
                    this.movingObstaclesArray.shift();
                }
            })
            
         }, 100);
    }

    eatItem () {
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
                this.obstaclesArray.push(newObstacle);
                console.log(this.obstaclesArray);
        } 
    }

    // addMovingObstacles () {
    //     if (this.score > 200 && this.currentTime % 10 === 0) {
    //         let newMovingObstacle = new MovingObstacle ();
    //         newMovingObstacle.create();
    //         newMovingObstacle.draw();
    //     }
    // }

    // removeStaticObstacles () {
    //     this.obstaclesArray.forEach ((obstacle) =>  {
    //         obstacle.remove();
    //         this.obstaclesArray.shift();
    //     })
    // }

    // restartGame () {
    //     this.snake.x = 300;
    //     this.snake.y = 300;
    //     this.snakebody.x = 300;
    //     this.snakebody.y = 300;
    // }

    // restartScore () {
    //     this.score = 0;
    //     scoreElm.innerHTML = this.score;
    // }


    addEventListeners () {
        document.addEventListener('keydown', (event) => {
            if(event.key === 'ArrowLeft') {
                if (this.snake.direction === 'Right') {
                    return;
                }
                this.snake.direction = 'Left';
                this.snakebody.direction = 'Left';
        }   else if (event.key === 'ArrowRight') {
                if (this.snake.direction === 'Left') {
                    return;
                }
                this.snake.direction = 'Right';
                this.snakebody.direction = 'Right';
        }   else if (event.key === 'ArrowUp') {
                if (this.snake.direction === 'Down') {
                    return;
                }
                this.snake.direction = 'Up';
                this.snakebody.direction = 'Up';
        }   else if (event.key === 'ArrowDown') {
             if (this.snake.direction === 'Up') {
                    return;
                }
                this.snake.direction = 'Down';
                this.snakebody.direction = 'Down';
        }
        })
    }
}

class Snake {
    constructor () {
        this.gameBoard = gameBoard;
        this.snake = null
        this.x = 300;
        this.y = 300;
        this.width = 20;
        this.height = 20;
        this.direction = 'Right';

    }
    create () {
        this.snake = document.createElement('div');
        this.snake.className = 'snake'
        this.gameBoard.appendChild(this.snake);
    }

    draw () {
        this.snake.style.width = this.width + 'px';
        this.snake.style.height = this.height + 'px';
        this.snake.style.left = this.x + 'px';
        this.snake.style.top = this.y + 'px';
    }
    moveForward () {
        switch(this.direction) {
            case "Up":
                this.moveUp();
                break;
            case "Down":
                this.moveDown();
                break;
            case "Right":
                this.moveRight();
                break;
            case "Left":
                this.moveLeft();
                break;
        }
    }

    moveUp () {
        this.y-=20;
    }

    moveDown () {
        this.y+=20;
    }

    moveLeft () {
        this.x-=20;
    }

    moveRight () {
        this.x+=20;
    }

}

class SnakeBody extends Snake {
    create () {
        this.snake = document.createElement('div');
        this.snake.className = 'snake snakebody'
        this.gameBoard.appendChild(this.snake);
    }
}

class Item {
    constructor () {
        this.gameBoard = document.getElementById('board');
        this.item = null;
        this.x = Math.floor(Math.random() * 30) * 20;
        this.y = Math.floor(Math.random() * 30) * 20;

    }
    create () {
        this.item = document.createElement('div');
        this.item.className = 'item'
        this.gameBoard.appendChild(this.item);
    }

    draw () {
        this.item.style.width = 20 + 'px';
        this.item.style.height = 20 + 'px';
        this.item.style.left = this.x + 'px';
        this.item.style.top = this.y + 'px';
    }
    
    remove () {
        this.gameBoard.removeChild(this.item);
    }
}

class StaticObstacle extends Item {
    create () {
        this.item = document.createElement('div');
        this.item.className = 'static-obstacle'
        this.gameBoard.appendChild(this.item);
    }
}

class MovingObstacle extends Item {
    constructor() {
        super();

        this.x = Math.floor(Math.random() * 30) * 20;
        this.y = 0;
    }
    create () {
        this.item = document.createElement('div');
        this.item.className = 'moving-obstacle'
        this.gameBoard.appendChild(this.item);
    }
    moveDown() {
        this.y = this.y + 10;
    }
}
