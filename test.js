function findRandom() {
  return Math.floor(Math.random() * 99); //Finds number between 0 - 99
}


// create array of 99 holes
var holes = Array.apply(null, Array(99)).map(function () { });

// and a rabbet can be in a random hole
let rabbitPosition = findRandom();
holes[rabbitPosition] = true;


let i = 1;

let start = 0;

let counter = 0;
while (i) {

  counter += 1;
  let found = false;
  // check a hole if found set found to true
  if (holes[start]) {
    found = true;
  }
  if (found)
    break;

  start = (start + 1) % 99;
  // rubbet moves to +1 or -1
  moveRubbit();

}


function moveRubbit() {
  let step = Math.round(Math.random()) < 0.5 ? -1 : 1;
  holes[rabbitPosition] = false
  if (rabbitPosition == 0)
    rabbitPosition += 1;
  else if (rabbitPosition == 99)
    rabbitPosition -= 1;
  else {
    rabbitPosition += step;
  }
  holes[rabbitPosition] = true;
}

console.log(counter);
