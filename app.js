//Step 1: Get the user's input - complete
//Step 2: Validate user's input
//Step 3: If not valid input, have user input again
//Step 4: If valid input, do the calculation - thinking maybe to use recursion to do this - complete
//Step 5: Output answer - complete
//Step 6: Output option to quit or to do another calculation

//rpn follows the concept of a stack, which is a last in / first out concept

//using prompt sync for user input
var prompt = require('prompt-sync')({ sigint: true });
//variables
let userInput = '';
let playAgain = true;

while (playAgain) {
    
    userInput = prompt('Enter your calculation: ');
    
    //split the string so we now have an array
    let userInputArray = userInput.split(' ');
    
    console.log(userInputArray);
    
    rpnEvaluation(userInputArray);
    
    userInput = prompt("Press 'q' to quit or any other key to do another calculation: ").toLowerCase();
    
    if(userInput === 'q'){
        playAgain = false;
    }
}



//write a recursive function to pass in the userInputArray and keep doing a calculation until the length of the array is 1
function rpnEvaluation(userInputArray){
    //if there is only one number in the array, return that number
    if(userInputArray.length === 1){
        return console.log(parseFloat(userInputArray[0]));
    }

    //filter only the operators out of the userInputArray
    let operatorArray = userInputArray.filter(char => isNaN(char));
    //filter only the numbers out of the userInputArray
    let numberArray = userInputArray.filter(char => !isNaN(char));
    
    //logic for getting two numbers and operator to call the calculate function goes here
    //use parseFloat to convert from a string to a number
    const operator = operatorArray[0];
    const num1 = parseFloat(numberArray[0]);
    const num2 = parseFloat(numberArray[1]);

    const result = calculate(num1, num2, operator);

    //remove the elements that were evaluated and add in the result into the array
    numberArray.splice(0, 2, result);
    //remove the first operator from the operatorArray
    operatorArray.splice(0,1);

    //concat the two arrays so that the operators are in the array
    const concatArray = numberArray.concat(operatorArray);

    //call the function again with an updated array
    return rpnEvaluation(concatArray);

}


//Creating a function to do the calculation
function calculate(num1, num2, operator){
    let solution = 0;
    
    //Writing a switch statement, each case will be an operator and the default will throw an error for an invalid operator
    switch(operator){
        case '+':
            solution = num1 + num2;
            break;
        case '-':
            solution = num1 - num2;
            break;
        case '*':
            solution = num1 * num2;
            break;
        case '/':
            solution = num1 / num2;
            break;
    
        default:
            solution = 'Invalid operator, please enter a valid operator.';
            break;
    }
    return solution;
} 