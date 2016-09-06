var Todo = require('./models/toDoModel');

function getTodos(res){
	Todo.find(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.json(data);
		};

	});
};

module.exports = function(app){
	app.get('/api/todos' , function(req, res){
		getTodos(res);
	});

	app.post('/api/todos' , function(req, res){
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, data){
			if(err)
				res.send(err);
			else
				getTodos(res);
		});
	});
 
    app.delete('/api/todos/:id', function (req, res) {
        Todo.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

	app.get('/' , function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	});

};

