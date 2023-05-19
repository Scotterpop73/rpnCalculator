//Step 1: Get the user's input - complete
//Step 2: Validate user's input
//Step 3: If not valid input, have user input again - complete
//Step 4: If valid input, do the calculation - complete
//Step 5: Output answer - complete
//Step 6: Output option to quit or to do another calculation - complete

//rpn follows the concept of a stack, which is a last in / first out concept

//using prompt sync for user input
var prompt = require("prompt-sync")({ sigint: true });

//variables
let userInput = "";
let userInputArray = [];
let playAgain = true;
let howManyOperators = 0;

//Validation if user inputted a letter or special character
//Going to use regex for data validation
let correctChars = /^[\d+\-*/. ]+$/;

while (playAgain) {
    //If it's not the first input, ask for another number or operator
    if (userInputArray.length) {
        userInput = prompt(`Enter another number or operator. Enter 'q' to quit: `);
    } else {
        //Ask for the user to input their calculation
        userInput = prompt(
            `Enter your calculation with a space between each number and operator. Enter 'q' to quit: `
        );
    }

    //If 'q' is entered exit the program
    //use continue to jump over one iteration in the loop
    if (userInput === "q") {
        playAgain = false;
        continue;
    }

    //Data validation if a correct character was inputted
    const isValid = correctChars.test(userInput);
    if (!isValid) {
        console.log(`Enter in a valid number or operator`);
        continue;
    }

    //Need to check if there is a correct amount of operators
    //Should always be one less operators than numbers inputted
    //filter only the operators out of the userInput
    howManyOperators = userInput.split(" ").filter((char) => isNaN(char)).length;

    //split the string so we now have an array
    userInputArray = userInputArray.concat(userInput.split(" "));

    //need to ensure there is one operator present to run an evaluation. else - console log the number
    if (howManyOperators > 0) {
        const result = rpnEvaluation();
        console.log(`Result: ${result}`);
    } else {
        console.log(userInput);
    }
}

//write a function to do the rpn evaluation 
function rpnEvaluation() {
    //filter only the operators out of the userInputArray
    let operatorArray = userInputArray.filter((char) => isNaN(char));
    //filter only the numbers out of the userInputArray
    let numberArray = userInputArray.filter((char) => !isNaN(char));

    let calculatedResult;
    for (let i = 0; i < operatorArray.length; i++) {
        //logic for getting two numbers and operator to call the calculate function goes here
        //use parseFloat to convert from a string to a number
        const operator = operatorArray[i];
        const num2 = parseFloat(numberArray.pop());
        const num1 = parseFloat(numberArray.pop());

        calculatedResult = calculate(num1, num2, operator);
        //add in the result into the array
        numberArray.push(calculatedResult);
    }
    //update userInputArray with the updated calculation
    userInputArray = numberArray;

    //remove the first operator from the operatorArray
    operatorArray.splice(0, 1);

    //return calculatedResult to be displayed to the user
    return calculatedResult;
}

//Creating a function to do the calculation
function calculate(num1, num2, operator) {
    let solution = 0;

    //Writing a switch statement, each case will be an operator and the default will throw an error for an invalid operator
    switch (operator) {
        case "+":
            solution = num1 + num2;
            break;
        case "-":
            solution = num1 - num2;
            break;
        case "*":
            solution = num1 * num2;
            break;
        case "/":
            solution = num1 / num2;
            break;

        default:
            solution = "Invalid operator, please enter a valid operator.";
            break;
    }
    return solution;
}
