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

```
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
## Trade-offs and Future Updates