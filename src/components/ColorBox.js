import React from 'react';

const ColorBox = ({ color , isSelected, numColors, setColor }) => {
    const size = isSelected ? {width: '60px', height:'60px'}:{width: '50px', height:'50px'};
    return (
        <div 
            onClick={() => setColor(color)}
            style={{
                background:`rgb(${color[0]},${color[1]},${color[2]})`,
                display: 'inline-block',
                ...size
            }}
        >
        </div>
    );
};

export default ColorBox;