# Week 8

## Web Servers

- ```JavaScript
    const express = require('express');
    const app = express();
    
    // Serve static files from the 'public' directory
    app.use(express.static('public'));
    
    app.listen(80);
    
    app.get('/time', (req, res) => {
      res.json({ time: new Date().toDateString() });
    });
    ```
    
- A service gateway or reverse proxy routes requests to different applications via ports
- Serverless allows you to just think about a single service endpoint instead of the whole server at once

## Web Services Introduction

- We create "endpoints" or an "API" on the backend to get data with "fetch"

## URL

- `<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>`

| Part | Example | Meaning |
| --- | --- | --- |
| Scheme | https | The protocol required to ask for the resource. For web applications, this is usually HTTPS. But it could be any internet protocol such as FTP or MAILTO. |
| Domain name | byu.edu | The domain name that owns the resource represented by the URL. |
| Port | 3000 | The port specifies the numbered network port used to connect to the domain server. Lower number ports are reserved for common internet protocols, higher number ports can be used for any purpose. The default port is 80 if the scheme is HTTP, or 443 if the scheme is HTTPS. |
| Path | /school/byu/user/8014 | The path to the resource on the domain. The resource does not have to physically be located on the file system with this path. It can be a logical path representing endpoint parameters, a database table, or an object schema. |
| Parameters | filter=names&highlight=intro,summary | The parameters represent a list of key value pairs. Usually it provides additional qualifiers on the resource represented by the path. This might be a filter on the returned resource or how to highlight the resource. The parameters are also sometimes called the query string. |
| Anchor | summary | The anchor usually represents a sub-location in the resource. For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor. The anchor is also sometimes called the hash, or fragment ID. |

- Technically, you can contain a username and password before the domain and this is still sometimes seen for databases

## Ports

| Port | Protocol |
| --- | --- |
| 20  | File Transfer Protocol (FTP) for data transfer |
| 22  | Secure Shell (SSH) for connecting to remote devices |
| 25  | Simple Mail Transfer Protocol (SMTP) for sending email |
| 53  | Domain Name System (DNS) for looking up IP addresses |
| 80  | Hypertext Transfer Protocol (HTTP) for web requests |
| 110 | Post Office Protocol (POP3) for retrieving email |
| 123 | Network Time Protocol (NTP) for managing time |
| 161 | Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers |
| 194 | Internet Relay Chat (IRC) for chatting |
| 443 | HTTP Secure (HTTPS) for secure web requests |

- Gateway runs on a specific port and then redirects traffic internally to applications running on different ports

## HTTP

- ```HTTP
    GET /hypertext/WWW/Helping.html HTTP/1.1
    Host: info.cern.ch
    Accept: text/html
    ```
    
- ```MD
    <verb> <url path, parameters, anchor> <version>
    [<header key: value>]*
    [
    
      <body>
    ]
    ```
    
    - Request and format ^^^
- ```HTTP
    HTTP/1.1 200 OK
    Date: Tue, 06 Dec 2022 21:54:42 GMT
    Server: Apache
    Last-Modified: Thu, 29 Oct 1992 11:15:20 GMT
    ETag: "5f0-28f29422b8200"
    Accept-Ranges: bytes
    Content-Length: 1520
    Connection: close
    Content-Type: text/html
    
    <TITLE>Helping -- /WWW</TITLE>
    <NEXTID 7>
    <H1>How can I help?</H1>There are lots of ways you can help if you are interested in seeing
    the <A NAME=4 HREF=TheProject.html>web</A> grow and be even more useful...
    ```
    
    ```MD
    <version> <status code> <status string>
    [<header key: value>]*
    [
    
      <body>
    ]
    ```
    
    - Response and format ^^^

| Verb | Meaning |
| --- | --- |
| GET | Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources. |
| POST | Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource. |
| PUT | Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource. |
| DELETE | Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete. |
| OPTIONS | Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned. |

- Status Codes
    - 1xx - Informational.
    - 2xx - Success.
    - 3xx - Redirect to some other location, or that the previously cached resource is still valid.
    - 4xx - Client errors. The request is invalid.
    - 5xx - Server errors. The request cannot be satisfied due to an error on the server.

