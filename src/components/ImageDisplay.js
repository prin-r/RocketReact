import React , { useState , useEffect , useRef } from 'react';
import mediancut from '../utils/ColorQuantizations';

const ImageDisplay = ({ setColors , numColors , setColorsDefault }) => {

    const [imageData, setImageData] = useState(undefined);
    const canvas = useRef(null);

    useEffect(() => (async () => setColors(createColorsSet(imageData)))(), [numColors]);

    const createColorsSet = data => data ? mediancut(data, numColors) : setColorsDefault();

    const handleImage = async e => {
        const reader = new FileReader();
        const [cc, ctx] = [canvas.current, canvas.current.getContext('2d')];
        const [sw, hw] = [window.innerWidth , window.innerHeight];
        reader.onload = async event => {
            const img = new Image();
            img.onload = async () => {
                await new Promise((resolve, reject) => {
                    const [cw, ch] = [sw , (sw * img.height) / img.width];
                    [cc.width, cc.height] = (ch > hw / 2) ? [(hw / 2) * (cw / ch), hw / 2]:[cw, ch];
                    ctx.drawImage(img, 0, 0, cc.width, cc.height);
                    const newImageData = ctx.getImageData(0, 0, cc.width, cc.height).data;
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
        <center>
            <canvas ref={canvas}></canvas>
            <div style={{margin: 'auto', height: '10%'}}>
                <input type="file" id="imageLoader" onChange={handleImage}/>
            </div>
        </center>
    );
};

export default ImageDisplay;