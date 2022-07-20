"use strict";
const RecordStorage = require("./RecordStorage");

class Record {
    constructor(body) {
        this.body = body;
    }

    async insertRecord() {
        const _record = this.body;
        try {
            const response = await RecordStorage.save(_record);
            return response;
        } catch(err) {
            return {success: false, msg: err};
        }
    }
}

module.exports = Record;