import { useState } from 'react';
import API from '../api/axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await API.post('/upload/upload', formData);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default FileUpload;