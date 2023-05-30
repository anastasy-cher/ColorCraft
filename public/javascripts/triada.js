// Función para generar una paleta de colores utilizando la regla de triada
function generarPaletaTriada() {
    // Generar un color base aleatorio
    const colorBase = generarColorAleatorio();
    const paleta = [colorBase];
  
    // Convertir el color base a componentes RGB
    const baseRGB = hexToRGB(colorBase);
  
    // Calcular los otros tres colores de la paleta utilizando la regla de triada
    const color1 = calcularTriada(baseRGB);
    const color2 = calcularTriada(rotarHue(baseRGB, 120));
    const color3 = calcularTriada(rotarHue(baseRGB, 240));
  
    paleta.push(color1, color2, color3);
  
    return paleta;
  }
  
  // Función para generar un color hexadecimal aleatorio
  function generarColorAleatorio() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + ("000000" + color).slice(-6);
  }
  
  // Función para convertir un color hexadecimal a componentes RGB
  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }
  
  // Función para calcular un color triada a partir de un color base
  function calcularTriada(baseRGB) {
    const hsl = RGBtoHSL(baseRGB);
    const hue = (hsl.h + 180) % 360; // Sumar 180 grados al matiz para obtener el color triada
    const triadaRGB = HSLtoRGB({ h: hue, s: hsl.s, l: hsl.l });
    return RGBtoHex(triadaRGB);
  }
  
  // Función para rotar el matiz de un color en grados específicos
  function rotarHue(rgb, degrees) {
    const hsl = RGBtoHSL(rgb);
    const hue = (hsl.h + degrees) % 360;
    return HSLtoRGB({ h: hue, s: hsl.s, l: hsl.l });
  }
  
  // Función para convertir componentes RGB a HSL
  function RGBtoHSL(rgb) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
  
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // El matiz y la saturación son 0 para tonos de gris
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
  
      h /= 6;
    }
  
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  
  // Función para convertir componentes HSL a RGB
  function HSLtoRGB(hsl) {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
  
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // Tonos de gris, todos los componentes tienen el mismo valor
    } else {
      const hueToRGB = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = Math.round(hueToRGB(p, q, h + 1 / 3) * 255);
      g = Math.round(hueToRGB(p, q, h) * 255);
      b = Math.round(hueToRGB(p, q, h - 1 / 3) * 255);
    }
  
    return { r, g, b };
  }
  
  // Función para convertir componentes RGB a color hexadecimal
  function RGBtoHex(rgb) {
    const { r, g, b } = rgb;
    const color = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + ("000000" + color).slice(-6);
  }
module.exports = generarPaletaTriada