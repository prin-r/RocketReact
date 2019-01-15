import React , { useState , useEffect } from 'react';
import circleButton from '../../public/button.png';
import auraButton from '../../public/auraButton.png';
import buttonDesat from '../../public/buttonDesat.png'
import launchText from '../../public/text.png';

const Page1 = () => {

    const [isPressed, setPressed] = useState(false);
    const [rot, setRot] = useState(0);
    
    useEffect(() => {
        setRot(rot+0.002 > 360.0 ? rot+0.002-360.0 : rot+0.002);
    });

    return (
        <div>
            <center>
                <img src={!isPressed ? circleButton : buttonDesat}
                    style={{width: '75%',position: 'absolute', left: '12.5%', top: '10%', zIndex: '1'}}
                    onContextMenu={ (e) => { e.preventDefault(); }}
                    onTouchStart={ () => setPressed(true) }
                    onTouchEnd={ () => setPressed(false) }
                />

                <img src={auraButton} style={{width: '75%', position: 'absolute', left: '12.5%', top: '10%', transform: `rotate(${rot}deg)`}}/>
                <img src={launchText} style={{width: '75%', position: 'absolute', left: '12.5%', bottom: '20%'}}/>
            </center>
        </div>
    );
}

export default Page1;