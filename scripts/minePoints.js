const colors = require('colors');
const { minePoints, getUserInfo } = require('./apis');

const minePointsLoop = async () => {
    while (true) {
        console.log('⛏️  Mining Points... Waiting 20 seconds to claim rewards.'.magenta);
        
        const points = Math.floor(Math.random() * (35 - 8 + 1)) + 8;
        
        await new Promise(resolve => setTimeout(resolve, 20000));

        await minePoints(points);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const userInfo = await getUserInfo();
        if (userInfo) {
            console.log(`🎉 Reward Claimed! Your points are now: ${userInfo.points}`.green);
        } else {
            console.log('Failed to fetch user info.'.red);
        }
    }
};

module.exports = minePointsLoop;
