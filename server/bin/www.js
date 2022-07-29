"use strict";
const app = require("../app");
const dbo = require("../src/config/db")
const logger = require("../src/config/logger")
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    dbo.connectToServer((err)=>{
        if (err) console.error(err);
    })
    logger.info("Server Start... "+"PORT: "+PORT);
});