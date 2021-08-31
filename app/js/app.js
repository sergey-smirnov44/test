import * as data from './data.js'

let allMessages = data.messages; // массив объектов из data.js передаем в allmessades
let allUsers = data.users;
let countFriends;// подсчет кол-ва друзей в левом меню
let listChanels;// подсчет кол-ва каналов в левом меню

{
    // подсчет кол-ва каналов в левом меню
    listChanels = document.getElementsByClassName(`channels__item`);
    listChanels = listChanels.length;
    document.getElementById('listChanels').innerHTML = listChanels;
}

{
    // подсчет кол-ва друзей в левом меню
    countFriends = document.getElementsByClassName(`people`);
    countFriends = countFriends.length;
    document.getElementById('countFriends').innerHTML = countFriends;
}

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


(function () {

    let searchField = ''; // переменная для ошибки (пользователь ничего не ввел)
    let searchValue = document.getElementById('search');
    searchValue.addEventListener('keydown', function (event) {


        if (event.key !== 'Enter' || searchValue.value == '') {
            return false;
        }

        /*            *************Ужасный вариант поиска***************           */
        let filtered = allMessages.filter(i => i.text === searchValue.value);
        console.log(filtered.text)


        generate(filtered);


        this.value = '';

    });
})();

for (let message in allMessages) {
    let desiredMessage = Object.values(allMessages[message])
    let arrMes = allMessages[message].text.split()
    // console.log(desiredMessage)
    const filtered = (desiredText) => {
        return arrMes.filter(data => {
            return data.toLowerCase().indexOf(desiredText.toLowerCase()) > -1;
        })
        // console.log(filtered("Which country to visit next? This is a photo with my friends - celebrating in Bali😎"))


    }
    const filt = filtered("Wo");

    // console.log(desiredMessage)
    // console.log(arrMes )
}
;


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
        console.log(allMessages[5])

        this.value = '';
    });
}());

let listFriends = document.getElementsByClassName(`people`);



/**************************Просмотр людских профилей************************/
let newUser = [];
let infouser = document.getElementById('infouser');
let allFriends = document.getElementsByClassName('people');
for (let i=1; i < allFriends.length; i++) {
    allFriends[i].addEventListener('click', function (event) {

        // for (let i=1; i<allFriends.length; i++) {
        for (let key in allUsers) {
            // infouser.style.display='block';
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


            //     allUsers[key].flag = true;
            // if (allUsers[key].flag) {
            //     document.getElementById('infouser').innerHTML = newUser;
            // } else {
            //     return false;
            // }

            listFriends[i].id == allUsers[key].id;

            allUsers[i].flag = true ?  document.getElementById('infouser').innerHTML = newUser : false;

        }

        // if (allUsers[i].flag) {
        //     document.getElementById('infouser').innerHTML = newUser;
        // }

    });
    console.log( listFriends[5])

}
// console.log(infouser)





