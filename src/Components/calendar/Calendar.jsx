import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getUserData } from "../../api/mood-service";
import { collection, query, where, getDocs } from "firebase/firestore";

import "./calendar.css";

const Calendar = (selectedMood) => {
  console.log("Selected mood");
  // #929292
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [moodData, setMoodData] = useState({});
  const db = getFirestore();
  const auth = getAuth();
  // Function to fetch mood data
  const fetchMoodData = async (year, month) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user signed in.");
      return;
    }
    const userMoodsRef = collection(db, "mood-data");
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    function changeDateColor(moodColor) {
      const dateElements = document.querySelectorAll(".date");

      dateElements.forEach((dateElement) => {
        dateElement.style.backgroundColor = moodColor;
      });
    }

    const moodQuery = query(
      userMoodsRef,
      where("userId", "==", user.uid),
      where("date", ">=", startOfMonth),
      where("date", "<=", endOfMonth)
    );

    const querySnapshot = await getDocs(moodQuery);
    const fetchedMoodData = {};
    querySnapshot.forEach((doc) => {
      const { date, moodColor } = doc.data();
      fetchedMoodData[date] = moodColor;
    });
    setMoodData(fetchedMoodData);
  };

  useEffect(() => {
    console.log("IN USE EFFECT")
    getUserData().then((data) => {
      console.log("DAAAAAAATA", data)
      setUserData(data)
    });
  }, []);


  useEffect(() => {
    fetchMoodData(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const renderDaysOfWeek = () => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekDays.map((day) => (
      <div key={day} className="day-name">
        {day}
      </div>
    ));
  };

  const renderDates = (year, month) => {
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week of the first day of the month (0-6)
    const startingDayOfWeek = firstDay.getDay();
    // Get the total number of days in the month
    const daysInMonth = lastDay.getDate();

    // Today's date for comparison
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const dates = [];
    let txtColor = "#000000";
    // Fill in the blanks for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(<div key={`blank-${i}`} className="date blank"></div>);
    }

    // Fill in the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dateObj = new Date(`${dateString} 00:00:00`); // Create a Date object from the date string
      let moodColor = 'transparent'; // Default to transparent

      // Check if there is mood data for the current date
      if (userData && Array.isArray(userData)) {
        const userDataForDate = userData.find(data => data.date === dateObj.toDateString());
        if (userDataForDate) {
          moodColor = userDataForDate.moodColor;
        }
      }
      // Apply selectedMood color only to the current day if year, month, and day match
      if (selectedMood && day === currentDay && month === currentMonth && year === currentYear) {
        moodColor = selectedMood.selectedMood.color;
        if (selectedMood.selectedMood.color == "#0000ff") {
          txtColor = "#ffffff";
        }
      }

      dates.push(
        <div key={`day-${day}`} className="date" style={{ backgroundColor: moodColor, color: txtColor }}>
          {day}
        </div>
      );
    }

    return dates;
  };



  return (
    <div id="calendar" className="calendar">
      <div className="navigation-container">
        <button onClick={handlePrevMonth} className="nav-button">
          {"<"}
        </button>
        <p>{`${currentDate.toLocaleString("default", {
          month: "long",
        })} ${currentDate.getFullYear()}`}</p>
        <button onClick={handleNextMonth} className="nav-button">
          {">"}
        </button>
      </div>
      <div className="spacer"></div>
      <div className="day-names-container">{renderDaysOfWeek()}</div>
      <div className="dates-container">
        {renderDates(currentDate.getFullYear(), currentDate.getMonth())}
      </div>
    </div>
  );
};

export default Calendar;



// const renderDates = (year, month) => {
//   // First day of the month
//   const firstDay = new Date(year, month, 1);
//   // Last day of the month
//   const lastDay = new Date(year, month + 1, 0);

//   // Get the day of the week of the first day of the month (0-6)
//   const startingDayOfWeek = firstDay.getDay();
//   // Get the total number of days in the month
//   const daysInMonth = lastDay.getDate();

//   // Today's date for comparison
//   const today = new Date();
//   const currentDay = today.getDate();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();

//   const dates = [];
//   let txtColor = "#000000";
//   // Fill in the blanks for days before the first day of the month
//   for (let i = 0; i < startingDayOfWeek; i++) {
//     dates.push(<div key={`blank-${i}`} className="date blank"></div>);
//   }

//   // Fill in the actual days of the month
//   for (let day = 1; day <= daysInMonth; day++) {
//     const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     let moodColor = moodData[dateString] || 'transparent'; // Default to moodData or transparent

//     // Apply selectedMood color only to the current day if year, month, and day match
//     if (selectedMood && day === currentDay && month === currentMonth && year === currentYear) {
//       moodColor = selectedMood.selectedMood.color;
//       if (selectedMood.selectedMood.color == "#0000ff") {
//         txtColor = "#ffffff";
//       }
//     }

//     dates.push(
//       <div key={`day-${day}`} className="date" style={{ backgroundColor: moodColor, color: txtColor }}>
//         {day}
//       </div>
//     );
//   }

//   return dates;
// };
