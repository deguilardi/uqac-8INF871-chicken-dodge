import * as GraphicsAPI from "./graphicsAPI";
import { SpriteSheetComponent } from "./components/spriteSheetComponent";
import { SpriteComponent } from "./components/spriteComponent";

export class Batching{

    private numberOfElements: number = 0
    private elementsCount: number = 0
    private vertexes: number[] = []
    private indexes: Uint16Array
    private GL = GraphicsAPI.context;

    public constructor(layerSprites: SpriteComponent[], vertexBuffer: WebGLBuffer, indexBuffer: WebGLBuffer){
        this.numberOfElements = layerSprites.length
        this.indexes = new Uint16Array(this.numberOfElements * 6)
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, vertexBuffer)
        this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, indexBuffer)
        for(let layerSprite of layerSprites){
            this.addSprite(layerSprite)
        }
    }

    public render(spriteSheet: SpriteSheetComponent){
        const vertexArray = Float32Array.from(this.vertexes)
        this.GL.bufferData(this.GL.ARRAY_BUFFER, vertexArray, this.GL.DYNAMIC_DRAW)
        this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, this.indexes, this.GL.DYNAMIC_DRAW)
        spriteSheet.bind()
        this.GL.drawElements(this.GL.TRIANGLES, this.numberOfElements * 6, this.GL.UNSIGNED_SHORT, 0)
        spriteSheet.unbind()
    }

    private addSprite(sprite: SpriteComponent){
        for(let vertice of sprite.vertices){
            this.vertexes.push(vertice)
        }
        const key = this.elementsCount * 4
        this.indexes.set([key, key + 1, key + 2, key + 2, key + 3, key], this.elementsCount * 6)
        this.elementsCount++
    }
}