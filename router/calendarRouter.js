import express from "express";
import calendarController from "../controller/calendarController.js";
import upload from "../utils/multer.js";
import { isAuth } from "../utils/isAuth.js";

export const calendarRouter = express.Router();

// Calendar 생성
calendarRouter.post(
  "/calendar",
  isAuth,
  upload.single("image"),
  calendarController.createCalendar
);

// Calendar 목록 조회
calendarRouter.get("/calendar", isAuth, calendarController.getCalendars);
calendarRouter.get("/calendar/today", isAuth, calendarController.hasTodayPost);

// 특정 Calendar 조회
calendarRouter.get("/calendar/:id", isAuth, calendarController.getCalendarById);

// Calendar 수정
calendarRouter.put(
  "/calendar/:id",
  upload.single("image"),
  calendarController.updateCalendar
);

// Calendar 삭제
calendarRouter.delete("/calendar/:id", calendarController.deleteCalendar);
