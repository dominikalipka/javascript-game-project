let gameBoard = document.getElementById('board');
let scoreElm = document.getElementById('score');

class Game {
    constructor () {
        this.gameBoard = gameBoard;
        this.snake = null;
        this.item = null;
        this.score = 0;
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
            this.eatItem();
            if (this.snake.x + this.snake.width > 600  || this.snake.x < 0 || this.snake.y + this.snake.height > 600 || this.snake.y < 0) {
                alert('You lost!');
                this.restartGame();
                this.restartScore();
            }

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
        }
    }

    restartGame () {
        this.snake.x = 300;
        this.snake.y = 300;
    }

    restartScore () {
        this.score = 0;
        scoreElm.innerHTML = this.score;
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