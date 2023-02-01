export const Preview = ({ files }) => {
  if (!files.length) {
    return null;
  }

  return files.map((file) => (
    <img
      key={file.filename}
      style={{ maxWidth: "200px", marginTop: "75px" }}
      src={`//localhost:8000/${file.filename}`}
      alt={file.originalname}
    />
  ));
};
