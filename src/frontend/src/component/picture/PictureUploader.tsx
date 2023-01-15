import React from "react";
import Icon from "./icon/Icon";

interface ImageUploaderProps {
    setPicture: (file: File, url: string) => void;
}

const PictureUploader = (props: ImageUploaderProps) => {
    const {setPicture} = props;

    const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const picture = e.target.files[0];
            const input: HTMLInputElement = document.getElementById('picture_load_input') as HTMLInputElement;
            setPicture(picture, window.URL.createObjectURL(picture));
            input.value = "";
        }
    }

    return <div style={{height: "fit-content", width: "fit-content"}}>
        <label>
            <Icon src="picture.svg" size={"40px"}/>
            <input id={"picture_load_input"} hidden={true} type="file" onChange={imageUploadHandler} accept="image/*"/>
        </label>
    </div>;
}

export default PictureUploader;