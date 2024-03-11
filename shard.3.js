var Builder = require("role.builder");
var Carrier = require("role.carrier");
var Miner = require("role.miner");
var RemoteMiner = require("role.remote_miner");

module.exports = {
    run: function() {
        
        Miner.members.forEach(function(config) {
            let creeps = _.filter(Game.creeps, (creep) => creep.name == config.name);
            if (creeps.length == 0) {
                Game.spawns[config.spawn].spawnCreep(config.body, name, { 
                    memory: {role: "miner"},
                    directions: config.pos,
                });
            }
        });
        
        
        RemoteMiner.members.forEach(function(name) {
            let creeps = _.filter(Game.creeps, (creep) => creep.name == name);
            if (creeps.length == 0) {
                    Game.spawns["Spawn1"].spawnCreep(RemoteMiner.body, name, { 
                        memory: {role: "remote_miner"},
                    });
            }
        });
        
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
        if (builders.length < 2) {
            let name = "builder_" + Game.time;
            Game.spawns["Spawn1"].spawnCreep(Builder.body, name, { 
                memory: {role: "builder"},
            });
        }
        
        for (var name in Game.creeps) {
            let creep = Game.creeps[name];
            
            switch (creep.memory.role) {
                case "miner":
                    Miner.run(creep);
                    break;
                case "builder":
                    Builder.run(creep);
                    break;
                case "carrier":
                    Carrier.run(creep);
                    break;
                case "remote_miner":
                    RemoteMiner.run(creep);
                    break;
            }
        }
        
        
        for (let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log("Clearing non-existing creep memory:", name);
            }
        }
    
    }
};