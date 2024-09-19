const colors = require('colors');
const { minePoints, getUserInfo } = require('./apis');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const minePointsRandom = async () => {
    while (true) {
        const miningDuration = (Math.random() * (3 - 1) + 1) * 60 * 60 * 1000;
        
        const hoursMining = Math.floor(miningDuration / (1000 * 60 * 60));
        const minutesMining = Math.floor((miningDuration % (1000 * 60 * 60)) / (1000 * 60));
        const secondsMining = Math.floor((miningDuration % (1000 * 60)) / 1000);

        console.log(`⛏️  Mining Points for ${hoursMining} hours, ${minutesMining} minutes, and ${secondsMining} seconds...`.magenta);

        const startTime = Date.now();

        while (Date.now() - startTime < miningDuration) {
            console.log('⛏️  Mining Points... Waiting 20 seconds to claim rewards.'.magenta);
            
            const points = Math.floor(Math.random() * (35 - 8 + 1)) + 8;
            
            await sleep(20000);

            await minePoints(points);
            
            await sleep(2000);
            
            const userInfo = await getUserInfo();
            if (userInfo) {
                console.log(`🎉 Reward Claimed! Your points are now: ${userInfo.points}`.green);
            } else {
                console.log('Failed to fetch user info.'.red);
            }
        }

        const pauseDuration = (Math.random() * (3 - 1) + 1) * 60 * 60 * 1000;

        const hoursPause = Math.floor(pauseDuration / (1000 * 60 * 60));
        const minutesPause = Math.floor((pauseDuration % (1000 * 60 * 60)) / (1000 * 60));
        const secondsPause = Math.floor((pauseDuration % (1000 * 60)) / 1000);

        console.log(`🛑 Pausing mining for ${hoursPause} hours, ${minutesPause} minutes, and ${secondsPause} seconds.`.yellow);

        await sleep(pauseDuration);

        console.log('🔄 Resuming mining...'.cyan);
    }
};

module.exports = minePointsRandom;
