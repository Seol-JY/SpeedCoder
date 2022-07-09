export default function Topbar(props) {
    return(
      <div className="topbar">
        <div className="filename">{props.file}</div>
      </div>
    )
  }