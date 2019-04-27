attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSamplerWaterMap;
varying float verticalOffset;

uniform float timeFactor;

void main() {

    vec2 animationOffset = timeFactor * 0.01 * vec2(1.0, 1.0);

    vec4 colorMap = texture2D(uSamplerWaterMap, aTextureCoord + animationOffset);

    verticalOffset = colorMap.b * 0.08;
    vec3 verticalOffsetVector = aVertexNormal * verticalOffset;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + verticalOffsetVector, 1.0);

    vTextureCoord = aTextureCoord + animationOffset;

}
