const formatTimeDifference = (timeDifference) => {
  // Chuyển đổi thời gian từ milliseconds sang giây
  const secondsDifference = timeDifference / 1000;

  if (secondsDifference < 60) {
    return `${Math.round(secondsDifference)}s`;
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes}m`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours}h`;
  } else if (secondsDifference < 2592000) {
    const days = Math.floor(secondsDifference / 86400);
    return `${days}d`;
  } else {
    const weeks = Math.floor(secondsDifference / 604800);
    return `${weeks}w`;
  }
};

export default formatTimeDifference;
