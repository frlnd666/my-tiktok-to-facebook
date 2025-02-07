import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/tiktok/download`, { url: tiktokUrl }, { responseType: 'blob' });
      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      videoElement.controls = true;
      document.body.appendChild(videoElement);

      // Simpan file video menggunakan FileReader dan FormData
      const file = new File([videoBlob], 'temp_video.mp4', { type: 'video/mp4' });
      setVideoFile(file);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please download a video first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('caption', caption);

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/facebook/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Video uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading video to Facebook:', error);
    }
  };

  return (
    <div className="App">
      <h1>TikTok to Facebook Reels</h1>
      <input
        type="text"
        placeholder="Enter TikTok video URL"
        value={tiktokUrl}
        onChange={(e) => setTiktokUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download Video</button>
      <br />
      <textarea
        placeholder="Enter caption for Facebook Reels"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleUpload}>Upload to Facebook Reels</button>
    </div>
  );
}

export default App;
