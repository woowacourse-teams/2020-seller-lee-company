import moment from "moment";

export default function calculateDiffTime(createdAt: string) {
  const timeFormat = "YYYY-MM-DD HH:mm:ss";

  const createdTime = moment(
    createdAt.substr(0, timeFormat.length),
    timeFormat,
  );
  const currentTime = moment();
  const diffTime = currentTime.diff(createdTime);

  const diffSeconds = moment.duration(diffTime).asSeconds();
  const diffMinutes = moment.duration(diffTime).asMinutes();
  const diffHours = moment.duration(diffTime).asHours();
  const diffDays = moment.duration(diffTime).asDays();

  if (diffDays === 1) {
    return "하루 전";
  } else if (diffDays > 1) {
    return Math.ceil(diffDays) + "일 전";
  } else if (diffHours >= 1) {
    return Math.ceil(diffHours) + "시간 전";
  } else if (diffMinutes >= 1) {
    return Math.ceil(diffMinutes) + "분 전";
  } else if (diffSeconds > 4) {
    return Math.ceil(diffSeconds) + "초 전";
  } else if (diffSeconds >= 0) {
    return "방금 전";
  } else {
    console.warn("calculateDiffTimeError: createdAt=" + createdAt);
    return "알 수 없음";
  }
}
