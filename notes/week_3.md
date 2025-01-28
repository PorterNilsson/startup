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