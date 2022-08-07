"use strict";
const app = require("../app");
const dbo = require("../src/config/db")
const logger = require("../src/config/logger")
const PORT = process.env.PORT || 80; 

app.listen(PORT, () => {
    logger.info("Server Start... ");
    logger.info(`Server listening on port ${PORT}`);
    dbo.connectToServer((err)=>{
        if (err) logger.err(`MongoDB Connect Fail!\n${err}`);
    })
    logger.info("MongoDB Connection... OK.")
});