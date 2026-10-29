float random (vec2 st);
float circle(vec2 center, float radius, vec2 uv);
vec2 randomGradient(vec2 p);

vec2 cubic(vec2 p);
vec2 quintic(vec2 p);


// The MIT License
// https://www.youtube.com/c/InigoQuilez
// https://iquilezles.org/
// Copyright © 2015 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// A simple and really efficient way to create color variation.
//
// Short video about this method to make palettes:
//
//   https://www.youtube.com/shorts/TH3OTy5fTog
//
// and a longer article here:
//
//   https://iquilezles.org/articles/palettes for more information

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


vec3 palette(float t)
{
    return pal(t, vec3(0.8,0.6,0.6),vec3(0.57,0.3,0.2),vec3(1.0,1.0,1.0),vec3(0.1,0.3,0.4) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;
    
    uv = uv * iResolution.xy / iResolution.y;

    // Nice oscilation
    // pow(tan(iTime), 4.0)

    // Make the grid
    float tiles = 1.3;
    
    // Vector rotation - from 0 to 1
    vec2 gridId = floor(uv * tiles);
    vec2 gridUv = fract(uv * tiles);
    
    vec2 color = gridUv;
    
    // Corners of each grid
    vec2 bl = gridId + vec2(0.0, 0.0);
    vec2 br = gridId + vec2(1.0, 0.0);
    vec2 tl = gridId + vec2(0.0, 1.0);
    vec2 tr = gridId + vec2(1.0, 1.0);
    
    // Random gradient for each corner
    vec2 gradientBl = randomGradient(bl);
    vec2 gradientBr = randomGradient(br);
    vec2 gradientTl = randomGradient(tl);
    vec2 gradientTr = randomGradient(tr);
    
    // Distance from current pixel to each corner
    vec2 distanceBl = gridUv - vec2(0.0, 0.0);
    vec2 distanceBr = gridUv - vec2(1.0, 0.0);
    vec2 distanceTl = gridUv - vec2(0.0, 1.0);
    vec2 distanceTr = gridUv - vec2(1.0, 1.0);
    
    // Dot product between distance and the random gradient
    float dotBl = dot(gradientBl, distanceBl);
    float dotBr = dot(gradientBr, distanceBr);
    float dotTl = dot(gradientTl, distanceTl);
    float dotTr = dot(gradientTr, distanceTr);
    
    // Smooth out the grid uvs
    //gridUv = smoothstep(0.0, 1., gridUv);
    //gridUv = cubic(gridUv);
    gridUv = quintic(gridUv);
    
    
    // Mix the colors
    float b = mix(dotBl, dotBr, gridUv.x);
    float t = mix(dotTl, dotTr, gridUv.x);
    float perlin = mix(b, t, gridUv.y);
  
    float finalColor = pow(1.0 - abs(perlin), 10.);
  
    // Output to screen
    fragColor = vec4(palette(finalColor + (sin(uv.x + iTime * .1) + sin(uv.y + iTime * .1))), 1.0);
}

// Random
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))
        * 43758.5453123);
}

vec2 randomGradient(vec2 p) {
  p = p + 0.02;
  float x = dot(p, vec2(123.4, 234.5));
  float y = dot(p, vec2(234.5, 345.6));
  vec2 gradient = vec2(x, y);
  gradient = sin(gradient);
  gradient = gradient * 43758.5453;

  // part 4.5 - update noise function with time
  gradient = 0.3 * sin(0.6 * gradient + 0.00001 * iTime) + 0.2 * cos(0.4 * gradient + iTime * 0.00001);
  return gradient;

  // gradient = sin(gradient);
  // return gradient;
}

// Interpolation

vec2 cubic(vec2 p) {
  return p * p * (3.0 - p * 2.0);
}

vec2 quintic(vec2 p) {
  return p * p * p * (10.0 + p * (-15.0 + p * 6.0));
}
