"use strict";

//Run the code and change the values of x and y (to equal 42) to test the assert module.
const x = 21;
const y = 20;

//We have to import our assert module
var assert = require("assert");

//Calculates the anser to life (42)
var life = function(a,b){
    return a + b;
 };

//Overwrite the variable of result to equal the return.
let result = life(x,y);

//Change the comments below to see the difference between the two values
assert.deepEqual(result, 42);
//assert.fail(result, 42, "", '<');
