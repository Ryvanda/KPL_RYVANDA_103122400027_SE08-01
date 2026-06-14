function toNumberArray(number) {
  let tempArray = [];

  if (typeof number === "string") {
    return number.split(",");
  } else if (Array.isArray(number)) {
    tempArray = number;
  } 

  const result = []
  for(let i = 0; i <tempArray.length; i++) {
    let cleanValue = String(tempArray[i]).trim();
    let num = Number(cleanValue);

    if(!isNaN(num) && cleanValue !== "") {
      result.push(num);
    }
  }
  return result;
}

console.log(toNumberArray("1, 2")); // [1, 2]
console.log(toNumberArray(["1", "2"])); // [1, 2]
console.log(toNumberArray(" 11,55,33   ")); // [11, 55, 33]
console.log(toNumberArray(["0.2", "-11", "abc23"])); // [0.2, -11]
