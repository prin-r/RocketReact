import React from "react";
import ReactDOM from "react-dom";
import AppRouter from './routers/AppRouter';
import bg from '../public/Knorr_RocketLaunch_BG.png';

const app = (
    <div>
        <AppRouter />
        <img src={bg} style={{width: '100%', height: '100%', position: 'absolute', left: '0%', top: '0%', zIndex: '-1'}}/>
    </div>
);

ReactDOM.render(app, document.getElementById('app'));