attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSamplerWaterMap; // water map
varying float verticalOffset;
varying float animationOffset;

uniform float timeFactor;

void main() {
    animationOffset = (timeFactor / 50.0);

    vec4 colorMap = texture2D(uSamplerWaterMap, vec2(animationOffset, animationOffset) + aTextureCoord);
    verticalOffset = colorMap.b / 25.0;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy, aVertexPosition.z + verticalOffset, 1.0);

	vTextureCoord = aTextureCoord;
}