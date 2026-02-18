const mineflayer = require('mineflayer')
const http = require('http');

// Keep-alive heartbeat for the web host
http.createServer((req, res) => {
  res.write("Ghost is watching...");
  res.end();
}).listen(8080);

function createBot() {
    const bot = mineflayer.createBot({
        host: '28kits.minefort.com', // Put your Server IP here
        port: 25565,
        username: 'SDA_Guardian',
        version: '1.21.1',
        auth: 'offline' // Use 'offline' for cracked/Aternos servers
    })

    // Anti-AFK: Move slightly every 30 seconds
    bot.on('spawn', () => {
        console.log("Ghost has entered the world.");
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    // Auto-Reconnect if kicked
    bot.on('end', () => {
        console.log("Ghost disconnected. Reconnecting in 10s...");
        setTimeout(createBot, 10000);
    });
}

createBot();
