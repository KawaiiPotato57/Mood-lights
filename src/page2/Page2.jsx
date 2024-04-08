import React, { useState } from 'react';
import './page2.css';

const Page2 = () => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div id="page2" className="page-content" style={{ display: 'none' }}>
            <div className="container">
                <h1>Users using BULBBBBS right now</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="map">
                        {/* Blimps representing users */}
                        <div className="blimp red" style={{ top: '20%', left: '30%' }}></div>
                        <div className="blimp green" style={{ top: '40%', left: '50%' }}></div>
                        <div className="blimp blue" style={{ top: '60%', left: '70%' }}></div>
                        <div className="blimp yellow" style={{ top: '80%', left: '40%' }}></div>
                        <div className="blimp orange" style={{ top: '30%', left: '60%' }}></div>
                    </div>
                </div>

                <div className="message-box">
                    <textarea placeholder="Write your comforting message here..."></textarea>
                    <button onClick={() => setShowDialog(true)}>Send Message</button>
                </div>
            </div>

            {/* Dialog for feature under development */}
            {showDialog && (
                <div className="dialog">
                    <h1>This feature is under development.</h1>
                    <h1>COMING SOON!</h1>
                    <button onClick={() => setShowDialog(false)} className="closeButton">Close</button>
                </div>
            )}
        </div>
    );
};

export default Page2;
