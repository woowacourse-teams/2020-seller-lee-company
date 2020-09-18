import moment from "moment";

export default function calculateDiffTime(createdTime: string) {
  const currentTime = moment();
  const diffTime = currentTime.diff(moment(createdTime, moment.ISO_8601));

  const diffSeconds = moment.duration(diffTime).asSeconds();
  const diffMinutes = moment.duration(diffTime).asMinutes();
  const diffHours = moment.duration(diffTime).asHours();
  const diffDays = moment.duration(diffTime).asDays();

  if (diffDays === 1) {
    return "하루 전";
  } else if (diffDays > 3000) {
    // 채팅방 리스트
    return "";
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
    console.warn(`calculateDiffTimeError: createdTime=${createdTime}`);
    return "알 수 없음";
  }
}
