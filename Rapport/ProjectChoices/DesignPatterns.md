# Choices made regarding writing clean and maintainable code.

## Resources:
  - <a href="https://www.toptal.com/javascript/comprehensive-guide-javascript-design-patterns">The Comprehensive Guide to JavaScript Design Patterns</a>
---
<br>

## Design Pattern notes
### What are Design Patterns?
```
Design Patterns are reusable solutions to commonly occurring problems in software design! They are great for writing clean, tested and maintainable code. 
```

### Design Pattern Categorization
  - <b>Creational</b> design patterns
    - Patter for dealing with object creation mechanisms which optimize object creation compared to a basic approach.
    - <b>`Factory method`</b>
    - <b>`Abstract factory`</b>
    - <b>`Builder`</b>
    - <b>`Prototype`</b> 
    - <b>`Singleton`</b> 

  - <b>Structural</b> design patterns
    - These patterns deal witrh object relationships. They ensure that if one part of the system changes, the entire system doesn't need to change along with it.  
    - <b>`Adapter`</b>
    - <b>`Bridge`</b>
    - <b>`Composite`</b>
    - <b>`Decorator`</b>
    - <b>`Facade`</b>
    - <b>`Flyweight`</b>
    - <b>`Proxy`</b>
  
  - <b>Behavioral</b> design patterns
    - Design Patters for recognizing, implementing and improving communication between disparate objects in a system. The help synchronize information across different parts of the system.
    - <b>`Chain of Responsibility`</b>
    - <b>`Command`</b>
    - <b>`Iterator`</b>
    - <b>`Mediator`</b>
    - <b>`Observer`</b>
    - <b>`State`</b>
    - <b>`Strategy`</b>
    - <b>`Visitor`</b>

  - <b>Concurrency</b> design patterns
    - ...
  - <b>Architectural</b> design patterns
    - Design patters which are used for architectural purposes. 
    - <b>`MVC (Model-View-Controller)`</b>
    - <b>`MVP (Model-View-Presenter)`</b>
    - <b>`MVVM (Model-View-ViewModel)`</b>
---
<br>

## Design Pattern Examples

Design patterns could lead to undesirable effects such as unnecessary code complexity and unnecessary overhead on performance. Therefore it is important to get familiar with the patterns and the scenarios they are best suited for, and then choose the right action to take. 

---

#### Constructor Pattern
```js
// Common ways to create objects in javascript:

// either of the following ways can be used to create a new object
var instance = {};
// or
var instance = Object.create(Object.prototype);
// or
var instance = new Object();
```

Javascript doesn't support native classes, but it does support constructors through the use of a `new` keyword prefixed to a function call. This lets us use the function as a constructor and initialize its properties the same way we would with a classic language constructor. 

```js
// we define a constructor for Person objects
function Person(name, age, isDeveloper) {
    this.name = name;
    this.age = age;
    this.isDeveloper = isDeveloper || false;

    this.writesCode = function() {
      console.log(this.isDeveloper? "This person does write code" : "This person does not write code");
    }
}

// creates a Person instance with properties name: Bob, age: 38, isDeveloper: true and a method writesCode
var person1 = new Person("Bob", 38, true);
// creates a Person instance with properties name: Alice, age: 32, isDeveloper: false and a method writesCode
var person2 = new Person("Alice", 32);

// prints out: This person does write code
person1.writesCode();
// prints out: this person does not write code
person2.writesCode();
```

However there is still a problem with this approach. The method `writesCode` gets redefined for each of the instaces of the Person constructor. This can be avoided by using prototypal-inheritance, which is at the core of javascript. 

```js
// we define a constructor for Person objects
function Person(name, age, isDeveloper) {
    this.name = name;
    this.age = age;
    this.isDeveloper = isDeveloper || false;
}

// we extend the function's prototype
Person.prototype.writesCode = function() {
    console.log(this.isDeveloper? "This person does write code" : "This person does not write code");
}

// creates a Person instance with properties name: Bob, age: 38, isDeveloper: true and a method writesCode
var person1 = new Person("Bob", 38, true);
// creates a Person instance with properties name: Alice, age: 32, isDeveloper: false and a method writesCode
var person2 = new Person("Alice", 32);

// prints out: This person does write code
person1.writesCode();
// prints out: this person does not write code
person2.writesCode();
```
Now both instances of the Person constructor can access a shared instance of the `writesCode()` method. 

---

#### Module Pattern
The module pattern is mostly used to mimic access modifiers by using the concept of <b>Closure</b>. Close is a function with access to the parent scope, even after the parent function has closed. Here is a example:

```js
// we  used an immediately invoked function expression
// to create a private variable, counter
var counterIncrementer = (function() {
    var counter = 0;

    return function() {
        return ++counter;
    };
})();

console.log(counterIncrementer()); // prints out 1
console.log(counterIncrementer()); // prints out 2
console.log(counterIncrementer()); // prints out 3
```
Now we immediately invoked the function and the counter variable was attached to the function. The special part about closure is that the function was closed, but we could still access it by child functions that increment it. In a way we have applied access modifiers to the variable counter using the scope of the function.

Using this fact we can create objects with private and public parts, called `modules`
```js
// through the use of a closure we expose an object
// as a public API which manages the private objects array
var collection = (function() {
    // private members
    var objects = [];

    // public members
    return {
        addObject: function(object) {
            objects.push(object);
        },
        removeObject: function(object) {
            var index = objects.indexOf(object);
            if (index >= 0) {
                objects.splice(index, 1);
            }
        },
        getObjects: function() {
            return JSON.parse(JSON.stringify(objects));
        }
    };
})();

collection.addObject("Bob");
collection.addObject("Alice");
collection.addObject("Franck");
// prints ["Bob", "Alice", "Franck"]
console.log(collection.getObjects());
collection.removeObject("Alice");
// prints ["Bob", "Franck"]
console.log(collection.getObjects());
// prints undefined
console.log(collection.objects);
```
---

### Revealing Module Pattern
This pattern is an improvement to the module pattern, which is that we write the whole object in the private scope and only expose the parts we want to be public by returning an anonymous object. 

```js
// we write the entire object logic as private members and
// expose an anonymous object which maps members we wish to reveal
// to their corresponding public members
var namesCollection = (function() {
    // private members
    var objects = [];

    function addObject(object) {
        objects.push(object);
    }

    function removeObject(object) {
        var index = objects.indexOf(object);
        if (index >= 0) {
            objects.splice(index, 1);
        }
    }

    function getObjects() {
        return JSON.parse(JSON.stringify(objects));
    }

    // public members
    return {
        addName: addObject,
        removeName: removeObject,
        getNames: getObjects
    };
})();

namesCollection.addName("Bob");
namesCollection.addName("Alice");
namesCollection.addName("Franck");
// prints ["Bob", "Alice", "Franck"]
console.log(namesCollection.getNames());
namesCollection.removeName("Alice");
// prints ["Bob", "Franck"]
console.log(namesCollection.getNames());
```

Now there are some problems with this...
  - if we have a `private function` which is referring to a `public function`, we cannot override the `public function`, as the `private function` will continue to refer to the private implementations of the function, thus introducing a bug into our system. 

  - if we have a public member pointing to a private variable, and try to override the public member from outside the module, the other functions would still refer to the private value of the variable,  introduction another bug to our system. 

---

### Singleton Pattern


