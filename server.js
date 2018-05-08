const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const serverLogFile = './log/server.log';
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  fs.appendFile(serverLogFile, log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  // res.send('<h1>hello</h1>');
  // res.send({
  //   name: 'Cheng',
  //   likes: [
  //     'Video Game',
  //     'Programming'
  //   ]
  // })
  res.render('welcome.hbs',{
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome to Our website!'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request!'
  });
});

app.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
