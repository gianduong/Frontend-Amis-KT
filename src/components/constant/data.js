const tableData = [
    {
      name: 'Lion King',
      children: [
        {name: 'Simba', eyeColor: 'brown', other: 'Lion',
          children: [{name: 'Kiara', eyeColor: 'blue', other: 'Lion'}] },
        {name: 'Scar', eyeColor: 'brown', other: 'Lion'},
        {name: 'Nala', eyeColor: 'blue', other: 'Lion'},
        {name: 'Zazu', eyeColor: 'black', other: 'Parrot'},
        {name: 'Timon', eyeColor: 'black', other: 'Meerkat'},
      ]
    },
    {
      name: 'Toy Story',
      children: [
        { name: 'Woody', eyeColor: 'brown', other: 'Toy' },
        { name: 'Buzz', eyeColor: 'blue', other: 'Toy' }
      ]
    },
    {
      name: 'Aladdin',
      children: [
        { name: 'Aladin', eyeColor: 'blue', other: '' },
        { name: 'Genie', eyeColor: 'black', other: 'Lives in a lamp' }
      ]
    },
    {
      name: 'Mulan',
      children: [
        {name: 'Mulan', eyeColor: 'brown', other: ''},
        {name: 'Mushu', eyeColor: 'black', other: 'Dragon'}
      ]
    },
    {
      name: 'Bambi',
      children: [
        {name: 'Bambi', eyeColor: 'brown', other: 'deer'},
        {name: 'Thumper', eyeColor: 'brown', other: 'rabbit'}
      ]
    },
    {
      name: 'Tangled',
      children: [
        {name: 'Rapunzel', eyeColor: 'green', other: 'has super powers'},
        {name: 'Pascal', eyeColor: 'brown', other: 'camel'},
        {name: 'Flynn', eyeColor: 'brown', other: 'thief'}
      ]
    },
    {
      name: 'Frozen',
      children: [
        {name: 'Elsa', eyeColor: 'blue', other: 'has super powers' }
      ]
    },
    {
      name: 'Princess and the Frog',
      children: [
        {name: 'Tiana', eyeColor: 'brown', other: 'sometimes kisses frogs' }
      ]
    }
  ]
  
  const columns = [
    {
      label: 'Name',
      id: 'name'
    },
    {
      label: 'Eye color',
      id: 'eyeColor'
    },
    {
      label: 'Other',
      id: 'other'
    }
  ]
  
  export {tableData, columns}

// const tableData = [
//     {
//         class: '1A',
//         teacher: 'Node Postgres',
//         children: [
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             },
//             {
//                 student: 'Red Riding Hood',
//                 student_nr: 1,
//                 avg: 5.2
//             },
//             {
//                 student: 'Tinky Winky',
//                 student_nr: 2,
//                 avg: 3.75
//             }
//         ]
//     },
//     {
//         class: '1B',
//         teacher: 'Travis Jenkins',
//         children: [
//             {
//                 student: 'Xabi Alonso',
//                 student_nr: 3,
//                 avg: 3.8
//             },
//             {
//                 student: 'Lionel Messi',
//                 student_nr: 4,
//                 avg: 4.3
//             },
//         ]
//     }
// ]

// const columns = [
//     {
//         label: 'Class',
//         id: 'class'
//     },
//     {
//         label: 'Teacher',
//         id: 'teacher'
//     },
//     {
//         label: 'Student Nr',
//         id: 'student_nr'
//     },
//     {
//         label: 'Student Name',
//         id: 'student'
//     },
//     {
//         label: 'Average Grade',
//         id: 'avg'
//     }
// ]

// export default { columns, tableData }