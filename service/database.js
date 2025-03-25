const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const articleCollection = db.collection('articles');
const writerCollection = db.collection('writers');
const userFollowsCollection = db.collection('userFollows');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}


// async function addScore(score) {
//   return scoreCollection.insertOne(score);
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

function getArticles() {
    return articleCollection.find({}).toArray();
}

function getWriters() {
    return writerCollection.find({}).toArray();
}

function getFollowedWriters(email) {
    const result = userFollowsCollection.findOne(
        { email: email },  // Find the document by email
        { projection: { followedWriters: 1 } }  // Only return the followedWriters field
    );

    console.log("RESULT FROM getFollowedWriters");
    console.log(result);

    return result;
}

function updateFollowedWriters(email, followedWriters) {
    const result = userFollowsCollection.updateOne(
        { email: email },
        { $set: { followedWriters: followedWriters } },
        { upsert: true }
    );

    console.log("RESULT FROM updateFollowedWriters");
    console.log(result);

    return result;
}

module.exports = {
  updateUser,
  getArticles,
  getWriters,
  getFollowedWriters,
  updateFollowedWriters,
  addUser,
  getUserByToken,
  getUser
};
