const readline = require('readline');
const colors = require('colors');
const figlet = require('figlet');
const clearConsole = require('console-clear');
const minePointsLoop = require('./scripts/minePoints');
const minePointsRandom = require('./scripts/minePointsRandom');
const getAndCompleteTasks = require('./scripts/getAndCompleteTasks');
const { getUserInfo } = require('./scripts/apis');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const presentacion = () => {
    clearConsole();
    figlet.text(
        'Vana Bot', 
        {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }, 
        function (err, data) {
            if (err) {
                console.log('Error generating large text');
                console.dir(err);
                return;
            }
            console.log(`\n${data}\n`.green);
            console.log('Welcome to Vana-Auto Mining Bot'.green);
            console.log('Created by Naeaex - x.com/naeaex_dev\n'.green);
            mainMenu();
        }
    );
};

const mainMenu = async () => {
    const userInfo = await getUserInfo();
    if (userInfo) {
        console.log(`👋 Hello ${userInfo.tgUsername} - Your points are ⭐️ ${userInfo.points}`.green);
    } else {
        console.log('Failed to fetch user info.'.red);
    }

    rl.question(`Choose an option:\n1. 📦 Mine Credits\n2. 📋 Auto Complete Tasks\n👉 Enter option: `.blue, (option) => {
        switch (option) {
            case '1':
                rl.question(`\nHow would you like to mine points?\n🔄 1. Constantly\n🎲 2. Randomly\n👉 Enter option: `.blue, (subOption) => {
                    switch (subOption) {
                        case '1':
                            minePointsLoop();
                            break;
                        case '2':
                            minePointsRandom();
                            break;
                        default:
                            console.log('Invalid option'.red);
                            rl.close();
                    }
                });
                break;
            case '2':
                getAndCompleteTasks().then(() => rl.close());
                break;
            default:
                console.log('Invalid option'.red);
                rl.close();
        }
    });
};

presentacion();
