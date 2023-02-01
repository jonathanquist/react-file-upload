import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const FileUploader = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);

  const onInputChange = (e) => {
    setFiles(e.target.files);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i]);
      }

      axios
        .post("//localhost:8000/upload", data)
        .then((response) => {
          toast.success("Upload Success");
          onSuccess(response.data);
          setFiles([]);
        })
        .catch((e) => {
          toast.error("Upload Error");
        });
    }
  };

  const clearFiles = (event) => {
    event.preventDefault();
    setFiles([]);
  };

  return (
    <div className="form-container">
      <form method="post" action="#" id="#" onSubmit={onSubmitHandler}>
        <div className={`form-file files ${files.length > 0 ? "loaded" : ""}`}>
          {files.length > 0 ? (
            <div className="clear" onClick={clearFiles} />
          ) : (
            <></>
          )}
          <input
            id="file-input-2"
            type="file"
            onChange={onInputChange}
            className="form-control"
            multiple
          />
          <label id="file-input-2-label" htmlFor="file-input-2">
            Choose File(s)
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
