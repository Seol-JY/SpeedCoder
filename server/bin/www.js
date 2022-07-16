"use strict";
const app = require("../app");
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log("서버 가동... "+"포트번호: "+PORT);
});