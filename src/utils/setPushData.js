export default function setPushData(file, score, name, message, correctChr, wrongChr) {
    if(name.length && message.length) {
        const result = 
            {
                "file": file,
                "score": score,
                "name": name,
                "message": message,
                "correctChr": correctChr,
                "wrongChr": wrongChr
            }
        console.log(result)
        return true;
    }
    return false;
}