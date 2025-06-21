const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BrZHZJdlo1SmVaOUZiT0NmK2oxc0p6U3Q3cUhkS1JCcnRZVVZldlBIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUpyVTd2dWJEa3FaL0doYVpjNFFiN3N6aU1UZGtyTHM2cVcrK053ei9qaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRzlZeW5ETUNsNGI1R21wQ3pBV3VYUzE4RHU3Y0xndlN6M1FYNXdMUDBFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2MDdFc3R3ck9ERms4YlFLU2FBMWhoTFBkT0xYT2dESyszRHlxK0dFZWhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFISlB2WUNFVis5RWtyRngyeTNTQ05JOTFhblRvUWlybDF5SE16SXNZblE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkprVWVzYlF3Y05yUnV4d2dZNjdHdlRzOXJjcGdyOVZWT3RtZmQ2eTR4QkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1A2bXFQMkd3NmNvVW1FYkEwYlovNG9Nb0VFcXlVaGNPdVVDWG56OW9WRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXlvZWFFQ0NqYVlocXFyNGpodjlSdnAzSDJhUG1oWE5tMFZEYk1hQ0Ewdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNrNUg1cFFxNTFlUG4rVkI3TDNQUzROVkpEREVqaHRqR1pMWGlWQmVqRUFWV3RpVU01Z1B0MjZHOUVBWFo2NFE4NEhyRFZaSzNYdzNoc1BIZFFON2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJXSXN3Z21BckJGSnNYY0ZuRFJxYzJsaWMzREIyQ1owS2MrSjdnVC9tVzBJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTY0NjgxNzk4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQxODU0QzBGMjBBNUMyRTkxMjIwQUUzRUJBQzg2MzRDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA0ODg0MDF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyNTY0NjgxNzk4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQyMzVGNkQ3QjA4REM2QjlGMUU4NEQxRjIyQzAwNDZDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA0ODg0MDF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ink3dHBHVW9UUUN1cTI3eTR1cUhIeXciLCJwaG9uZUlkIjoiZTc2ZTU4YjktZTEwMi00N2FiLWJlMjYtNTZiNjE5ZDg4NDFiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtJTHlHVUN5dVBCeE8wcU1PMmlmVDhFT0lWST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaSDhiWStFNktCZGt1U3VlbHV0TE82elF2UnM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjIyNTY0NjgxNzk4OjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiWGVvbiBTbWl0aCIsImxpZCI6IjE3MTIyODAzMTYxOTIyNjo5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUMyL0t3R0VLdXEyY0lHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoib1NXNXExVVFOZHQyQTIyelZVbkNteERJRkE1Q3k0SUdOaFFPZ3JFSTFEcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY09kNDloMEJHSVljOE1kZzFhSlkwN284cUEwUE5wWkI4cHJidG8yU1hFNHMxTjVrN0E5YXdTd3FFdUZkQjdueWxFWjZ1c2krcHhOVzhibWk4eGNEQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6ImNRS1NaVWtoVFVCbTNCem0ya0lEalhSeTl3THRHekZITVlOMHdhQnZoMjZXSTZPeGVTdXBCNkZWeDNqcDRuTC9xUkJ4Q0JOQjFWbXBReWJaWFJpNWlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1NjQ2ODE3OTg6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhRWx1YXRWRURYYmRnTnRzMVZKd3BzUXlCUU9Rc3VDQmpZVURvS3hDTlE3In19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA0ODgzNzcsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLODQifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "FrediEzra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2250564681798",
    DEV : process.env.DEV || "FrediEzra Tz",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
