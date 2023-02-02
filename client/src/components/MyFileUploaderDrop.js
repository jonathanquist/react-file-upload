import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const MyFileUploaderDrop = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const onDrop = async (event) => {
    event.preventDefault();
    setDragging(false);

    let isImage = false;

    if (!event.dataTransfer) {
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      if (!/^image\//.test(event.dataTransfer.files[i].type)) {
        console.error("File is not an image.");
        isImage = false;
        continue;
      }
      formData.append("file", event.dataTransfer.files[i]);
      isImage = true;
    }
    /*
    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }*/
    if (isImage === true) {
      axios
        .post("//localhost:8000/upload", formData)
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

  const onDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const onChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const clearFiles = (event) => {
    event.stopPropagation();
    setFiles([]);
  };

  return (
    <div className="form-container">
      <form method="post">
        <div
          className={`form-file${files.length > 0 ? " loaded" : ""}${
            dragging ? " dragging" : ""
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <input id="file-input-5" type="file" onChange={onChange} multiple />
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
            <p style={{ pointerEvents: "none" }}>Drop a file here to upload</p>
          )}
        </div>
      </form>
    </div>
  );
};
