var arr = [],
    box, ei, ej;
Array.prototype.shuffle = function(i1, j1, i2, j2) {
    t = this[i1][j1];
    this[i1][j1] = this[i2][j2];
    this[i2][j2] = t;
}

window.onload = function() {
    box = document.getElementById("box");
    var startButton = document.querySelector('.start-game');

    startButton.onclick =  startGameClicked;


    function startGameClicked() {
        var difficulty = document.querySelector('[name="game-difficulty"]:checked').value;

        newGame(difficulty);
    }
    newGame(difficulty);

}



function startGameTimer() {
  this.timeContainer = document.querySelector('.time-text');
  this.gameTime = 0;
        this.timeContainer.innerHTML = '' + this.gameTime;
        this.gameInterval = setInterval(() => {
            this.timeContainer.innerHTML = '' + ++this.gameTime;
        }, 1000);
    }

function cellClick(event) {
    var dif = document.querySelector('[name="game-difficulty"]:checked').value;
    var event = event || window.event,
        el = event.srcElement || event.target,
        i = el.id.charAt(0),
        j = el.id.charAt(2);
    if ((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)) {
        document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
        el.innerHTML = "";
        ei = i;
        ej = j;
        var q = true;
        for (i = 0; i < dif; ++i)
            for (j = 0; j < dif; ++j)
                if (i + j != dif*2-2 && document.getElementById(i + " " + j).innerHTML != i * dif + j + 1) {
                    q = false;
                    break;
                }
        if (q) alert("Victory!");
    }
}

function newGame(dif) {
  startGameTimer();
    for (i = 0; i < dif; ++i) {
        arr[i] = []
        for (j = 0; j < dif; ++j) {
            if (i + j != dif * 2 - 2)
                arr[i][j] = i * dif + j + 1;
            else
                arr[i][j] = "";
        }
    }
    ei = dif-1;
    ej = dif-1;
    for (i = 0; i < 1000000; ++i)
        switch (Math.round(3 * Math.random())) {
            case 0:
                if (ei != 0) arr.shuffle(ei, ej, --ei, ej);
                break; // up
            case 1:
                if (ej != dif-1) arr.shuffle(ei, ej, ei, ++ej);
                break; // right
            case 2:
                if (ei != dif-1) arr.shuffle(ei, ej, ++ei, ej);
                break; // down
            case 3:
                if (ej != 0) arr.shuffle(ei, ej, ei, --ej); // left
        }
    var table = document.createElement("table"),
        tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (i = 0; i < dif; ++i) {
        var row = document.createElement("tr");
        for (j = 0; j < dif; ++j) {
            var cell = document.createElement("td");
            cell.id = i + " " + j;
            cell.onclick = cellClick;
            cell.innerHTML = arr[i][j];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    if (box.childNodes.length == 1)
        box.removeChild(box.firstChild);
    box.appendChild(table);
}
