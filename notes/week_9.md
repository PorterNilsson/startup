# Week 9

## Authorization Services

- Usually a cookie is passed back to web server with each request to ensure that a user is authenticated
- Often people use third party services because of how complex things can become

## Account Creation and Login

| Endpoint | Purpose |
| --- | --- |
| Registration | Create account (create user and auth) |
| Login | Log into account (create auth) |
| Logout | Logout of account (delete auth) |
| Get Me | Returns information about the authenticated user |

- ```HTTP
      POST /api/auth HTTP/2
      Content-Type: application/json
      {
        "email":"marta@id.com",
        "password":"toomanysecrets"
      }
      
      HTTP/2 200 OK
      Content-Type: application/json
      Set-Cookie: auth=tokenHere
      {
        "email":"marta@id.com"
      }
    ```
    
- ```HTTP
      POST /api/auth HTTP/2
      Content-Type: application/json
      {
        "email":"marta@id.com",
        "password":"toomanysecrets"
      }
      
      HTTP/2 200 OK
      Content-Type: application/json
      Set-Cookie: auth=tokenHere
      {
        "email":"marta@id.com"
      }
    ```
    
- ```HTTP
      DELETE /api/auth HTTP/2
      Cookie: auth=tokenHere
      
      HTTP/2 200 OK
      Content-Type: application/json
      {
      }
    ```
    
- ```HTTP
      GET /api/user HTTP/2
      Cookie: auth=tokenHere
      
      HTTP/2 200 OK
      Content-Type: application/json
      {
        "email":"marta@id.com"
      }
    ```
    
- ```JavaScript
      // Stubbing out the endpoints
      
      const express = require('express');
      const app = express();
      
      // registration
      app.post('/api/auth', async (req, res) => {
        res.send({ email: 'marta@id.com' });
      });
      
      // login
      app.put('/api/auth', async (req, res) => {
        res.send({ email: 'marta@id.com' });
      });
      
      // logout
      app.delete('/api/auth', async (req, res) => {
        res.send({});
      });
      
      // getMe
      app.get('/api/user', async (req, res) => {
        res.send({ email: 'marta@id.com' });
      });
      
      app.listen(3000);
    ```
    
- Generate an authtoken via uuid NPM package
    
- ```JavaScript
      const cookieParser = require('cookie-parser');
      app.use(cookieParser());
      
      // Create a token for the user and send a cookie containing the token
      function setAuthCookie(res, user) {
        user.token = uuid.v4();
      
        res.cookie('token', user.token, {
          secure: true,
          httpOnly: true,
          sameSite: 'strict',
        });
      }
    ```
    
- ```
      npm init -y
      npm install vite@latest -D
      npm install react react-dom react-router-dom
    ```
    
- ```JavaScript
      // Final backend
      
      const express = require('express');
      const app = express();
      const cookieParser = require('cookie-parser');
      const uuid = require('uuid');
      const bcrypt = require('bcryptjs');
      
      app.use(express.json());
      app.use(cookieParser());
      
      app.post('/api/auth', async (req, res) => {
        if (await getUser('email', req.body.email)) {
          res.status(409).send({ msg: 'Existing user' });
        } else {
          const user = await createUser(req.body.email, req.body.password);
          setAuthCookie(res, user);
      
          res.send({ email: user.email });
        }
      });
      
      app.put('/api/auth', async (req, res) => {
        const user = await getUser('email', req.body.email);
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
          setAuthCookie(res, user);
      
          res.send({ email: user.email });
        } else {
          res.status(401).send({ msg: 'Unauthorized' });
        }
      });
      
      app.delete('/api/auth', async (req, res) => {
        const token = req.cookies['token'];
        const user = await getUser('token', token);
        if (user) {
          clearAuthCookie(res, user);
        }
      
        res.send({});
      });
      
      app.get('/api/user/me', async (req, res) => {
        const token = req.cookies['token'];
        const user = await getUser('token', token);
        if (user) {
          res.send({ email: user.email });
        } else {
          res.status(401).send({ msg: 'Unauthorized' });
        }
      });
      
      const users = [];
      
      async function createUser(email, password) {
        const passwordHash = await bcrypt.hash(password, 10);
      
        const user = {
          email: email,
          password: passwordHash,
        };
      
        users.push(user);
      
        return user;
      }
      
      async function getUser(field, value) {
        if (value) {
          return users.find((user) => user[field] === value);
        }
        return null;
      }
      
      function setAuthCookie(res, user) {
        user.token = uuid.v4();
      
        res.cookie('token', user.token, {
          secure: true,
          httpOnly: true,
          sameSite: 'strict',
        });
      }
      
      function clearAuthCookie(res, user) {
        delete user.token;
        res.clearCookie('token');
      }
      
      const port = 3000;
      app.listen(port, function () {
        console.log(`Listening on port ${port}`);
      });
    ```
    
- ```JSX
      // index.jsx
      
      function App() {
        return (
          <BrowserRouter>
            <main>
              <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </main>
          </BrowserRouter>
        );
      }
    ```
    
- ```JSX
      function Login() {
        const navigate = useNavigate();
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
      
        function handleLogin() {
          createAuth('PUT');
        }
      
        function handleRegister() {
          createAuth('POST');
        }
      
        async function createAuth(method) {
          const res = await fetch('api/auth', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          await res.json();
          if (res.ok) {
            navigate('/profile');
          } else {
            alert('Authentication failed');
          }
        }
      
        return (
          <div>
            <h1>Login</h1>
            <div>
              <label>Email:</label>
              <input type='text' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Password:</label>
              <input type='password' onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type='submit' disabled={!(email && password)} onClick={handleLogin}>
              Login
            </button>
            <button type='button' disabled={!(email && password)} onClick={handleRegister}>
              Register
            </button>
          </div>
        );
      }
    ```
    
