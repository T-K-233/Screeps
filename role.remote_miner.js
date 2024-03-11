var RemoteMiner = {
  members: ["remote_miner_A"],
  
  body: [WORK, WORK, CARRY, MOVE, MOVE],
  
  
  /** @param {Creep} creep **/
  run: function(creep) {
      let move_target = new RoomPosition(30, 8, "W30N50");
      
      creep.moveTo(move_target, {
          visualizePathStyle: {
              stroke: "#ff0",
          }
      });
      
      // let source = null
      //         || creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
      //         // || creep.pos.findClosestByPath(FIND_SOURCES);
      // if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(source);
      // }
      // if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(source);
      // }
      
      // let site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      // if (site && creep.room.controller.ticksToDowngrade > 1000) {
      //     if (creep.build(site) == ERR_NOT_IN_RANGE) {
      //         creep.moveTo(site);
      //     }
      // }
      // else {
      //     // creep.upgradeController(creep.room.controller);
      //     // creep.moveTo(creep.room.controller);
      // }
  },
};

module.exports = RemoteMiner;