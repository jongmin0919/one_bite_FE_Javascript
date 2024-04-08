//-------------------------------------- input 버튼 생성 --------------------------------------

const inputItem = document.createElement("input")
inputItem.id = "input"
inputItem.type = "text"
inputItem.addEventListener('keypress', (event) => {
  if (event.key === "Enter") addPlanInfo();
})

const addButton = document.createElement("button")
addButton.textContent = "추가"
addButton.classList.add("add-button")
addButton.addEventListener('click', () => addPlanInfo()) // 해당 인풋 버튼에 게시글을 추가하는 이벤트 리스너

const inputSection = document.getElementById("input-section")
inputSection.appendChild(inputItem)
inputSection.appendChild(addButton)

//-------------------------------------- 저장된 스토리지 호출 -----------------------------------------

let information = []
if (localStorage.getItem("information")) {
  information = JSON.parse(localStorage.getItem("information"))
} else {
  localStorage.setItem("information", JSON.stringify(information))
};


//--------------------------------- 추가 버튼 클릭시 스토리지에 저장 --------------------------------------

const addPlanInfo = () => {
  let info = document.getElementById("input").value
  let createDate = Date.now();
  const writtenData = {
    info: info,
    createDate: createDate,
    delete: false // 해당 값에 따라 생성 될 버튼의 함수도 달라지게 하려고 넣었습니다.
  }
  information.push(writtenData)
  localStorage.setItem("information", JSON.stringify(information))
  document.getElementById("input").value = ""
  createWrittenElement(writtenData) // 스토리지 저장 후 추가 된 내용을 토대로 작성글 생성

}


//---------------------------- 스토리지 정보(delete)에 기반한 게시글 생성 ---------------------------------

const createWrittenElement = (writtenData) => {
  const itemSection = document.createElement("div")
  itemSection.id = `item-section-madeAt-${writtenData.createDate}`
  itemSection.classList.add("item-section")

  const writtenItem = document.createElement("div")
  writtenItem.classList.add("written-item")
  writtenItem.id = `written-dayAt-${writtenData.createDate}`
  writtenItem.textContent = writtenData.info
  
  const itemButton = document.createElement("button")
  itemButton.textContent = "종료"
  itemButton.id = `made-dayAt-${writtenData.createDate}`
  itemButton.classList.add("item-button")
  itemButton.addEventListener('click', () => { // 생성 된 버튼의 이벤트 리스너에 삭제 이벤트 추가
    deleteWrittenElement(writtenData.createDate)
  })

  // 언더라인 추가 후 item-container에 어펜드
  const underLine = document.createElement("hr");
  underLine.classList.add("underline");

  itemSection.appendChild(writtenItem)
  itemSection.appendChild(itemButton)
  document.getElementById("item-container").appendChild(itemSection)
  document.getElementById("item-container").appendChild(underLine)
}


//------------------------- 스토리지 정보(delete)에 기반한 게시글 삭제 ---------------------------------

const deleteWrittenElement = (date) => {
  const writtenItem = document.getElementById(`written-dayAt-${date}`)
  const WrittenButton = document.getElementById(`made-dayAt-${date}`)
  WrittenButton.textContent = "삭제"
  //  선택 된 요소들의 클래스 리스트를 대체
  writtenItem.classList.replace(`${writtenItem.classList}`, "delete-written-item");
  WrittenButton.classList.replace(`${WrittenButton.classList}`, "delete-item-button");
  WrittenButton.addEventListener('click', () => { // 선택 된 버튼의 이벤트 리스너에 완전히 제거하는 이벤트 등록
    eliminateWrittenElement(date)
  })

  // foreach를 돌려서 information(스토리지 정보를 파싱하여 저장한 변수)의 요소 중 createDate가 deleteWrittenElement의 매개변수(date)와 일치한다면 해당 요소의 delete를 true로 설정해줌
  information.forEach(item => {
    if (item.createDate === date) item.delete = true;
  })
  // 변경 된 information을 다시 로컬스토리지에 세팅
  localStorage.setItem('information', JSON.stringify(information))
  
}

//------------------------- 스토리지 정보(delete)에 기반한 게시글 완전 삭제 ---------------------------------

const eliminateWrittenElement = (date) => {
  // 버튼을 눌렀을 때 이벤트가 발동해 알림창 생성
  const alertElimination = window.confirm("정말 삭제하시겠습니까?")
  if (alertElimination) { // 사용자가 true(예)를 입력하면 해당하는 information에서 Date 매개변수와 일치하는 요소의 인덱스를 추출
    const index = information.findIndex((item) => item.createDate === date)
    // information의 해당 인덱스를 삭제
    information.splice(index, 1)
    // 삭제 된 information의 값을 다시 localStorage에 저장
    localStorage.setItem('information', JSON.stringify(information))
    // 최종 삭제 할 요소를 선택한 후
    const selectSection = document.getElementById(`item-section-madeAt-${date}`)
    if (selectSection.nextElementSibling.tagName === "HR") { // item-container에는 item-section뿐만 아니라 hr(outLine) 형제 요소도 같이 존재하기에 그것부터 제거해주기 위해 조건값을 검
      // 만약 위의 조건에 맞는 요소를 찾은 경우(true인 경우) 해당 요소(outLine)를 삭제
      selectSection.nextElementSibling.remove()
      // 최종적으로 해당 아이템 섹션 삭제 (해당 아이템 섹션을 먼저 삭제하면 돔 요소를 찾을 수 없어 아이템 섹션을 찾을 수 없기 때문에 아웃라인부터 삭제)
      selectSection.remove()
    }
  }
}


//------------------------- 스토리지 정보에 기반한 게시글 화면에 생성 ---------------------------------

const makeAllWrittenItems = () => {
  // 저장되어있는 information의 모든 요소들을 검색하여
  information.forEach((item) => {
    // 모든 요소를 생성 후 
    createWrittenElement(item)
    // 만약 생성된 요소들 중 해당 스토리지의 속성 delete의 값이 true인 경우 deleteWrittenElement로 바꿔줌
    if(item.delete === true) deleteWrittenElement(item.createDate)
  });
}

makeAllWrittenItems()





