const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 8000;

const db = require('./config/mongoose');
const list = require('./models/list')

const app =express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('styleing'));


List =[ {
    name:" Dedication || Perseverance || Consistency"
},
{
    name : "Set Dead Line from Parkinson's Law"
}
]

// if browser request by like /home , / , etc

app.get('/' , function(req , res){
    
    list.find({},function(err, temp ){
        if(err)
        {
            console.log("error while feaching data from DB");
            return ;
        }
    return res.render('home',{ 
        title : "My ToDo List",
        list : temp
    });

    });
});


app.post('/submit' , function(req , res) {
        list.create({
            name : req.body.name
        }, function(err, newlist){
            if(err)
            {
                console.log('error is occer while saving data in DB');
                return;
            }
            console.log('******' , newlist);
            return res.redirect('/');
        } );
    });

app.get('/delete-contact',function(req , res){
    

    let var1 = req.query.id
    list.findByIdAndDelete(var1 , function(err){
        if(err)
        {
            console.log("error while deleting from DB");
            return ;
        }
        return res.redirect('/');
    });
});


app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
