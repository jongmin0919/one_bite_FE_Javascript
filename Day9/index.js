const nickNameElement = document.getElementById("nick-name");
const pwdElement = document.getElementById("pwd");
const buttonElement = document.getElementById("login_btn");

const displayNick = document.getElementById("nickname_info");
const displayPwd = document.getElementById("pwd_info");

buttonElement.addEventListener("click", () => {
  window.localStorage.clear();
  const userInfo = { nickName: nickNameElement.value, pwd: pwdElement.value }
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  const userLoginInfo = JSON.parse(localStorage.getItem("userInfo"));

  displayNick.textContent = `nick-name : ${userLoginInfo.nickName}`;
  displayPwd.textContent = `pwd : ${userLoginInfo.pwd}`;
})

