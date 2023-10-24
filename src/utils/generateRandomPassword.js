const generateRandomPassword = () => {
  const min = 100000; // Giá trị tối thiểu là 100000 (6 chữ số)
  const max = 999999; // Giá trị tối đa là 999999 (6 chữ số)
  const randomPassword = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomPassword.toString(); // Chuyển số thành chuỗi
};

export default generateRandomPassword;
