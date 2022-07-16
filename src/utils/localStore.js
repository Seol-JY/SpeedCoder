module.exports = {
    insertDummy: ()=>{
        let i;
        for (i=0; i<30; i++ ){
            const result = 
            {
                "file": "dummy",
                "cpm": Math.floor(Math.random() * (1100 - 10)) + 10,
                "name": "dummy name"+i,
                "message": "dummy data"+i,
                "correctChr": 1,
                "wrongChr": 1
            }
            console.log(result);
            const storage = JSON.parse(localStorage.getItem("rankStore")) || [];                        //for test 
            storage.push(result);
            localStorage.setItem("rankStore", JSON.stringify(storage));

        }
        
    },

    selectData: ()=>{
        let storage = JSON.parse(localStorage.getItem("rankStore")) || [];                        //for test
        storage.sort(function(a, b){
            return b.cpm - a.cpm;
        })
        return storage;
    },

    insertData: (file, cpm, name, message, correctChr, wrongChr) => {
        if(name.length && message.length) {
            const result = 
                {
                    "file": file,
                    "cpm": cpm,
                    "name": name,
                    "message": message,
                    "correctChr": correctChr,
                    "wrongChr": wrongChr
                };
            const storage = JSON.parse(localStorage.getItem("rankStore")) || [];                        //for test
            console.log(storage);
            storage.push(result);
            localStorage.setItem("rankStore", JSON.stringify(storage));
            return true;
        }
        return false;
    }
};