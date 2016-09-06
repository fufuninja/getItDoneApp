    var express  = require('express');
    var app = express();                             
    var mongoose = require('mongoose');                     
    var morgan = require('morgan');            
    var bodyParser = require('body-parser');   
    var methodOverride = require('method-override');
    var port = process.env.PORT || 8080;              

    mongoose.connect('mongodb://heroku_pst3vgx9:pkm03t62ndrksatbtoo6k35om7@ds019946.mlab.com:19946/heroku_pst3vgx9');
    app.use(express.static(__dirname + '/public'));                
    app.use(morgan('dev'));                                    
    app.use(bodyParser.urlencoded({'extended':'true'}));           
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());

    require('./routes')(app);
    
    app.listen(8080);
    console.log("App listening on port 8080");