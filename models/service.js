const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technicians:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Technician'
    }]
});

module.exports=mongoose.model('Service',serviceSchema);
