#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerWater;
uniform float timeFactor;
varying float verticalOffset;

void main() {
	vec4 color = texture2D(uSamplerWater, vTextureCoord);
	gl_FragColor = color;

    if(verticalOffset > 0.04) {
        float colorModifier = 1.15;
        gl_FragColor.rgb /= colorModifier;
    }
}