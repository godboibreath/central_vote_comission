document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('isLogin') !== 'true') {
        const pageTextDiv = document.createElement('div');
        pageTextDiv.innerHTML = `
        <p>Центральная избирательная <br> комиссия</p>
            <div class="container_offer_login_page">
                <div class="form-login-login_page">
                    <form action="#" method="post" name="registration-op-form" id="login-op-form">
                        <img src="images/personal_area.png" width="50" height="50">
                        <p>Вход организации</p>
                        <input type="text" name="op-login" placeholder="Логин" id="op-login"> </br></br>
                        <input type="text" name="op-vote-name" placeholder="Пароль" id="op-vote-name"> </br></br>
                        <input type="submit" name="submit" value="Вход">
                    </form>
                </div>
            </div>`;
        pageTextDiv.classList.add('conteiner_offer_main_page_text');
        pageTextDiv.setAttribute('id', 'login-op-container');
        document.querySelector('.conteiner_offer_main_page').appendChild(pageTextDiv);
        const loginForm = document.getElementById('login-op-form');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const login = document.getElementById('op-login').value;
            const voteName = document.getElementById('op-vote-name').value;
            if(login === 'admin' && voteName === 'vote') {
                alert('Добро пожаловать!');
                localStorage.setItem('isLogin', true);
                document.getElementById('op-login').value = '';
                document.getElementById('op-vote-name').value = '';
            }
        })
    }
})