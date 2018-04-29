const express = require('express');
const request = require('request');
const path = require ('path');
const app = express ();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname ,'public')));


app.get('/', (req, res)=>{
    res.render('home');
});


//GET route for movies query
app.get('/movies', (req, res)=>{
    //getting the query from the home form
    let search = req.query.search;
    let key = '31e155047c17420adf9cd9a5d0c9f09e';
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${search}`;

    request(url, (error, respone, body)=>{
        if(!error && respone.statusCode == 200){
            /*Parse the data with JSON.parse(), 
            and the data becomes a JavaScript object.*/
            let movieData = JSON.parse(body);
            //if movie name does not exist - redirect to home page
            if(movieData.Error == "Movie not found!")
                    res.redirect('/');
                    
            res.render('movies', {movieData, search});
        }
    });
});


//route for a single movie
app.get('/movie/:movieId', (req, res)=>{
    //getting the movie id from the route params
    let movieId= req.params.movieId;
    let key = '31e155047c17420adf9cd9a5d0c9f09e';
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`
    request(url, (error, respone, body)=>{
        if(!error && respone.statusCode == 200){
            //parse the JSON data into an object
            let movieData = JSON.parse(body);
            console.log(movieData);
            res.render('movie',{movieData: movieData});
        }
    });
});

 

app.listen(3000, ()=>{
    console.log('server is running on port 3000');
});