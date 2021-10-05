let gameBoard = document.getElementById('board');

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

export {Snake, SnakeBody};