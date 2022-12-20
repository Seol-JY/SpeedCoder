import IconGenerator from "./IconGenerator";
export default function Topbar(props) {
  return (
    <div className="topbar">
      <div className="filename">
        <IconGenerator file={props.file} height={"17px  "} />
        <span>{props.file}</span>
      </div>
    </div>
  );
}
