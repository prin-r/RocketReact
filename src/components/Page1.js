import React , { useState , useEffect } from 'react';
import { rgbToHex } from '../utils/ColorConversion';
import ImageDisplay from './ImageDisplay';
import ColorBox from './ColorBox';

const Page1 = () => {

    const [selectedColor, setSelectedColor] = useState(undefined);
    const [numColors, setNumColors] = useState(5);
    const [colors, setColors] = useState([]);
    
    useEffect(() => {
        setColors((Array.apply(null, Array(numColors))).map((_, i) => {
            const val = (i * 255) / numColors;
            return [val,val,val];
        }));
    } , []);

    return (
        <div>
            <ImageDisplay setColors={setColors} numColors={numColors}/>
            <div style={{'margin-left': 'auto', 'margin-right': 'auto', width: '50%'}}>
            <div>
                {colors.map(color => <ColorBox color={color} isSelected={selectedColor === color} numColors={numColors} setColor={setSelectedColor}/>)}
            </div>
            <p> {selectedColor && `selected color is ${rgbToHex(...selectedColor)}`}</p>
            <span>
                <button 
                    onClick={ async () => setNumColors(numColors > 3 ? numColors - 1: numColors)}
                    style={{display: 'inline-block'}}
                >
                {'less colors'}</button>
                <p style={{display: 'inline-block'}}> number of colors is {numColors} </p>
                <button 
                    onClick={ async () => setNumColors(numColors < 10 ? numColors + 1: numColors)}
                    style={{display: 'inline-block'}}
                >
                {'more colors'}</button>
            </span>
            </div>
        </div>
    );
}

export default Page1;