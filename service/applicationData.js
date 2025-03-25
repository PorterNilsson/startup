// A standalone script to insert the original "articles" and "writers" that exist in the database

const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

// Database connection details
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const articleCollection = db.collection("articles");
const writerCollection = db.collection("writers");

// Test the connection to the MongoDB database
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log("Connected to database");
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`
    );
    process.exit(1);
  }
})();

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
  { title: "Article 10", content: "Article Content 10", image: "article_10" },
];

let writers = [
    { writer: "Billy Bob", bio: "Writer 1 Bio", articles: [1, 2], image: "writer_1" },
    { writer: "Joe Schmoe", bio: "Writer 2 Bio", articles: [3, 4], image: "writer_2" },
    { writer: "Jane Doe", bio: "Writer 3 Bio", articles: [5, 6], image: "writer_3" },
    { writer: "Peter Piper", bio: "Writer 4 Bio", articles: [7, 8], image: "writer_4" },
    { writer: "Sally Seashell", bio: "Writer 5 Bio", articles: [9, 10], image: "writer_5" },
];

async function insertArticles() {
  const existingArticles = await articleCollection.find({}).toArray();
  if (existingArticles.length === 0) {
    await articleCollection.insertMany(articles);
  } else {
    console.log("Articles already exist in the database.");
  }
}

async function insertWriters() {
  const existingWriters = await writerCollection.find({}).toArray();
  if (existingWriters.length === 0) {
    await writerCollection.insertMany(writers);
  } else {
    console.log("Writers already exist in the database.");
  }
}

(async function () {
  await insertArticles();
  await insertWriters();
  process.exit(0);
})();
