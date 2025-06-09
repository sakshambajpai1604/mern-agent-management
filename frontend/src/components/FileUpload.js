import { useState } from 'react';
import API from '../api/axios';
import './FileUpload.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMsg('Please select a file.');
      return;
    }
    setLoading(true);
    setMsg('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await API.post('/upload/upload', formData);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Upload failed');
    }
    setLoading(false);
  };

  return (
    <div className="file-upload-container">
      <label className="file-upload-label">
        <input
          type="file"
          className="file-upload-input"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span className="file-upload-custom">
          {file ? file.name : "Choose file"}
        </span>
      </label>
      <button
        className="file-upload-btn"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {msg && <div className={`file-upload-msg ${msg.toLowerCase().includes('fail') ? 'error' : 'success'}`}>{msg}</div>}
    </div>
  );
};

export default FileUpload;