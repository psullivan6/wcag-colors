import { calcAPCA } from 'apca-w3';
import { colorParsley } from 'colorparsley';
import { formatHex, oklch } from 'culori';

const textColor = 'oklch(98.4% 0.019 200.873)';
const bgColor = 'oklch(30.2% 0.056 229.695)';

const textColorParsed = colorParsley(textColor);
const bgColorParsed = colorParsley(bgColor);

const textColorHex = formatHex(textColor);

const bgColorHex = formatHex(
  oklch({
    mode: 'oklch',
    l: bgColorParsed[0],
    c: bgColorParsed[1],
    h: bgColorParsed[2],
  })
);

console.log('textColorHex', textColorHex);

const scoreHex = calcAPCA(textColorHex, bgColorHex);
const scoreParsed = calcAPCA(textColorParsed, bgColorParsed);
const score = calcAPCA(textColor, bgColor);

console.log('scoreHex, score', scoreHex, score);
