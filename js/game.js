Array.prototype.shuffle = function () {
    let newArr = this.slice(), i = this.length, randIndex;
    while (i) {
        randIndex = Math.floor(Math.random() * i);
      [newArr[i-1], newArr[randIndex]] = [newArr[randIndex], newArr[i-1]];
      i--;
    }
    return newArr;
}

let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

let resArr = arr.shuffle();

item1.innerHTML = arr[0];
