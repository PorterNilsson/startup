
## JavaScript Console

- ```JavaScript
      console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');
      // OUTPUT: JavaScript Demo //in large green text
    ```
    
- ```JavaScript
      console.time();
      console.timeEnd();
      
      console.count('a');
      
      
    ```
    

## Functions

- ```JavaScript
      function hello(who) {
        who.count++;
        console.log('hello ' + who.name);
      }
      
      // OUTPUT: hello world
      hello({ name: 'world', count: 0 });
      
      
      // Default Params
      function labeler(value, title = 'title') {
        console.log(`${title}=${value}`);
      }
      
      
      // Anonymous Functions
      // Function that takes a function as a parameter
      function doMath(operation, a, b) {
        return operation(a, b);
      }
      
      // Anonymous function assigned to a variable
      const add = function (a, b) {
        return a + b;
      };
      
      console.log(doMath(add, 5, 3));
      // OUTPUT: 8
      
      
      // These are equivalent
      console.log(
        doMath(
          function (a, b) {
            return a - b;
          },
          5,
          3
        )
      );
      // OUTPUT: 2
      
      console.log(doMath((a, b) => a - b, 5, 3));
      // Seems to define a function right in the parameter
      
      
    ```
    
- ```JavaScript
      // Complex example of all of these principles in practice
      
      // Anonymous declaration of the function that is later assigned to a variable
      const add = function (a, b) {
        return a + b;
      };
      
      // Function that logs as a side effect of its execution
      function labeler(label, value) {
        console.log(label + '=' + value);
      }
      
      // Function that takes a function as a parameter and then executes the function as a side effect
      function addAndLabel(labeler, label, adder, a, b) {
        labeler(label, adder(a, b));
      }
      
      // Passing a function to a function
      addAndLabel(labeler, 'a+b', add, 1, 3);
      // OUTPUT: a+b=4
      
      // Function that returns a function
      function labelMaker(label) {
        return function (value) {
          console.log(label + '=' + value);
        };
      }
      
      // Assign a function from the return value of the function
      const nameLabeler = labelMaker('name');
      
      // Calling the returned function
      nameLabeler('value');
      // OUTPUT: name=value
    ```
    
- ```JavaScript
      // Example of inner functions
      
      function labeler(value) {
        function stringLabeler(value) {
          console.log('string=' + value);
        }
        function numberLabeler(value) {
          console.log('number=' + value);
        }
      
        if (typeof value == 'string') {
          stringLabeler(value);
        } else if (typeof value == 'number') {
          numberLabeler(value);
        }
      }
      
      labeler(5);
      // OUTPUT: number=5
      
      labeler('fish');
      // OUTPUT: string=fish
    ```
    

## JavaScript Arrow Function

- ```JavaScript
      // Always returns 3
      () => 3;
      
      // Equivalent
      const a = [1, 2, 3, 4];
      
      // standard function syntax
      a.sort(function (v1, v2) {
        return v1 - v2;
      });
      
      // arrow function syntax
      a.sort((v1, v2) => v1 - v2);
      
      
    ```
    
- ```JavaScript
      // Return values example
      () => 3;
      // RETURNS: 3
      
      () => {
        3;
      };
      // RETURNS: undefined
      
      () => {
        return 3;
      };
      // RETURNS: 3
    ```
    
- "Next, arrow functions inherit the `this` pointer from the scope in which they are created. This makes what is known as a `closure`. A closure allows a function to continue referencing its creation scope, even after it has passed out of that scope. This can be tricky to wrap your head around, but just remember that a closure includes a function and its creation scope."
    
    - ```JavaScript
          // Closure Example
          
          function makeClosure(init) {
            let closureValue = init;
            return () => {
              return `closure ${++closureValue}`;
            };
          }
          
          const closure = makeClosure(0);
          
          console.log(closure());
          // OUTPUT: closure 1
          
          console.log(closure());
          // OUTPUT: closure 2
          
          // So essentially the closure object (which is a function) has access to the variables in the scope it was created with before being returned. Cool.
        ```
        
