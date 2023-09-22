const locationModel = require("./location.model");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const csv = require("fast-csv");
const { download } = require("express/lib/response");
var data_exporter = require("json2csv").Parser;

const locationOperation = {

    
  createLocation: async function (req, res) {
    try {
      // const findBrand = await brandModel.findOne({brand_type:req.body.brand_type}).lean()
      // if(findBrand !=null){
      //     res.status(409).json({
      //         "statusCode":409,
      //         msg:"Already Exist"
      //     })
      // }else{
      const result = await locationModel.create({
        parentLocation: req.body.parentLocation,
        location: req.body.location,
        locationCode: req.body.locationCode,
        locationDescription: req.body.locationDescription,
        defaultCoordinates: req.body.defaultCoordinates,
        inventoryLocation: req.body.inventoryLocation,
        description: req.body.description,
        createdBy: req.body.createdBy,
        department: req.body.department,
        users: req.body.users
      });
      res.status(201).json({
        statusCode: 201,
        msg: "created successfully",
        data: result,
      });
      // }
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  getAllLocation: async function (req, res) {
    try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await locationModel.find().limit(limit).skip(skip).lean();
            const count = await locationModel.count();
            const page = parseInt(req.query.skip) || 1;
            res.status(200).json({
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
                "statusCode":200,
                
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
  },

  updateLocation: async function (req, res) {
    try {
      const findLocation = await locationModel
        .findById({ _id: new ObjectId(req.params.id) })
        .lean();

      if (findLocation == null) {
        res.status(404).json({
          statusCode: 404,
          msg: "Not Found",
        });
      } else {
        const result = await locationModel.findByIdAndUpdate(
          { _id: new ObjectId(req.params.id) },
          {
            parentLocation: req.body.parentLocation,
            location: req.body.location,
            locationCode: req.body.locationCode,
            locationDescription: req.body.locationDescription,
            defaultCoordinates: req.body.defaultCoordinates,
            inventoryLocation: req.body.inventoryLocation,
            description: req.body.description,
          },
          { new: true }
        );
        res.status(201).json({
          statusCode: 201,
          msg: "updated successfully",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  deleteLocation: async function (req, res) {
    try {
      const findLocation = await locationModel
        .findById({ _id: new ObjectId(req.params.id) })
        .lean();

      if (findLocation == null) {
        res.status(404).json({
          statusCode: 404,
          msg: "Not Found",
        });
      } else {
        const result = await locationModel.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.status(201).json({
          statusCode: 201,
          msg: "Delete successfully",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  excelUpload: async function (req, res) {
    const allRecords = [];
    try {
      fs.createReadStream(
        path.join(__dirname, "../../", "/public/uploads/" + req.file.filename)
      )
        .pipe(csv.parse({ headers: true }))
        .on("error", (err) => console.log(err))
        .on("data", (row) => {
          allRecords.push(row);
        })
        .on("end", async (rowCount) => {
          console.log(`${rowCount} rows has parsed`);
          try {
            const allLocation = await locationModel.insertMany(allRecords);
            res.status(201).json({
              message: "location created successfully",
              results: allLocation,
            });
          } catch (error) {
            return res.status(400).json(error);
          }
        });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  downloadExcelLocation: async function (req, res) {
    const locationData = await locationModel.find();
    var locations = JSON.parse(JSON.stringify(locationData));
    var file_header = [
      "Parent Location",
      "Location",
      "Location Code",
      "Location Description",
      "Inventory Location",
      "Default Coordinates",
      "Description",
    ];

    var json_data = new data_exporter({ file_header });

    var csv_data = json_data.parse(locations);

    res.setHeader("Content-Type", "text/csv");

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=location_data.csv"
    );

    res.status(200).end(csv_data);
  },
};

module.exports = locationOperation;
