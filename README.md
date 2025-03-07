# Devotee

Today's social media landscape has failed to deliver on many of its initial promises. What once seemed like an endless horizon of free expression and exchange of ideas has become a wasteland of brain rot where maintaining the viewer's attention span is the primary objective. Devotee is a new platform designed to allow the brightest and most brilliant among us to procure a following of like-minded critical-thinkers. Devotee is a blog site with a twist: writers can chat over live text with their audience—and audience members with each other—in a Socratic dialogue setting. Anonymity, ideology, and character-limited shouting matches are a thing of the past as Devotee curates an audience burned out with traditional forms of online interaction and discourse.

## Key Features

- Users have the ability to discover and follow writers of their choice.
- Users can use text chat to talk live with writers they follow and their associated audiences in an online group setting. 
- Site has secure authentication and differentiates between writers and and base users.
- Blog/Columns/Articles are displayed in a pleasing manner.
- Writers have the ability to moderate live chat via blacklisting.
- Chatrooms will be limited to ~10 people with a minimum time between chats to encourage thoughtful and intimate discussions.
- Displays a random proverb each day.

## Design

![Mock](/public/Mockup.png)

## Technologies

- **HTML:** Uses two HTML pages: One for authentication and one for users to find writers, explore articles, and chat.
- **CSS:** Application and styling that is pleasant on different devices and screen resolutions. The theme should invite etiquette.
- **Javascript:** Provides login, displays writers, and displays article choices all by communicating with the backend.
- **React:** Used for a thoughtful routing schema designed around component views on a single page.
- **Service:** Backend service with endpoints for -  
    - Retrieving writers
    - Retrieving articles
    - Validating chat messages
    - Retrieving a random proverb
- **DB/Login:** Store base users and writers in the database. No features of the main site are available until authenticated. Registers new users and writers. Stores articles.
- **WebSocket:** Users' live chat messages are broadcast to all other users in the chat room.

## HTML Deliverable

For this deliverable I built out the structure, main navigational elements, and placeholder logic for my application using HTML.

- [x] **HTML pages** \- Four HTML pages corresponding to a login screen, home screen, writer discovery screen, and writer information screen.
- [x] **Links** - The header contains links to the login page (logout) and home page. Additionally, all links work with the exception of the buttons for "article" and "chat" as this will be implemented using JavaScript.
- [x] **Text** \- Included placeholder text for articles, biographical information for writers, and chat messages.
- [x] **Images** - Included one image per article and one per writer. Additionally, the website icon is updated to reflect the brand.
- [x] **DB/Login** \- The database will need to be queried to validate current users, and it will need to be written to create new users. The "Username" text on the header of each page will be replaced dynamically with the user's actual username. Additionally, the location of articles and images created by writers will need to be referenced in the database. Finally, the user has a unique follower list that will be stored in and retrieved from the database. The live chat will not be persistent beyond the UI. Writers will have a persistent and permanent blacklist that will be stored and enforced (clicking the user's name in chat).
- [x] **WebSocket** - Chat on the home screen will be a realtime feed.


## CSS Deliverable

For this deliverable I properly styled the application into its final appearance.

- [x] **Header, footer, and main content body** - I created a neat header which has styled buttons for navigation across pages and an aesthetically pleasing brand image. The footer is styled similarly. The main body reuses many similar color themes and element styling across the pages.
- [x] **Navigation elements** - Styled navigation elements include: Buttons in the header to reach the home page or log out, forms and buttons to log in, buttons relating to writers on the home page, a button redirecting the user to the discover page. All of these are styled appropriately with the overall look and feel of the page.
- [x] **Responsive to window resizing** - My application is designed to forgo displaying the header and footer on shorter viewports throughout the app. Additionally, the home screen rearranges the flexbox to move the writers list below the blog list on narrow screens. Text sizes throughout are relative to device font size, and width is based on screen or parent element percentages.
- [x] **Application elements** - Elements have good margins and padding where needed. They are arranged in an orderly way which separates their functionality visually. Within many organizing elements, care is taken to center the text or likewise enclosed elements.
- [x] **Application text content** - Fonts are consistent throughout (sans-serif) for readability. The exception to this is the header and footer which employ a serif font to suggest a aura of luxury to the app.
- [x] **Application images** - Many application images throughout. Images on the writers page (click a "writer you follow") are resized when the device screen reaches a certain narrow threshold to maintain an organized look (obviously this necessitated changes to the flexbox as well).

## React deliverable Phase 1: HTML/CSS

For this deliverable I used JavaScript and React so that the application behaves as a single page application (SPA) now.

- [x] **File Structure** - Reorganized the file hierarchy to support development using React. The index.html with a root element and index.jsx for the React entry point are both in the root of the project. The src folder contains the actual app component with folders for components corresponding to different traditional "pages."
- [x] **Installing/Configuring Toolchain** - Used npm to initialize a project and track dependencies. Installed React and associated libraries for manipulating the DOM using react. Additionally, installed Vite for transpilation and bundling as well as testing during development. Additionally, I configured Vite to be the default server for `npm run dev` command.
- [x] **Components** - Each part of the application that used to be a single page was component-ized into a jsx file. This includes the login, home, writer, and discover components. The wrapping app component for the whole thing contains what use to be part of the header.
    - [x] **Login Component** - Login component buttons still function and take the user to the home page (the login and create new user buttons).
    - [x] **Home Component** - The home component looks identical to the previous deliverable; the writers bring the user to the writer page, and the discover button brings the user to the discover page.
    - [x] **Writer/Discover Components** - These are the simplest components of the entire application, and they merely show up as before.
- [x] **Router** - Routing is used for every button which links to a new view in the main area of the page. No anchor tags are used for internal navigation. This includes links in the header. This was accomplished by wrapping the entire body of the application in a BrowserRouter element.
- [x] **CSS** - As React imports CSS globally, I reworked some of the CSS and significantly trimmed the fat in the component CSS files to follow DRY principles and avoid naming selection conflicts across what previously were separate pages.
- [x] **Deployment** - Added a new deployment script and deployed the application to the startup subdomain of my primary domain.

&nbsp;