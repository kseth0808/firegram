import React, { useEffect, useState } from 'react';
import { storage } from '../Firebase';
import { getDownloadURL, listAll, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';

function Main() {
  const [imageUpload, setimageUpload] = useState();
  const [imageList, setimageList] = useState([]);

  const imagesListRef = ref(storage, 'image/');

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `image/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((URL) => {
        setimageList((prev) => [...prev, URL]);
      });
    });
  };

  const deleteImage = (index) => {
    const imageToDelete = imageList[index];
    const { ref } = imageToDelete;

    deleteObject(ref)
      .then(() => {
        setimageList((prev) => prev.filter((item, i) => i !== index));
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      setimageList([]);
      response.items.forEach((item) => {
        getDownloadURL(item).then((URL) => {
          setimageList((prev) => [...prev, URL]);
        });
      });
    });
  }, []);

  return (
    <div className="container">
      <input
        type="file"
        className="input-file"
        onChange={(event) => {
          setimageUpload(event.target.files[0]);
        }}
      />
      <div className="image-list">
        {imageList.map((URL, index) => (
          <div className="image-item" key={URL}>
            <img src={URL} alt="Uploaded" />
            <button className="delete-button" onClick={() => deleteImage(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="upload-button" onClick={uploadImage}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default Main;
