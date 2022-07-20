"use strict"
const Record = require("../../model/Record")

const output = {
    main: (res, req) => {
        res.sendfile("../../views/index.html"); 
    }
}

const process = {
    addRecord: async(req, res) => {
        const record = new Record(req.body);
        const response = await record.insertRecord();
        const url = {
            method: "POST",
            path: "/records",
            status: response.err ?  409 : 201
        };
        return res.status(url.status).json(response);
    }
}

module.exports = {
    output,
    process,
}