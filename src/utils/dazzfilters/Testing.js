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
const imageWidth = width * 0.9;
const imageHeight = height * 0.3;

const Testing = ({base64}) => {
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

  const fontError = useCallback(error => {
    console.log(error);
  }, []);

  const font = useFont(
    require('../../assets/fonts/digital-7.ttf'),
    imageHeight * 0.08,
    fontError,
  );

  const lutImage = useImage(require('./testing.png'));
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
    return `${month}   ${day} '${year}`;
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
          x={imageHeight * 0.7}
          y={0}
          color="#ff9081"
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

export default memo(Testing);

const styles = StyleSheet.create({
  canvas: {
    width: imageWidth,
    height: imageHeight,
    marginTop: 50,
    alignSelf: 'center',
  },
});
