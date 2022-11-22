import mongoose from 'mongoose';

const { Schema } = mongoose;

const plantSchema = new Schema({
    plant_name : {
        type: String,
        required: true,
    },
    plant_family : {
        type: String,
        required: true,
    },
    germination_date : {
        type: Date,
        required: true,
    },
    grow_mode : {
        type: String,
        required: true
    }
})

export default mongoose.model('Plants', plantSchema);