import { useState, useEffect } from 'react';
import ImageList from './ImageList';

function App() {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    const fetchImages = async (req, res) => {
      try {
        const data = await fetch('http://localhost:4006/images');
        res = await data.json();
        console.log(res.data);
        setImageData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>where is everyone</h1>
      <ImageList data={imageData} />
    </div>
  );
}

export default App;
