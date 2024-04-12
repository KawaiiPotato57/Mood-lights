import React, { useState } from 'react';
import './pageNo2.css';
import { Link } from "react-router-dom";


const PageNo2 = () => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>

            <div id="page2" className="page-content" >
                <div className="container">
                    <div className="header">
                        <Link to="/page1">
                            <button className='logoutBtn'>
                                recorder
                            </button>
                        </Link>
                        {/* <button onClick={navToPage2}>
          around me
        </button> */}

                        <button className='logoutBtn'>
                            around me
                        </button>

                    </div>
                    <h2>Users using BULBBBBS right now</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                        <div className="map" onClick={() => {
                            setShowDialog(true);
                        }}>
                            {/* Blimps representing users */}
                            <div className="blimp red" style={{ top: '20%', left: '30%', cursor: 'pointer' }}></div>
                            <div className="blimp green" style={{ top: '40%', left: '50%', cursor: 'pointer' }}></div>
                            <div className="blimp blue" style={{ top: '60%', left: '70%', cursor: 'pointer' }}></div>
                            <div className="blimp yellow" style={{ top: '80%', left: '40%', cursor: 'pointer' }}></div>
                            <div className="blimp orange" style={{ top: '30%', left: '60%', cursor: 'pointer' }}></div>
                        </div>
                    </div>
                    <div className="message-box">
                        <textarea placeholder="Click on a user to send an encouraging message"></textarea>
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
        </>
    );
};

export default PageNo2;