- Arrow Functions with React
    
    - ```JavaScript
          function App() {
            const [count, setCount] = React.useState(0);
          
            function Increment() {
              setCount(count + 1);
            }
          
            function Decrement() {
              setCount(count - 1);
            }
          
            return (
              <div>
                <h1>Count: {count}</h1>
                <button onClick={Increment}>n++</button>
                <button onClick={Decrement}>n--</button>
              </div>
            );
          }
          
          // Can be turned into the code below and inserted directly into the JSX
          
          function App() {
            const [count, setCount] = React.useState(0);
          
            return (
              <div>
                <h1>Count: {count}</h1>
                <button onClick={() => setCount(count + 1)}>n++</button>
                <button onClick={() => setCount(count - 1)}>n--</button>
              </div>
            );
          }
          
          // However, the problem is that the above code asynchronously updates the count. To fix:
          
          // may corrupt value
          setCount(count + 1);
          
          // safe
          setCount((prevCount) => prevCount + 1);
          
          
          // Final thread, modular, version
          
          function App() {
            const [count, setCount] = React.useState(0);
          
            function counterOpFactory(op) {
              return () => setCount((prevCount) => op(prevCount));
            }
          
            const incOp = counterOpFactory((c) => c + 1);
            const decOp = counterOpFactory((c) => c - 1);
            const tenXOp = counterOpFactory((c) => c * 10);
          
            return (
              <div>
                <h1>Count: {count}</h1>
                <button onClick={incOp}>n++</button>
                <button onClick={decOp}>n--</button>
                <button onClick={tenXOp}>n*10</button>
              </div>
            );
          }
        ```
        
    - ```JavaScript
          // Debounce Function Example
          
          window.addEventListener(
            'scroll',
            debounce(500, () => {
              console.log('Executed an expensive calculation');
            })
          );
          
          function debounce(windowMs, windowFunc) {
            let timeout;
            return function () {
              console.log('scroll event');
              clearTimeout(timeout);
              timeout = setTimeout(() => windowFunc(), windowMs);
            };
          }
        ```
        

## JavaScript Arrays

- ```JavaScript
      const a = [1, 2, 3];
    ```
    
- 0 based indexing
    

