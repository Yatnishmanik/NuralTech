const path=require('path')

require('dotenv').config()
require("./src/config/db");
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const nodecron= require('./src/Utils/nodeCron');
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.static('tmp'));

app.use(cors())
app.use(function (request, response, next) {
    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-csrf-token, Accept, Authorization");
    response.header("Access-Control-Allow-Origin","*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    response.header("Access-Control-Allow-Credentials", true);
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, x-csrf-token, Accept, Authorization"
    );
    next();
  });
  
  //app.use("/", express.static(path.join(__dirname, "public")));

  app.use(
    bodyParser.urlencoded({
      extended: false,  
    })
  );
  
  global.approot=path.resolve(__dirname);
  app.use(express.urlencoded({extended:false}));

  
  
app.use(express.json())
nodecron();
const departmentRoute = require('./src/department/department.route')
const countryRoute  = require('./src/country/country.route')
const currencyRoute = require('./src/currency/currency.route')
const unitRoute = require('./src/measureunit/unit.routes')
const brandRoute = require('./src/brand/brand.route')
const conditionRoute = require('./src/condition/condition.route')
const statusRoute = require('./src/status/status.route')
const modelRoute  = require('./src/model/model.route')
const taxRoute = require('./src/tax/tax.route')
const taxgroupRoute = require('./src/tax/tax group/taxgroup.route')
const categoryRoute = require('./src/assetCategory/category.route')
const companyRoute = require('./src/company/company.route')
const locationRoute = require('./src/location/location.route')
const meterRoute   = require('./src/Meter/meter.routes')
const vendorRoute = require('./src/vendor_customer/vendorCustomer.route')
const priorityRoute = require('./src/priority/priority.route')
const reasonRoute = require('./src/Reason/reason.route')
const activityTypeRoute = require('./src/activitytypes/activitytype.route')
const ticketTypeRoute = require('./src/tickettype/tickettype.route')
const purchaseOrderRoute = require('./src/purchaseordersettings/purchaseordersettings.routes')
const inventoryMovementRoute = require('./src/inventorymovementstatus/inventorymovement.route')
const mangeUserRoute = require('./src/manageusers/manageuser.routes')
const userGroup   = require('./src/usergroups/usergroups.route')
const rolePermission = require('./src/rolepermissions/roleandpermissions.routes')
const scheduleReport = require('./src/schdeulereports/schedulereports.routes')
const systemgenratedcode = require('./src/systemgenratedcode/systemgenratedcode.route')
const manageworkflow = require('./src/manageWorkflow/manageworkflow.route')
const addAsset = require('./src/addAsset/addAsset.route');
const requestType = require('./src/requesttypes/requesttype.routes')
const assetlistRouter = require('./src/assetTransfer/assetTransfer.route')
const assetDiscard = require('./src/assetDiscard/assetDiscard.route')
const assetSchedule = require('./src/assetScheduleActivity/assetSchedule.route')
const manageItems = require('./src/inventory/manageitems/manageitems.routes')
const addIventory = require('./src/inventory/addInventory/addinventory.route')
const moveInventory = require('./src/inventory/moveInventory/moveInventory.route')
const drawInventory = require('./src/inventory/drawInventory/drawInventory.routes')
const serviceOrderForm= require('./src/serviceOrderSetting/service.routes');
const serviceRequestForm= require('./src/serviceRequestForm/service.route');
const inventoryAudit = require('./src/audit/inventoryaudit/inventoryaudit.route')
const parameterCheckRoute = require('./src/parameterscheck/parameterscheck.routes')
const manageAuditRoute = require('./src/audit/manageaudit/manageaudit.route')
const notification = require('./src/notification/notification.route');
const ticketRoute = require('./src/ticket/ticket.routes');
const qrcode= require('./src/assetQrCode/assetQrCode.route');
const trackingMovement= require('./src/trackingMovement/filters');



app.use('/api/department',departmentRoute)
app.use('/api/country',countryRoute)
app.use('/api/currency',currencyRoute)
app.use('/api/unit',unitRoute)
app.use('/api/brand',brandRoute)
app.use('/api/condition',conditionRoute)
app.use('/api/status',statusRoute)
app.use('/api/model',modelRoute)
app.use('/api/tax',taxRoute)
app.use('/api/taxgroup',taxgroupRoute)
app.use('/api/category',categoryRoute)
app.use('/api/company',companyRoute)
app.use('/api/location',locationRoute)
app.use('/api/meter',meterRoute)
app.use('/api/vendor',vendorRoute)
app.use('/api/priority',priorityRoute)
app.use('/api/reason',reasonRoute)
app.use('/api/activityType',activityTypeRoute)
app.use('/api/ticketType',ticketTypeRoute)
app.use('/api/purchaseOrderSetting',purchaseOrderRoute)
app.use('/api/inventoryMovement',inventoryMovementRoute)
app.use('/api/manageUser',mangeUserRoute)
app.use('/api/userGroup',userGroup)
app.use('/api/rolePermission', rolePermission)
app.use('/api/scheduleReport', scheduleReport)
app.use('/api/systemGencode', systemgenratedcode)
app.use('/api/manageworkflow',manageworkflow);
app.use('/api/addAsset',addAsset)
app.use('/api/assetTransfer',assetlistRouter);
app.use('/api/assetDiscard',assetDiscard);
app.use('/api/manageItems',manageItems)
app.use('/api/assetschedule',assetSchedule);

app.use('/api/addInventory',addIventory)
app.use('/api/moveInventory',moveInventory)
app.use('/api/drawInventory', drawInventory)
app.use('/api/inventoryAudit',inventoryAudit)

app.use('/api/requestType', requestType)
app.use('/api/serviceOrderForm',serviceOrderForm);
app.use('/api/serviceRequestForm',serviceRequestForm);
app.use('/api/parameterCheck', parameterCheckRoute)
app.use('/api/manageAudit', manageAuditRoute)
app.use('/api/notification',notification);
app.use('/api/ticket', ticketRoute);
app.use('/api',qrcode);
app.use('/api/trackMovement',trackingMovement)

app.listen(process.env.APP_PORT || 9050,()=>{
    console.log(`Server is running on port no ${process.env.APP_PORT || 9050}`)
})