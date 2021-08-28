import * as data from './data.js'

let allMessages = data.messages; // массив объектов из data.js передаем в allmessades
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

// onclick(event) {
//     let filtered = allMessages.filter(i => i.name === event);
//     generate(filtered);
// }

// let allMessagesString = JSON.stringify(allMessages)
// let filtered = allMessagesString.filter(messenge => messenge.length >  6)

// console.log(allMessagesString)


(function () {

    let searchField = ''; // переменная для ошибки (пользователь ничего не ввел)
    let searchValue = document.getElementById('search');
    searchValue.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            if (searchValue.value == '') {
                return;
            }

            // const userId = allMessages.filter((e) => {
            //     return e.text == searchValue.value
            // })
            //
            // console.log(userId)

            /* ***************************************************************  поиск по id
                 let user = allMessages.find(item => item.id == this.value)
                 console.log(user);
            */
            // console.log(filtered)
                alert(searchValue.value.toString())

            this.value = '';
        }

    });
})();

// const cities = [
//     {name: 'Moscow', population: 12506468},
//     {name: 'Saint Petersburg', population: 5351935},
//     {name: 'Novosibirsk', population: 1612833},
//     {name: 'Kaliningrad', population: 482443},
//     {name: 'Kaluga', population: 336726}
// ];

// function SearchText() {
//     for (let message in allMessages) {
//         let desiredMessage = allMessages[message]
//         let obj = Object.values(desiredMessage);
//         // console.log(desiredMessage)
//         const filtered = (desiredText) => {
//             return desiredMessage.filter(data => {
//                 return data.toLowerCase().indexOf(desiredText.toLowerCase()) > -1;
//             })
//             console.log(filtered('e'))
//
//         }
//     }
// }





