import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const MyFileUploader = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        /*if (!/^image\//.test(files[i].type)) {
          console.error(
            `${files[i].name} is a ${files[i].type}, and not an image.`
          );
          continue;
        }*/
        data.append("file", files[i]);
      }

      axios
        .post("//localhost:8000/upload", data)
        .then((response) => {
          toast.success("Upload Success");
          onSuccess(response.data);
          setFiles([]);
        })
        .catch((event) => {
          toast.error("Upload Error");
        });
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    //setFiles(Array.from(event.dataTransfer.files));
    //setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    const newState = validateFiles(files);
    setFiles(newState);
    setDragging(false);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const onChange = (event) => {
    //setFiles(Array.from(event.target.files));
    const files = Array.from(event.target.files);
    const newState = validateFiles(files);
    setFiles(newState);
  };

  const validateFiles = (files) => {
    let cleanFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (!/^image\//.test(files[i].type)) {
        console.error(`${files[i].name} is not an image.`);
        continue;
      }
      console.log(i);
      cleanFiles.push(files[i]);
    }
    return cleanFiles;
  };

  const clearFiles = (event) => {
    event.stopPropagation();
    setFiles([]);
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("file-input-4");
    fileInput.click();
  };

  return (
    <div className="form-container">
      <form method="post" onSubmit={onSubmit}>
        <div
          className={`form-file${files.length > 0 ? " loaded" : ""}${
            dragging ? " dragging" : ""
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={triggerFileInput}
        >
          <input id="file-input-4" type="file" onChange={onChange} multiple />
          {files.length > 0 ? (
            <>
              <div className="clear" onClick={clearFiles} />
              <ul style={{ listStyle: "none", padding: 0 }}>
                {files.map((file, index) => (
                  <li
                    key={index}
                    style={{ pointerEvents: "none", padding: "10px" }}
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ pointerEvents: "none" }}>
              Drop a file here or click to select a file
            </p>
          )}
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
