document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registration-op-form').addEventListener('submit', function (e) {
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
            } else if (!email.match(/^[A-z]*[0-9]*@/)) {
                alert('Невалидный E-mail')
            } else if (login && password && repassword && password === repassword) {
                alert('Отправление запроса на регистрацию');
                const body = JSON.stringify({ email, login, password });
                fetch('http://localhost:3000/registartion-op', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body,
                }).then((data) => data.json()).then((data) => {
                    if (data.result) {
                        alert('Регистрация прошла успешно');
                    } else {
                        alert('Не удалось выполнить регистрацию');
                    }
                }).catch((error) => {
                    alert('Что-то пошло не так');
                    console.error(`fetch error: ${error.message}`);
                });
            }
        } catch (error) {
            console.error(error.message);
            alert('Что-то пошло не так');
        }
    });

    const fileInput = `
    <div class="file-input__wrapper">
        <input name="file" type="file" name="file" id="vote-file" class="file-input__file">
        <label id="file-label" for="input__file" class="file-input__file-button">
            <span class="file-input__file-button-text">Загрузить список email избирателей</span>
        </label>
        <p>Формат загрузки txt-файлом через пробелы между адресами</p>
        <p>ЦИК гарантирует не использование адресов в любых других целях и не несёт отвественности за ввод некоректных данных</p>
    </div>`;

    function renderVoteForm() {
        const voteForm = document.createElement('div');
        voteForm.classList.add('vote-form');
        voteForm.setAttribute('id', 'vote-form-container');
        voteForm.innerHTML = `
            <div class="vote-form__container">
                <form class="vote-form__form" action="#" name="vote-form" id="vote-form">
                    <h3 class="vote-form__title">Заявка на проведение голосования</h3>
                    <input placeholder="Название выборов" type="text" name="vote-name" class="vote-form__vote-name" />
                    <input placeholder="Количество избирателей" type="number" name="counts-voters" class="vote-form__counts-voters" />
                    <p id="start-date-title">Время начала голосования(по Москве)</p>
                    <input placeholder="Время начала" type="datetime-local" name="start-date" class="vote-form__start-date" />
                    <p>Время окончания голосования(по Москве), должно быть больше времени начала голосования</p>
                    <input placeholder="Время окончания голосования" type="datetime-local" name="end-date" class="vote-form__end-date" />
                    <p>Время окончания выборов(по Москве), должно быть больше времени окончания голосования</p>
                    <input placeholder="Время окончания выборов" type="datetime-local" name="result-date" class="vote-form__result-date" />
                    <p>Способ рассылки ID избирателей</p>
                    <select placehokder="Способ рассылки ID" name="email-send-type" id="op-email-send-type">
                        <option value="cik">через ЦИК</option>
                        <option value="self">Самостоятельно</option>
                    </select>
                    ${fileInput}
                    <div class="vote-form__button-container">
                        <button class="vote-form__button" id="vote-request" type="submit">Подать заявку</button>
                        <button class="vote-form__button" id="add-candidate" type="button">Добавить кадидата</button>
                    </div>
                </form>
            </div>`;
        document.body.appendChild(voteForm);
    }
    if (localStorage.getItem('isLogin') === 'true') {
        renderVoteForm();
        document.getElementById('op-email-send-type').addEventListener('change', function (e) {
            if (e.target.value !== 'cik') {
                document.getElementById('vote-file').setAttribute('disabled', true);
                document.getElementById('file-label').style.opacity = 0.5;
            } else {
                document.getElementById('vote-file').removeAttribute('disabled');
                document.getElementById('file-label').style.opacity = 1;
            }
        });
        document.getElementById('add-candidate').addEventListener('click', function (e) {
            const votersCount = document.querySelector('.vote-form__counts-voters').value;
            const candidates = document.querySelectorAll('.vote-form__candidate');
            if (votersCount && !Number.isNaN(+votersCount) && +votersCount > 0 && candidates.length + 1 <= +votersCount) {
                const input = document.createElement('input');
                input.setAttribute('name', 'candidate-name');
                input.setAttribute('placeholder', 'Имя кандидата');
                input.setAttribute('type', 'text');
                input.classList.add('vote-form__candidate');
                document.querySelector('#start-date-title').before(input);
            }
        });

        document.querySelector('.vote-form__counts-voters').addEventListener('input', function (e) {
            const candidates = document.querySelectorAll('.vote-form__candidate');
            if (e.target.value !== '' && !Number.isNaN(+e.target.value)) {
                const newVotersCount = +e.target.value;
                if (newVotersCount < candidates.length) {
                    candidates.forEach((item, index) => {
                        if (index > newVotersCount - 1) {
                            item.remove();
                        }
                    })
                }
            } else {
                candidates.forEach((item) => item.remove());
            }
        });
        document.getElementById('vote-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const voteName = document.querySelector('.vote-form__vote-name').value;
            const votersCount = document.querySelector('.vote-form__counts-voters').value;
            const candidates = [];
            document.querySelectorAll('.vote-form__candidate').forEach((item) => candidates.push(item.value));
            const startDate = new Date(document.querySelector('.vote-form__start-date').value);
            const endDate = new Date(document.querySelector('.vote-form__end-date').value);
            const resultDate = new Date(document.querySelector('.vote-form__result-date').value);
            const emailSendType = document.getElementById('op-email-send-type').value;
            const file = document.getElementById('vote-file').files[0];
            const login = localStorage.getItem('login');
            const body = JSON.stringify({
                voteName,
                votersCount,
                candidates,
                startDate,
                endDate,
                resultDate,
                emailSendType,
                login,
            });
            fetch('http://localhost:3000/registartion-vote', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body,
            }).then((data) => data.json())
                .then((data) => {
                    if(data.result) {
                        alert('Создание голосования прошло успешно');
                    } else {
                        alert('Не удалось добавить голосование');
                    }
                })
                .catch((e) => {
                    console.error(e.message);
                    alert('Что-то пошло не так');
                })
        })
    }
});