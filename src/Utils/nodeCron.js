const cron = require('node-cron');
const scheduleActivity = require('../assetScheduleActivity/assetSchedule.model');

function fun(){
  cron.schedule('0 0 * * * ', async() => {
    console.log('node running')
    const currentDate = new Date();
     await scheduleActivity.updateMany({ endDate: { $lt: currentDate } },{$set:{pending:true}});

  },{
   scheduled: true,
   timezone: "Asia/Kolkata"
 });
}
module.exports= fun;




