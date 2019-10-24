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
    id: 0,
    creator: 'Mrs. Mathews',
    title: 'Math Test',
    testTaker: '',
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
  },
  {
    score: 0,
    isEditing: false,
    id: 1,
    creator: 'Steve',
    title: 'History Test',
    testTaker: '',
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

let users = [
  {
    id: 0,
    username: 'steve123',
    name: 'steve',
    email: 'steve@gmail.com ',
    password: '123',
    isTeacher: true,
    classes: [
      {
        id: 0,
        subject: 'Math',
        students: [2],
        testsAssigned: [
          {
            id: 0,
            title: 'Math Test',
            assignedDate: '10/22/19',
            dueDate: '10/24/19'
          }
        ]
      },
      {
        id: 1,
        subject: 'History',
        students: [2],
        testsAssigned: [
          {
            id: 0,
            title: 'History Test',
            assignedDate: '10/22/19',
            dueDate: '10/25/19'
          }
        ]
      }
    ],

    studentIds: [2],
    testIds: [0],

    teacherName: '',
    teacherId: 0,
    gpa: 0,
    assignedTests: [],
    completedTests: []
  },
  {
    id: 1,
    username: 'mathews456',
    name: 'Mrs. Mathews',
    email: 'mathews@gmail.com ',
    password: '456',
    isTeacher: true,
    classes: [
      {
        id: 0,
        subject: 'Math',
        students: [2],
        testsAssigned: [
          {
            id: 0,
            title: 'Math Test',
            assignedDate: '10/22/19',
            dueDate: '10/24/19'
          }
        ]
      },
      {
        id: 1,
        subject: 'History',
        students: [2],
        testsAssigned: [
          {
            id: 0,
            title: 'History Test',
            assignedDate: '10/22/19',
            dueDate: '10/25/19'
          }
        ]
      }
    ],

    studentIds: [2],
    testIds: [0],

    teacherName: '',
    teacherId: 0,
    gpa: 0,
    assignedTests: [],
    completedTests: []
  },
  {
    id: 2,
    username: 'sally789',
    name: 'Sally',
    email: 'sally@school.com',
    password: '789',
    isTeacher: false,
    classes: [],

    studentIds: [2],
    testIds: [0],

    teacherName: 'Mrs. Mathews',
    teacherId: 1,
    gpa: 0,
    assignedTests: [
      {
        answersList: [],
        assignedDate: '10-20-2019',
        completedDate: null,
        gradedAnswers: [],
        scorePercentage: 0,
        testId: 0,
        title: 'Math Test',
        creator: 'Mrs. Mathews'
      },
      {
        answersList: [],
        assignedDate: '10-20-2019',
        completedDate: null,
        gradedAnswers: [],
        scorePercentage: 0,
        testId: 1,
        title: 'History Test',
        creator: 'Mrs. Mathews'
      }
    ],
    completedTests: [
      {
        answersList: ['36', 'T', 'assincompasdf'],
        assignedDate: '10-20-2019',
        completedDate: '10-24-2019',
        gradedAnswers: [true, true, false],
        scorePercentage: '1',
        testId: 0,
        title: 'Math Test',
        creator: 'Mrs. Mathews'
      },
      {
        answersList: ['Abraham Lincoln', 'T', '1776'],
        assignedDate: '10-20-2019',
        completedDate: '10-24-2019',
        gradedAnswers: [true, true, false],
        scorePercentage: '1',
        testId: 1,
        title: 'History Test',
        creator: 'Mrs. Mathews'
      }
    ]
  }
];

let userID = 3;

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
  const findUserName = item => {
    return item.username === username;
  };
  const findPassword = item => {
    return item.password === password;
  };
  const foundUserName = users.find(findUserName);
  const foundPassword = users.find(findPassword);
  if (!foundUserName) {
    return sendUserError("We don't have that username!", res);
  } else if (foundUserName.password === password) {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token,
        user: foundUserName
      });
    }, 1000);
  } else {
    res.status(403).json({ error: 'Username or Password incorrect.' });
  }
});

server.post('/api/signUp', (req, res) => {
  const {
    username,
    name,
    password,
    email,
    isTeacher,
    teacherName,
    teacherID,
    students,
    testBank,
    classSubject,
    grade,
    assignedTests,
    completedTests
  } = req.body;
  const newUser = {
    id: userID,
    username,
    name,
    email,
    password,
    isTeacher,
    teacherID,
    teacherName,
    students,
    testBank,
    classSubject,
    grade,
    assignedTests,
    completedTests
  };
  const findUserName = item => {
    return item.username === username;
  };
  const findEmail = item => {
    return item.email === email;
  };
  const foundUserName = users.find(findUserName);
  const foundEmail = users.find(findEmail);
  if (foundUserName) {
    res.status(403).json({
      error: 'That username already exists. Please choose another username'
    });
  } else if (foundEmail) {
    res.status(403).json({
      error:
        'That email is already being used. Request reset password or use a different email'
    });
  } else {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token,
        newUser
      });
    }, 1000);
    users.push(newUser);
    userID++;
    users[newUser.teacherID].studentIds.push(newUser.id);
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

