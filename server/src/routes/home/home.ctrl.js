"use strict"

const output = {
    main: (res, req) => {
        res.sendfile("../../../build/index.html"); 
    }
}

const process = {
    
}

module.exports = {
    output,
    process,
}