# Week 4

## Responsive Design

- The ability to configure the interface so that the application accommodates and takes advantage of the screen size.

| Value | Meaning |
| --- | --- |
| none | Don't display this element. The element still exists, but the browser will not render it. |
| block | Display this element with a width that fills its parent element. A `p` or `div` element has block display by default. |
| inline | Display this element with a width that is only as big as its content. A `b` or `span` element has inline display by default. |
| flex | Display this element's children in a flexible orientation. |
| grid | Display this element's children in a grid orientation. |

- ```HTML
        <div class="none">None</div>
        <div class="block">Block</div>
        <div class="inline">Inline1</div>
        <div class="inline">Inline2</div>
        <div class="flex">
          <div>FlexA</div>
          <div>FlexB</div>
          <div>FlexC</div>
          <div>FlexD</div>
        </div>
        <div class="grid">
          <div>GridA</div>
          <div>GridB</div>
          <div>GridC</div>
          <div>GridD</div>
        </div>
    ```
    
- ```CSS
        .none {
          display: none;
        }
        
        .block {
          display: block;
        }
        
        .inline {
          display: inline;
        }
        
        .flex {
          display: flex;
          flex-direction: row;
        }
        
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
    ```
    
- Viewport meta tag tells the mobile browser not to scale the page
    
    - ```HTML
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        ```
        
- `float` property moves an element to the left or right of its container and is able to "wrap" other elements
    
- Use this to transform your website sideways
    
    - ```CSS
          @media (orientation: portrait) {
            div {
              transform: rotate(270deg);
            }
          }
        ```
        

## Grid

- ```CSS
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 300px;
        grid-gap: 1em;
      }
    ```
    

## Flexbox
    
- ```HTML
      <body>
        <header>
          <h1>CSS flex &amp; media query</h1>
        </header>
        <main>
          <section>
            <h2>Controls</h2>
          </section>
          <section>
            <h2>Content</h2>
          </section>
        </main>
        <footer>
          <h2>Footer</h2>
        </footer>
      </body>
    ```
    
- ```CSS
      body {
        display: flex;
        flex-direction: column;
        margin: 0;
        height: 100vh;
      }
      
      header {
        flex: 0 80px; /* Does not grow and has a starting width of 80 */
        background: hsl(223, 57%, 38%);
      }
      
      footer {
        flex: 0 30px;
        background: hsl(180, 10%, 10%);
      }
      
      main {
        flex: 1; /* Fraction unit of growth = 1 (it's the only child so this means it receives all the space */
        display: flex;
        flex-direction: row;
      }
      
      section:nth-child(1) {
        flex: 1;
        background-color: hsl(180, 10%, 80%);
      }
      section:nth-child(2) {
        flex: 3;
        background-color: white;
      }
    ```
    
- ```CSS
      @media (orientation: portrait) {
        main {
          flex-direction: column; /* Stacks the controls and contents on narrow screens */
        }
      }
      
      @media (max-height: 700px) { /* Removes header and footer on short screens */
        header {
          display: none;
        }
        footer {
          display: none;
        }
      }
    ```
    

## CSS Frameworks

- Tailwind moves a lot of the CSS directly into the html
- ```HTML
    <!DOCTYPE html>
    <html lang="en">
    
    <!-- How to add Bootstrap --> 
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
      </head>
      <body>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          crossorigin="anonymous"
        </script>
      </body>
    </html>
    ```
    
    - or `npm install bootstrap@5.3.3`
        

## Simon CSS

- ```HTML
    <link rel="stylesheet" href="main.css" />
    ```
    