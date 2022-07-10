export default function setPushData(score, name, message) {
    if(name.length && message.length) {console.log("score: ", score,"  name: ", name, "  message: ", message); return true;}
    return false;
}