const express = require('express');
const app = express();
// this npm is required to join path of file
const path = require('path');
const redditData = require('./data.json');
// console.log(redditData);


// adding static files to express .css or .js
app.use(express.static('public'));
//we can use actualistion of public dir path
// app.use(express.static(path.join(__dirname, 'public'));


// adding ejs to express
app.set('view engine', 'ejs');
// actualistion of home file directory
// app.set('views', path.join(__dirname, '/viwes'));

app.get('/', (req, res) => {
	res.render('home.ejs')
})

app.get('/rand', (req, res) => {
	const num = Math.floor(Math.random()*10 + 1);
	res.render('random.ejs', { num });
// 	could be { num : num } and in ejs <%= num%> or { rand : num } and in ejs <%= rand%>
})

// working with data from data.json
app.get('/r/:subreddit', (req, res) => {
	const {subreddit} = req.params;
	const data = redditData[subreddit];
	console.log(data)
	if (data) {
		res.render('subreddit', {...data})
	} else {
		res.render('notfound', {subreddit})
	}
})

app.get('/cats', (req, res) => {
	const cats = ['Puszek', 'Klembuszek', 'Bonifacy', 'W butach']
	res.render('cats.ejs', { cats })
})

app.listen(3000, ()=> {
	console.log("Listening on port 3000")
})