| Code | Text | Meaning |
| --- | --- | --- |
| 100 | Continue | The service is working on the request |
| 200 | Success | The requested resource was found and returned as appropriate. |
| 201 | Created | The request was successful and a new resource was created. |
| 204 | No Content | The request was successful but no resource is returned. |
| 304 | Not Modified | The cached version of the resource is still valid. |
| 307 | Permanent redirect | The resource is no longer at the requested location. The new location is specified in the response location header. |
| 308 | Temporary redirect | The resource is temporarily located at a different location. The temporary location is specified in the response location header. |
| 400 | Bad request | The request was malformed or invalid. |
| 401 | Unauthorized | The request did not provide a valid authentication token. |
| 403 | Forbidden | The provided authentication token is not authorized for the resource. |
| 404 | Not found | An unknown resource was requested. |
| 408 | Request timeout | The request takes too long. |
| 409 | Conflict | The provided resource represents an out of date version of the resource. |
| 418 | <ins>I'm a teapot</ins> | The service refuses to brew coffee in a teapot. |
| 429 | Too many requests | The client is making too many requests in too short of a time period. |
| 500 | Internal server error | The server failed to properly process the request. |
| 503 | Service unavailable | The server is temporarily down. The client should try again with an exponential back off. |

| Header | Example | Meaning |
| --- | --- | --- |
| Authorization | Bearer bGciOiJIUzI1NiIsI | A token that authorized the user making the request. |
| Accept | image/\* | The format the client accepts. This may include wildcards. |
| Content-Type | text/html; charset=utf-8 | The format of the content being sent. These are described using standard <ins>MIME</ins> types. |
| Cookie | SessionID=39s8cgj34; csrftoken=9dck2 | Key value pairs that are generated by the server and stored on the client. |
| Host | info.cern.ch | The domain name of the server. This is required in all requests. |
| Origin | cs260.click | Identifies the origin that caused the request. A host may only allow requests from specific origins. |
| Access-Control-Allow-Origin | <ins>https://cs260.click</ins> | Server response of what origins can make a request. This may include a wildcard. |
| Content-Length | 368 | The number of bytes contained in the response. |
| Cache-Control | public, max-age=604800 | Tells the client how it can cache the response. |
| User-Agent | Mozilla/5.0 (Macintosh) | The client application making the request. |

- Cookies
    - ```HTTP
        HTTP/2 200
        Set-Cookie: myAppCookie=tasty; SameSite=Strict; Secure; HttpOnly
        
        // Received from the server
        ```
        
    - ```HTTP
        HTTP/2 200
        Cookie: myAppCookie=tasty
        
        // Sent back to the server by the client on subsequent site visitations
        ```
        

## Fetch

- ```JavaScript
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });
    ```
    
- ```JSON
    // Response
    {
      author: 'Kyle Simpson',
      quote: "There's nothing more permanent than a temporary hack."
    }
    ```
    
- ```JavaScript
    // POST request
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'test title',
        body: 'test body',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });
    ```
## Service Design
    
- Model services after how the user interacts with the service. Plain language rather than technical concepts
    
- Endpoint Tips
    
    - Grammatical
    - Readable
    - Discoverable
    - Compatible
    - Simple
    - Documented
- RPC (Remote Procedure Calls)
    
    - ```HTTP
            POST /updateOrder HTTP/2
            
            {"id": 2197, "date": "20220505"}
        ```
        
    - ```HTTP
            POST /rpc HTTP/2
            
            {"cmd":"updateOrder", "params":{"id": 2197, "date": "20220505"}}
        ```
        
    - Two methods that accomplish the same thing
        
    - Essentially creates a coupling between endpoints and implementation (you kind of "call" functions using HTTP)
        
- REST (Representation State Transfer)
    
    - ```HTTP
            PUT /order/2197 HTTP/2
            
            {"date": "20220505"}
        ```
        
    - Fully leverages HTTP by requiring the right keyword
        
- GraphQL
    
    - ```GraphQL
            query {
              getOrder(id: "2197") {
                orders(filter: { date: { allofterms: "20220505" } }) {
                  store
                  description
                  orderedBy
                }
              }
            }
        ```
        
    - Basically requests all the information at once instead of requiring a bunch of calls
        
    - Has the downside of being able to consume massive amounts of server's resources
        

## Node Web Service

