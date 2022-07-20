export default {
    save: (file, cpm, name, message, correctChr, wrongChr, callback) => {
        if(name.length && message.length) {
            const result = 
                {
                    file: file,
                    cpm: cpm,
                    name: name,
                    message: message,
                    correctChr: correctChr,
                    wrongChr: wrongChr,
                };
            fetch("/records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
            }).then((res) => res.json())
              .then((res)=>{
                if (res.success) {
                    callback(true);
                } else{
                    alert(res.message);
                }
              })
              .catch((err)=>{
                alert(err);
              })
        }
    },
};