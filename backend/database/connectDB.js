const mongoose = require('mongoose');
const { preprocessCSS } = require('vite');

const cn_DB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo DB connected : ${connect.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = cn_DB;