const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const app = express();

const authCookieName = "token";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = [];
let articles = [
    { title: "Article 1", content: "Article Content 1", image: "article_1" },
    { title: "Article 2", content: "Article Content 2", image: "article_2" },
    { title: "Article 3", content: "Article Content 3", image: "article_3" },
    { title: "Article 4", content: "Article Content 4", image: "article_4" },
    { title: "Article 5", content: "Article Content 5", image: "article_5" },
    { title: "Article 6", content: "Article Content 6", image: "article_6" },
    { title: "Article 7", content: "Article Content 7", image: "article_7" },
    { title: "Article 8", content: "Article Content 8", image: "article_8" },
    { title: "Article 9", content: "Article Content 9", image: "article_9" },
    { title: "Article 10", content: "Article Content 10", image: "article_10" }
];
let writers = [
    { writer: "Billy Bob", bio: "Writer 1 Bio", articles: [1, 2], image: "writer_1" },
    { writer: "Joe Schmoe", bio: "Writer 2 Bio", articles: [3, 4], image: "writer_2" },
    { writer: "Jane Doe", bio: "Writer 3 Bio", articles: [5, 6], image: "writer_3" },
    { writer: "Peter Piper", bio: "Writer 4 Bio", articles: [7, 8], image: "writer_4" },
    { writer: "Sally Seashell", bio: "Writer 5 Bio", articles: [9, 10], image: "writer_5" },
];
let user_follows = [];


let apiRouter = express.Router();
app.use(`/api`, apiRouter);

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
apiRouter.get("/articles", verifyAuth, (_req, res) => {
    res.send(articles);
});

// GetWriters
apiRouter.get("/writers", verifyAuth, (_req, res) => {
  res.send(writers);
});

// GetWriters Followed
apiRouter.get("/writersFollowed", verifyAuth, async (_req, res) => {
    const user = await findUser("token", _req.cookies[authCookieName]);
    if (user) {
        const followedWriters = user_follows[user.email] || [];
        res.send(followedWriters)
    }
});

// SubmitFollowUpdate
apiRouter.post("/followUpdate", verifyAuth, async (req, res) => {
    const user = await findUser("token", req.cookies[authCookieName]);
    if (user) {
        console.log("THIS IS THE USER")
        console.log(user);
        user_follows[user.email] = req.body;
        const followedWriters = user_follows[user.email] || [];
        res.send(followedWriters);
    }
    console.log("USER FOLLOWS");
    console.log(user_follows);
});

// GetQuote
app.get('/api/quote', async (req, res) => {
    const response = await fetch('https://stoic.tekloon.net/stoic-quote');
    const data = await response.json();
    res.json(data); // Send data back to the frontend
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
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
