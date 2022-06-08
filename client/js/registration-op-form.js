document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-op-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        try {
            const email = document.getElementById('op-email').value;
            const login = document.getElementById('op-login').value;
            const password = document.getElementById('op-password').value;
            const repassword = document.getElementById('op-repassword').value;
            if (!(email && login && password && repassword)) {
                alert('Необходимо заполнить все поля');
            } else if (password !== repassword) {
                alert('Пароли не совпадают');
            } else  if(!email.match(/^[A-z]*@/)) {
                alert('Невалидный E-mail')
            } else if(login && password && repassword && password === repassword) {
                alert('Отправление запроса на регистрацию');
                fetch('http://localhost:3000/registration-op', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        login,
                        password,
                        repassword,
                    }),
                }).then((data) => data.json()).then((data) => {
                    if(data.result === true) {
                        alert('Регистрация прошла успешно')
                    }
                }).catch((error) => {
                    console.error(error.message);
                    alert('Ошибка регистрации');
                });
            }
        } catch (error) {
            console.error(error.message);
            alert('Что-то пошло не так');
        }
    })
});