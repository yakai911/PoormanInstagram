import React, { useState } from "react";
import { Button } from "@material-ui/core/";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "../assets/ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setVisibility(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //进度函数
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setImage(null);
            setCaption("");
            setVisibility(false);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      {visibility && (
        <progress
          value={progress}
          max="100"
          className="imageupload__progress"
        />
      )}

      <textarea
        type="text"
        placeholder="发布图片动态并为它添加评论..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
        className="input__text"
      />

      <input type="file" onChange={handleChange} className="input__file" />
      <Button className="imageupload__button" onClick={handleUpload}>
        发布动态
      </Button>
    </div>
  );
}

export default ImageUpload;
