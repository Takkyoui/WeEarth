import calendarService from "../service/calendarService.js";

const calendarController = {};

// Calendar 생성
calendarController.createCalendar = async (req, res) => {
  try {
    const { title, content, score } = req.body;
    const userId = req.user.userId;
    const file = req.file;
    const image = `${file.path}`.replace("public/", "");

    const calendar = await calendarService.createCalendar({
      title,
      content,
      score,
      image,
      userId,
    });
    res.status(201).json(calendar);
  } catch (error) {
    res.status(500).json({ error: "Failed to create calendar" });
  }
};

calendarController.hasTodayPost = async (req, res) => {
  try {
    const userId = req.user.userId;

    const hasTodayPost = await calendarService.hasTodayPost(userId);
    res.json({ hasTodayPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to check today's posts" });
  }
};

// Calendar 목록 조회
calendarController.getCalendars = async (req, res) => {
  try {
    const userId = req.user.userId;

    const calendars = await calendarService.getCalendars(userId);
    res.json(calendars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch calendars" });
  }
};

// 특정 Calendar 조회
calendarController.getCalendarById = async (req, res) => {
  try {
    const { id } = req.params;
    const calendar = await calendarService.getCalendarById(id);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    res.json(calendar);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch calendar" });
  }
};

// Calendar 수정
calendarController.updateCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const calendarData = req.body;
    const updatedCalendar = await calendarService.updateCalendar(
      id,
      calendarData
    );
    if (!updatedCalendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    res.json(updatedCalendar);
  } catch (error) {
    res.status(500).json({ error: "Failed to update calendar" });
  }
};

// Calendar 삭제
calendarController.deleteCalendar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCalendar = await calendarService.deleteCalendar(id);
    if (!deletedCalendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    res.json({ message: "Calendar deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete calendar" });
  }
};

export default calendarController;
