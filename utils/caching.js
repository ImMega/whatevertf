const serverModel = require("../models/server");
const cache = [];

module.exports = {
    default: async () => {
        const servers = await serverModel.find({ prefix: {$ne:"n!"} });
        
        for (const server of servers) {
            cache.push({ id: server.id, prefix: server.prefix });
        }
    },
    cache: cache
}