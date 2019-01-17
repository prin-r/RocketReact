import React , { useState , useEffect } from 'react';
import mediancut from '../utils/ColorQuantizations';

const ImageDisplay = ({ setColors , numColors }) => {

    const [imageData, setImageData] = useState(undefined);

    useEffect(() => {
        if (imageData != undefined) {
            const result = mediancut(imageData, numColors);
            setColors(result);
        }
    } , [numColors]);

    const handleImage = async e => {
        const reader = new FileReader();
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        const [sw, hw] = [window.innerWidth , window.innerHeight];
        reader.onload = async event => {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const newImageData = ctx.getImageData(0, 0, img.width, img.height).data;
                const result = mediancut(newImageData, numColors);
                setColors(result);
                setImageData(newImageData);
                canvas.width = sw;
                canvas.height = (sw * img.height) / img.width;
                ctx.drawImage(img, 0, 0, sw, (sw * img.height) / img.width);
            }
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div style={{'margin-top': '20px', 'margin-bottom':'20px'}}>
            <canvas id="imageCanvas" style={{'margin-top': '20px', 'margin-bottom':'20px'}}></canvas>
            <br></br>
            <center>
                <input type="file" id="imageLoader" name="imageLoader" onChange={handleImage}/>
            </center>
        </div>
    );
};

export default ImageDisplay;