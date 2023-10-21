const successfully = (data, message) => {
  return {
    error: false,
    statusCode: 200,
    message: message || "Thành công !!!",
    data: data,
  };
};

export default successfully;
