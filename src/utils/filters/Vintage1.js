import React from 'react';
import {
  ImageShader,
  Shader,
  Skia,
  Group,
  Fill,
} from '@shopify/react-native-skia';
import {base64 as lutBase64} from '../LUTs/vintage1';
import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs';

const {height} = Dimensions.get('window');

export const Vintage1 = async (photoUrl, imageWidth, imageHeight) => {
  const shader = Skia.RuntimeEffect.Make(`
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
  `);

  const lutData = Skia.Data.fromBase64(lutBase64);
  const lutImage = Skia.Image.MakeImageFromEncoded(lutData);
  const base64 = await RNFS.readFile(photoUrl, 'base64');
  const data = Skia.Data.fromBase64(base64);
  const capturedImage = Skia.Image.MakeImageFromEncoded(data);

  if (!capturedImage || !shader || !lutImage) {
    return null;
  }

  return (
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
    </Group>
  );
};
