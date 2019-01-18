import React , { useState , useEffect } from 'react';
import { rgbToHex } from '../utils/ColorConversion';
import ImageDisplay from './ImageDisplay';
import ColorBox from './ColorBox';

const Page = () => {

    const [selectedColor, setSelectedColor] = useState(undefined);
    const [numColors, setNumColors] = useState(5);
    const [colors, setColors] = useState([]);
    
    useEffect(() => setColors(setColorsDefault()), []);

    const setColorsDefault = () => (Array.apply(null, Array(numColors))).map((_, i) => Array(3).fill((i * 255) / numColors));
    const clampNumColors = async (val) => (val > 1 && val < 11) ? setNumColors(val) : setNumColors(numColors);

    return (
        <div>
            <div style={{margin:'auto', width:'90%', height:'40%', position:'absolute', top:'60%', left:'5%'}}>       
                {colors.map(color => <ColorBox color={color} isSelected={selectedColor===color} setSelectedColor={setSelectedColor}/>)}
                <p style={{position:'absolute', top:'50%', left:'5%',width:'90%', 'text-align':'center'}}>
                    {selectedColor && `${rgbToHex(...selectedColor)} was selected`}
                </p>
                <span style={{position:'absolute', top:'70%', left: '5%',width:'90%', margin:'auto'}}>
                    <button onClick={() => clampNumColors(numColors - 1)} style={{display:'inline-block', width:'33%'}}>
                        {'less colors'}
                    </button>
                    <p style={{display: 'inline-block', width: '33%', 'text-align': 'center'}}> {numColors} colors </p>
                    <button onClick={() => clampNumColors(numColors + 1)} style={{display:'inline-block', width:'33%'}}>
                        {'more colors'}
                    </button>
                </span>
            </div>
            <ImageDisplay setColors={setColors} numColors={numColors} setColorsDefault={setColorsDefault}/>
        </div>
    );
}

export default Page;