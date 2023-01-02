import settings from './settings';

export const Experience = (houseContainer, houseText, houseColor, maxValue) => {
  const config = {
    type: Phaser.AUTO,
    powerPreference: 'high-performance',
    width: houseContainer.clientWidth,
    height: houseContainer.clientHeight,
    backgroundColor: '#ffffff',
    parent: houseContainer,
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'matter',
      matter: {
        enableSleeping: true,
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
    div.innerText = houseText;
    game.domContainer.appendChild(div);

    this.matter.world.setBounds(
      0,
      0,
      houseContainer.clientWidth,
      houseContainer.clientHeight,
      32,
      true,
      true,
      false,
      true
    );

    let max = maxValue;
    const interval = setInterval(() => {
      if (divOpacity > 0) {
        divOpacity -= 0.02;
        div.style.opacity = divOpacity;
      } else {
        // div.style.display = 'none';
      }
      if (max > 0) {
        let circleOne = this.add.circle(
          Phaser.Math.Between(
            settings.ballSize + 50,
            houseContainer.clientWidth - settings.ballSize - 50
          ),
          Phaser.Math.Between(-100, 0),
          settings.ballSize,
          houseColor
        );

        let circleTwo = this.add.circle(
          Phaser.Math.Between(
            settings.ballSize + 50,
            houseContainer.clientWidth - settings.ballSize - 50
          ),
          Phaser.Math.Between(-100, 0),
          settings.ballSize * 2,
          houseColor
        );

        if (largeGame) {
          let circleThree = this.add.circle(
            Phaser.Math.Between(
              settings.ballSize + 50,
              houseContainer.clientWidth - settings.ballSize - 50
            ),
            Phaser.Math.Between(-100, 0),
            settings.ballSize * 3,
            houseColor
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
        settings.gamesFinished += 1;
        let styleOpacity = 0;
        let scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score');
        scoreDiv.innerText = maxValue;
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
    }, settings.gameSpeed);
  }
};
