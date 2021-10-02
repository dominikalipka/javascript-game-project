class Game {
    constructor () {
        this.snake = null;
        this.item = null;
    }

    countScore () {
        
    }

    startGame () {
        this.snake = new Snake ();
        this.snake.create();
        this.snake.draw();

        this.item = new Item ();
        this.item.create();
        this.item.draw();

        this.addEventListeners();

        setInterval(() => {
            this.snake.moveForward();
            this.snake.draw();
            if (this.snake.x + this.snake.width > 100  || this.snake.x < 0 || this.snake.y + this.snake.height > 100 || this.snake.y < 0) {
                alert('You lost!');
                this.restartGame();
            }

         }, 100);
    }

    restartGame () {
        this.snake.x = 50;
        this.snake.y = 50
    }


    addEventListeners () {
        document.addEventListener('keydown', (event) => {
            if(event.key === 'ArrowLeft') {
                if (this.snake.direction === 'Right') {
                    return;
                }
                this.snake.direction = 'Left';
        }   else if (event.key === 'ArrowRight') {
                if (this.snake.direction === 'Left') {
                    return;
                }
                this.snake.direction = 'Right';
        }   else if (event.key === 'ArrowUp') {
                if (this.snake.direction === 'Down') {
                    return;
                }
                this.snake.direction = 'Up';
        }   else if (event.key === 'ArrowDown') {
             if (this.snake.direction === 'Up') {
                    return;
                }
                this.snake.direction = 'Down';
        }
        })
    }
}

class Snake {
    constructor () {
        this.gameBoard = document.getElementById('board');
        this.snake = null
        this.x = 50;
        this.y = 50;
        this.width = 3;
        this.height = 3;
        this.direction = 'Right';

    }
    create () {
        this.snake = document.createElement('div');
        this.snake.className = 'snake'
        this.gameBoard.appendChild(this.snake);
    }

    draw () {
        this.snake.style.width = this.width + '%';
        this.snake.style.height = this.height + '%';
        this.snake.style.left = this.x + '%';
        this.snake.style.top = this.y + '%';
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
        this.y--;
    }

    moveDown () {
        this.y++;
    }

    moveLeft () {
        this.x--;
    }

    moveRight () {
        this.x++;
    }
}

class Item {
    constructor () {
        this.gameBoard = document.getElementById('board');
        this.item = null;
        this.x = Math.floor(Math.random() * 100)
        this.y = Math.floor(Math.random() * 100)

    }
    create () {
        this.item = document.createElement('div');
        this.item.className = 'item'
        this.gameBoard.appendChild(this.item);
    }

    draw () {
        this.item.style.width = 3 + '%';
        this.item.style.height = 3 + '%';
        this.item.style.left = this.x + '%';
        this.item.style.top = this.y + '%';
    }
    
}