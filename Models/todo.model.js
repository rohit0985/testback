const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title: {type: String},
    category : {type: String},
    duration : {type: Number},
    status : {type : Boolean},
    userId : {type: String}
},
{
    versionKey : false, 
    timestamps: true
}
)

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = {TodoModel}