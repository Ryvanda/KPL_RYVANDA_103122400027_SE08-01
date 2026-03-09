function FizzBuzz(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++){
        let num = arr [i];

        if (num % 14 === 0){
            result.push("FizzBuzz");
        }
        else if (num % 7 === 0){
            result.push("Buzz");
        }
        else if (num % 2 === 0){
            result.push("Fizz");
        }
        else {
            result.push(num);
        }
}
    return result.join(" ");
}
module.exports = FizzBuzz;