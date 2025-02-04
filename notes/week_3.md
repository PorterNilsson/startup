# Week 3

## CodePen

- Instant preview which is really helpful for iterating
- Helps you discover other things from the community

## HTML Introduction

- Text is valid html

### Elements and Tags

- ```HTML
                          <html>
                            <head>
                              <title>My First Page</title>
                            </head>
                            <body>
                              <main>
                                <p>Hello world</p>
                              </main>
                            </body>
                          </html>
    ```
    

### Attributes

- ```HTML
                          <p id="hello" class="greeting">Hello world</p>
    ```
    

### Hyperlinks

- ```HTML
                        <a href="https://byu.edu">Go to the Y</a>
    ```
    

* * *

- Always include `<!DOCTYPE html>`

| element | meaning |
| --- | --- |
| `html` | The page container |
| `head` | Header information |
| `title` | Title of the page |
| `meta` | Metadata for the page such as character set or viewport settings |
| `script` | JavaScript reference. Either a external reference, or inline |
| `include` | External content reference |
| `body` | The entire content body of the page |
| `header` | Header of the main content |
| `footer` | Footer of the main content |
| `nav` | Navigational inputs |
| `main` | Main content of the page |
| `section` | A section of the main content |
| `aside` | Aside content from the main content |
| `div` | A block division of content |
| `span` | An inline span of content |
| `h<1-9>` | Text heading. From h1, the highest level, down to h9, the lowest level |
| `p` | A paragraph of text |
| `b` | Bring attention |
| `table` | Table |
| `tr` | Table row |
| `th` | Table header |
| `td` | Table data |
| `ol,ul` | Ordered or unordered list |
| `li` | List item |
| `a` | Anchor the text to a hyperlink |
| `img` | Graphical image reference |
| `dialog` | Interactive component such as a confirmation |
| `form` | A collection of user input |
| `input` | User input field |
| `audio` | Audio content |
| `video` | Video content |
| `svg` | Scalable vector graphic content |
| `iframe` | Inline frame of another HTML page |

- Comment example `<!-- commented text -->`
    
- Escape sequences
    

| Character | Entity |
| --- | --- |
| &   | `&amp;` |
| <   | `&lt;` |
| \>  | `&gt;` |
| "   | `&quot;` |
| '   | `&apos;` |
| 😀  | `&#128512;` |

- Versions

| Year | Version | Features |
| --- | --- | --- |
| 1990 | HTML1 | format tags |
| 1995 | HTML2 | tables, internationalization |
| 1997 | HTML3 | MathML, CSS, frame tags |
| 1999 | HTML4 | external CSS |
| 2014 | HTML5 | email, password, media, and semantic tags |

- Index.html
    - The default page displayed when you hit a website

## HTML Structure Elements

- `body`, `header`, `footer`, `main`, `section`, `aside`, `p`, `table`, `ol/ul`, `div`, and `span`

## HTML Input Elements

| Element | Meaning | Example |
| --- | --- | --- |
| `form` | Input container and submission | `<form action="form.html" method="post">` |
| `fieldset` | Labeled input grouping | `<fieldset> ... </fieldset>` |
| `input` | Multiple types of user input | `<input type="" />` |
| `select` | Selection dropdown | `<select><option>1</option></select>` |
| `optgroup` | Grouped selection dropdown | `<optgroup><option>1</option></optgroup>` |
| `option` | Selection option | `<option selected>option2</option>` |
| `textarea` | Multiline text input | `<textarea></textarea>` |
| `label` | Individual input label | `<label for="range">Range: </label>` |
| `output` | Output of input | `<output for="range">0</output>` |
| `meter` | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

- Form
    - Can send a request without JavaScript, but not necessary
- Input

| Type | Meaning |
| --- | --- |
| text | Single line textual value |
| password | Obscured password |
| email | Email address |
| tel | Telephone number |
| url | URL address |
| number | Numerical value |
| checkbox | Inclusive selection |
| radio | Exclusive selection |
| range | Range limited number |
| date | Year, month, day |
| datetime-local | Date and time |
| month | Year, month |
| week | Week of year |
| color | Color |
| file | Local file |
| submit | button to trigger form submission |

| Attribute | Meaning |
| --- | --- |
| name | The name of the input. This is submitted as the name of the input if used in a form |
| disabled | Disables the ability for the user to interact with the input |
| value | The initial value of the input |
| required | Signifies that a value is required in order to be valid |

## HTML Media Elements

- `img`, `audio`, `video`, `svg`, and `canvas`
    
- ```HTML
      <img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />
    ```
    
- Audio
    
    - `control`, `autoplay`, and `loop` attributes
- Video
    
    - Include `crossorigin="anonymous"` if video is not from your domain
- Canvas element requires JavaScript
    

## Simon HTML

- 4 HTML Pages
    - index.html
        - make sure github link is at the bottom
    - play.html
    - scores.html
    - about.html
- `./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon`

## CSS Introduction

- Functionally, CSS is primarily concerned with defining `rulesets`, or simply `rules`. A rule is comprised of a `selector` that selects the elements to apply the rule to, and one or more `declarations` that represent the `property` to style with the given `property value`.
- 3 Ways to Use CSS
    - ```HTML
        <p style="color:green">CSS</p>
        ```
        
    - ```HTML
        <head>
          <style>
            p {
              color: green;
            }
          </style>
        </head>
        <body>
          <p>CSS</p>
        </body>
        ```
        
    - ```HTML
        <link rel="stylesheet" href="styles.css" />
        ```
        
        - Must appear in the head
