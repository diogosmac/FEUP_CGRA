#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSamplerHeightMap;
varying float verticalOffset;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = color;

    if(verticalOffset < 0.01) {
        float colorModifier = 1.10 + verticalOffset;
        gl_FragColor.rgb /= colorModifier;
    }

}
