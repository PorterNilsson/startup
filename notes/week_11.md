# Week 11

## Backend Testing

- Jest is one of the most popular testing frameworks (backend) out there right now
- Principles
    - Test only one thing
    - Don't repeat tests that are already covered elsewhere
    - Naturally supported by the application code
    - Tests are readable
    - Test can run in any order
    - Test can run concurrently

## Frontend Testing

- ```JavaScript
      import { test, expect } from '@playwright/test';
      
      function getRandomName(prefix) {
        return `${prefix}_${Math.random().toString(36).substring(2, 15)}`;
      }
      
      test('complete flow', async ({ page }) => {
        await page.goto('http://localhost:5173');
        await expect(page.getByRole('heading')).toContainText('Login');
      
        const userName = getRandomName('user');
      
        // Register
        await page.locator('input[type="text"]').fill(userName);
        await page.locator('input[type="password"]').fill('toomanysecrets');
        await page.getByRole('button', { name: 'Register' }).click();
      
        await expect(page.getByRole('heading')).toContainText('Profile');
        await expect(page.getByRole('main')).toContainText(`Logged in as: ${userName}`);
      
        // Logout
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.getByRole('heading')).toContainText('Login');
      
        // Duplicate registration
        await page.locator('input[type="text"]').fill(userName);
        await page.locator('input[type="password"]').fill('toomanysecrets');
      
        page.once('dialog', async (dialog) => {
          await expect(dialog.message()).toContain('Authentication failed');
          dialog.dismiss().catch(() => {});
        });
        await page.getByRole('button', { name: 'Register' }).click();
      
        // Login
        await page.getByRole('button', { name: 'Login' }).click();
      
        await expect(page.getByRole('heading')).toContainText('Profile');
        await expect(page.getByRole('main')).toContainText(`Logged in as: ${userName}`);
      });
    ```
    

## Websocket

- ```JavaScript
      // BROWSER CODE
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      const socket = new WebSocket(`${protocol}://${window.location.host}`);
      
      socket.onmessage = (event) => {
        console.log('received: ', event.data);
      };
      
      socket.send('I am listening');
      
      // SERVER CODE
      const { WebSocketServer } = require('ws');
      
      const wss = new WebSocketServer({ port: 3000 });
      
      wss.on('connection', (ws) => {
        ws.on('message', (data) => {
          const msg = String.fromCharCode(...data);
          console.log('received: %s', msg);
      
          ws.send(`I heard you say "${msg}"`);
        });
      
        ws.send('Hello webSocket');
      });
    ```
    

## Debugging Websocket

- Chrome has arrows in the developer tools windows which are specifically designed to show websocket communication

## Websocket Chat

- ```JavaScript
    class ChatClient {
      observers = [];
      connected = false;
    
      constructor() {
        // Adjust the webSocket protocol to what is being used for HTTP
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    
        // Display that we have opened the webSocket
        this.socket.onopen = (event) => {
          this.notifyObservers('system', 'websocket', 'connected');
          this.connected = true;
        };
    
        // Display messages we receive from our friends
        this.socket.onmessage = async (event) => {
          const text = await event.data.text();
          const chat = JSON.parse(text);
          this.notifyObservers('received', chat.name, chat.msg);
        };
    
        // If the webSocket is closed then disable the interface
        this.socket.onclose = (event) => {
          this.notifyObservers('system', 'websocket', 'disconnected');
          this.connected = false;
        };
      }
    
      // Send a message over the webSocket
      sendMessage(name, msg) {
        this.notifyObservers('sent', 'me', msg);
        this.socket.send(JSON.stringify({ name, msg }));
      }
    
      addObserver(observer) {
        this.observers.push(observer);
      }
    
      notifyObservers(event, from, msg) {
        this.observers.forEach((h) => h({ event, from, msg }));
      }
    }
    ```
    
- ```JavaScript
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Chat webSocket={new ChatClient()} />);
    ```
    
- ```JavaScript
    function Chat({ webSocket }) {
      const [name, setName] = React.useState('');
    
      return (
        <main>
          <Name updateName={setName} />
          <Message name={name} webSocket={webSocket} />
          <Conversation webSocket={webSocket} />
        </main>
      );
    }
    ```
    
- BACKEND
- ```JavaScript
    const { WebSocketServer } = require('ws');
    const express = require('express');
    const app = express();
    
    // Serve up the chat frontend
    app.use(express.static('./public'));
    
    const port = process.argv.length > 2 ? process.argv[2] : 3000;
    server = app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
    
    // Create a websocket object
    const socketServer = new WebSocketServer({ server });
    ```
    
- ```JavaScript
    socketServer.on('connection', (socket) => {
      socket.isAlive = true;
    
      // Forward messages to everyone except the sender
      socket.on('message', function message(data) {
        socketServer.clients.forEach(function each(client) {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });
    
      // Respond to pong messages by marking the connection alive
      socket.on('pong', () => {
        socket.isAlive = true;
      });
    });
    
    // Periodically send out a ping message to make sure clients are alive
    setInterval(() => {
      socketServer.clients.forEach(function each(client) {
        if (client.isAlive === false) return client.terminate();
    
        client.isAlive = false;
        client.ping();
      });
    }, 10000);
    ```
    
- ```JavaScript
    import { defineConfig } from 'vite';
    
    export default defineConfig({
      server: {
        proxy: {
          '/ws': {
            target: 'ws://localhost:3000',
            ws: true,
          },
        },
      },
    });
    ```
    

## Simon Websocket

- Make sure to npm install ws
- You can abstract backend functionality into peerProxy.js essentially