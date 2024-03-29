export default {
  velocityIterations: 1,
  ballSize: parseInt(localStorage.getItem('ballSize')) || 10,
  sleepThreshold: 10,
  pearlMax: parseInt(localStorage.getItem('pearl')),
  rubyMax: parseInt(localStorage.getItem('ruby')),
  sapphireMax: parseInt(localStorage.getItem('sapphire')),
  amberMax: parseInt(localStorage.getItem('amber')),
  bounce: 1,
  friction: 0.5,
  scaleFactor: 0,
  gameSpeed: 150,
  rubyColor: 0xc11c22,
  amberColor: 0xe46725,
  sapphireColor: 0x1271b5,
  PearlColor: 0x000000,
  setStatic: 3500,
  rubyFinished: false,
  amberFinished: false,
  sapphireFinished: false,
  pearlFinished: false,
  largeGame: true,
  scaleIntervalValue: 1000,
  gamesFinished: 0,
};
