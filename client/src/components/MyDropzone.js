import React, { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const MyDropzone = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setFiles(Array.from(event.dataTransfer.files));
    setDragging(false);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
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
        .catch((event) => {
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
      <form method="post" onSubmit={onSubmitHandler}>
        <div
          className={`form-file${files.length > 0 ? " loaded" : ""}${
            dragging ? " dragging" : ""
          }`}
          onDrop={(e) => onDrop(e)}
          onDragLeave={onDragLeave}
          onDragOver={(e) => onDragOver(e)}
        >
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
            <p style={{ pointerEvents: "none" }}>Drop some files here...</p>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
