import React, { useState } from "react";
import "./upload.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Upload() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'himanshuvideos');
        setLoading(true);

        const res = await fetch('https://api.cloudinary.com/v1_1/dse1vv6sd/video/upload',
            {
                method: 'POST',
                body: data
            })

        const file = await res.json()

        console.log(file);

        setImage(file.secure_url);
        setLoading(false);
        if (file.secure_url !== "") {
            toast.success("Image Uploaded");
        }
        else {
            toast.error("Image Not Uploaded")
        }
    }
    return (
        <div id="upload">
            <h1>Upload videos</h1>
            <input type="file" name="file" placeholder="Upload an Image" onChange={uploadImage}></input>
            {
                loading ? (
                    <h3>Loading..............</h3>
                )
                    : (
                    
                    <video width="600" height="600" controls>
  <source src={image} type="video/mp4"/>
</video>
                )
            }
            <ToastContainer/>
        </div>
    );
}

export default Upload;