const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3333;

const server = express();
server.use(bodyParser.json());
server.use(cors());
const token =
  'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98';
const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

// Data from https://www.uncommongoods.com/fun/by-interest/geek-gifts

let tests = [
  {
    score: 0,
    isEditing: false,
    id: 1,
    creator: 'Mrs. Mathews',
    title: 'Math Test',
    testTaker: 'Sally',
    questions: [
      {
        id: 1,
        correct: false,
        question: "What's 6X6 ?",
        type: 'multiple-choice',
        options: [36, 34, 26, 52],
        answer: 36
      },
      {
        id: 2,
        correct: false,
        question: 'True or False, 6X6=36?',
        type: 'true-false',
        options: ['T', 'F'],
        answer: 'T'
      },
      {
        id: 3,
        correct: false,
        question: 'What is the order of operations?',
        type: 'short-answer',
        options: 'n/a',
        answer: 'parentheses, exponents, multiply, divide, add, subtract'
      }
    ]
  }
];

let testID = 2;

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User must be logged in to do that.' });
  }
}

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'steve' && password === '123') {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token
      });
    }, 1000);
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see Readme' });
  }
});

server.get('/tests', authenticator, (req, res) => {
  res.json(tests);
});

server.get('/testById/:id', authenticator, (req, res) => {
  const { id } = req.params;
  const findTestById = item => {
    return item.id == id;
  };
  const foundTest = tests.find(findTestById);
  if (!foundTest) {
    return sendUserError('No Item found by that ID', res);
  } else {
    res.json(foundTest);
  }
});

server.post('/tests', authenticator, (req, res) => {
  const { score, creator, title, testTaker, questions } = req.body;
  const newItem = { title, price, imageUrl, description, shipping, id: testID };
  if (!title || !creator) {
    return sendUserError(
      'Ya gone did goofed! title and creator are required to create an item in the item DB.',
      res
    );
  }
  const findTestByTitle = item => {
    return item.title === title;
  };
  if (tests.find(findTestByTitle)) {
    return sendUserError(
      `Ya gone did goofed! ${title} already exists in the item DB.`,
      res
    );
  }

  tests.push(newItem);
  testID++;
  res.json(tests);
});

server.put('/tests/:id', authenticator, (req, res) => {
  const { id } = req.params;
  const { score, creator, title, testTaker, questions } = req.body;
  const findTestById = item => {
    return item.id == id;
  };
  const foundTest = tests.find(findTestById);
  if (!foundTest) {
    return sendUserError('No test found by that ID', res);
  } else {
    if (score) foundTest.score = score;
    if (creator) foundTest.creator = creator;
    if (title) foundTest.title = title;
    if (testTaker) foundTest.testTaker = testTaker;
    if (questions) foundTest.questions = questions;
    res.json(tests);
  }
});

server.delete('/tests/:id', authenticator, (req, res) => {
  const { id } = req.params;
  const foundTest = tests.find(item => item.id == id);

  if (foundTest) {
    const ItemRemoved = { ...foundTest };
    tests = tests.filter(item => item.id != id);
    res.status(200).json(tests);
  } else {
    sendUserError('No test by that ID exists in the test DB', res);
  }
});

server.get('/', function(req, res) {
  res.send('App is working 👍');
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});