- `node index.js` or f5 to attach a debugger in VS Code

## Express

- Provide Support for
    
    - 1.  Routing requests for service endpoints
        2.  Manipulating HTTP requests with JSON body content
        3.  Generating HTTP responses
        4.  Using `middleware` to add functionality
- `npm install express`
    
- ```JavaScript
        const express = require('express');
        const app = express();
        
        app.listen(8080);
        
        app.get('/store/provo', (req, res, next) => {
          res.send({ name: 'provo' });
        });
    ```
    
- Patterns are matched in the order they are declared
    
- ```JavaScript
        // Wildcard - matches /store/x and /star/y
        app.put('/st*/:storeName', (req, res) => res.send({ update: req.params.storeName }));
        
        // Pure regular expression
        app.delete(/\/store\/(.+)/, (req, res) => res.send({ delete: req.params[0] }));
    ```
    
- "Express is the mediator, and middleware functions are the middleware components."
    
- ```JavaScript
      const express = require('express');
      const cookieParser = require('cookie-parser');
      const app = express();
      
      // Third party middleware - Cookies
      app.use(cookieParser());
      
      app.post('/cookie/:name/:value', (req, res, next) => {
        res.cookie(req.params.name, req.params.value);
        res.send({ cookie: `${req.params.name}:${req.params.value}` });
      });
      
      app.get('/cookie', (req, res, next) => {
        res.send({ cookie: req.cookies });
      });
      
      // Creating your own middleware - logging
      app.use((req, res, next) => {
        console.log(req.originalUrl);
        next();
      });
      
      // Built in middleware - Static file hosting
      app.use(express.static('public'));
      
      // Routing middleware
      
      // Get store endpoint
      app.get('/store/:storeName', (req, res) => {
        res.send({ name: req.params.storeName });
      });
      
      // Update store endpoint
      app.put('/st*/:storeName', (req, res) => res.send({ update: req.params.storeName }));
      
      // Delete store endpoint
      app.delete(/\/store\/(.+)/, (req, res) => res.send({ delete: req.params[0] }));
      
      // Error middleware
      app.get('/error', (req, res, next) => {
        throw new Error('Trouble in river city');
      });
      
      app.use(function (err, req, res, next) {
        res.status(500).send({ type: err.name, message: err.message });
      });
      
      // Listening to a network port
      const port = 8080;
      app.listen(port, function () {
        console.log(`Listening on port ${port}`);
      });
    ```
    

## JavaScript modules

- CommonJS Modules (Node modules)
    - ```JavaScript
        const X = require('y');
        
        // For instance
        const express = require('express');
        const DB = require('./database.js')
        
        // Creating your own
        function alertDisplay(msg) {
          alert(msg);
        }
        
        module.exports = {
          alertDisplay,
        };
        ```
        
- ES Modules (JavaScript modules)
    - ```JSON
        // You must specify this in package.json to use these
        {
          "name": "service",
          "version": "1.0.0",
          "description": "This demonstrates a service for a web application.",
          "type": "module",
          "dependencies": {
            "express": "^4.18.2"
          }
        }
        ```
        
    - ```JavaScript
        // Syntax
        import express from 'express';
        
        express().listen(3000);
        
        // Exporting your own
        export function alertDisplay(msg) {
          console.log(msg);
        }
        ```
        
- Scope
    - ```HTML
        <script type="module">
          import { alertDisplay } from './alert.js';
          alertDisplay('module loaded');
        </script>
        ```
        
        - Basically, modules can only be called from other modules
    - ```HTML
        // Leak into the global scope this way
        
        <html>
          <body>
            <script type="module">
              import { alertDisplay } from './alert.js';
              window.btnClick = alertDisplay;
        
              document.body.addEventListener('keypress', function (event) {
                alertDisplay('Key pressed');
              });
            </script>
            <button onclick="btnClick('button clicked')">Press me</button>
          </body>
        </html>
        ```
        

## SOP and CORS

- "Same Origin Policy" and "Cross Origin Resource Sharing"
- Same origin prevents requests from essentially being asked for by a different domain
- CORS fixes this by allowing the server to specify to the browser what origins are allowed
- Check `Access-Control-Allow-Origin` header to make sure your website can access third party resources
    - Make sure they respond with "\*" or your calling origin