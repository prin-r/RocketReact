import React , { useState , useEffect } from 'react';
import mediancut from '../utils/ColorQuantizations';

const ImageDisplay = ({ setColors , numColors , setColorsDefault }) => {

    const [imageData, setImageData] = useState(undefined);

    useEffect(() => {
        ;(async () => setColors(createColorsSet(imageData)))();
    } , [numColors]);

    const createColorsSet = data => data ? mediancut(data, numColors) : setColorsDefault();

    const handleImage = async e => {
        const reader = new FileReader();
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        const [sw, hw] = [window.innerWidth , window.innerHeight];
        reader.onload = async event => {
            const img = new Image();
            img.onload = async () => {
                await new Promise((resolve, reject) => {
                    let [cw, ch] = [sw , (sw * img.height) / img.width];
                    [canvas.width, canvas.height] = (ch > hw / 2) ? [(hw / 2) * (cw / ch), hw / 2]:[cw, ch];
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                    setImageData(newImageData);
                    const result = createColorsSet(newImageData);
                    setColors(result);
                    resolve(result);
                });
            };
            img.src = event.target.result;
        };
        const file = e.target.files[0];
        file && file.type.match('image.*') && reader.readAsDataURL(file);
    };

    return (
        <div style={{'margin-bottom':'20px', 'margin-left': 'auto', 'margin-right':'auto'}}>
            <center>
                <canvas id="imageCanvas" style={{'margin-bottom':'20px'}}></canvas>
                <br></br>
                <input type="file" id="imageLoader" name="imageLoader" onChange={handleImage}/>
            </center>
        </div>
    );
};

export default ImageDisplay;