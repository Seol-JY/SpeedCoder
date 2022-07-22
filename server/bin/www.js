"use strict";
const app = require("../app");
const dbo = require("../src/config/db")
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    dbo.connectToServer((err)=>{
        if (err) console.error(err);
    })
    console.clear();
    console.info("React Build Finished.")
    console.info("Server Start... "+"PORT: "+PORT);
    console.info("Start:  http://localhost:"+PORT+"/")
});