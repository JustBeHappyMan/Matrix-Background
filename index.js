window.onload = () => {
  // set symbols array for matrix words
  const symbols = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

  // set amout of lines
  const H = window.innerHeight;
  const W = window.innerWidth;
  const lines = Math.floor(W / 50);

  // set length of the word of 15 - 30 symbols
  const setLength = () => {
    return Math.round(Math.random() * 15 + 15);
  };

  // set random symbol from symbols array
  const setSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  // set random duration in range
  const setDuration = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateWord = () => {
    const word = {
      length: setLength(), // length
      height: 0, // height
      speed: setDuration(5000, 10000), // word animation duration
      delay: setDuration(0, 5000), // word animation delay
      arr: [], // array of symbols
      fill() {
        this.arr = new Array(this.length)
          .fill("")
          .map((el) => (el = setSymbol()));
        return this;
      },
      setHeight() {
        this.height = this.length * 20;
        return this;
      },
    };

    return word.setHeight().fill();
  };

  const animateWord = (word) => {
    const wordContainer = document.createElement("div");
    wordContainer.style.transform = `translateY(-${word.height}px)`;
    wordContainer.className = "word";

    for (let i = 0; i < word.length; i++) {
      const letterContainer = document.createElement("span");
      letterContainer.className = "letter";
      letterContainer.innerText = word.arr[i];

      letterContainer.animate(
        [
          { transform: "rotateY(0deg)" },
          { opacity: 0.8, offset: 0.25 },
          { opacity: 1, offset: 0.5 },
          { opacity: 0.5, offset: 0.75 },
          { transform: "rotateY(360deg)" },
        ],
        {
          duration: setDuration(2000, 3000),
          iterations: Infinity,
        }
      );
      wordContainer.appendChild(letterContainer);
    }

    wordContainer.animate(
      [
        { transform: `translateY(-${word.height}px)` },
        { transform: `translateY(${H}px)` },
      ],
      {
        duration: word.speed,
        delay: word.delay,
        iterations: Infinity,
      }
    );

    return wordContainer;
  };

  const generateMatrix = () => {
    const matrixContainer = document.getElementById("matrix");

    matrixContainer.innerHTML = "";
    for (let i = 0; i < lines; i++) {
      const word = generateWord();
      const wordContainer = animateWord(word);

      matrixContainer.appendChild(wordContainer);
    }
    return matrixContainer;
  };

  generateMatrix();
};
