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
```
The function rpnEvaluation above takes in a parameter that is the user's input that got turned into an array. First, we check if there is only one number in the array, if that condition is true then we return and console log the number. If there is more than one number in the array, we separate the array into two arrays. One array contains only numbers and the other array contains only operators. Then we take the first element from the operator array to get the first operator and the first two elements from the number array. Also, we use parseFloat to convert the two numbers from the array from a string to an array. Next, passing in the two numbers and operator as arguments, we call the calculate function to do the calculation and store the result in a variable called result. Then using the splice method, we remove the two numbers that were evaluated from the number array and add result into the number array. Also, we remove the first operator from the operator array using splice. Then we concat the number array and operator array, so that we can pass the concat array as an argument into the rpnEvaluation function. Finally, the code recursively calls the rpnEvaluation function with the updated concatArray. This process continues until there is only one number left in the array, which is then returned and logged.

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
let userInput = '';
let userInputArray = [];
let playAgain = true;
let howManyNumbers = 0;
let howManyOperators = 0;


while (playAgain) {
    //boolean for the user's input, if their input is valid the value will flip to true to get out of the nested while loop
    let isInputValid = false;

    while(!isInputValid){

        //Ask for the user to input their calculation
        userInput = prompt('Enter your calculation with a space between each number and operator: ');
        
        //Validation if user inputted a letter or special character
        //Going to use regex for data validation
        let correctChars = /^[\d+\-*/. ]+$/;
        
        //Need to check if there is a correct amount of operators
        //Should always be one less operators than numbers inputted
        //filter only the operators out of the userInput
        howManyOperators = userInput.split(' ').filter(char => isNaN(char)).length;
        //filter only the numbers out of the userInput
        howManyNumbers = userInput.split(' ').filter(char => !isNaN(char)).length;

        //conditional if the user's input is valid or not
        if(correctChars.test(userInput) && howManyNumbers - 1 == howManyOperators){
            isInputValid = true;
        }else{
            userInput = '';
            console.log('Please enter in valid numbers or operators');
        }
    }
        

    //split the string so we now have an array
    userInputArray = userInput.split(' ');

    console.log(userInputArray);
    
    rpnEvaluation(userInputArray);
    
    userInput = prompt("Press 'q' to quit or any other key to do a new calculation: ").toLowerCase();
    
    if(userInput === 'q'){
        playAgain = false;
    }
}

```
The code block above first initializes the variables. Then the code enters a while loop that continues as long as playAgain is true. Within the while loop, it sets the isInputValid variable to false. This variable will be used to check if the user's input is valid. The code enters another while loop that continues until isInputValid becomes true. Inside the inner while loop, the program prompts the user to enter their calculation using prompt and assigns the input to the userInput variable. We use regular expression '(/^[\d+\-*/. ]+$/)' to validate that the input consists of only valid characters: digits, plus, minus, multiplication, division, and spaces. Then, we count the number of operators and numbers in the user's input using the split method, filter, and isNaN function. It compares these counts to ensure that there is always one less operator than the number of numbers. If the input passes the validation checks, the isInputValid variable is set to true, and the program proceeds. Otherwise, the userInput variable is cleared, and an error message is console logged. Next, the user's input is split into an array using the split method with a space as the separator, and the resulting array is stored in userInputArray. The userInputArray is then console logged. The function rpnEvaluation is called, passing userInputArray as an argument. This function evaluates the RPN expression. Then, the program prompts the user with another message using prompt, asking if they want to quit or perform a new calculation. The user's input is converted to lowercase and stored in userInput. If the user enters 'q', indicating they want to quit, the playAgain variable is set to false, and the outer while loop will not execute again. Otherwise, the program continues by repeating the loop.
## Trade-offs and Future Updates