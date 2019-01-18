import React from 'react';

const ColorBox = ({ color , isSelected, setSelectedColor }) => {
    const size = isSelected ? {'border-top': 'solid', 'border-bottom': 'solid'}:{};
    return (
        <div 
            onClick={() => setSelectedColor(color)}
            style={{
                background:`rgb(${color[0]},${color[1]},${color[2]})`,
                display: 'inline-block',
                'margin-top': '2px',
                'margin-bottom': '2px',
                position: 'relative',
                width: '20%',
                height:'20%',
                ...size
            }}
        >
        </div>
    );
};

export default ColorBox;