/* By Reference vs By Value: Javascript
*
* Scenario:
*
* Assume you want to create a collection of functions to be executed
* at a later time in a programs life cycle. You want to preserve the value
* of all variables used in these functions. Given Javascripts by reference nature,
* how would you access the data by value?
*
*/


function cacheNumbersByReference() {
  var nums, value;

  /* cache that will hold our functions */
  nums = [];

  for(var number = 0; number < 10; number++){
   /*
    * There is no closure here, so the value of `number` is evaluated and stored
    * after this `for loop` has finished executing. This means the value of
    * `number` will be stored BY REFERENCE.
    */
    reference = function(){ return "I am the number " + number };
    nums.push(reference);
  }

  return nums
}




function cacheNumbersByValue() {
  var nums, value;

  /* cache that will hold our functions */
  nums = [];

  for(var number = 0; number < 10; number++){
    /*
     * This is where we use a IIFE to solve the by reference issue. We are passing
     * in `number` as a value, or BY VALUE. The immediate execution of this function
     * introduces a CLOSURE into the programs life cycle.
     *
     * This closure will store the data we need immediately.
     * Instead of packaging the contents up after the `for loop` is finished executing.
     */
    (function(intendedValue){
      nums.push(function(){ return "I am the number " + intendedValue });
    })(number)
  }

  return nums
}



function printNumbers(nums) {
  for(var i = 0; i < nums.length; i++){
    /* Here we do a batch execution of functions. */
    console.log(nums[i]())
  }
}


console.log('/******************** By Reference *********************/')
printNumbers( cacheNumbersByReference() )

console.log('/******************** By Value *************************/')
printNumbers( cacheNumbersByValue() )
