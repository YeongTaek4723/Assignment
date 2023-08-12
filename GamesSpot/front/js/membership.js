const logid = document.getElementById('login_id');
const logpw = document.getElementById('login_pw');

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.body.classList.remove('body');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

function checkPW(event)
{
    var logpw = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;

    if(logid.value.length < 8)
    {
        alert("아이디는 8자 이상이어야 합니다.");
        event.preventDefault();
    }
    else if(!logpw.test(logpw.value))
    {
        alert("10~20자 공백을 제외한 영문 대소문자, 숫자, 특수문자를 사용하세요.");
        event.preventDefault();
    }
}
