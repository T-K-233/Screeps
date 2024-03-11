var Shard2 = require("shard.2");
var Shard3 = require("shard.3");

module.exports.loop = function () {
    switch (Game.shard.name) {
        case "shard2":
            try {
                Shard2.run();
            }
            catch (err) {
                console.log(err)
            }
            break;
        case "shard3":
            try {
                Shard3.run();
            }
            catch (err) {
                console.log(err)
            }
            break;
    }
};
