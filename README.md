# Chicken Dodge
This is the winter 2019/20 version of an academic project conducted by Prof. [Eric Laberge](https://github.com/elaberge) for the discipline Principles of Game Engines (8INF871) at University of Quebec at Chicoutimi, Canada.

## About the game
Chicken dodge is a two players game competing against each other. Players red and green are in a ring where diammonds appears and desapears while chickens come of nowhere to beak the players and take their lives off. The main goal is to survive the chickens and collects diammonds.
* Platform: PC/MAC on a browser
* Number of players: 2
* Goal: Survive the chickens and collect diammonds
* lives: 3 (each player)
![screenshot](/github_assets/screenshot.png)

## What is this project for?
This is an academic project that starts at 01/29/2020 and ends at 02/19/2020. The tasks are:
### Exercise 2
* Using the ChickenDodge project, implement a [sprite batching mechanism](https://github.com/mattdesl/lwjgl-basics/wiki/Sprite-Batching).

* The top left corner of the screen displays the number of draw calls for each sprite. Since they share common characteristics, it should be possible to significantly reduce the number of calls (initial average is 150).
* The recommended strategy is to move the creation, update, and rendering call from the display method of the SpriteComponent component to the display method of the LayerComponent component.

### Exercise 3
* Implement a visual effect with a fragment shader.
* The camera code allows you to use the rendering in memory. We can thus support fullscreen special effects using shaders. A component applying a screen distortion was thus created, in order to be activated when the player is touched by a chicken. The desired result is available [here](https://youtu.be/tauWfnZkD-c).
* Implement the shader fragment located in the client / data / shaders / deformation.frag file in order to be able to reproduce a similar effect. The different textures and parameters are correctly configured in the DeformationCompositorComponent component, in order to update the uniform variables in the shader.
* The suggested algorithm is as follows:
    - Calculate the intensity of the deformation to be applied over time, by looking for a value in the uIntensity texture, at the coordinates (uTime, 0.5). Scale this intensity to the uScale scale.
    - Look for a deformation vector in the uDeformation texture, at the vTextureCoord coordinates offset by a value taken from uTime (for example, the sine of uTime). Modulate this deformation vector by the previous intensity.
Find the final color in uSampler at the vTextureCoord coordinates, offset from the deformation vector.

### Exercise 4 ([Physics and collision](https://docs.google.com/document/d/1NQ30RlBDP7j3FNsHsdOdsOeGJtmYYTFsC9fAl5xwgFo/edit#heading=h.2ic8pigx7v6v))
* Improve the rudimentary collision management in the class ColliderComponent and PhysicSystem.
* Implement the first stages of verification seen in class:
    - [Flags and masks](https://sites.google.com/site/arch1utep/home/course_outline/shifts_flags_masks_in_c).
    - [Spatial subdivision](https://www.sciencedirect.com/topics/computer-science/spatial-subdivision) [using a quadtree](https://en.wikipedia.org/wiki/Quadtree) (can use an existent implementation). * I'm using (quadtree-lib)[https://www.npmjs.com/package/quadtree-lib]
    - [Bounding box](https://computersciencewiki.org/index.php/Bounding_boxes) aligned with axes (implicit, should already be functional).

## Install and run
* Install [NodeJS](https://nodejs.org/en/download/).
* Install typescript. You can install it by using the command `npm install -g typescript`.
* Go to the directory client and run `npm install` and `tsc`.
* Go back to the root directory and run the "run script" adequate to your platform.
* Now the game is accessible by your web browser (default address is localhost:8080).

## Team
GUID09058608 Guilardi, Demetrio