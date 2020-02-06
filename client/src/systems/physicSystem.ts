import { ColliderComponent } from "../components/colliderComponent";
import { Scene } from "../scene";
import { ISystem } from "./system";

// # Classe *PhysicSystem*
// Représente le système permettant de détecter les collisions
export class PhysicSystem implements ISystem {

  // This method is called each cycle of the game loop
  public iterate(dT: number) {

    // retrieve every single collider component on screen
    const colliders: ColliderComponent[] = [];
    for (const e of Scene.current.entities()) {
      for (const comp of e.components) {
        if (comp instanceof ColliderComponent && comp.enabled) {
          colliders.push(comp);
        }
      }
    }

    // retrieve all possible collision (each element with every element)
    // I don't think we need a data structure here, let's just call the collision straight forward
    // const collisions: Array< {c1: ColliderComponent, c2: ColliderComponent} > = [];
    for (let i = 0; i < colliders.length; i++) {
      const c1 = colliders[i];
      if (!c1.enabled || !c1.owner.active) {
        // removing from the list wil prevent the same element for being accessed by a next loop cycles
        colliders.splice( i, 1 )
        continue;
      }

      for (let j = i + 1; j < colliders.length; j++) {
        const c2 = colliders[j];
        if (!c2.enabled || !c2.owner.active) {
          // @see above
          colliders.splice( j, 1 )
          continue;
        }

        // if elements intercect, they collide
        if (c1.area.intersectsWith(c2.area)) {
          this.collide({c1: c1, c2: c2});
        }
      }
    }
  }

  private collide(collision: {c1: ColliderComponent, c2: ColliderComponent}){
    if( collision.c1.canCollide( collision.c2 ) ){
      // console.log("collision occured between {f:" + collision.c1.flag + ", m: " + collision.c1.mask + "} and {f:" + collision.c2.flag + ", m: " + collision.c2.mask + "}")
      if( collision.c1.handler ){
        collision.c1.handler.onCollision( collision.c2 )
      }
      if( collision.c2.handler ){
        collision.c2.handler.onCollision( collision.c1 )
      }
    }
    // else{
    //   console.log("collision ignored between {f:" + collision.c1.flag + ", m: " + collision.c1.mask + "} and {f:" + collision.c2.flag + ", m: " + collision.c2.mask + "}")
    // }
  }
}
