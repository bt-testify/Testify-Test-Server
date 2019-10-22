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
    assignedTests: [0, 1, 2, 3],
    completedTests: [0, 1]
  }
];
/* 
teacherName: "",
teacherId: 0,
gpa: 0,
assignedTests: [],
completedTests: [],
 */
