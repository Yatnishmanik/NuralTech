const mongoose = require('mongoose')
const companySchema = mongoose.Schema({
     comapnyName: {type: String},
     companyLegalName: {type: String},
     address: {type: String},
     gstIn: {type: String},
     pan: {type: String},
     emailId: {type: String},
     phoneNo: {type: Number},
     cinNo: {type: Number},
     designation : {type: String},
     date: { type: String, default: new Date().toISOString() },

})

module.exports = mongoose.model('Company',companySchema)