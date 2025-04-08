const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const DB = require("./database.js");
const app = express();
const { peerProxy } = require('./peerProxy.js');

const authCookieName = "token";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// let users = [];
// let user_follows = [];

// CreateAuth a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("email", req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

//GetArticles
apiRouter.get("/articles", verifyAuth, async (_req, res) => {
  const articles = await DB.getArticles();
  res.send(articles);
});

// GetWriters
apiRouter.get("/writers", verifyAuth, async (_req, res) => {
  const writers = await DB.getWriters();
  res.send(writers);
});

// GetWriters Followed
apiRouter.get("/writersFollowed", verifyAuth, async (_req, res) => {
  const user = await findUser("token", _req.cookies[authCookieName]);
  if (user) {
    const followedWritersDB = await DB.getFollowedWriters(user.email);

    console.log("followedWritersDB");
    console.log(followedWritersDB);
    
    if (followedWritersDB === null) {
      res.send([]);
    } else {
      res.send(followedWritersDB);
    }

    // const followedWriters = user_follows[user.email] || [];
    // res.send(followedWriters)
  }
});

// SubmitFollowUpdate
apiRouter.post("/followUpdate", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {

    const result = await DB.updateFollowedWriters(user.email, req.body);
    res.send(result);

    // user_follows[user.email] = req.body;
    // const followedWriters = user_follows[user.email] || [];
    // res.send(followedWriters);
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);