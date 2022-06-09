document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registration-voter-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const login = document.getElementById('voter-op-login').value;
        const voteName = document.getElementById('voter-vote-name').value;
        const id = document.getElementById('voter-id').value;
        if(!login || !voteName || !id) {
            alert('Необходимо заполнить все поля.');
        } else {
            alert('Внимание! После скачивания регистрация с этими данными на получение бюллитеня второй раз и более невозможна.');
        }
    })
})