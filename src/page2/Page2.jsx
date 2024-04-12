import React, { useState } from 'react';
import './page2.css';

const Page2 = () => {
    const [showDialog, setShowDialog] = useState(false);
    const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

function Blimps() {
  const blimps = Array(10).fill(null).map((_, index) => {
    const color = colors[index % colors.length];
    return (
      <div key={index} className={`blimp ${color}`}>
        {/* No content needed for the blimp div */}
      </div>
    );
  });

    return (
        <div id="page2" className="page-content" style={{ display: 'none' }}>
            <div className="container">
                <h1>Users using BULBBBBS right now</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="map">
                    <div className="blimp red" style={{ top: '5%', left: '5%' }}></div>
    <div className="blimp green" style={{ top: '15%', left: '25%' }}></div>
    <div className="blimp blue" style={{ top: '25%', left: '45%' }}></div>
    <div className="blimp yellow" style={{ top: '35%', left: '65%' }}></div>
    <div className="blimp orange" style={{ top: '45%', left: '85%' }}></div>
    <div className="blimp red" style={{ top: '55%', left: '75%' }}></div>
    <div className="blimp green" style={{ top: '65%', left: '55%' }}></div>
    <div className="blimp blue" style={{ top: '75%', left: '35%' }}></div>
    <div className="blimp yellow" style={{ top: '85%', left: '15%' }}></div>
    <div className="blimp orange" style={{ top: '95%', left: '5%' }}></div>
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
