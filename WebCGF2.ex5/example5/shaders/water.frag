#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerWater;
uniform float timeFactor;
varying float verticalOffset;
varying float animationOffset;

void main() {
	vec4 color = texture2D(uSamplerWater, vec2(animationOffset, animationOffset) + vTextureCoord);

	gl_FragColor = color;

    if(verticalOffset < 0.01) {
        float colorModifier = 1.10 + verticalOffset;
        gl_FragColor.rgb /= colorModifier;
    }
}
