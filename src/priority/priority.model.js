const mongoose = require('mongoose');
const prioritySchema = mongoose.Schema({
    priority: {type: String},
    assetCategories: {type: String},
    assetLocations: {type: String},
    showSelectedDefault: {type: Boolean},
    date: { type: String, default: new Date().toISOString() },
})

module.exports = mongoose.model('Priority',prioritySchema)