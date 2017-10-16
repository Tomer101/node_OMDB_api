const express = require('express');
const request = require('request');
const app = express ();
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/show_movies', (req, res)=>{
    //getting the query from the home form
    let search= req.query.search
    request("https://omdbapi.com/?s=" +search + "&apikey=thewdb", (error, respone, body)=>{
        if(!error && respone.statusCode == 200){
            //parse the JSON data into an object
            let movieData = JSON.parse(body);
            res.render('show', {movieData: movieData});
        }
    });
});


app.listen(3000, ()=>{
    console.log('server is running on port 3000');
});