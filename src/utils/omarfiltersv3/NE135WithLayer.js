import React, {memo, useMemo} from 'react';
import {
  ImageShader,
  Image,
  Shader,
  Skia,
  Group,
  Fill,
  Canvas,
  useImage,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');
const imageWidth = width;
const imageHeight = height * 0.8;

const NE135WithLayer = ({base64}) => {
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

  const lutImage = useImage(require('./8-135mm-ne.png'));
  const layerImage = useImage(require('./8-135mm-ne-layer.png'));

  if (base64.find(item => item === undefined)) {
    return null;
  }

  const capturedImageData1 = Skia.Data.fromBase64(base64[0]);
  const capturedImageData2 = Skia.Data.fromBase64(base64[1]);
  const capturedImage1 = Skia.Image.MakeImageFromEncoded(capturedImageData1);
  const capturedImage2 = Skia.Image.MakeImageFromEncoded(capturedImageData2);

  if (
    !capturedImage1 ||
    !capturedImage2 ||
    !shader ||
    !lutImage ||
    !layerImage
  ) {
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
          rx: 0,
          ry: 0,
        }}>
        <Group
          clip={{
            rect: {
              x: 0,
              y: 0,
              width: imageWidth,
              height: imageHeight * 0.5,
            },
            rx: 0,
            ry: 0,
          }}>
          <Fill />
          <Shader source={shader} uniforms={{}}>
            <ImageShader
              fit="cover"
              image={capturedImage1}
              rect={{
                x: 0,
                y: 0,
                width: imageWidth,
                height: imageHeight * 0.5,
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

        <Group
          clip={{
            rect: {
              x: 0,
              y: imageHeight * 0.5,
              width: imageWidth,
              height: imageHeight * 0.5,
            },
            rx: 0,
            ry: 0,
          }}>
          <Fill />
          <Shader source={shader} uniforms={{}}>
            <ImageShader
              fit="cover"
              image={capturedImage2}
              rect={{
                x: 0,
                y: imageHeight * 0.5,
                width: imageWidth,
                height: imageHeight * 0.5,
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

        <Image
          fit="fill"
          image={layerImage}
          rect={{
            x: 0,
            y: 0,
            width: imageWidth,
            height: imageHeight,
          }}
        />
      </Group>
    </Canvas>
  );
};

export default memo(NE135WithLayer);

const styles = StyleSheet.create({
  canvas: {
    width: imageWidth,
    height: imageHeight,
    alignSelf: 'center',
  },
});
