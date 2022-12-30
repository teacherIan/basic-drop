import './gameStyle.css';
import * as Phaser from 'phaser';
import settings from './settings.js';
import music from '../assets/alexander-nakarada-superepic.mp3';
import { Experience } from './Experience';
const container = document.querySelector('.game-container');
const startButton = document.querySelector('.start-button');
const loadingText = document.querySelector('.loading-text');

let total = 0;
fetch('https://house-points.onrender.com/get')
  .then((response) => response.json())
  .then(
    (data) => {
      data.forEach((house) => {
        loadingText.style.display = 'none';
        total = total + house.points;

        if (house.house == 'Ruby') {
          settings.rubyMax = house.points;
        }
        if (house.house == 'Sapphire') {
          settings.sapphireMax = house.points;
        }
        if (house.house == 'Amber') {
          settings.amberMax = house.points;
        }
        if (house.house == 'Pearl') {
          settings.pearlMax = house.points;
        }
      });
      if (total < 1000) {
        settings.gameSpeed = 200;
        settings.ballSize = 12;
        settings.scaleFactor = 0.01;
        settings.largeGame = false;
      }
      if (total > 1000) {
        settings.gameSpeed = 200;
        settings.ballSize = 6.8;
        settings.scaleFactor = 0.01;
      }
      if (total > 2000) {
        settings.gameSpeed = 150;
        settings.ballSize = 6.4;
        settings.scaleFactor = 0.01;
      }
      if (total > 3000) {
        settings.gameSpeed = 120;
        settings.ballSize = 5.5;
        settings.scaleFactor = 0.01;
      }
      if (total > 4000) {
        settings.gameSpeed = 110;
        settings.ballSize = 5;
        settings.scaleFactor = 0.02;
      }
      if (total > 5000) {
        settings.gameSpeed = 100;
        settings.ballSize = 4.7;
        settings.scaleFactor = 0.05;
      }
      if (total > 6000) {
        settings.gameSpeed = 70;
        settings.ballSize = 4.3;
        settings.scaleFactor = 0.05;
      }
      startButton.style.display = 'block';
    },
    (err) => {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  );

startButton.addEventListener('click', () => {
  if (container.requestFullscreen) {
    container.requestFullscreen();
    startButton.style.display = 'none';
  }

  //
  setTimeout(() => {
    //Amber Experience
    Experience(
      document.querySelector('.amberContainer'),
      'Amber',
      settings.amberColor,
      settings.amberMax
    );
    Experience(
      document.querySelector('.pearlContainer'),
      'Pearl',
      '#000000',
      settings.pearlMax
    );
    Experience(
      document.querySelector('.rubyContainer'),
      'Ruby',
      settings.rubyColor,
      settings.rubyMax
    );
    Experience(
      document.querySelector('.sapphireContainer'),
      'Sapphire',
      settings.sapphireColor,
      settings.sapphireMax
    );
  }, 300);

  startButton.style.cursor = 'default';
  let audio = new Audio(music);
  audio.play();
});

let characters = ['🥳', '🎉', '✨'];

let confetti = new Array(80)
  .fill()
  .map((_, i) => {
    return {
      character: characters[i % characters.length],
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      r: 0.1 + Math.random() * 1,
    };
  })
  .sort((a, b) => a.r - b.r);

let items = [];
confetti.forEach((item, index) => {
  let divItem = document.createElement('div');
  divItem.classList.add('confetti');
  divItem.style.left = item.x + '%';
  divItem.style.top = item.y + '%';
  divItem.style.transform = `scale(${item.r})`;
  divItem.innerHTML = item.character;
  container.appendChild(divItem);
  items.push(divItem);
});

function loop() {
  requestAnimationFrame(loop);
  if (settings.gamesFinished == 4) {
    setTimeout(() => {
      confetti = confetti.map((emoji) => {
        emoji.y += 0.7 * emoji.r;
        if (emoji.y > 120) emoji.y = -20;
        return emoji;
      });

      items.forEach((divItem, index) => {
        divItem.style.left = confetti[index].x + '%';
        divItem.style.top = confetti[index].y + '%';
        divItem.style.transform = `scale(${confetti[index].r})`;
      });
    }, 3000);
  }
}

loop();
