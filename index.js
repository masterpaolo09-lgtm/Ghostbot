const mineflayer = require('mineflayer')
const http = require('http')

// Keep-alive for Render
http.createServer((req, res) => {
  res.write("Ghost is watching...");
  res.end();
}).listen(8080);

const BOT_PASSWORD = "YourSecretPassword123"; // CHANGE THIS to something unique!

function createBot() {
    const bot = mineflayer.createBot({
        host: '28kits.minefort.com',
        port: 25565,
        username: 'SDA_Guardian',
        version: '1.21.1',
        auth: 'offline'
    })

    // --- AUTOMATIC LOGIN/REGISTER LOGIC ---
    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString();
        console.log("Chat:", message); // This lets you see the lobby chat in Render logs

        if (message.includes("/register")) {
            bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
            console.log("Sent register command.");
        } 
        else if (message.includes("/login")) {
            bot.chat(`/login ${BOT_PASSWORD}`);
            console.log("Sent login command.");
        }
    });

    bot.on('spawn', () => {
        console.log("Ghost has entered the main world!");
        // Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    bot.on('kicked', (reason) => console.log("KICKED:", reason));
    bot.on('error', (err) => console.log("ERROR:", err));
    bot.on('end', () => setTimeout(createBot, 10000));
}

createBot();
