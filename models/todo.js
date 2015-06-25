module.exports = function(mongoose) {
	
	var TodoSchema = new mongoose.Schema ({
		content: String,
		createdAt: { type: Date, default: Date.now },
		done: {type: Boolean, default: false} 
	});
	
	var Todo = mongoose.model("Todo", TodoSchema);
	
	return {
		Todo: Todo
	}
} 