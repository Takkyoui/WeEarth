import React from "react";
import "./MyCalendarPost.css";
import score from "../../../assets/myScore.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCalendar,
  useGetCalendarById,
} from "../../../hooks/calendarHooks";

import Loading from "../../../components/Common/Loading";

import Swal from "sweetalert2";
import { setKrTime } from "../../../utils/time";

const apiUrl = import.meta.env.VITE_API_URL;

function MyCalendarPost() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCalendarById(slug as string);
  console.log(data);

  const deleteCalendarMutation = useDeleteCalendar();
  const deleteCalendar = () => {
    deleteCalendarMutation.mutate(slug as string);
    Swal.fire("삭제되었습니다");
    setTimeout(() => {
      navigate("/calendar");
    }, 1000);

    // window.location.reload();
  };

  const handleEdit = () => {
    navigate(`/calendar/edit/${slug}`);
    console.log("Edit calendar");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="mycalendar">
      <div className="mycalendar-container">
        <div className="mycalnedar-header">
          <div className="mycalendar-mydiary">MyDiary</div>

          <div className="mycalnedart-header-btn">
            <div onClick={handleEdit}>수정</div>
            <div onClick={deleteCalendar}>삭제</div>
          </div>
        </div>
        <div className="mycalendar-content">
          <div className="mycalendar-image">
            <img src={`${apiUrl}${data!.image}`} alt="Calendar" />
          </div>
          <div className="mycalnedar-header">
            <div className="mycalendar-date">
              날짜: {setKrTime(data!.createdAt)}
            </div>
            <div className="mycalendar-score">
              <div className="mycalendar-score-img">
                <img src={score} alt="Score" />
              </div>
              {data!.score}점
            </div>
          </div>
          <div className="mycalendar-title">{data!.title}</div>

          <div className="mycalendar-contents">{data!.content}</div>
        </div>
      </div>
    </div>
  );
}

export default MyCalendarPost;
