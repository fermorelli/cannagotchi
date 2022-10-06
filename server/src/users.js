const mongoose = require('mongoose');
const schema = mongoose.Schema();
const { v4: uiidv4} = require('uuid');

const userSchema = new schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    id : uuidv4(),
})

export default mongoose.model('Users', userSchema);