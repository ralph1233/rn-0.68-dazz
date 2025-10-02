import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import {
  ImageShader,
  Shader,
  Skia,
  Group,
  Fill,
  Canvas,
} from '@shopify/react-native-skia';
import {base64 as arabicaLutBase64} from './LUTs/arabica';
import {base64 as avaLutBase64} from './LUTs/ava';
import {base64 as azraelLutBase64} from './LUTs/azrael';
import {base64 as bwLutBase64} from './LUTs/b&w';
import {base64 as coldShadeLutBase64} from './LUTs/coldShade';
import {base64 as grfLutBase64} from './LUTs/grf';
import {base64 as sunsetLutBase64} from './LUTs/sunset';
import {base64 as vintage1LutBase64} from './LUTs/vintage1';
import {base64 as vintage2LutBase64} from './LUTs/vintage2';
import {base64 as vintageVibeLutBase64} from './LUTs/vintageVibe';
import {base64 as imageBase64} from './image';

const {height} = Dimensions.get('window');
const luts = [
  {
    name: 'arabica',
    base64: arabicaLutBase64,
  },
  {
    name: 'ava',
    base64: avaLutBase64,
  },
  {
    name: 'azrael',
    base64: azraelLutBase64,
  },
  {
    name: 'bw',
    base64: bwLutBase64,
  },
  {
    name: 'coldShade',
    base64: coldShadeLutBase64,
  },
  {
    name: 'grf',
    base64: grfLutBase64,
  },
  {
    name: 'sunset',
    base64: sunsetLutBase64,
  },
  {
    name: 'vintage1',
    base64: vintage1LutBase64,
  },
  {
    name: 'vintage2',
    base64: vintage2LutBase64,
  },
  {
    name: 'vintageVibe',
    base64: vintageVibeLutBase64,
  },
];

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

const data = Skia.Data.fromBase64(imageBase64);
const capturedImage = Skia.Image.MakeImageFromEncoded(data);
const imageWidth = 200;
const imageHeight = 200;

class App extends PureComponent {
  renderLut = lut => {
    const lutData = Skia.Data.fromBase64(lut.base64);
    const lutImage = Skia.Image.MakeImageFromEncoded(lutData);

    return (
      <View key={lut.name} style={styles.lutContainer}>
        <Text style={styles.lutName}>{lut.name}</Text>
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
          </Group>
        </Canvas>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.originalImageText}>Original Image</Text>
          <Image source={require('./image.jpg')} style={styles.canvas} />
          {luts.map(this.renderLut)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lutContainer: {
    alignItems: 'center',
  },
  lutName: {
    marginVertical: 10,
  },
  originalImageText: {
    marginVertical: 10,
  },

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  canvas: {
    width: imageWidth,
    height: imageHeight,
  },
});

export default App;
