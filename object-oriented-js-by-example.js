/* Object Oriented Javascript
 *
 * This is a crash course in OOJS. It covers Modules, Classes, and Inheritence.
 * Run the program first (using chrome or node), familiarize yourself with the output.
 * Go to line 169 and make the suggested changes. Rerun the program
 * and look at how the output changed. When you've done that, inspect/play
 * with the code.
 *
 * Scenario:
 *
 * You are tasked with creating a Chef object. This is a master chef with a
 * secret ingredient. Use modules to hide the secret ingredient and only reveal
 * it if the world is ready. Incorporate other modules as dependencies and
 * keep things dry with inheritence.
 *
 * This whole example is pretty silly, but it gives scenarios that show why
 * you might want to use modules to hide implementation and maintain a clean
 * environment. Theres also some Inheritence thrown in for good measure.
 *
 */
var BusinessNamespace, PeopleNamespace, FoodNamespace,
    Application, Dependencies;

/*
* List of dummy modules
* Used to mock some dependencies
*
*/
PeopleNamespace = (function(){
  /* Here we're not hiding anything. Just a module used for namespacing */
  function Person (name){
    this.goal = "Get money, get paid";
    this.name = name;
  };

  Person.prototype = {
    speak: function(){
      return "All I do is " + this.goal;
    }
  }

  return {
    initialize: function(name){
      return new Person(name);
    }
  }
})();


BusinessNamespace = (function(){
  var _secretIngredient, _culinary;

  /* private variables. The underscore is convention. */
  _secretIngredient = 'Bacon';
  /* private methods. Notice the use of the private variable */
  _culinary =  function(readyForPrimeTime){
    if ( typeof readyForPrimeTime === 'boolean' && readyForPrimeTime ) {
      return "You add " + _secretIngredient;
    }
    return "You add the secret ingredient"
  };

  return {
    /*
     * Inspection of the culinary method will hide all implementation of _culinary,
     * including the existance of the _secretIngredient variable.
     */
    culinary: function(ready) { return _culinary(ready) }
  }
})();


FoodNamespace = (function(){
  var _foods;

  _foods = ['pizza', 'garden salad', 'chow mein', 'burrito'];
  return {
    randomize: function(){
      /* randomly select a food */
      return _foods[Math.floor(Math.random()*_foods.length)];
    }
  }
})();


/*
 * This could be an object containing a bunch of frameworks, it could be an object
 * containing your own modules. The thing to take away is that its a important
 * piece of your application. This is where you're isolating some dependencies.
 *
 */
Dependencies = {
  person: PeopleNamespace,
  business: BusinessNamespace,
  food: FoodNamespace
};

/* You can use Objects for namespacing */
App = {};

/*
 * Here is an example of a module in javascript.
 *
 * Modules are used to
 *  - Preserve a namespace. Objects and methods will not overwrite or be overwritten.
 *  - Create private variables and methods. To hide information.
 *  - Control and isolate dependencies.
 *
 */
App.Chef = (function(deps){
  var _Food, _Business, _Person;
  var _worldDefaultStatus;
  /*
   * A good place to handle module dependencies is at he top of its declaration.
   * This way if any dependencies are changed/swapped, all you have to do is change
   * what the variable is referencing.
   *
   */
  _Food     = deps.food;
  _Business = deps.business;
  _Person   = deps.person;

  /* Lets use this private variable in a chef method */
  _worldDefaultStatus = false;

  /*
   * The Chef class will inherit from a Person, and use methods associated
   * with the Business and Food modules. classes in javascript are composed of
   * a Constructor and a Prototype. Here are both.
   */
  function Chef(name) {
    this.name = name;
    this.goal = "Make awesome food";
    this.favoriteFood = _Food.randomize();
  }


  /*
   * Object Oriented Inheritence in javascript
   *
   * First you set the prototype equal to an object you want to inherit from
   * and then you add your own methods to the prototype.
   */
  Chef.prototype = _Person.initialize();

  Chef.prototype.flipPancakes = function(){
    return "It's all in the flick of the wrist";
  };

  Chef.prototype.scrambleEggs = function(){
    return "Small circles gets you the best results";
  };

  Chef.prototype.revealSecretIngredient = function(worldStatus){
    /* Hide the implementation by using private variables and methods */
    var theWorldIsReady = worldStatus || _worldDefaultStatus;
    return _Business.culinary(theWorldIsReady);
  };

  return {
    initialize: function(name){
      return new Chef(name);
    }
  }

})(Dependencies) /* Finally, this is where you inject dependencies */


/*********************** Use of above modules/classes ************************/
var mysteryChef = App.Chef.initialize( 'Gordon ******' );

console.log( "\n------------------ This mystery chefs name is --------------" );
console.log( mysteryChef.name );

console.log( "\n------------------ This chefs favorite food is --------------" );
console.log( mysteryChef.favoriteFood );

console.log( "\n------------------ This chef says  --------------" );
/*
 * notice that the speak method wasn't defined in the chef class.
 * Try removing `this.goal` from the chefs constructor (line 133)
 */
console.log( mysteryChef.speak());

console.log( "\n------------------ How to make the best breakfast  --------------" );
console.log( "Step 1: Pancakes. " + mysteryChef.flipPancakes() );
console.log( "Step 2: Scrambled Eggs. " + mysteryChef.scrambleEggs() );
/* Try passing `true` in this method call and rerun the program */
console.log( "Step 3: And Finally, " + mysteryChef.revealSecretIngredient() );
