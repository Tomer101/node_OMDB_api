const express = require('express');
const request = require('request');
const app = express ();

app.get('/result', (req, res)=>{
    request("https://omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb", (error, respone, body)=>{
        if(!error && respone.statusCode == 200){
            let movieData = JSON.parse(body);
            res.send(movieData);
        }
    });
});

app.listen(3000, ()=>{
    console.log('server is running on port 3000');
});