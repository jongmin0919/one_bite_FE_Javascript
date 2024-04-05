const bookmarkBar = document.getElementById("bookmark-bar")
const bookmarkOpen = document.getElementById("bookmark-open")
const bookmarkClose = document.getElementById("bookmark-close")

// 스토리지가 저장되어 있지 않은 최초의 화면 렌더링 에서는 isBookMarkBarOpen의 값이 null이기 때문에 최초 렌더링 될 때(스토리지의 값이 없을 때) 스토리지에 close를 저장해주는 조건 삽입해줍니다.
// 또한 만약 사용자가 토글을 열어놓은 상태(스토리지의 값이 open인 상태)에서 창을 닫고 다시 열 경우 스토리지의 값은 open이므로 토글이 열려있는 상태인데, 이때 조건 또한 넣어주고 close로 설정해 줍니다.
if (localStorage.getItem("isBookMarkBarOpen") === null || localStorage.getItem("isBookMarkBarOpen") === 'open') localStorage.setItem("isBookMarkBarOpen", "close") 
const isBookMarkBarOpen = localStorage.getItem("isBookMarkBarOpen")
  
if (isBookMarkBarOpen === "close") { 
  bookmarkBar.style.display = "none";
  bookmarkOpen.style.display = "none";
  bookmarkClose.style.display = "flex";
} else {
  bookmarkBar.style.display = "block";
  bookmarkOpen.style.display = "flex";
  bookmarkClose.style.display = "none";
}

const bookmarkBarToggle = () => {
  const isBookMarkBarOpen = localStorage.getItem("isBookMarkBarOpen")
  if(isBookMarkBarOpen === "close"){
    localStorage.setItem("isBookMarkBarOpen", "open")
    bookmarkBar.style.display = "block";
    bookmarkOpen.style.display = "flex";
    bookmarkClose.style.display = "none"; 
    return;
  } 
  localStorage.setItem("isBookMarkBarOpen", "close")
  bookmarkBar.style.display = "none";
  bookmarkOpen.style.display = "none";
  bookmarkClose.style.display = "flex";
  
}

document.getElementById("bookmark-open-btn").addEventListener("click", bookmarkBarToggle)
document.getElementById("bookmark-close-btn").addEventListener("click", bookmarkBarToggle)

/* 윈도우 객체의 이벤트 중 beforeunload를 이용해 스토리지 상태값 변경
window.addEventListener("beforeunload", () => { // 사용자가 페이지를 닫을 때 토글이 열린 상태라면 스토리지의 값을 close로 바꿔줌. 해당 참고 문헌 : https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
  if(localStorage.getItem("isBookMarkBarOpen") === "open")
  localStorage.setItem("isBookMarkBarOpen", "close");
});
*/

