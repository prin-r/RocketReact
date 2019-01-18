import React , { useState , useEffect } from 'react';
import { rgbToHex } from '../utils/ColorConversion';
import ImageDisplay from './ImageDisplay';
import ColorBox from './ColorBox';

const Page = () => {

    const [selectedColor, setSelectedColor] = useState(undefined);
    const [numColors, setNumColors] = useState(5);
    const [colors, setColors] = useState([]);
    
    useEffect(() => {
        setColors(setColorsDefault());
    } , []);

    const setColorsDefault = () => (Array.apply(null, Array(numColors))).map((_, i) => Array(3).fill((i * 255) / numColors));
    const clampNumColors = async (val) => (val > 1 && val < 11) ? setNumColors(val): setNumColors(numColors);

    return (
        <div>
            <ImageDisplay setColors={setColors} numColors={numColors} setColorsDefault={setColorsDefault}/>
            <div style={{'margin-left': 'auto', 'margin-right': 'auto', width: '80%'}}>
                <center>
                    {colors.map(color => <ColorBox color={color} isSelected={selectedColor === color} numColors={numColors} setColor={setSelectedColor}/>)}
                    <p> {selectedColor && `selected color is ${rgbToHex(...selectedColor)}`}</p>
                    <span>
                        <button onClick={() => clampNumColors(numColors - 1)} style={{display: 'inline-block'}}>
                            {'less colors'}
                        </button>
                        <p style={{display: 'inline-block'}}> number of colors is {numColors} </p>
                        <button onClick={() => clampNumColors(numColors + 1)} style={{display: 'inline-block'}}>
                            {'more colors'}
                        </button>
                    </span>
                </center>
            </div>
        </div>
    );
}

export default Page;