- ```JSX
      function Profile() {
        const navigate = useNavigate();
        const [userInfo, setUserInfo] = React.useState('');
      
        React.useEffect(() => {
          (async () => {
            const res = await fetch('api/user/me');
            const data = await res.json();
            setUserInfo(data);
          })();
        }, []);
      
        function handleLogout() {
          fetch('api/auth', {
            method: 'DELETE',
          });
          navigate('/');
        }
      
        return (
          <div>
            <h1>Profile</h1>
            <div>Logged in as: {userInfo.email}</div>
            <button type='button' onClick={handleLogout}>
              Logout
            </button>
          </div>
        );
      }
    ```
    

## Simon Service

- You put the backend code in a "service" directory that's inside the main project folder
- Run it with `node index.js`
- Must add a vite config to tell it to act as a proxy
- ```js
      import { defineConfig } from 'vite';
      
      export default defineConfig({
        server: {
          proxy: {
            '/api': 'http://localhost:3000',
          },
        },
      });
      
    ```
    

## Deliverable

- You can use `fetch` on the backend to get around the browser worrying about CORS being disabled. You backend acts as a proxy in this case.

## PM2

- `pm2 ls` will list services configured to run on your server which act as daemons and are restarted automatically on restart or crash

| Command | Purpose |
| --- | --- |
| **pm2 ls** | List all of the hosted node processes |
| **pm2 monit** | Visual monitor |
| **pm2 start index.js -n simon** | Add a new process with an explicit name |
| **pm2 start index.js -n startup -- 4000** | Add a new process with an explicit name and port parameter |
| **pm2 stop simon** | Stop a process |
| **pm2 restart simon** | Restart a process |
| **pm2 delete simon** | Delete a process from being hosted |
| **pm2 delete all** | Delete all processes |
| **pm2 save** | Save the current processes across reboot |
| **pm2 restart all** | Reload all of the processes |
| **pm2 restart simon --update-env** | Reload process and update the node version to the current environment definition |
| **pm2 update** | Reload pm2 |
| **pm2 start env.js --watch --ignore-watch="node_modules"** | Automatically reload service when index.js changes |
| **pm2 describe simon** | Describe detailed process information |
| **pm2 startup** | Displays the command to run to keep PM2 running after a reboot. |
| **pm2 logs simon** | Display process logs |
| **pm2 env 0** | Display environment variables for process. Use `pm2 ls` to get the process ID |

- Adding a new web service
    1.  Add the rule to the Caddyfile to tell it how to direct requests for the domain.
    2.  Create a directory and add the files for the web service.
    3.  Configure PM2 to host the web service.
- ```
    cd ~/services/tacos
    pm2 start index.js -n tacos -- 5000
    pm2 save
    ```
## Development

- Keep staging, pen testing, and production all separate
- Using a script to deploy encourages incremental deployments

## Uploading Files

- ```HTML
    <html lang="en">
      <body>
        <h1>Upload an image</h1>
        <input type="file" id="fileInput" name="file" accept=".png, .jpeg, .jpg" onchange="uploadFile(this)" />
        <div>
          <img style="padding: 2em 0" id="upload" />
        </div>
        <script defer src="frontend.js"></script>
      </body>
    </html>
    ```
    
- ```JavaScript
    async function uploadFile(fileInput) {
      const file = fileInput.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
    
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });
    
        const data = await response.json();
        if (response.ok) {
          document.querySelector('#upload').src = `/${data.file}`;
        } else {
          alert(data.message);
        }
      }
    }
    ```
    
- ```JavaScript
    const express = require('express');
    const multer = require('multer');
    
    const app = express();
    
    app.use(express.static('public'));
    
    const upload = multer({
      storage: multer.diskStorage({
        destination: 'public/',
        filename: (req, file, cb) => {
          const filetype = file.originalname.split('.').pop();
          const id = Math.round(Math.random() * 1e9);
          const filename = `${id}.${filetype}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: 64000 },
    });
    
    app.post('/upload', upload.single('file'), (req, res) => {
      if (req.file) {
        res.send({
          message: 'Uploaded succeeded',
          file: req.file.filename,
        });
      } else {
        res.status(400).send({ message: 'Upload failed' });
      }
    });
    
    app.use((err, req, res, next) => {
      if (err instanceof multer.MulterError) {
        res.status(413).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
    
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
    ```
    

## Storage Services

| Provider | Documentation | Free Tier | Free Storage Included |
| --- | --- | --- | --- |
| **Amazon S3** | <ins>Amazon S3 Documentation</ins> | Yes | 5 GB for 12 months |
| **Google Cloud Storage** | <ins>Google Cloud Storage Documentation</ins> | Yes | 5 GB |
| **Microsoft Azure Storage** | <ins>Azure Storage Documentation</ins> | Yes | 5 GB for 12 months |
| **IBM Cloud Object Storage** | <ins>IBM Cloud Object Storage Documentation</ins> | Yes | Lite plan with 25 GB |
| **MinIO** | <ins>MinIO Documentation</ins> | No  | N/A |
| **OpenStack Swift** | <ins>OpenStack Swift Documentation</ins> | No  | N/A |

- You should consider your server to be ephemeral and replaceable, so the storage solution should be totally seperate
- AWS Advantages
    - 1.  It has unlimited capacity
        2.  You only pay for the storage that you use
        3.  It is optimized for global access
        4.  It keeps multiple redundant copies of every file
        5.  You can version the files
        6.  It is performant
        7.  It supports metadata tags
        8.  You can make your files publicly available directly from S3
        9.  You can keep your files private and only accessible to your application