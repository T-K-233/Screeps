var Miner = {
  members: [
      {
          name: "W32N51_miner_A",
          room: "W32N51",
          spawn: "Spawn1",
          body: Array(5).fill(WORK).concat(CARRY),
          pos: [BOTTOM_LEFT],
      },
      {
          name: "W32N51_miner_B",
          room: "W32N51",
          spawn: "Spawn1",
          body: Array(5).fill(WORK).concat(CARRY),
          pos: [TOP],
      },
      {
          name: "W31N51_miner_A",
          room: "W31N51",
          spawn: "Spawn2",
          body: Array(2).fill(WORK).concat(CARRY),
          pos: [BOTTOM_LEFT],
      },
      {
          name: "W31N51_miner_B",
          room: "W31N51",
          spawn: "Spawn2",
          body: Array(2).fill(WORK).concat(CARRY),
          pos: [BOTTOM_LEFT],
      },
      {
          name: "W28N46_miner_A",
          room: "W28N46",
          spawn: "Spawn3",
          body: Array(2).fill(WORK).concat(CARRY),
          pos: [TOP_LEFT],
      },
      ],
  
  // let n_work_body = Math.max(1, Math.min(5, Math.floor((Game.spawns["Spawn1"].room.memory.energyAvailable - 50) / 100)));
  body: Array(5).fill(WORK).concat(CARRY),

  /** @param {Creep} creep **/
  run: function(creep) {
      // gather mine
      var source = creep.pos.findClosestByRange(FIND_SOURCES);
      creep.harvest(source);
      
      // find if there is unfilled extensions or spawn nearby and attempt to fill it
      var extensions = creep.room.find(FIND_MY_STRUCTURES, {filter: function(structure) {
          return structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN
          
      }});
      extensions.forEach(function(extension) {
          if (extension.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
              creep.transfer(extension, RESOURCE_ENERGY);
          }
      });
      
      // find if there is unfilled tower nearby and attempt to fill it
      var towers = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER }});
      towers.forEach(function(tower) {
          if (tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
              creep.transfer(tower, RESOURCE_ENERGY);
          }
      });
      
      let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_CONTAINER}});
      if (container==null || container.store.getFreeCapacity(RESOURCE_ENERGY) < 500) {
          // otherwise upgrade controller
          creep.upgradeController(creep.room.controller);
      }
  }
};

module.exports = Miner;