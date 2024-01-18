const express = require('express');
const server = express();
const mineflayer = require('mineflayer');

server.all(`/`, (req, res) => {
    res.send(`Please connect me to a hosting website in-order to work 24/7.`);
});

function keepAlive() {
    server.listen(3000, () => {
        console.log(`24/7 Activation Complete`);
    });
}

function createBot() {
    const bot = mineflayer.createBot({
      host: 'Play.potionmc.xyz',
      username: 'RedstoneSorcer33',
      password: 'haseeb',
    });

    bot.on('login', () => {
      console.log('Bot connected to server');
    });

    bot.on('spawn', () => {
      bot.chat('/login 7974938782');
   setTimeout(() => {
     bot.chat('');
   }, 10000 );
    });

    bot.on('chat', (username, message) => {
      if (username !== bot.username) {
        bot.chat(``);
        console.log(`${username} said "${message}"`);
      }
    });
  
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
