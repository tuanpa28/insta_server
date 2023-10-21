const serverError = (messageError) => {
  return {
    error: true,
    statusCode: 500,
    message: "Lỗi hệ thống !!!",
    detailError: messageError,
  };
};

export default serverError;
