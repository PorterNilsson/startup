import React from 'react';
import './writer.css'
import { useParams } from 'react-router-dom';

export function Writer() {
  const { writerName } = useParams();
  const [imageUrl, setImageUrl] = React.useState('');
  const [writerBio, setWriterBio] = React.useState('');

    React.useEffect(() => {

      fetch('/api/writersFollowed')
      .then((response) => response.json())
      .then((writers) => {
        const writer = writers.find(w => w.writer === writerName);
        setWriterBio(writer.bio);
        setImageUrl(`../${writer.image}.jpg`);
      });
      
    }, []);

  return (
    <main>
      <div className="writer-one">
        <h2 className="writer-h2">{writerName}</h2>
        <img src={imageUrl} width="30%" className="one-writer-img" />
        <p>
          {writerBio}
        </p>
      </div>
    </main>
  );
}