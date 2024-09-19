const colors = require('colors');
const { getUserInfo } = require('./apis');

const fetchUserInfo = async () => {
    const userInfo = await getUserInfo();
    if (userInfo) {
        console.log(`👤 Hello ${userInfo.tgUsername} - Your points are ${userInfo.points}`.cyan);
    } else {
        console.log('Failed to fetch user info.'.red);
    }
};

module.exports = fetchUserInfo;
