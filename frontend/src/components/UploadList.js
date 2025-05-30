import { useState } from "react";
import api from "../services/api";

export default function UploadList() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded and distributed");
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={e => setFile(e.target.files[0])} required />
      <button type="submit">Upload List</button>
    </form>
  );
}