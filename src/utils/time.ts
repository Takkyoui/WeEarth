import moment from "moment";

export const TimeAgoFn = (date: string) => {
  const currentTime = moment();
  const postTime = moment(date);
  const duration = moment.duration(currentTime.diff(postTime));
  const minutesDiff = duration.asMinutes();
  const hoursDiff = duration.asHours();
  const daysDiff = duration.asDays();

  let timeAgo;
  if (daysDiff >= 1) {
    timeAgo = `${Math.floor(daysDiff)}일 전`;
  } else if (hoursDiff >= 1) {
    timeAgo = `${Math.floor(hoursDiff)}시간 전`;
  } else {
    timeAgo = `${Math.floor(minutesDiff)}분 전`;
  }
  return timeAgo;
};

export const setKrTime = (date: Date) => {
  const createdAt = new Date(date); // 데이터에서 가져온 createdAt 값을 Date 객체로 변환
  const koreaTime = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000); // UTC 시간에 9시간(한국 시간과의 차이)을 더하여 한국 시간으로 변환

  const formattedDate = `${koreaTime.getFullYear()}-${(
    "0" +
    (koreaTime.getMonth() + 1)
  ).slice(-2)}-${("0" + koreaTime.getDate()).slice(-2)}`;
  //   const formattedTime = `${("0" + koreaTime.getHours()).slice(-2)}:${(
  //     "0" + koreaTime.getMinutes()
  //   ).slice(-2)}:${("0" + koreaTime.getSeconds()).slice(-2)}`;

  return formattedDate;
};

export const setUtcTime = (date: Date): string => {
  const createdAt = new Date(date);
  const utcTime = new Date(createdAt.getTime() - 9 * 60 * 60 * 1000);

  const formattedDate = `${utcTime.getFullYear()}-${(
    "0" +
    (utcTime.getMonth() + 1)
  ).slice(-2)}-${("0" + utcTime.getDate()).slice(-2)}`;

  return formattedDate;
};
