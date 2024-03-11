/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('shard.2');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
  run: function() {
      
      /* ==== Temp Code ==== */
      /* 2024-03-09 event log: need to remove the extension in room W28N46 and send another claimer creep to get the room. */
      {
          // Game.spawns["Spawn1"].spawnCreep([CLAIM, MOVE], "C");
          let claimer = Game.getObjectById("65ee9473a5038240a80a8bac");
          let move_target;
          if (claimer) {
              // move_target = new RoomPosition(30, 8, "W30N50");
              move_target = new RoomPosition(23, 15, "W29N43");
              
              claimer.moveTo(move_target, {
                      visualizePathStyle: {
                          stroke: "#93f",
                      }
                  });
              claimer.claimController(Game.getObjectById("59f1a11d82100e1594f37c13"));
          }
      }
      
      for (var name in Game.creeps) {
          let creep = Game.creeps[name];
          
          switch (creep.memory.role) {
              // case "miner":
              //     Miner.run(creep);
              //     break;
              // case "builder":
              //     Builder.run(creep);
              //     break;
              // case "carrier":
              //     Carrier.run(creep);
              //     break;
              case "remote_miner":
                  console.log("hi")
                  creep.moveTo(new RoomPosition(23, 15, "W29N43"));
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