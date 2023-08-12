const regisId = document.getElementById('login_id');
const regisPw = document.getElementById('login_pw');

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.body.classList.remove('fade');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

function checkPW(event)
{
    var regexPw = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;

    if(regisId.value.length < 8)
    {
        alert("아이디는 8자 이상이어야 합니다.");
        event.preventDefault();
    }
    else if(!regexPw.test(regisPw.value))
    {
        alert("10~20자 공백을 제외한 영문 대소문자, 숫자, 특수문자를 사용하세요.");
        event.preventDefault();
    }
}