const mongoose = require('mongoose')
const inventoryMovementSchema = mongoose.Schema({
   movementType :{type: String},
   movementName: {type: String},
   createdBy :{type: String}
   
},{timestamps:true})

module.exports = mongoose.model('InventoryMovement',inventoryMovementSchema)