import React, {memo, useMemo, useCallback} from 'react';
import {
  ImageShader,
  Shader,
  Skia,
  Group,
  Fill,
  Canvas,
  useImage,
  Text,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');
const imageWidth = width * 0.95;
const imageHeight = height * 0.8;

const CPM = ({base64}) => {
  const shader = useMemo(
    () =>
      Skia.RuntimeEffect.Make(`
    uniform shader image;
    uniform shader luts;

    // Simple noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // Noise function with multiple octaves
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    half4 main(float2 xy) {
      vec4 color = image.eval(xy);

      int r = int(floor(color.r * 63.999));
      int g = int(floor(color.g * 63.999));
      int b = int(floor(color.b * 63.999));

      int blockCol = int(mod(float(b), 8.0));
      int blockRow = int(floor(float(b)/8.0));

      float lutX = clamp(float(blockCol * 64 + r) + 0.5, 0.0, 511.5);
      float lutY = clamp(float(blockRow * 64 + g) + 0.5, 0.0, 511.5);

      vec4 lutsColor = luts.eval(float2(lutX, lutY));

      // Add noise to the result
      float noiseValue = noise(xy * 100.0) * 0.2; // Adjust noise intensity
      lutsColor.rgb += noiseValue;

      return lutsColor;
    }
  `),
    [],
  );

  const fontError = useCallback(error => {
    console.log(error);
  }, []);

  const font = useFont(
    require('../../assets/fonts/15-CPM-FONT.ttf'),
    imageHeight * 0.02,
    fontError,
  );

  const lutImage = useImage(require('./15-CPM.png'));
  const capturedImageData = Skia.Data.fromBase64(base64);
  const capturedImage = Skia.Image.MakeImageFromEncoded(capturedImageData);

  if (!capturedImage || !shader || !lutImage || !font) {
    return null;
  }

  // Format current date: "month   day'year"
  const formatCurrentDate = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const day = now.getDate();
    const year = now.getFullYear() % 100; // Get last 2 digits of year
    return `${year}   ${day} ${month}`;
  };

  const dateText = formatCurrentDate();
  const {ascent, descent, leading} = font.getMetrics();
  const textHeight = Math.abs(ascent) + Math.abs(descent) + leading;
  const textWidth = font.getTextWidth(dateText);

  return (
    <Canvas style={styles.canvas}>
      <Group
        clip={{
          rect: {
            x: 0,
            y: 0,
            width: imageWidth,
            height: imageHeight,
          },
          rx: height * 0.011,
          ry: height * 0.011,
        }}>
        <Fill />

        <Shader source={shader} uniforms={{}}>
          <ImageShader
            fit="cover"
            image={capturedImage}
            rect={{
              x: 0,
              y: 0,
              width: imageWidth,
              height: imageHeight,
            }}
          />
          <ImageShader
            fit="cover"
            image={lutImage}
            rect={{
              x: 0,
              y: 0,
              width: lutImage.width(),
              height: lutImage.height(),
            }}
          />
        </Shader>
        <Text
          text={dateText}
          font={font}
          x={imageHeight * 0.8}
          y={imageWidth * 0}
          color="yellow"
          transform={[
            {
              rotate: Math.PI / 2,
            },
          ]}
          origin={vec(textWidth / 2, textHeight / 2)}
        />
      </Group>
    </Canvas>
  );
};

export default memo(CPM);

const styles = StyleSheet.create({
  canvas: {
    width: imageWidth,
    height: imageHeight,
    alignSelf: 'center',
  },
});
