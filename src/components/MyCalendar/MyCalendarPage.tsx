import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendarPage.css";
import { useGetDiary } from "../../hooks/calendarHooks";
import { useNavigate } from "react-router-dom";
import { setKrTime } from "../../utils/time";

function MyCalendarPage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDiary();
  const gotoDetail = (slug: string) => {
    navigate(`/calendar/${slug}`);
  };

  const tileContent = ({ date }: { date: Date }): JSX.Element | null => {
    const formattedDate = setKrTime(date);

    const diary = data?.find(
      (item: any) => setKrTime(item.createdAt) === formattedDate
    );

    if (diary) {
      return (
        <div onClick={() => gotoDetail(diary._id)}>
          <div className="red-box">{diary.score}점</div>
        </div>
      );
    }

    return (
      <div>
        <div className="gray-box"></div>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <div>
          <Calendar
            className="custom-calendar"
            tileContent={tileContent}
            locale={"ko-KR"}
          />
        </div>
      )}
    </div>
  );
}

export default MyCalendarPage;
