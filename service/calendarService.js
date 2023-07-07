import Calendar from "../models/calendarModel.js";
import moment from "moment";
import fs from "fs";
import path from "path";

const calendarService = {};

// Calendar 생성
calendarService.createCalendar = async ({
  title,
  content,
  score,
  image,
  userId,
}) => {
  try {
    const calendar = await Calendar.create({
      title,
      content,
      score,
      image,
      userId,
    });

    return calendar;
  } catch (error) {
    throw new Error("Failed to create calendar");
  }
};

// Calendar 목록 조회
calendarService.getCalendars = async (userId) => {
  try {
    const calendars = await Calendar.find({ userId });
    return calendars;
  } catch (error) {
    throw new Error("Failed to fetch calendars");
  }
};

calendarService.hasTodayPost = async (userId) => {
  try {
    const today = moment().startOf("day");
    const tomorrow = moment().endOf("day");

    const count = await Calendar.find({ userId }).countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    return count > 0;
  } catch (error) {
    throw new Error("Failed to check today's posts");
  }
};

// 특정 Calendar 조회
calendarService.getCalendarById = async (id) => {
  try {
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      throw new Error("Calendar not found");
    }
    return calendar;
  } catch (error) {
    throw new Error("Failed to fetch calendar");
  }
};

// Calendar 수정
calendarService.updateCalendar = async (id, calendarData) => {
  try {
    const updatedCalendar = await Calendar.findByIdAndUpdate(id, calendarData, {
      new: true,
    });
    if (!updatedCalendar) {
      throw new Error("Calendar not found");
    }
    return updatedCalendar;
  } catch (error) {
    throw new Error("Failed to update calendar");
  }
};

// Calendar 삭제
calendarService.deleteCalendar = async (id) => {
  try {
    const deletedCalendar = await Calendar.findByIdAndRemove(id);
    if (!deletedCalendar) {
      throw new Error("Calendar not found");
    }

    const imagePath = path.resolve("public", deletedCalendar.image);
    console.log(imagePath);
    fs.unlinkSync(imagePath);

    return deletedCalendar;
  } catch (error) {
    throw new Error("Failed to delete calendar");
  }
};

export default calendarService;
