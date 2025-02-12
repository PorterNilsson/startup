# Week 5

## Web Frameworks
    
- ```JSX
      import 'hello.css';
      
      const Hello = () => {
        let name = 'world';
      
        return <p>Hello {name}</p>;
      };
    ```
    
    - JSX File

## React

- ```Bash
    npm install vite@latest -D
    npm install react react-dom
    ```
    
- Babel transpiles JSX to JavaScript
    
- Functional Components
    
    - ```JSX
          import React from 'react';
          import ReactDOM from 'react-dom/client';
          
          function App() {
            const [bgColor, setBgColor] = React.useState('white');
          
            const handleClick = () => {
              setBgColor(bgColor === 'white' ? 'yellow' : 'white');
            };
          
            return (
              <div
                onClick={handleClick}
                style={{ backgroundColor: bgColor, height: '100vh', font: 'bold 20vh Arial', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div> Hello React </div>
              </div>
            );
          }
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<App />);
        ```
        
- Class Components
    - Deprecated, don't use

## Components

- ```JSX
      // Some examples
      <div>
        Component: <Demo />
      </div>
      
      function Demo() {
        const who = 'world';
        return <b>Hello {who}</b>;
      }
      
      const hello = <div>Hello</div>;
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(hello);
    ```
    
- Integrating with CSS
    
    - ```JSX
          import React from 'react';
          import ReactDOM from 'react-dom/client';
          import './index.css';
          
          function App() {
            return (
              <div>
                <pre className='code'>console.log(1+1);</pre>
                <p>Simple math</p>
              </div>
            );
          }
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<App />);
        ```
        
    - Use "className" instead of class because class is a JavaScript keyword
        
- Complex Example
    
    - ```JSX
          import React from 'react';
          import ReactDOM from 'react-dom/client';
          import './index.css';
          
          function Header() {
            return (
              <nav className='app-bar'>
                <Link label='home' />
                <Link label='users' />
                <Link label='about' />
              </nav>
            );
          }
          
          function Link(label) {
            return <div>{label.label}</div>;
          }
          
          function Content() {
            return <div className='content'>Here is the content</div>;
          }
          
          function Footer() {
            return <div className='app-bar'>Footer</div>;
          }
          
          function App() {
            return (
              <div className='app'>
                <Header />
          
                <Content />
          
                <Footer />
              </div>
            );
          }
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<App />);
        ```
        
    - ```CSS
          .app {
            font-family: sans-serif;
          }
          
          .app-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ddd;
          }
          
          .app-bar div {
            padding: 0.25em;
          }
          
          .content {
            margin: 1em;
          }
        ```
        
- Props
    
    - ```JSX
          <div>Component: <Demo who="Walke" /><div>
          
          function Demo(props) {
            return <b>Hello {props.who}</b>;
          }
        ```
        
- State
    
    - ```JSX
          function App() {
            const [clicked, updateClicked] = React.useState(false);
          
            function onClicked() {
              updateClicked(!clicked);
            }
          
            return <p onClick={onClicked}>clicked: {`${clicked}`}</p>;
          }
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<App />);
        ```
        
- Rendering works by calling render on the component that was interacted with along with all of its dependent components
    

## Router

- `npm i react-router-dom`
- Setup Router
    - ```JSX
          import { BrowserRouter } from "react-router-dom"
          
        ```
        
    - You'll want to wrap app component in BrowserRouter component in index.js
        
- Define Routes
- Handling Navigation
    - Use Link like an anchor tag
- Advanced Topics: https://blog.webdevsimplified.com/2022-07/react-router/
- We use react-router-dom which is simplified from react-router
- ```JSX
    function Page({ color }) {
      return (
        <div className="page" style={{ backgroundColor: color }}>
          <h1>{color}</h1>
        </div>
      );
    }
    
    function App() {
      return (
        <BrowserRouter>
          <div className="app">
            <nav>
              <NavLink to="/">Red</NavLink>
              <NavLink to="/green">Green</NavLink>
              <NavLink to="/blue">Blue</NavLink>
            </nav>
    
            <main>
              <Routes>
                <Route path="/" element={<Page color="red" />} exact />
                <Route path="/green" element={<Page color="green" />} />
                <Route path="/blue" element={<Page color="blue" />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
    ```
    

## Toolchains

- **Code repository** - Stores code in a shared, versioned location.
- **Linter** - Removes, or warns of, non-idiomatic code usage.
- **Prettier** - Formats code according to a shared standard.
- **Transpiler** - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.
- **Polyfill** - Generates backward compatible code for supporting old browser versions that do not support the latest standards.
- **Bundler** - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).
- **Minifier** - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.
- **Testing** - Automated tests at multiple levels to ensure correctness.
- **Deployment** - Automated packaging and delivery of code from the development environment to the production environment.
- Our Toolchain
    - GitHub
    - Vite for JSX
    - TS
    - Development and Debugging Support
    - ESBuild
    - Rollup
    - PostCSS
    - Bash script for deployment

## Vite

- ```Bash
    npm create vite@latest demoVite -- --template react
    cd demoVite
    npm install
    npm run dev
    ```
    

| Directory | File | Purpose |
| --- | --- | --- |
| ./  |     |     |
|     | index.html | Primary page for the application. This is the starting point to load all of the JSX components beginning with `main.jsx`. |
|     | package.json | NPM definition for package dependencies and script commands. This is what maps `npm run dev` to actually start up Vite. |
|     | package-lock.json | Version constraints for included packages (do not edit this). |
|     | vite.config.js | Configuration setting for Vite. Specifically this sets up React for development. |
| ./public |     |     |
|     | vite.svg | Vite logo for use as favicon and for display in the app. |
| ./src |     |     |
|     | main.jsx | Entry point for code execution. This simply loads the App component found in `App.jsx`. |
|     | index.css | CSS for the entire application. |
|     | App.jsx | JSX for top level application component. This displays the logs and implements the click counter. |
|     | App.css | CSS for the top level application component. |
| ./src/assets |     |     |
|     | react.svg | React logo for display in the app. |

- `npm run build` when application is ready for production