| Function | Meaning | Example |
| --- | --- | --- |
| push | Add an item to the end of the array | `a.push(4)` |
| pop | Remove an item from the end of the array | `x = a.pop()` |
| slice | Return a sub-array | `a.slice(1,-1)` |
| sort | Run a function to sort an array in place | `a.sort((a,b) => b-a)` |
| values | Creates an iterator for use with a `for of` loop | `for (i of a.values()) {...}` |
| find | Find the first item satisfied by a test function | `a.find(i => i < 2)` |
| forEach | Run a function on each array item | `a.forEach(console.log)` |
| reduce | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)` |
| map | Run a function to map an array to a new array | `a.map(i => i+i)` |
| filter | Run a function to remove items | `a.filter(i => i%2)` |
| every | Run a function to test if all items match | `a.every(i => i < 3)` |
| some | Run a function to test if any items match | `a.some(i => i < 1)` |

## Objects and Classes

- "A JavaScript object represents a collection of name value pairs referred to as properties. The property name must be of type String or Symbol, but the value can be of any type. Objects also have common object-oriented functionality such as constructors, a `this` pointer, static properties and functions, and inheritance."
- "Objects can be created with the new operator. This causes the object's constructor to be called. Once declared you can add properties to the object by simply referencing the property name in an assignment. Any type of variable can be assigned to a property. This includes a sub-object, array, or function. The properties of an object can be referenced either with dot (`obj.prop`) or bracket notation (`obj['prop']`)."
- ```JavaScript
      const obj = new Object({ a: 3 });
      obj['b'] = 'fish';
      obj.c = [1, 2, 3];
      obj.hello = function () {
        console.log('hello');
      };
      
      console.log(obj);
      // OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
      
      
      const obj = {
        a: 3,
        b: 'fish',
        c: [1, true, 'dog'],
        d: { e: false },
        f: function () {
          return 'hello';
        },
      };
    ```
    

| Function | Meaning |
| --- | --- |
| entries | Returns an array of key value pairs |
| keys | Returns an array of keys |
| values | Returns an array of values |

- Any function that returns an object is considered a "constructor"
    
- ```JavaScript
      // Assigning a function to a property
      
      function Person(name) {
        return {
          name: name,
          log: function () {
            console.log('My name is ' + this.name);
          },
        };
      }
      
      const p = new Person('Eich');
      p.log();
      // OUTPUT: My name is Eich
    ```
    
- ```JavaScript
      // Creation of a class with one private property
      
      class Person {
        #name;
        
        constructor(name) {
          this.#name = name;
        }
      
        log() {
          console.log('My name is ' + this.#name);
        }
      }
      
      const p = new Person('Eich');
      p.log();
      // OUTPUT: My name is Eich
    ```
    
- ```JavaScript
      // Inheritance Example
      class Person {
        constructor(name) {
          this.name = name;
        }
      
        print() {
          return 'My name is ' + this.name;
        }
      }
      
      class Employee extends Person {
        constructor(name, position) {
          super(name);
          this.position = position;
        }
      
        print() {
          return super.print() + '. I am a ' + this.position;
        }
      }
      
      const e = new Employee('Eich', 'programmer');
      console.log(e.print());
      // OUTPUT: My name is Eich. I am a programmer
    ```
    

## Timeout and Interval

- ```JavaScript
      setTimeout(() => console.log('time is up'), 2000);
    ```
    
- ```JavaScript
      setInterval(() => console.log('do something'), 1000);
    ```
    

## JSON

| Type | Example |
| --- | --- |
| string | "crockford" |
| number | 42  |
| boolean | true |
| array | \[null,42,"crockford"\] |
| object | {"a":1,"b":"crockford"} |
| null | null |

- ```JSON
      {
        "class": {
          "title": "web programming",
          "description": "Amazing"
        },
        "enrollment": ["Marco", "Jana", "فَاطِمَة"],
        "start": "2025-02-01",
        "end": null
      }
    ```
    
- ```JavaScript
      const obj = { a: 2, b: 'crockford', c: undefined };
      const json = JSON.stringify(obj);
      const objFromJson = JSON.parse(json);
      
      console.log(obj, json, objFromJson);
      
      // OUTPUT:
      // {a: 2, b: 'crockford', c: undefined}
      // {"a":2, "b":"crockford"}
      // {a: 2, b: 'crockford'}
    ```
    

## Local Storage

- "The browser's `localStorage` API provides the ability to persistently store and retrieve data (i.e. scores, usernames, etc.,) on a user's browser across user sessions and HTML page renderings. For example, your frontend JavaScript code could store a user's name on one HTML page, and then retrieve the name later when a different HTML page is loaded. The user's name will also be available in local storage the next time the same browser is used to access the same website."

| Function | Meaning |
| --- | --- |
| setItem(name, value) | Sets a named item's value into local storage |
| getItem(name) | Gets a named item's value from local storage |
| removeItem(name) | Removes a named item from local storage |
| clear() | Clears all items in local storage |

- A local storage value must be of type `string`, `number`, or `boolean`
- Storage > Local Storage (to see in dev tools)

## Destructuring

- ```JavaScript
      const a = [1, 2, 4, 5];
      
      // destructure the first two items from a, into the new variables b and c
      const [b, c] = a;
      
      console.log(b, c);
      // OUTPUT: 1, 2
      
      
      const [b, c, ...others] = a;
      
      console.log(b, c, others);
      // OUTPUT: 1, 2, [4,5]
      
      
      const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };
      
      const { a, c } = o;
      
      console.log(a, c);
      // OUTPUT 1, ['fish', 'cats']
      
      
      const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };
      
      const { a: count, b: type } = o;
      
      console.log(count, type);
      // OUTPUT 1, animals
      
      
      const { a, b = 22 } = {};
      const [c = 44] = [];
      
      console.log(a, b, c);
      // OUTPUT: undefined, 22, 44
    ```
    
    &nbsp;
    
- "React makes extensive use of destructuring when you pass parameters to components and create state. In the example below, React passes all the parameters to the component as an object, but it destructures the object to just the `initialCount` parameter. Likewise the return value from `React.useState` destructures the array to just the variable and the update function."
    
    - ```JSX
          function Clicker({ initialCount }) {
            const [count, updateCount] = React.useState(initialCount);
            return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
          }
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<Clicker initialCount={3} />);
        ```
        

## React Hooks

- "React hooks allow React function style components to be able to do everything that a class style component can do and more. Additionally, as new features are added to React they are including them as hooks. This makes function style components the preferred way of doing things in React. You have already seen one use of hooks to declare and update state in a function component with the `useState` hook."
- ```JavaScript
    function Clicker({ initialCount }) {
      const [count, updateCount] = React.useState(initialCount);
      return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Clicker initialCount={3} />);
    ```
    
- `useEffect` runs every time rendering is completed
- ```JavaScript
    function UseEffectHookDemo() {
      React.useEffect(() => {
        console.log('rendered');
      });
    
      return <div>useEffectExample</div>;
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<UseEffectHookDemo />);
    ```
    
- Hooks must be called at the top of a function and not part of a conditional
- ```JavaScript
    function Clicker() {
      const [count, update] = React.useState(5);
    
      return (
        <div onClick={() => update(count - 1)}>
          Click count: {count}
          {count > 0 ? <Db /> : <div>DB Connection Closed</div>}
        </div>
      );
    }
    
    function Db() {
      React.useEffect(() => {
        console.log('connected');
    
        return function cleanup() {
          console.log('disconnected');
        };
      }, []);
    
      return <div>DB Connection</div>;
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Clicker />);
    ```