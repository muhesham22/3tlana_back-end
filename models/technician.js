const mongoose = require("mongoose");
const technicianSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
    },
    ssn: {
        type: String,
        required: false
    },
    field: {
        type: String,
        required: true
    }
});

module.exports=mongoose.model('Technician',technicianSchema);
