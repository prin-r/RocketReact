import React from 'react';
import circleButton from '../../public/Knorr_RocketLaunch_3.png';
import auraButton from '../../public/Knorr_RocketLaunch_2.png';
import launchText from '../../public/Knorr_RocketLaunch_Text.png';

const Page1 = () => {
    return (
        <div>
            <center>
                <a href="/page2">
                    <img src={circleButton} style={{width: '75%', position: 'absolute', left: '12.5%', top: '-5%', zIndex: '1'}}/>
                </a>
                <img src={auraButton} style={{width: '75%', position: 'absolute', left: '12.5%', top: '-5%'}}/>
                <img src={launchText} style={{width: '75%', position: 'absolute', left: '12.5%', buttom: '25%'}}/>
            </center>
        </div>
    );
}

export default Page1;