import { useState } from "react";
import { FileUploader } from "./components/FileUploader";
import { DragDropFile } from "./components/DragDropFile";
import { MyDropzone } from "./components/MyDropzone";
import { MyFileUploader } from "./components/MyFileUploader";
import { MyFileUploaderDrop } from "./components/MyFileUploaderDrop";
import { Preview } from "./components/Preview";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "./components/styles.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [files, setFiles] = useState([]);
  const onSuccess = (savedFiles) => {
    setFiles(savedFiles);
  };

  return (
    <div className="App">
      <Preview files={files} />
      <DragDropFile onSuccess={onSuccess} />
      <FileUploader onSuccess={onSuccess} />
      <MyDropzone onSuccess={onSuccess} />
      <MyFileUploader onSuccess={onSuccess} />
      <MyFileUploaderDrop onSuccess={onSuccess} />
      <ToastContainer />
    </div>
  );
}

export default App;
