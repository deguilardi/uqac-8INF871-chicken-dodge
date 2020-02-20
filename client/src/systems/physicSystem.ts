import { ColliderComponent } from "../components/colliderComponent";
import { Scene } from "../scene";
import { ISystem } from "./system";
import * as Quadtree from "quadtree-lib"
// import * as Quadtree from "../../node_modules/quadtree-lib/typings/quadtree"

// # Classe *PhysicSystem*
// Représente le système permettant de détecter les collisions
export class PhysicSystem implements ISystem {

  // This method is called each cycle of the game loop
  public iterate(dT: number) {
    
    // init quadtree
    const canvas = document.getElementById( 'canvas' );
    const tree = new Quadtree<Quadtree.QuadtreeItem>({
      width: canvas!.clientWidth,
      height: canvas!.clientHeight
    })

    // retrieve every single collider component on screen
    // and add colliders to the quadtree
    for( const e of Scene.current.entities() ){
      for( const comp of e.components ){
        if( comp instanceof ColliderComponent && comp.enabled && comp.owner.active ){
          tree.push( comp.quadtreeItem )
        }
      }
    }

    // detect collisions
    const self = this
    tree.each( function( c1: Quadtree.QuadtreeItem ){
      const cn = tree.colliding( c1 )
      for( const c2 of cn ){
        self.collide( c1.ref, c2.ref );
      }
    });
  }

  private collide( element1: ColliderComponent, element2: ColliderComponent ){
    if( element1.canCollideWith( element2) ){
      if( element1.handler ){
        element1.handler.onCollideWith( element2 )
      }
      if( element2.handler ){
        element2.handler.onCollideWith( element1 )
      }
    }

    // log collision
    // console.log( element1.logCollisionFormatedElement + " with " + element2.logCollisionFormatedElement )
  }
}
