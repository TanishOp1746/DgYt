const express = require('express');
const server = express();
const mineflayer = require('mineflayer');

server.all(`/`, (req, res) => {
    res.send(`Please connect me to a hosting website in order to work 24/7.`);
});

function keepAlive() {
    server.listen(3000, () => {
        console.log(`24/7 Activation Complete`);
    });
}
let isConnected = false;

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Potionmc.xyz',
        username: 'DgYtOnTop',
        password: 'haseeb',
    });

    bot.on('login', () => {
        console.log('Bot connected to server');
    });

    bot.on('spawn', () => {
        bot.chat('/login 553532');
        setTimeout(() => {
            bot.chat('/server survival');
        }, 10000);
    });

    setInterval(() => {
        bot.chat('/server Survival');
    }, 300000); // 300000 milliseconds = 5 minutes

     // Check the bot's connection status every 30 minutes
    setInterval(() => {
        if (isConnected) {
            console.log('Bot is connected.');
        } else {
            console.log('Bot is not connected.');
        }
    }, 30 * 60 * 1000); // 30 minutes in milliseconds


    bot.on('end', () => {
        console.log('Bot disconnected');
        createBot(); // reconnects when bot gets disconnected
    });

    bot.on('error', (error) => {
        console.log('An error has occurred:', error);
        if (error.message === 'Client Timeout After 30000 milliseconds') {
            console.log('Reconnecting...');
            createBot(); // reconnects when a timeout error occurs
        }
    });
}

createBot(); // initial bot creation
keepAlive();