- The "lowest" or most specific level of style is the one that is ultimately applied
    - Change all `box-sizing` to `border-box`

## Selectors

- You can select by element name
    - ```CSS
        body {
          font-family: sans-serif;
        }
        ```
        
- | Combinator | Meaning | Example | Description |
    | --- | --- | --- | --- |
    | Descendant | A list of descendants | `body section` | Any section that is a descendant of a body |
    | Child | A list of direct children | `section > p` | Any p that is a direct child of a section |
    | General sibling | A list of siblings | `div ~ p` | Any p that has a div sibling |
    | Adjacent sibling | A list of adjacent sibling | `div + p` | Any p that has an adjacent div sibling |
    
- Use a period before a class name to select all elements with that class. Optionally, place the element type before the period such as "p.className" to select only those type of elements with that class.
- Signify ID with "#"
- You can use attribute selectors as well with "\[\]" syntax
- Pseudo-selectors are invoked with ":" syntax to specify behavior that occurs as a result of interaction with the element in some manner

## Declarations

| Property | Value | Example | Discussion |
| --- | --- | --- | --- |
| background-color | color | `red` | Fill the background color |
| border | color width style | `#fad solid medium` | Sets the border using shorthand where any or all of the values may be provided |
| border-radius | unit | `50%` | The size of the border radius |
| box-shadow | x-offset y-offset blu-radius color | `2px 2px 2px gray` | Creates a shadow |
| columns | number | `3` | Number of textual columns |
| column-rule | color width style | `solid thin black` | Sets the border used between columns using border shorthand |
| color | color | `rgb(128, 0, 0)` | Sets the text color |
| cursor | type | `grab` | Sets the cursor to display when hovering over the element |
| display | type | `none` | Defines how to display the element and its children |
| filter | filter-function | `grayscale(30%)` | Applies a visual filter |
| float | direction | `right` | Places the element to the left or right in the flow |
| flex |     |     | Flex layout. Used for responsive design |
| font | family size style | `Arial 1.2em bold` | Defines the text font using shorthand |
| grid |     |     | Grid layout. Used for responsive design |
| height | unit | `.25em` | Sets the height of the box |
| margin | unit | `5px 5px 0 0` | Sets the margin spacing |
| max-\[width/height\] | unit | `20%` | Restricts the width or height to no more than the unit |
| min-\[width/height\] | unit | `10vh` | Restricts the width or height to no less than the unit |
| opacity | number | `.9` | Sets how opaque the element is |
| overflow | \[visible/hidden/scroll/auto\] | `scroll` | Defines what happens when the content does not fix in its box |
| position | \[static/relative/absolute/sticky\] | `absolute` | Defines how the element is positioned in the document |
| padding | unit | `1em 2em` | Sets the padding spacing |
| left | unit | `10rem` | The horizontal value of a positioned element |
| text-align | \[start/end/center/justify\] | `end` | Defines how the text is aligned in the element |
| top | unit | `50px` | The vertical value of a positioned element |
| transform | transform-function | `rotate(0.5turn)` | Applies a transformation to the element |
| width | unit | `25vmin` | Sets the width of the box |
| z-index | number | `100` | Controls the positioning of the element on the z axis |

| Unit | Description |
| --- | --- |
| px  | The number of pixels |
| pt  | The number of points (1/72 of an inch) |
| in  | The number of inches |
| cm  | The number of centimeters |
| %   | A percentage of the parent element |
| em  | A multiplier of the width of the letter `m` in the parent's font |
| rem | A multiplier of the width of the letter `m` in the root's font |
| ex  | A multiplier of the height of the element's font |
| vw  | A percentage of the viewport's width |
| vh  | A percentage of the viewport's height |
| vmin | A percentage of the viewport's smaller dimension |
| vmax | A percentage of the viewport's larger dimension |

| Method | Example | Description |
| --- | --- | --- |
| keyword | `red` | A set of predefined colors (e.g. white, cornflowerblue, darkslateblue) |
| RGB hex | `#00FFAA22` or `#0FA2` | Red, green, and blue as a hexadecimal number, with an optional alpha opacity |
| RGB function | `rgb(128, 255, 128, 0.5)` | Red, green, and blue as a percentage or number between 0 and 255, with an optional alpha opacity percentage |
| HSL | `hsl(180, 30%, 90%, 0.5)` | Hue, saturation, and light, with an optional opacity percentage. Hue is the position on the 365 degree color wheel (red is 0 and 255). Saturation is how gray the color is, and light is how bright the color is. |

## Fonts

- Serif (detailed), San Serif (Plain), Fixed (Same size), and Symbol (Emoji, arrow, etc)
- ```CSS
    @font-face {
      font-family: 'Quicksand';
      src: url('https://cs260.click/fonts/quicksand.ttf');
    }
    
    @import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');
    ```
    
    - Two ways to use fonts (locally stored or fetched)

### Animations

- ```CSS
    p {
      text-align: center;
      font-size: 20vh;
    
      animation-name: demo;
      animation-duration: 3s;
    }
    
    @keyframes demo {
      from {
        font-size: 0vh;
      }
    
      95% {
        font-size: 21vh;
      }
    
      to {
        font-size: 20vh;
      }
    }
    ```
    

## Debugging CSS

- Go to the styles section and scroll down to see the CSS box model. You can edit the CSS from right inside the browser.