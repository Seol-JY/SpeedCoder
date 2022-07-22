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

    static async selectRecordByPage(page) {
        try {
            const response = await RecordStorage.load();
            let rank = 1;
            for (let i = 0; i<response.length; i++) {
                response[i].rank = rank++;
            }
            page = Number(page)
            const start = (page-2)*15 > 0 ? (page-2)*15 : 0;
            const end = (((page+1)+15)<=response.length-1)? page*15+15 : response.length-1;

            console.log(response.length-1+"sstart"+start+"end"+end);
            return response.slice(start, end);
        } catch(err) {
            console.log(err);
            return 0;
        }
    }
}

module.exports = Record;