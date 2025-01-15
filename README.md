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

![Mock](/assets/images/Mockup.png)

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
