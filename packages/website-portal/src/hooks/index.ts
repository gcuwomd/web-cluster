const checkUserName = (userName: string): boolean => {
  return /^20(19|[2-9][0-9])\d{8}$/.test(userName)
}
const checkPassword = (password: string): boolean => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[A-Z])|(?=.*\d)(?=.*[a-z])|(?=.*[a-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(
    password
  )
}
const checkPhone = (phone:string):boolean => {
  return /^1[3456789]\d{9}$/.test(phone)
}
export const useChecker = () => {
  return {checkUserName,checkPassword,checkPhone}
}
export const useSkip = () => {
  return (url:string) => {
    const link = document.createElement('a');
    link.href = url;
    link.click();

  }
}