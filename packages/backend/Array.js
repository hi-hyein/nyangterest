const ToTwoDimensionalArray = function (divideBy) {
    const array = this;
    const length = array.length;
    const count = Math.ceil(length / divideBy);
    const items = [];
    for (let i = 0; i < count; i++) {
        items.push(array.splice(0, divideBy));
    }
    return items;
}

exports.ToTwoDimensionalArray = ToTwoDimensionalArray;