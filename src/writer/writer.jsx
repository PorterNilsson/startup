import React from 'react';
import './writer.css'
import { useParams } from 'react-router-dom';

export function Writer() {
  const { writerName } = useParams();
  const [imageUrl, setImageUrl] = React.useState('');
  const [writerBio, setWriterBio] = React.useState('');

    React.useEffect(() => {
      // Should be a service call to database to get the writer's information and image
      setImageUrl('../writer.jpg');
      setWriterBio('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cupiditate voluptatibus fugit ea beatae at tempore quibusdam quas aut! Accusantium eveniet, magnam eum praesentium officia fugiat dicta quibusdam reiciendis nobis, quisquam ullam nisi laborum. Dolorem voluptatibus reprehenderit odio debitis. Incidunt, voluptatem sit numquam ut, odit explicabo, fuga sapiente consectetur nemo laborum dolore at accusantium nesciunt ipsum libero. Amet expedita impedit porro blanditiis repellendus officia illo. Esse corporis doloribus laboriosam, voluptatum autem temporibus dignissimos ipsum sed quibusdam. Unde quasi cum totam tempora excepturi nam id. Debitis deserunt aliquid dolorem molestias recusandae.');
    
      
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