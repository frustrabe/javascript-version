// Geting the html elements
const h1Numbers = document.getElementById("numbers");
const h4Combinations = document.getElementById("combinations-list");
const randomiseButton = document.querySelector(".random-btn");
const combinationsButton = document.querySelector(".combinations-btn");

// TASK 1

let randomNumbers = [];

// Function to calculate a randomised number
function calcRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Taking the randomNumbers array, mapping over it and executing a callback function that 
converts the elements to string. After that we set HTML element's h1Numbers textContent with the
result */
function displayRandomNumbers() {
  const indexWithRandomNumbers = randomNumbers.map((number) => `${number}`);
  h1Numbers.textContent = indexWithRandomNumbers;
}

/* */
function randomiseClick() {
  randomNumbers = Array.from({ length: 8 }, () => calcRandomNumber(1, 20));
  displayRandomNumbers();
}

// TASK 2

/* First defining our variables, an empty array as "combinations" and a error string so we just reference
it later in error handling. Then the function iterates over the randomNumbers array using forEach loop. After this 
we use the .slice method to create a shallow copy of a portion of the original array (starting from the current index + 1
as by default arrays start on 0). Then the nested forEach checks if the sum of the current number + the next number from
the sliced array is equal to or predefined number 21. If yes, then using .push method it we populate the "combinations" array
in the template literals format making use of embedding of expressions (in our case the index and nextIndex).
After this we are doing an error handling using .length method, in case our numbers don’t end up adding to a sum of 21 in which
case we push our error string into the "combinations" array. Then using .map we transform our array and wrap each combination
in its seperate div with a bullet point in front. Lastly we join our results in a single string and make use of an empty 
string as a separator and we set it as the innerHTML of the HTML element h4Combinations and call for the displayRandomNumbers function. */
function findCombinationsClick() {
  const combinations = [];
  const error = "Viable combinations were not found, try again!";

  randomNumbers.forEach((number, index) => {
    randomNumbers.slice(index + 1).forEach((nextNumber, nextIndex) => {
      if (number + nextNumber === 21) {
        combinations.push(`${index + 1} & ${nextIndex + index + 2}`);
      }
    });
  });
  if (combinations.length === 0) combinations.push(error);

  const combinationsList = combinations.map(
    (combination) => `<div>· ${combination}</div>`
  );
  h4Combinations.innerHTML = combinationsList.join("");
}

displayRandomNumbers();

// eventListeners for both buttons that execute respective functions, when clicked.
randomiseButton.addEventListener("click", randomiseClick);
combinationsButton.addEventListener("click", findCombinationsClick);
