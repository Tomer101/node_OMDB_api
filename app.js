const express = require('express');
const request = require('request');
const path = require ('path');
const app = express ();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname ,'public')));
app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/show_movies', (req, res)=>{
    //getting the query from the home form
    let search= req.query.search
    request("https://omdbapi.com/?s=" +search + "&apikey=thewdb", (error, respone, body)=>{
        if(!error && respone.statusCode == 200){
            /*Parse the data with JSON.parse(), 
            and the data becomes a JavaScript object.*/
            let movieData = JSON.parse(body);
            //if movie name does not exist - redirect to home page
            if(movieData.Error == "Movie not found!")
                    res.redirect('/');
                    
            res.render('show', {movieData: movieData});
        }
    });
});

app.get('/show/:movie', (req, res)=>{
    //getting the movie id from the route params
    let movieId= req.params.movie
    request(`https://omdbapi.com/?i=${movieId}&apikey=thewdb`, (error, respone, body)=>{
        if(!error && respone.statusCode == 200){
            //parse the JSON data into an object
            let movieData = JSON.parse(body);
            console.log(movieData);
            res.render('movie_info',{movieData: movieData});
        }
    });
});



app.listen(3000, ()=>{
    console.log('server is running on port 3000');
});