import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DragDropFile = ({ onSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const onHandleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onHandleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log("drop " + e);
    setFiles(e.dataTransfer.files);
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log("button " + e);
    setFiles(e.target.files);
  };

  const onButtonClick = () => {
    //inputRef.current.click();
    console.log("Click");
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
      <form
        onDragEnter={onHandleDrag}
        method="post"
        action="#"
        onSubmit={onSubmitHandler}
      >
        <div className={`form-file ${files.length > 0 ? "loaded" : ""}`}>
          {files.length > 0 ? (
            <div className="clear" onClick={clearFiles} />
          ) : (
            <></>
          )}
          <input
            type="file"
            id="input-file-upload"
            className="input-file-upload"
            multiple={true}
            onChange={onHandleChange}
            ref={inputRef}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          >
            <div>
              <p>Drag and drop your file here or</p>
              <button className="upload-button" onClick={onButtonClick}>
                Upload a file
              </button>
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={onHandleDrag}
              onDragLeave={onHandleDrag}
              onDragOver={onHandleDrag}
              onDrop={onHandleDrop}
            ></div>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
