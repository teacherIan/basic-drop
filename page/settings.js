export default {
  velocityIterations: 20,
  ballSize: parseInt(localStorage.getItem('ballSize')) || 10,
  sleepThreshold: 85,
  pearlMax: parseInt(localStorage.getItem('pearl')),
  rubyMax: parseInt(localStorage.getItem('ruby')),
  sapphireMax: parseInt(localStorage.getItem('sapphire')),
  amberMax: parseInt(localStorage.getItem('amber')),
  bounce: parseInt(localStorage.getItem('bounce')) || 0.7,
  friction: parseInt(localStorage.getItem('friction')) || 0.2,
  scaleFactor: 0.04,
  gameSpeed: parseInt(localStorage.getItem('interval')) || 16,
  rubyColor: 0xc11c22,
  amberColor: 0xe46725,
  sapphireColor: 0x1271b5,
  PearlColor: 0x000000,
  setStatic: 2000,
  rubyFinished: false,
  amberFinished: false,
  sapphireFinished: false,
  pearlFinished: false,
  largeGame: true,
};
