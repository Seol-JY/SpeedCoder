export default function IconGenerator({ file, height }) {
  const extension = file.split(".");
  return (
    <img
      className="fileicon"
      alt="Icon"
      style={{ height: height }}
      src={"img/" + extension[extension.length - 1] + ".png"}
    />
  );
}
