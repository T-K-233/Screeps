var Builder = {
  body: [WORK, WORK, WORK, CARRY, CARRY, MOVE],
  
  /** @param {Creep} creep **/
  run: function(creep) {
      const STATE_REFILL = 0;
      const STATE_WORK = 1;
      const STATE_TRANSPORT = 2;
      
      if (creep.memory.state == undefined) {
          creep.memory.state = STATE_REFILL;
      }
      
      if (creep.memory.state == STATE_REFILL) {
          if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
              creep.memory.state = STATE_WORK;
              return ;
          }
          
          /* find source to retrive energy from */
          let source = (null
                  || creep.pos.findClosestByRange(FIND_TOMBSTONES, {filter: function(structure) { return structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0; }})
                  || creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: function(structure) { return structure.amount > 50; }})
                  || creep.pos.findClosestByRange(FIND_RUINS, {filter: function(structure) { return structure.store.getUsedCapacity() > 0; }})
                  || creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function (structure) { return structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 50; }})
              );
          
          if (source == null) {
              creep.say("no src");
              return ;
          }
          
          let resp = null;
          if (source.amount) {
              // this is a dropped resource, we should pickup()
              resp = creep.pickup(source);
          }
          else {
              resp = creep.withdraw(source, RESOURCE_ENERGY);
          }
          
          if (resp == ERR_NOT_IN_RANGE) {
              creep.moveTo(source);
          }
          if (resp == OK) {
              creep.memory.state = STATE_WORK;
          }
      }
      if (creep.memory.state == STATE_WORK) {
          // find if there is unfilled extensions nearby and attempt to fill it
          var extensions = creep.room.find(FIND_MY_STRUCTURES, {filter: function(structure) {
              return structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
          }});
          if (extensions.length > 0) {
              extensions.forEach(function(extension) {
                  let resp = creep.transfer(extension, RESOURCE_ENERGY);
                  if (resp == ERR_NOT_IN_RANGE) {
                      creep.moveTo(extension);
                  }
                  else if (resp == ERR_NOT_ENOUGH_RESOURCES) {
                      creep.memory.state = STATE_REFILL;
                  }
              });
              
              if (Memory.debug) creep.say("refill");
              return ;
          }
          
          // find if there is unfilled extensions nearby and attempt to fill it
          var terminals = creep.room.find(FIND_MY_STRUCTURES, {filter: function(structure) {
              return structure.structureType == STRUCTURE_TERMINAL && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 2000;
          }});
          if (terminals.length > 0) {
              terminals.forEach(function(terminal) {
                  let resp = creep.transfer(terminal, RESOURCE_ENERGY);
                  if (resp == ERR_NOT_IN_RANGE) {
                      creep.moveTo(terminal);
                  }
                  else if (resp == ERR_NOT_ENOUGH_RESOURCES) {
                      creep.memory.state = STATE_REFILL;
                  }
              });
              
              if (Memory.debug) creep.say("refill");
              return ;
          }
          
          const REPAIR_THREASHOLD_PERCENTAGE = 0.8;
          let repair_structures = creep.room.find(FIND_STRUCTURES, {
              filter: function(structure) {
                  if (structure.structureType == STRUCTURE_WALL) {
                      return structure.hits < 1e3;
                  }
                  if (structure.structureType == STRUCTURE_RAMPART) {
                      return structure.hits < 2e4;
                  }
                  return (structure.hits / structure.hitsMax) < REPAIR_THREASHOLD_PERCENTAGE;
              }
          });
          if (repair_structures.length > 0) {
              repair_structures.forEach(function(structure) {
                  let resp = creep.repair(structure);
                  if (resp == ERR_NOT_IN_RANGE) {
                      creep.moveTo(structure);
                  }
                  else if (resp == ERR_NOT_ENOUGH_RESOURCES) {
                      creep.memory.state = STATE_REFILL;
                  }
              });
              if (Memory.debug) creep.say("repair");
              return ;
          }
          
          let construction_site = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, { filter: { 
                  // structureType: STRUCTURE_EXTENSION
              }});
          if (construction_site) {
              let resp = creep.build(construction_site);
              if (resp == ERR_NOT_IN_RANGE) {
                  creep.moveTo(construction_site);
              }
              else if (resp == ERR_NOT_ENOUGH_RESOURCES) {
                  creep.memory.state = STATE_REFILL;
              }
              if (Memory.debug) creep.say("constr");
              return ;
          }
          
          
          // otherwise upgrade controller
          let resp = creep.upgradeController(creep.room.controller);
          if (resp == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
          }
          else if (resp == ERR_NOT_ENOUGH_RESOURCES) {
              creep.memory.state = STATE_REFILL;
          }
      
          creep.say("wfi");
      }
      
  }
};

module.exports = Builder;