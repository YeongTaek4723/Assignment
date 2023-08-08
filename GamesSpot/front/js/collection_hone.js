function openTab(evt, tabName) {
    var i, tabContent, tabBtn;
  
    // 모든 탭 내용과 버튼의 활성 클래스 제거
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
  
    tabBtn = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtn.length; i++) {
      tabBtn[i].classList.remove("active");
    }
  
    // 클릭한 탭 내용과 버튼에 활성 클래스 추가
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }
  
  // 초기 로딩 시 첫 번째 탭을 활성화
  document.getElementById("tab1").style.display = "block";
  document.getElementsByClassName("tab-btn")[0].classList.add("active");
  
  