import React, { useState, useEffect } from "react";
import Calendar from "../Components/calendar/Calendar";
import { auth } from "../api/firebase-config";
import { updateOrAddMood, getUserData, sendColorRealTime, bulbToggleRealtime } from "../api/mood-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./page1.css";
const Page1 = () => {
  const navigate = useNavigate();
  const [ledStatus, setLedStatus] = useState("Off");
  const [isDefault, setIsDefault] = useState(false);
  const [isBulbOn, setIsBulbOn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("MYYYYYYYYYY User:", auth.currentUser);
    let email = auth.currentUser.email;
    let atIndex = email.indexOf('@');
    let name = email.slice(0, atIndex);
    setUser(name);

  }, []);



  const [backgroundStyle, setBackgroundStyle] = useState({
    fontFamily: '"Poppins", sans-serif',
    maxWidth: '100vw',
    maxHeight: '100vh',
    height: '1000px',
    margin: '0 auto',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });//[bgColor, moodColor, mixColors(moodColor, bgColor, 0.3)
  const toggleBulb = () => {
    setIsBulbOn(!isBulbOn);
    bulbToggleRealtime(isBulbOn);
    if (isBulbOn) {

      setBackgroundStyle({
        ...backgroundStyle,
        background: `linear-gradient(to bottom, ${'#929292'}, ${mixColors('#929292', '#929292', 1)} 100%)`
      });
    }
    else {
      setBackgroundStyle({
        ...backgroundStyle,
        background: `linear-gradient(to bottom, ${'#929292'}, ${mixColors('#f8ffa5', '#929292', 0.2)} 90%)`
      });
    }

  };

  const [selectedMood, setSelectedMood] = useState({ name: "", color: "" });

  const handleMoodClick = (mood) => {
    console.log("MOOD SELECTED:", mood);
    setSelectedMood(mood); // Update state in MoodSelect

    setBgColorMood();

    if (!isDefault) {
      updateOrAddMood(new Date(), mood.name, mood.color);
      getUserData();
    }
  };
  useEffect(() => {
    handleMoodClick(selectedMood);
    sendColorRealTime(selectedMood.color);
  }, [selectedMood]);

  // Converts a hex color to RGB
  function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  }

  // Mixes two RGB colors
  function mixColors(color1, color2, weight = 0.5) {
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);

    const r = Math.round(r1 * weight + r2 * (1 - weight));
    const g = Math.round(g1 * weight + g2 * (1 - weight));
    const b = Math.round(b1 * weight + b2 * (1 - weight));

    return `rgba(${r}, ${g}, ${b}, 1)`;
  }


  function setBgColorMood() {
    let bgDeafult = '#929292';
    const moodColor = selectedMood ? selectedMood.color : '#929292'; // Default or selected mood color
    const bgColor = '#929292'; // Your main background color

    setBackgroundStyle({
      ...backgroundStyle,
      background: `linear-gradient(to bottom, ${bgColor}, ${mixColors(moodColor, bgColor, 0.3)} 90%)`
    });
    setIsDefault(false)
  }

  function defaultColor() {

    setBackgroundStyle({
      ...backgroundStyle,
      background: `linear-gradient(to bottom, ${'#929292'}, ${mixColors('#f8ffa5', '#929292', 0.2)} 90%)`
    });
    setSelectedMood({ name: "", color: "#f8ffa5" });
    setIsDefault(true)

    sendColorRealTime('#ffffc7');
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User successfully signed out');
      navigate("/"); // Navigate to login page (replace with your actual login page path)
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  const moodOptions = [
    { name: "Excellent", color: "#ffa600" },
    { name: "Good", color: "#ffff00" },
    { name: "Okay", color: "#fff5e0" },
    { name: "Bad", color: "#0000ff" },
    { name: "Terrible", color: "#a10000" },
  ];

  function navToPage2() {
    console.log("Navigating to page2")
    navigate("/pageNo2");
  }
  return (
    <>

      <div className="container" style={backgroundStyle} >
        <span>
          <button className="logoutBtn" >
            recorder
          </button>


          <Link to="/pageNo2">
            <button className="logoutBtn">
              around me
            </button>
          </Link>
          <button onClick={handleLogout} className="logoutBtn">
            {/* <img src={'https://img.icons8.com/?size=512&id=VTOU0AOwSnkY&format=png'} alt="Logout" className="icon" /> */}
            Logout
          </button >
        </span >

        <button
          id="toggleButton"
          className={`button ${isBulbOn ? "button-on" : ""}`}
          onClick={toggleBulb}
        >
          Turn LED {isBulbOn ? "Off" : "On"}
        </button>
        <button className="default-button" style={{ marginBottom: "40px" }} onClick={defaultColor}>
          Switch Back to Default Color
        </button>
        <div className="greetings">
          <h2>Hello {user} </h2>
          <p>How are you feeling today?</p>
        </div>
        <div className="mood-select">
          {moodOptions.map((mood) => (
            <button
              className={`mood-option ${selectedMood && selectedMood.name === mood.name ? 'selected' : ''}`}
              key={mood.name}
              style={{
                backgroundColor: mood.color,
                color: mood.name === "Bad" || mood.name === "Terrible" ? "white" : "black",
              }}
              onClick={() => handleMoodClick(mood)}
            >
              {mood.name}
            </button>
          ))}
        </div>

        <Calendar selectedMood={selectedMood} />

      </div >

    </>
  );
};

export default Page1;
