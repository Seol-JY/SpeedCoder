export default function IconGenerator(props) {
    const extention = props.file.split(".");
    return <img className="fileicon" alt="Icon" style={{height:props.height}} src={"img/" + extention[extention.length-1] + ".png" }/>
};