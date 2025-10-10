import React, {memo, useMemo} from 'react';
import {
  ImageShader,
  Shader,
  Skia,
  Group,
  Fill,
  Canvas,
  useImage,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');
const imageWidth = width * 0.95;
const imageHeight = height * 0.8;

const FQS = ({base64}) => {
  const shader = useMemo(
    () =>
      Skia.RuntimeEffect.Make(`
    uniform shader image;
    uniform shader luts;
    uniform float noiseAmount; // strength of noise (0.0 - 1.0)

    // Simple pseudo-random generator based on pixel coords
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
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

      // Add noise
      float n = (random(xy) - 0.5) * 2.0 * noiseAmount;
      lutsColor.rgb += n;

      lutsColor.rgb = clamp(lutsColor.rgb, 0.0, 1.0);
      return lutsColor;
    }
  `),
    [],
  );

  const lutImage = useImage(require('./9-FQS.png'));
  const capturedImageData = Skia.Data.fromBase64(base64);
  const capturedImage = Skia.Image.MakeImageFromEncoded(capturedImageData);

  if (!capturedImage || !shader || !lutImage) {
    return null;
  }

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
        <Shader
          source={shader}
          uniforms={{
            noiseAmount: 0.03,
          }}>
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
      </Group>
    </Canvas>
  );
};

export default memo(FQS);

const styles = StyleSheet.create({
  canvas: {
    width: imageWidth,
    height: imageHeight,
    alignSelf: 'center',
  },
});
