module.exports = function(app, models) {
	app.get('/', function(req, res, next) {
		res.render('index', {title: 'Express'});
	});
	
	app.post('/todos', function(req, res, next) {
		models.Todo.create(req.body, function(err, todo) {
			if (err) {
				console.log(err);
				res.end()
			} else {
				res.json(todo);
			}
		});
	});
	
	app.get('/todos', function(req, res) {
		models.Todo.find({},function(err, todos) {
			// if err throw err;
			res.json(todos);
		})
	});
	
	app.put('/todos/:id', function(req, res) {
		models.Todo.findOne({
			_id: req.params.id
		}, function(err, todo) {
			// if err throw err;
			res.json(todo);
		})
	});
	console.log("Routes loaded successfully");
}