export const allColors = {
    strikeMaster: "#8C6584",
    slateGray: "#65758C",
    Ceruleun: "#00BCF8",
    BlueChill: "#0B90AD",
    Flirt: "#BF0496",
    MountainMeadow: "#19AC5D",
    ThunderBird: "#BF1D1D",
    TawnyPort: "#6F1D5D",
    BurntSienna: "#e7a14df5",
    MonteCarlo: "#89D4D0",
    Rose: "#EC569F",
    MandyPink: "#F6C0BE",
    Danube: "#529DC9",
    Perfume: "#C7BCF5",
    Sark: "#527A81",
    Orchid: "#B099A3",
    Emerald: "#50C878",
    Coral: "#FF7F50",
    Mulberry: "#C54B8C",
    Teal: "#008080",
    Lavender: "#E6E6FA",
    Mint: "#3EB489",
    Maroon: "#800000",
    Olive: "#808000",
    Sienna: "#A0522D",
    Indigo: "#4B0082",
    Gold: "#FFD700",
    Cyan: "#00FFFF",
    Fuchsia: "#FF00FF",
    Lime: "#00FF00",
    Navy: "#000080",
    //updated colors
    LavenderBlue: '#E5E4F2',
    SteelBlue: '#A1D4DF',
    Mauvelous: '#E3C8DB',
    PeachPuff: '#F6CDC1',
    PowderBlue: '#B3D0EE',
    CameoBrown: '#E6D5C3',
    Melon: '#EAA3B5',
    CadetBlue: '#4EC3C3',
    AntiqueBrass: '#D8AD9C',
    MaximumYellowRed: '#F4EFBA',
    PeriwinkleGray: '#CCCBD9',
    PaleRobinEggBlue: '#BDCCB5',
    Silver: '#B6B6B6',
    PaleChestnut: '#D6C7C7',
    Khaki: '#CAB17A',
    BrinkPink: '#FE999D',
  };
  export const colors:any = {
    // LavenderBlue: '#E5E4F2',
    SteelBlue: '#A1D4DF',
    Mauvelous: '#E3C8DB',
    PeachPuff: '#F6CDC1',
    PowderBlue: '#B3D0EE',
    CameoBrown: '#E6D5C3',
    Melon: '#EAA3B5',
    CadetBlue: '#4EC3C3',
    AntiqueBrass: '#D8AD9C',
    MaximumYellowRed: '#F4EFBA',
    PeriwinkleGray: '#CCCBD9',
    PaleRobinEggBlue: '#BDCCB5',
    Silver: '#B6B6B6',
    PaleChestnut: '#D6C7C7',
    Khaki: '#CAB17A',
    BrinkPink: '#FE999D',
    //light recent colors
    Ceruleun: "#00BCF8",
    BlueChill: "#0B90AD",
    MountainMeadow: "#19AC5D",
    MonteCarlo: "#89D4D0",
    Orchid: "#B099A3",
    Emerald: "#50C878",
    Lavender: "#E6E6FA",
    Mint: "#3EB489",
    Olive: "#808000",
    Gold: "#FFD700",
    Cyan: "#00FFFF",
    Fuchsia: "#FF00FF",
    Lime: "#00FF00",
  };
  
  export const toneColors = {
    constructive: "#4adb95",
    corrective: "#754ef0",
    warning: "#ff6d6d",
    timeManagement: "#f5cc60",
    human: "#64b4c9",
    other: "#64b4c9",
    frustrated: "#ff6d6d",
  };
  
//   export const defaultColor = "LavenderBlue";
//   export function getColorByHexValue(value) {
//     const colorKey = Object.keys(allColors).find((key) => allColors[key] === value);
//     return colorKey || defaultColor;
//   }
// Function to get an array of 16 random color keys excluding the provided color
export const getRandomColors = (currentColor:any) => {
    const colorKeys = Object.keys(colors);
    const randomColorKeys:any = [];
  
    while (randomColorKeys.length < 16) {
      const randomIndex = Math.floor(Math.random() * colorKeys.length);
      const randomKey = colorKeys[randomIndex];
  
      if (!randomColorKeys.includes(randomKey) && colors[randomKey] !== currentColor) {
        randomColorKeys.push(randomKey);
      }
    }
  
    return randomColorKeys.map((key:any) => colors[key]);
  };
  