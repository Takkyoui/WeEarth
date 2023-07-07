import React, { useState, useRef, useEffect } from "react";
import "./CalneterPage.css";
import MyCalendarPage from "../../components/MyCalendar/MyCalendarPage";
import { Link } from "react-router-dom";
import { useGetTodayPosts } from "../../hooks/calendarHooks";
import Loading from "../../components/Common/Loading";

function CalenderPage() {
  const { data, isLoading, error } = useGetTodayPosts();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    <div>error</div>;
  }
  return (
    <div className="calender">
      <div className="calender-container">
        <div className="calender-header">
          <h1>My Diary</h1>
          {data?.hasTodayPost ? (
            <></>
          ) : (
            <Link to="/writediary" className="link">
              <button> 일기쓰기 </button>
            </Link>
          )}
        </div>

        <div className="calender-container-right">
          <MyCalendarPage />
        </div>
      </div>
    </div>
  );
}

export default CalenderPage;
