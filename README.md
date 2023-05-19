# rpnCalculator

Reverse Polish notation (RPN) is a mathematical notation in which operators follow their operands

## Specifications
1. The calculator should use standard input and standard output
2. It should implement the four standard arithmetic operators
3. The calculator should handle errors and recover gracefully
4. The calculator should exit when it receives a q command or an end of input indicator (EOF / Ctrl+D)

## How to Run
1. Clone the repository
2. Open the terminal and cd into the root
3. Run 'npm install' in the terminal
4. Run the command 'node app.js'

## Description
Since I decided to use JavaScript, I need to import a node module to be able to get the user's input. `var prompt = require('prompt-sync')({ sigint: true });` This line of code allows us to get the user input and allows the option ctrl + c to quit the application.

```js
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
        //remove the elements that were evaluated and add in the result into the array
        numberArray.push(calculatedResult);
    }
    userInputArray = numberArray;

    //remove the first operator from the operatorArray
    operatorArray.splice(0, 1);

    return calculatedResult;
}
```
The function starts by filtering the userInputArray to separate operators and numbers. We use the filter method to create the two separate arrays. Next, we name a variable 'calculatedResult' to store the result for the rpn evaluation. Then we use a for loop to iterate over the operatorArray. Next, we pop two numbers from the numberArray and get the first operator from the operatorArray. Then we use parseFloat on the number strings to convert them to numeric values. Then we call the calculate function, passing the two numbers and the operator as arguments, to do the calculation. Next, we add the result back to the numberArray. Then we update the userInputArray with the elements from numberArray so that when we do more iterations of the for loop, we will have the correct numbers from the updated array. Then we remove the first operator from the operatorArray using the splice method. When the for loop finishes, we store the final result in calculatedResult and then we return the calculatedResult to be displayed to the user.

```js
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
```
The code block above defines a function called calculate that takes in three parameters: num1, num2, and operator. It performs a basic arithmetic calculation based on the operator provided and returns the result. First, we initialize a variable called solution to 0. This variable will store the result of the arithmetic calculation. We use a switch statement to handle different cases based on the value of the operator. If the operator is +, it adds num1 and num2 together and assigns the result to solution. If the operator is -, it subtracts num1 and num2 together and assigns the result to solution. If the operator is *, it multiplies num1 and num2 together and assigns the result to solution. If the operator is /, it divides num1 and num2 together and assigns the result to solution. If none of the above cases match, the code assigns the string 'Invalid operator, please enter a valid operator.' to solution. This handles the scenario where an invalid operator is provided. The break statements in each case terminate the switch statement and prevent the code from executing subsequent cases. Finally, the solution variable is returned as the result of the calculate function.

```js
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
```
The code block above first declares and initializes our variables. The code then enters a while loop until the user chooses to quit. Next, we check the length of of userInputArray to see if the user has entered previous numbers or operators. Then we check if the user entered 'q'. If they did, we quit the program. Next, we data validate the user's input using regex. Next, we check how many operators there are. Then we split userInput and concatenate it with userInputArray, so we have the previous numbers and operators. Then we check if there is at least one operator present. If that is the case, we can call the rpnEvaluation function. If there are no operators, then that means a number was inputted so we console log the number. Lastly, we store the result of the evaluation in the result variable and print it to the console.
## Trade-offs and Future Updates
I really want to revisit the data validation and fully complete it. For example, in the state of the current code, the user will be able to have more operators than numbers and that will break the program. I would like to say, "There are too many operators, please enter in a valid number of operators."