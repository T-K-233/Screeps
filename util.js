
// Get creeps by name
_.filter(Game.creeps, (creep) => creep.name == "name");


// Get creeps by role
_.filter(Game.creeps, (creep) => creep.memory.role == "role");

// Get creep cost
// CARRY: 50
// MOVE: 50
// WORK: 100


// 200
_.sum([WORK, CARRY, MOVE], b => BODYPART_COST[b]);

// 300
_.sum([WORK, WORK, CARRY, MOVE], b => BODYPART_COST[b]);

// 450
_.sum([WORK, WORK, WORK, WORK, CARRY], b => BODYPART_COST[b]);

_.sum([CARRY, CARRY, MOVE, MOVE], b => BODYPART_COST[b]);
_.sum([ATTACK, HEAL, MOVE], b => BODYPART_COST[b]);

// 260
_.sum([ATTACK, ATTACK, MOVE, MOVE], b => BODYPART_COST[b]);

// 650
_.sum([CLAIM, MOVE], b => BODYPART_COST[b]);

// Game.spawns["Spawn1"].spawnCreep([ATTACK, ATTACK, MOVE, MOVE], "Attacker");
Game.spawns["Spawn1"].spawnCreep([CLAIM, MOVE], "Claimer");
Game.getObjectById("62623a4142951f0e5c8baf77").attack(Game.getObjectById("626234e2325061812e0f40d0"))
