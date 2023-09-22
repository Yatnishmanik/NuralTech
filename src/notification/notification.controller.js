const notificationModel = require("./notification.model")

const controller = {
    async getnotification(req, res) {
        try {
            let { limit, skip } = req.query;
            limit = +limit || 10;
            skip = +skip ?? 0;
            const result = await notificationModel.find({ _id: req.param.id }).limit(limit).skip(skip).lean();
            const count = await notificationModel.count();
            const page = parseInt(req.query.skip) || 1;
            res.status(200).json({
                "data": result,
                "page": page,
                "limit": limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
                "statusCode": 200,

            })
        } catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },

    async updatenotification(req, res) {
        try {
            const data = await notificationModel.findByIdAndUpdate({ _id: new ObjectId(req.params.id) }, { status: true },
                { new: true });
            res.status(201).json({
                statusCode: 201,
                msg: "updated successfully",
                data: result,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    }

}

module.exports = controller;