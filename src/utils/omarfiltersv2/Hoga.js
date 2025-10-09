/* eslint-disable no-unused-vars */
import React, {memo, useMemo} from 'react';
import {
  ImageShader,
  Shader,
  Skia,
  Group,
  Fill,
  Canvas,
  useImage,
  Rect,
  vec,
  RadialGradient,
  BlurMask,
  Circle,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');
const imageWidth = width * 0.9;
const imageHeight = height * 0.3;

const Hoga = ({base64}) => {
  const shader = useMemo(
    () =>
      Skia.RuntimeEffect.Make(`
    uniform shader image;
    uniform shader luts;
  
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

      return lutsColor;
    }
  `),
    [],
  );

  const lutImage = useImage(require('./hoga.png'));
  const blurMaskImage = useImage(require('./blur_mask_hoga.jpg'));
  const capturedImageData = Skia.Data.fromBase64(base64);
  const capturedImage = Skia.Image.MakeImageFromEncoded(capturedImageData);

  if (!capturedImage || !shader || !lutImage || !blurMaskImage) {
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
        }}
        blendMode="multiply">
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

        {/* <Rect x={0} y={0} width={imageWidth} height={imageHeight}>
          <RadialGradient
            c={vec(imageWidth / 2, imageHeight / 2)}
            r={imageWidth * 0.8}
            colors={['transparent', 'transparent', 'black']}
            positions={[0, 0.6, 1]}
            mode="clamp"
          />
        </Rect> */}

        <Rect x={0} y={0} width={imageWidth} height={imageHeight} opacity={0.8}>
          <ImageShader
            fit="cover"
            image={blurMaskImage}
            rect={{
              x: 0,
              y: 0,
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </Rect>

        {/* <Circle
          c={vec(imageWidth / 2, imageHeight / 2)}
          r={imageWidth * 0.5}
          color="black">
          <BlurMask blur={20} style="outer" />
        </Circle> */}
      </Group>
    </Canvas>
  );
};

export default memo(Hoga);

const styles = StyleSheet.create({
  canvas: {
    width: imageWidth,
    height: imageHeight,
    marginTop: 50,
    alignSelf: 'center',
  },
});
