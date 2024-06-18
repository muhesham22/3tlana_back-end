const mongoose = require("mongoose");
const technician = require("./technician");
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
    }],
    serviceInstance:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'          
        },
        technician:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Technician'
        }
    }
});

module.exports=mongoose.model('Service',serviceSchema);
