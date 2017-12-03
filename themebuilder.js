#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
let answers = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Background Color [#fff] ', (answer) => {
  // TODO: Log the answer in a database
  answers.bgColor = answer ? answer : '#fff';
  rl.question('Text Color [#000] ', (answer) => {
    answers.textColor = answer ? answer : '#000';
    const theme = JSON.stringify(answers, null, 4);

    fs.writeFile('theme.json', theme, function (err) {
    if (err) return console.log(err);
    console.log('theme saved');
    });

    rl.close();
  });
});



// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// rl.question('Background Color [#fff]', (answer) => {
//   // TODO: Log the answer in a database
//
//
//
//
//
//   const theme = JSON.stringify(answers);
//
//   fs.writeFile('theme.json', theme, function (err) {
//   if (err) return console.log(err);
//   console.log('Hello World > helloworld.txt');
//   });
//
//   console.log(`Thank you for your valuable feedback: ${answer || 'it\'s awesome'}`);
//
//   rl.close();
// });
