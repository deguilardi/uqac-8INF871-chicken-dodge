precision mediump float;

/* Game rendering */
uniform sampler2D uSampler;

/* Deformation texture in red and green */
uniform sampler2D uDeformation;

/* Texture to control the intensity of the deformation */
uniform sampler2D uIntensity;

/* Time interval multiplied by speed since component activation */
uniform float uTime;

/* Deformation scale */
uniform float uScale;

/* UV coordinates of the fragment */
varying vec2 vTextureCoord;

void main(void) {

    /*
     * original
     */

    // gl_FragColor = texture2D(uSampler, vTextureCoord);
    // gl_FragColor.gb *= 0.5;

    /*
     * exercise 3
     */

    // . Calculate the intensity of the deformation to be applied over time,
    //   by looking for a value in the uIntensity texture, at the coordinates (uTime, 0.5).
    //   Scale this intensity to the uScale scale.
    vec2 intensityCoord = vec2( uTime, 0.5 );
    vec2 intensityVector = texture2D( uIntensity, intensityCoord ).xy * uScale;

    // . Look for a deformation vector in the uDeformation texture, at the vTextureCoord
    //   coordinates offset by a value taken from uTime (for example, the sine of uTime).
    //   Modulate this deformation vector by the previous intensity.
    vec2 deformationCoord = vTextureCoord + sin( uTime );
    vec2 deformationVector = texture2D( uDeformation, deformationCoord ).xy * intensityVector;

    //   Find the final color in uSampler at the vTextureCoord coordinates,
    //   offset from the deformation vector.
    vec2 finalCoord = vTextureCoord + deformationVector;
    gl_FragColor = texture2D( uSampler, finalCoord );
}
