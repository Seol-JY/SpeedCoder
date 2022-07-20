"use strict";
const app = require("../app");
const dbo = require("../src/config/db")
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    dbo.connectToServer((err)=>{
        if (err) console.error(err);
    })
    console.log("서버 가동... "+"포트번호: "+PORT);
});