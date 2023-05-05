//Step 1: Get the user's input
//Step 2: Validate user's input
//Step 3: If not valid input, have user input again
//Step 4: If valid input, do the calculation - thinking maybe to use recursion to do this
//Step 5: Output answer
//Step 5: Output option to quit or to do another calculation

//using prompt sync for user input
var prompt = require('prompt-sync')();
//variables
let userInput = '';

userInput = prompt('Enter your calculation: ');

console.log(userInput);





//Creating a function to do the calculation
function calculate(num1, num2, operator){
    let solution = 0;
    
    //Writing a switch statement, each case will be an operator and the default will throw an error for an invalid operator
    switch(operator){
        case '+':
            solution = Number(num1 + num2);
            break;
        case '-':
            solution = Number(num1 - num2);
            break;
        case '*':
            solution = Number(num1 * num2);
            break;
        case '/':
            solution = Number(num1 / num2);
            break;
    
        default:
            solution = 'Invalid operator, please enter a valid operator.';
            break;
    }
    return solution;
} 