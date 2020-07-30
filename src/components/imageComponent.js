import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import { storage, firebase } from "./firebase";
import { useState } from "react";

const Upload = (props) => {
  const [files, setFiles] = useState([]);
  const [num, setNum] = useState([]);
  const [status, setStatus] = useState("");
  const [disabled, setDisbled] = useState(false);
  var urls = [];

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      setFiles((prevState) => [...prevState, newFile]);
      setNum((prev) => [...prev, 0]);
      setStatus((p) => "");
    }
  };

  const onUploadSubmission = (e) => {
    e.preventDefault();
    setStatus((prev) => "uploading ..");
    if (files.length !== 0) {
      var uid = "Null";
      if(props.steps.Complaint_type.value === "Anonomous"){
      firebase.auth().signInAnonymously().catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          uid = user.uid;
          const promises = [];
      files.forEach((file, ind) => {
        const uploadTask = storage
          .ref()
          .child(`${uid}/${file.name}`)
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapShot) => {
            console.log(snapShot);
            if (snapShot.bytesTransferred === snapShot.totalBytes) {
              setNum((prev) => {
                var lst = prev;
                lst[ind] = 1;
                return lst;
              });
            }
          },
          (err) => {
            setNum((prev) => {
              var lst = prev;
              lst[ind] = -1;
              return lst;
            });
          }
        );
      });

      Promise.all(promises)
        .then(() => {
          files.forEach((file, i) => {
            storage
              .ref(uid)
              .child(file.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                urls.push(fireBaseUrl);
                if (i === files.length-1) {
                  setStatus((prev) => "uploaded!");
                  setDisbled((prev) => !prev);
                  console.log(props.steps.Complaint_type.value);
                  props.triggerNextStep({ trigger: "Reference", value: urls });
                }
              });
          });
        })
        .catch((err) => {
          console.log(err.code);
          setStatus((prev) => "Some problem occured!");
          console.log("err2");
        });
        }
      });
    } else{
      const promises = [];
      files.forEach((file, ind) => {
        const uploadTask = storage
          .ref()
          .child(`${props.steps.otp.value.uid}/${file.name}`)
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapShot) => {
            console.log(snapShot);
            if (snapShot.bytesTransferred === snapShot.totalBytes) {
              setNum((prev) => {
                var lst = prev;
                lst[ind] = 1;
                return lst;
              });
            }
          },
          (err) => {
            setNum((prev) => {
              var lst = prev;
              lst[ind] = -1;
              return lst;
            });
          }
        );
      });

      Promise.all(promises)
        .then(() => {
          files.forEach((file, i) => {
            storage
              .ref(props.steps.otp.value.uid)
              .child(file.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                urls.push(fireBaseUrl);
                if (i === files.length-1) {
                  setStatus((prev) => "uploaded!");
                  setDisbled((prev) => !prev);
                  console.log(props.steps.Complaint_type.value);
                  props.triggerNextStep({ trigger: "Reference", value: urls });
                }
              });
          });
        })
        .catch((err) => {
          console.log(err.code);
          setStatus((prev) => "Some problem occured!");
          console.log("err2");
        });
    }
      
      
    } else {
      setStatus("No files selected!");
    }
  };

  return (
    <div>
      <form onSubmit={onUploadSubmission}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <input
            disabled={disabled}
            type="file"
            className="button1"
            multiple
            onChange={onFileChange}
          ></input>
          <div style={{ width: "2vw" }} />
          <button className="button1" disabled={disabled}>
            UPLOAD
          </button>
        </div>
      </form>
      <div style={{ height: "10px" }} />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {files.map((f, ind) =>
          num[ind] === 0 ? (
            <li style={{ color: "black" }} id={f.name}>
              {f.name}
            </li>
          ) : num[ind] === 1 ? (
            <li style={{ color: "green" }} id={f.name}>
              {f.name}
            </li>
          ) : (
            <li style={{ color: "red" }} id={f.name}>
              {f.name}
            </li>
          )
        )}
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <label style={{ margin: "10px" }}>{status}</label>
      </div>
    </div>
  );
};

export default Upload;
