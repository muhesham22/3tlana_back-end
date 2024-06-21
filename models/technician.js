const mongoose = require("mongoose");
const technicianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Technician', technicianSchema);