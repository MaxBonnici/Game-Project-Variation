class OverworldMap {
    constructor(config) {
      /* Initialisation de constante (mur, image,...)*/
      this.gameObjects = config.gameObjects;
      this.walls = config.walls || {};
  
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      //this.upperImage = new Image();
      //this.upperImage.src = config.upperSrc;

      this.isCutscenePlaying = false; //on verra plus tard si on fera des cutscene
    }
  
    drawLowerImage(ctx, cameraPerson) {
      ctx.drawImage(
        this.lowerImage, 
        utils.withGrid(10.5) - cameraPerson.x, //La  map doit bouger en fonction de la position du personnage
        utils.withGrid(6) - cameraPerson.y )
    }
  
    //drawUpperImage(ctx) {
    //  ctx.drawImage(this.upperImage, 0, 0)
    //} 

    isSpaceTaken(currentX,currentY, direction) { //verification de position prise
      const {x,y} = utils.nextPosition(currentX,currentY,direction);
      return this.walls[`${x},${y}`] || false; 
    }

    /* fonction pour la récupération d'objet*/
    mountObjects() {
      Object.keys(this.gameObjects).forEach(key => {

        let object = this.gameObjects[key];
        object.id = key;

        //TODO: determine if this object should actually mount

        object.mount(this);
      })
    }

    addWall(x,y) { //rajoute mur
      this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y) { //supprime mur
      delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasY, direction) { //déplacement de mur(dans le cas du héro ou d'un png qui bouge)
      this.removeWall(wasX,wasY);
      const {x,y} = utils.nextPosition(wasX,wasY,direction);
      this.addWall(x,y);
    }
  }



  window.OverworldMaps = {
    DemoRoom: 
    {
      lowerSrc: "/Images/maps/DemoLower.png",
      //upperSrc: "/Images/maps/DemoUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(6),
        }),
        npcA: new Person({
          x: utils.withGrid(7),
          y: utils.withGrid(9),
          src: "/Images/characters/people/npc1.png",
          behaviorLoop: [
            { type: "stand", direction: "left", time: 1200 },
            { type: "stand", direction: "up", time: 1000 },
            { type: "stand", direction: "right", time: 1200 },
            { type: "stand", direction: "up", time: 700 },
          ]
        }),
        npcB: new Person({
          x: utils.withGrid(3),
          y: utils.withGrid(7),
          src: "/Images/characters/people/npc2.png",
          behaviorLoop:  [
          { type: "walk", direction: "left"},
          { type: "stand", direction: "left", time: 200 },
          { type: "walk", direction: "up"},
          { type: "stand", direction: "up", time: 200 },
          { type: "walk", direction: "right"},
          { type: "stand", direction: "right", time: 200 },
          { type: "walk", direction: "down"},
          { type: "stand", direction: "down", time: 200 },
          ]
        }),
        npcC: new Person({
          x: utils.withGrid(4),
          y: utils.withGrid(4),
          src: "/Images/characters/people/npc3.png",
          behaviorLoop:  [
          { type: "stand", direction: "up", time: 10000 },
          { type: "stand", direction: "down", time: 1000 },
          ]
        })
      },
      walls: {
        //table
        [utils.asGridCoord(7,6)] : true,
        [utils.asGridCoord(8,6)] : true,
        [utils.asGridCoord(7,7)] : true,
        [utils.asGridCoord(8,7)] : true,

        //Mur haut
        [utils.asGridCoord(1,3)] : true,
        [utils.asGridCoord(2,3)] : true,
        [utils.asGridCoord(3,3)] : true,
        [utils.asGridCoord(4,3)] : true,
        [utils.asGridCoord(5,3)] : true,
        [utils.asGridCoord(7,3)] : true,
        [utils.asGridCoord(9,3)] : true,
        [utils.asGridCoord(10,3)] : true,
        [utils.asGridCoord(6,4)] : true,
        [utils.asGridCoord(8,4)] : true,

        //Mur droite-gauche
        [utils.asGridCoord(0,4)] : true,
        [utils.asGridCoord(11,4)] : true,
        [utils.asGridCoord(0,5)] : true,
        [utils.asGridCoord(11,5)] : true,
        [utils.asGridCoord(0,6)] : true,
        [utils.asGridCoord(11,6)] : true,
        [utils.asGridCoord(0,7)] : true,
        [utils.asGridCoord(11,7)] : true,
        [utils.asGridCoord(0,8)] : true,
        [utils.asGridCoord(11,8)] : true,
        [utils.asGridCoord(0,9)] : true,
        [utils.asGridCoord(11,9)] : true,

        //Mur bas
        [utils.asGridCoord(1,10)] : true,
        [utils.asGridCoord(2,10)] : true,
        [utils.asGridCoord(3,10)] : true,
        [utils.asGridCoord(4,10)] : true,
        [utils.asGridCoord(6,10)] : true,
        [utils.asGridCoord(7,10)] : true,
        [utils.asGridCoord(8,10)] : true,
        [utils.asGridCoord(9,10)] : true,
        [utils.asGridCoord(10,10)] : true,
        [utils.asGridCoord(5,11)] : true,
      }
    },
    Kitchen: {
      lowerSrc: "/Images/maps/KitchenLower.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(3),
          y: utils.withGrid(5),
        }),
        npcA: new Person({
          x: utils.withGrid(9),
          y: utils.withGrid(6),
          src: "/Images/characters/people/npc4.png"
        }),
        npcB: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(8),
          src: "/Images/characters/people/npc5.png"
        })
      }
    },
  }