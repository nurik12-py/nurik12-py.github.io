class Car {
    constructor(x, y, speed, id) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.id = id;
        this.prev = new Node(null, x, y);
        this.car = document.getElementById(id);
    }

    moveCar(speed, x, y) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.car.style["top"] = `${x}px`;
                this.car.style["left"] = `${y}px`;
                resolve();
            }, speed);
        })
    }

    radToDegree(rad) {
        return (rad * 180) / Math.PI;
    }

    rideCar(node) {
        return new Promise(async (resolve) => {
            var cell = $(`#cell-${node.x}-${node.y}`);
            cell.css('background-color', ROAD_COLOR);
            var dy = node.x - this.prev.x;
            var dx = node.y - this.prev.y;
            var dir = this.radToDegree(Math.atan2(dy, dx));
            this.car.style["transform"] = `rotate(${dir}deg)`;
            var currentX = node.x * 30 - 15;
            var currentY = node.y * 30 - 15;
            for (var j = 0; j < 30; j++) {
                await this.moveCar(this.speed, currentX + j * dy, currentY + j * dx);
            }
            this.prev = node;
            resolve();
        });
    }

    followPath(path) {
        return new Promise(async (resolve) => {
            var kmLeft = (path.length * 0.33).toFixed(1);
            for (var node of path) {
                $("#route-details").text(`${kmLeft}km left`);
                await this.rideCar(node);
                kmLeft = (kmLeft - 0.33).toFixed(1);
            }
            $("#route-details").text(`You are in place`);
            resolve();
        });
    }
}