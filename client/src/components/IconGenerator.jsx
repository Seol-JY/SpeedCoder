export default function IconGenerator(props) {
  const extension = props.file.split(".");
  return (
    <img
      className="fileicon"
      alt="Icon"
      style={{ height: props.height }}
      src={"img/" + extension[extension.length - 1] + ".png"}
    />
  );
}
