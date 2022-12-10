import settings from './settings';
const amberContainer = document.querySelector('.amberContainer');

const startButton = document.querySelector('.start-button');
let clicked = true;
startButton.addEventListener('click', () => {
  clicked = true;
});

const config = {
  type: Phaser.AUTO,
  powerPreference: 'high-performance',
  width: amberContainer.clientWidth,
  height: amberContainer.clientHeight,
  backgroundColor: '#ffffff',
  parent: amberContainer,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'matter',
    matter: {
      enableSleeping: true,
      velocityIterations: settings.velocityIterations,
    },
  },
  scene: {
    create: create,
  },
};
let game = new Phaser.Game(config);
let largeGame = settings.largeGame;

function create() {
  let divOpacity = 1;
  let circleArray = [];
  let div = document.createElement('div');
  div.classList.add('house-header');
  div.innerText = 'Amber';
  game.domContainer.appendChild(div);

  this.matter.world.setBounds(
    0,
    0,
    amberContainer.clientWidth,
    amberContainer.clientHeight,
    32,
    true,
    true,
    false,
    true
  );

  let max = settings.amberMax;
  const interval = setInterval(() => {
    if (clicked) {
      if (divOpacity > 0) {
        divOpacity -= 0.01;
        div.style.opacity = divOpacity;
      }
      if (max > 0) {
        let circleOne = this.add.circle(
          Phaser.Math.Between(
            settings.ballSize + 50,
            amberContainer.clientWidth - settings.ballSize - 50
          ),
          Phaser.Math.Between(-100, 0),
          settings.ballSize,
          settings.amberColor
        );

        let circleTwo = this.add.circle(
          Phaser.Math.Between(
            settings.ballSize + 50,
            amberContainer.clientWidth - settings.ballSize - 50
          ),
          Phaser.Math.Between(-100, 0),
          settings.ballSize * 2,
          settings.amberColor
        );

        if (largeGame) {
          let circleThree = this.add.circle(
            Phaser.Math.Between(
              settings.ballSize + 50,
              amberContainer.clientWidth - settings.ballSize - 50
            ),
            Phaser.Math.Between(-100, 0),
            settings.ballSize * 3,
            settings.amberColor
          );
          this.matter.add.gameObject(circleThree);
          circleThree.sleepThreshold = settings.sleepThreshold;
          circleThree.setBounce(settings.bounce);
          circleThree.setFriction(settings.friction);
          setInterval(() => {
            circleThree.setStatic(true);
          }, 5000);
        }

        if (largeGame) {
          max = max - 6;
        } else {
          max = max - 3;
        }

        this.matter.add.gameObject(circleOne);
        this.matter.add.gameObject(circleTwo);

        setInterval(() => {
          circleOne.setStatic(true);
          circleTwo.setStatic(true);
        }, 5000);

        circleOne.sleepThreshold = settings.sleepThreshold;
        circleTwo.sleepThreshold = settings.sleepThreshold;

        circleOne.setBounce(settings.bounce);
        circleOne.setFriction(settings.friction);

        circleTwo.setBounce(settings.bounce);
        circleTwo.setFriction(settings.friction);

        circleArray.push(circleOne);
        circleArray.push(circleTwo);
      } else {
        settings.amberFinished = true;
        let styleOpacity = 0;
        let scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score');
        scoreDiv.innerText = settings.amberMax;
        game.domContainer.appendChild(scoreDiv);
        scoreDiv.style.color = '#ffffff';
        div.style.color = '#ffffff';
        scoreDiv.style.opacity = styleOpacity;

        let scaleFactor = 1;
        let scaleInterval = setInterval(() => {
          if (styleOpacity <= 1) {
            styleOpacity += 0.1;
            scoreDiv.style.opacity = styleOpacity;
          }
          scaleFactor += settings.scaleFactor;
          for (let i = 0; i < circleArray.length; i++) {
            circleArray[i].setScale(scaleFactor, scaleFactor);
          }
        }, 60);
        clearInterval(interval);
        setTimeout(() => {
          clearInterval(scaleInterval);
        }, settings.scaleIntervalValue);

        setTimeout(() => {
          circleArray.forEach((circle) => {
            circle.setStatic(true);
          });
        }, settings.setStatic);
      }
    }
  }, settings.gameSpeed);
}
