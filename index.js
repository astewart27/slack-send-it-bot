const SlackBot = require('slackbots');
const axios = require('axios');

const API_KEY = "kr3qzGjlFhuVjCYSpwQYVahBuVClgjPl";

const bot = new SlackBot({
    token: 'xoxb-4744120134-689887228438-Ioonn7GoVUbb0rqsTN6ZyD2b',
    name: 'senditbot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji : ':joy:'
    }

    bot.postMessageToChannel('test-bot', 'Get Ready to Send Ittt @senditbot', params);
});

// Error Handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
})

function handleMessage(message) {
    if(message.includes(' send it')) {
        sendIt();
    } else {
        dontSendIt();
    }
}

function sendIt() {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=send+it&api_key=${API_KEY}&limit=1&offset=1`)
    .then(res => {
        console.log(res.data.data[0].url);
        const gif = res.data.data[0].url;
        const params = {
            icon_emoji : ':laughing:'
        }
    
        bot.postMessageToChannel('test-bot', `Are you silly?? ${gif}`, params);
    })
}

function dontSendIt() {
    const params = {
        icon_emoji : ':pensive:'
    }

    bot.postMessageToChannel('test-bot', `You're not ready to send it`, params);
}