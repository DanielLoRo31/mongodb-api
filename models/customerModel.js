const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
    name: String,
    lastName: String
}, {
    collection: 'Customer',
    strict: false
})

module.exports = mongoose.model("Customer", Customer);