server.get('/userById/:id', authenticator, (req, res) => {
  const { id } = req.params;

  const findUser = item => {
    return item.id == id;
  };
  const foundUser = users.find(findUser);

  if (foundUser) {
    res.json(foundUser);
  } else {
    sendUserError('No user by that ID exists in the user DB', res);
  }
});

server.get('/testsByCreator/:creator', authenticator, (req, res) => {
  const { creator } = req.params;
  const results = tests.filter(test =>
    test.creator.toLowerCase().includes(creator.toLocaleLowerCase())
  );
  if (results.length > 0) {
    res.json(results);
  }
});

server.post('/tests', authenticator, (req, res) => {
  const {
    score,
    creator,
    title,
    testTaker,
    questions,
    isEditing,
    isSaving
  } = req.body;
  const newItem = {
    score,
    title,
    creator,
    testTaker,
    questions,
    isEditing,
    isSaving,
    id: testID
  };

  tests.push(newItem);
  testID++;
  res.json(newItem);
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
    res.json(foundTest);
  }
});

server.put('/assignedCompleted/:id', authenticator, (req, res) => {
  const { id } = req.params;
  const findUserById = item => {
    return item.id == id;
  };
  const foundUser = users.find(findUserById);
  const { completedTests, assignedTests } = req.body;
  if (foundUser) {
    if (completedTests) foundUser.completedTests = completedTests;
    if (assignedTests) foundUser.assignedTests = assignedTests;
    res.json(foundUser);
  } else {
    sendUserError('No user by that ID exists in the user DB', res);
  }
});

/* 

const {
    assignedTests,
    completedTests,
    email,
    grade,

    isTeacher,
    name,
    password,
    teacherName,
    username
  } = req.body
===^^^^WORKS^^^^^=====
completedTests: [{answersList: ["36","T","assincompasdf"],
      assignedDate: "10-20-2019",
      completedDate: "10-24-2019",
      gradedAnswers: [true, true, false],
      scorePercentage: "1",
      testId: 0,
      title: "Math Test"
      creator: "Mrs. Mathews"
    }]




answersList: ["36","T","assincompasdf"]
0: "36"
1: "T"
2: "assincompasdf"

assignedDate: "10-20-2019"
completedDate: "10-24-2019"
gradedAnswers: Array(3)
0: true
1: true
2: false
length: 3
__proto__: Array(0)
scorePercentage: "1"
testId: 0
testTitle: "Math Test"








foundUser.assignedTests = assignedTests;
    foundUser.completedTests = completedTests;
    foundUser.email = email;
    foundUser.grade = grade;
    foundUser.id = id;
    foundUser.isTeacher = isTeacher;
    foundUser
========
assignedTests: Array(1)
0: {score: 0, isEditing: false, id: 1, creator: "Mrs. Mathews", title: "Math Test", …}
length: 1
__proto__: Array(0)
class: "Math"
completedTests: Array(7)
0: {score: 0, isEditing: false, id: 1, creator: "Mrs. Mathews", title: "Math Test", …}
1: {testId: 0, testTitle: "Math Test", answersList: Array(3), gradedAnswers: Array(3), scorePercentage: "1", …}
2: {testId: 0, testTitle: "Math Test", answersList: Array(3), gradedAnswers: Array(3), scorePercentage: "1", …}
3: {testId: 0, testTitle: "Math Test", answersList: Array(3), gradedAnswers: Array(3), scorePercentage: "1", …}
4: {testId: 0, testTitle: "Math Test", answersList: Array(3), gradedAnswers: Array(3), scorePercentage: "1", …}
5: {testId: 0, testTitle: "Math Test", answersList: Array(3), gradedAnswers: Array(3), scorePercentage: "1", …}
6: {testId: 0, testTitle: "Math Test", answersList: Array(3), gradedAnswers: Array(3), scorePercentage: "1", …}
length: 7
__proto__: Array(0)
email: "sally@school.com"
grade: "5th"
id: 2
isTeacher: false
name: "Sally"
password: "789"
teacherName: "Mrs. Mathews"
username: "sally789"
__proto__: Object
*/

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

server.get('/teachers', (req, res) => {
  let filtered = users.filter(usr => {
    return usr.isTeacher;
  });
  let reduced = filtered.map(usr => {
    return { id: usr.id, name: usr.name };
  });
  res.json(reduced);
});

server.get('/allusers', authenticator, (req, res) => {
  res.json(users);
});

//so, send student id up. find students teacher. search teachers classe's students to find the class that contains the student.
//then send that class down into state to play with the tests and the assignments
server.get('/getAssignments/:id', authenticator, (req, res) => {
  const { id } = req.params;
  const foundUser = users.find(item => item.id == id);

  if (foundUser) {
    const teacher = users.find(item => item.id == foundUser.teacherId);
    const studentClass = teacher.classes.find(item =>
      item.students.find(stud => stud === foundUser.id)
    );

    res.status(200).json(studentClass);
  } else {
    sendUserError('No user by that ID exists in the user DB', res);
  }
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});

// completedTest = { 
//   testId: dummyTest.id, testTitle: dummyTest.title, answersList: answerList,
//   gradedAnswers: gradedAnswers, scorePercentage: scorePercentage,
//   assignedDate : 'fix me', completedDate: `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`};