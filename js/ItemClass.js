class Item {
    constructor () {
        this.gameBoard = document.getElementById('board');
        this.item = null;
        this.x = Math.floor(Math.random() * 30) * 20;
        this.y = Math.floor(Math.random() * 30) * 20;
        this.width = 20;
        this.height = 20;

    }
    create () {
        this.item = document.createElement('div');
        this.item.className = 'item'
        this.gameBoard.appendChild(this.item);
    }

    draw () {
        this.item.style.width = this.width + 'px';
        this.item.style.height = this.height + 'px';
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


export {Item, StaticObstacle, MovingObstacle};