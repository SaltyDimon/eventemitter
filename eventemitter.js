// Реализация класса EventEmitter
class EventEmitter {
    constructor() {
        this.events = {};
    }

    addEventListener(eventName, func) {
        if (typeof func !== 'function') {
            throw new Error('Слушатель события должен быть функцией');
        }

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(func);
    }

    removeEventListener(eventName, func) {
        if (!this.events[eventName]) {
            throw new Error('Такого события нет в системе');
        }

        this.events[eventName] = this.events[eventName].filter(pushedFn => pushedFn !== func);
    }

    on(eventName, func) {
        this.addEventListener(eventName, func);
    }

    off(eventName, func) {
        this.removeEventListener(eventName, func);
    }

    emit(eventName, data) {
        if (!this.events[eventName]) {
            throw new Error('Такого события нет в системе');
        }

        this.events[eventName].forEach(func => func.call(null, data));
    }
}

const chat = new EventEmitter();

function sendMessage(user, message) {
    console.log(`${user} отправил сообщение: "${message}"`);
    chat.emit('message', { user, message });
}

function receiveMessage(data) {
    if (data.user !== currentUser) {
        console.log(`Получено сообщение от ${data.user}: "${data.message}"`);
    }
}

chat.on('message', receiveMessage);

const currentUser = process.argv[2];

if (!currentUser) {
    console.error('Пожалуйста, укажите имя пользователя как аргумент командной строки.');
    process.exit(1);
}

console.log(`Добро пожаловать в чат, ${currentUser}! Введите ваше сообщение и нажмите Enter.`);

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    sendMessage(currentUser, input);
});
