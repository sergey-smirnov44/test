import * as data from './data.js'

let allMessages = data.messages; // массив объектов из data.js передаем в allMessades
let allUsers = data.users;
let friends = data.friends;
let countFriends;// подсчет кол-ва друзей в левом меню
let listChanels;// подсчет кол-ва каналов в левом меню
{
    /*********************************************************************
     *
     *                   Подсчет кол-ва каналов в левом меню
     *
     *********************************************************************/
    listChanels = document.getElementsByClassName(`channels__item`);
    listChanels = listChanels.length;
    document.getElementById('listChanels').innerHTML = listChanels;
}
/*********************************************************************
 *
 *                       Генерация сообщений из data.js
 *
 *********************************************************************/
function generate(messages) {
    let partMessage = '';
    for (let key in messages) {
        partMessage += '<div class="line">'
        partMessage += '<div class="line-date">' + messages[key].date + '</div>'
        partMessage += '</div>'
        partMessage += '<div class="message">'
        partMessage += `<img alt="${messages[key].name}" class="message__photo" src="${messages[key].photo}">`
        partMessage += '<div class="text d-flex flex-column">'
        partMessage += '<div class="d-flex mb-1">'
        partMessage += '<p class="message__name">' + messages[key].name + '</p>'
        partMessage += '<p class="message__time">' + messages[key].time + '</p>'
        partMessage += '</div>'
        partMessage += '<p class="message__text">' + messages[key].text + '</p>'
        partMessage += '</div>'
        partMessage += '</div>'
    }
    document.getElementById('example').innerHTML = partMessage;
}

generate(allMessages);

/*********************************************************************
 *
 *                        Генерация списка друзей
 *
 *********************************************************************/
function generateFriends(friendsList) {
    let friend = '';
    for (let key in friendsList) {
        friend += '<div class="people max d-flex align-items-center">'
        friend += `<div class="people__status people__status--online"></div>`
        friend += '<div class="people__photo">'
        friend += `<img src="${friendsList[key].photo}" class="people__img" alt="${friendsList[key].name}">`
        friend += `</div>`
        friend += `<div class="people__name">${friendsList[key].name}</div>`
        friend += '</div>'

    }
    document.getElementById('friends').innerHTML = friend;
}

generateFriends(friends);
console.log(friends)
console.log(allUsers)

/*********************************************************************
 *
 *                        Статус друга (онлайн)
 *
 *********************************************************************/
let statusOnline = document.getElementsByClassName('people__status')
for (let i = 0; i < statusOnline.length; i++) {
    if (!friends[i].online) {
        statusOnline[i].classList.remove('people__status--online')
        statusOnline[i].classList.add('people__status--offline')
    }
}
{

    /*********************************************************************
     *
     *                     Подсчет кол-ва друзей в левом меню
     *
     *********************************************************************/
    countFriends = document.getElementsByClassName(`people`);
    countFriends = countFriends.length;
    document.getElementById('countFriends').innerHTML = countFriends;
}

/*********************************************************************
 *
 *                   Строка поиска по слову из сообщения (нужно вводить
 *                   сообщение целиком)
 *
 *********************************************************************/
(function () {
    let searchField = ''; // переменная для ошибки (пользователь ничего не ввел)
    let searchValue = document.getElementById('search');
    searchValue.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' || searchValue.value == '') {
            return false;
        }
        /*            *************Ужасный вариант поиска***************           */
        let filtered = allMessages.filter(i => i.text === searchValue.value);
        generate(filtered);
        this.value = '';
    });
})();

for (let message in allMessages) {
    let desiredMessage = Object.values(allMessages[message])
    let arrMes = allMessages[message].text.split()

    const filtered = (desiredText) => {
        return arrMes.filter(data => {
            return data.toLowerCase().indexOf(desiredText.toLowerCase()) > -1;
        })

    }
    const filt = filtered("Wo");
}
/*********************************************************************
 *
 *                   Добавление сообщений через нижний input
 *
 *********************************************************************/
(function pushMessage() {
    let addMessage = document.getElementById('addMessage');
    addMessage.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter') {
            return;
        }
        if (addMessage.value == '') {
            return;
        }

        let theTime = new Date();

        const newMessage = {
            id: allMessages[allMessages.length - 1].id + 1,
            name: "Sergey",
            time: theTime.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
            date: "Today",
            text: addMessage.value,
            photo: "https://www.meme-arsenal.com/memes/ed0607a33edc9e0f8fe179c05fa0cf7f.jpg"
        }

        allMessages.push(newMessage)
        generate(allMessages);
        this.value = '';
    });
}());

/*********************************************************************
 *
 *              Просмотр профиля (отображается справа)
 *              конкретного пользователя (нажми на любого пользователя)
 *
 *********************************************************************/
let newUser = [];
let infoUser = document.getElementById('infoUser');
let allFriends = document.getElementsByClassName('people');


for (let i = 0; i < allFriends.length; i++) {

    allFriends[i].addEventListener('click', function (event) {
        allUsers[i].flag = true;
        if (allUsers[i].flag) {
        for (let key in allUsers) {
            newUser += '<div class="infouser">'
            newUser += `<img alt="${allUsers[key].photo}" class="infouser__photo" src="${allUsers[key].photo}">`
            newUser += '<div class="info-column">'
            newUser += '<p class="info-column__name">' + allUsers[key].name + '</p>'
            newUser += '<p class="info-column__profession">' + allUsers[key].profession + '</p>'
            newUser += '<ul class="social d-flex">'
            newUser += '<li class="social__item social__item--fb"></li>'
            newUser += '<li class="social__item social__item--tw"></li>'
            newUser += '<li class="social__item social__item--ins"></li>'
            newUser += '<li class="social__item social__item--in"></li>'
            newUser += '</ul>'
            newUser += '<div class="message d-flex align-items-center">'
            newUser += '<button class="message__btn">Message</button>'
            newUser += '<button class="message__more"></button>'
            newUser += '</div>'
            newUser += '<div class="username">'
            newUser += '<p class="username__description">Username</p>'
            newUser += '<p class="username__title">' + allUsers[key].username + '</p>'
            newUser += '</div>'
            newUser += '<div class="email">'
            newUser += '<p class="email__description">Email</p>'
            newUser += '<p class="email__title">' + allUsers[key].email + '</p>'
            newUser += '</div>'
            newUser += '<div class="skype">'
            newUser += '<p class="skype__description">Skype</p>'
            newUser += '<p class="skype__title">' + allUsers[key].skype + '</p>'
            newUser += '</div>'
            newUser += '<div class="timezone">'
            newUser += '<p class="timezone__description">Timezone</p>'
            newUser += '<p class="timezone__time">' + allUsers[key].timezone + '</p>'
            newUser += '</div>'
            newUser += '</div>'
            newUser += '</div>'

            console.log(newUser, allUsers)
        }



        }
        infoUser.innerHTML = newUser
    });



}





