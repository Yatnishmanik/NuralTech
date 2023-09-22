const mongoose = require('mongoose')
const schema = mongoose.Schema;

const inventoryAuditSchema = mongoose.Schema({

    auditName: {type: String},
    assignee:{type: String},
    location:[{locationId: {type: mongoose.Schema.ObjectId, ref:'Location'}}],
    showBookCount:{type: Boolean,default:false},
    category:[{categoryId: {type: mongoose.Schema.ObjectId, ref:'Category'}}],
    startDate:{type: String},
    endDate:{type: String},
    manuallyEditPhysicalCount:{type: Boolean, default:false},
    status:{ type: schema.ObjectId,
        ref: "Status", 
    }

})

module.exports = mongoose.model('InventoryAudit', inventoryAuditSchema)