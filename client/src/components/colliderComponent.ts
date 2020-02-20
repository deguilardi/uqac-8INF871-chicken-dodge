import { Component, IComponent } from "./component";
import { PositionComponent } from "./positionComponent";
import { Rectangle } from "./rectangle";
import * as Quadtree from "quadtree-lib"

export interface ICollisionComponent extends IComponent {
  onCollideWith( other: ColliderComponent ): void;
}

// # Classe *ColliderComponent*
// Ce composant est attaché aux objets pouvant entrer en
// collision.
interface ISize {
  w: number;
  h: number;
}

interface IColliderComponentDesc {
  flag: number;
  mask: number;
  size: ISize;
  handler?: string;
}

export class ColliderComponent extends Component<IColliderComponentDesc> {
  public handler?: ICollisionComponent;
  public flag!: number;
  public mask!: number;
  private size!: ISize;

  // ## Méthode *create*
  // Cette méthode est appelée pour configurer le composant avant
  // que tous les composants d'un objet aient été créés.
  public create(descr: IColliderComponentDesc) {
    this.flag = descr.flag;
    this.mask = descr.mask;
    this.size = descr.size;
  }

  // ## Méthode *setup*
  // Si un type *handler* est défini, on y appellera une méthode
  // *onCollision* si une collision est détectée sur cet objet.
  public setup(descr: IColliderComponentDesc) {
    if (descr.handler) {
      this.handler = this.owner.getComponent<ICollisionComponent>(descr.handler);
    }
  }

  // implements flags and masks algorithm
  public canCollideWith( other: ColliderComponent ): boolean{
    return ( this.mask & other.flag ) !== 0;
  }

  // ## Propriété *area*
  // Cette fonction calcule l'aire courante de la zone de
  // collision, après avoir tenu compte des transformations
  // effectuées sur les objets parent.
  get area() {
    const position = this.owner.getComponent<PositionComponent>("Position").worldPosition;
    return new Rectangle({
      x: position[0],
      y: position[1],
      // tslint:disable-next-line:object-literal-sort-keys
      width: this.size.w,
      height: this.size.h,
    });
  }

  get quadtreeItem() : Quadtree.QuadtreeItem{
    const position = this.owner.getComponent<PositionComponent>("Position").worldPosition;
    return{ x: position[ 0 ], y: position[ 1 ], width: this.size.w, height: this.size.h, ref: this }
  }

  get logCollisionFormatedElement(){
    const player = this.owner.getComponent('Player');
    const gem = this.owner.getComponent('Rupee');
    const heart = this.owner.getComponent('Heart');
    const chicken = this.owner.getComponent('Chicken');
    var text = "";
    if( player ){
      text += "player "
    }
    if( gem ){
      text += "gem "
    }
    if( heart ){
      text += "heart "
    }
    if( chicken ){
      text += "chicken "
    }
    const position = this.owner.getComponent<PositionComponent>("Position").worldPosition;
    text += position[ 0 ] + "x" + position[ 1 ];
    return text;
  }
}
