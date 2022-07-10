let word = '';
let result = '';
let sampleWords = ["which", "there", "their", "about", "would", "these", "other", "words", "could", "write", "first", "water", "after", "where", "right", "think", "three", "years", "place", "sound", "great", "again", "still", "every", "small", "found", "those", "never", "under", "might", "while", "house", "world", "below", "asked", "going", "large", "until", "along", "shall", "being", "often", "earth", "began", "since", "study", "night", "light", "above", "paper", "parts", "young", "story", "point", "times", "heard", "whole", "white", "given", "means", "music", "miles", "thing", "today", "later", "using", "money", "lines", "order", "group", "among", "learn", "known", "space", "table", "early", "trees", "short", "hands", "state", "black", "shown", "stood", "front", "voice", "kinds", "makes", "comes", "close", "power", "lived", "vowel", "taken", "built", "heart", "ready", "quite", "class", "bring", "round", "horse", "shows", "piece", "green", "stand", "birds", "start", "river", "tried", "least", "field", "whose", "girls", "leave", "added", "color", "third", "hours", "moved", "plant", "doing", "names", "forms", "heavy", "ideas", "cried", "check", "floor", "begin", "woman", "alone", "plane", "spell", "watch", "carry", "wrote", "clear", "named", "books", "child", "glass", "human", "takes", "party", "build", "seems", "blood", "sides", "seven", "mouth", "solve", "north", "value", "death", "maybe", "happy", "tells", "gives", "looks", "shape", "lives", "steps", "areas", "sense", "speak", "force", "ocean", "speed", "women", "metal", "south", "grass", "scale", "cells", "lower", "sleep", "wrong", "pages", "ships", "needs", "rocks", "eight", "major", "level", "total", "ahead", "reach", "stars", "store", "sight", "terms", "catch", "works", "board", "cover", "songs", "equal", "stone", "waves", "guess", "dance", "spoke", "break", "cause", "radio", "weeks", "lands", "basic", "liked", "trade", "fresh", "final", "fight", "meant", "drive"]
let index = Math.floor((Math.random() * sampleWords.length) + 1);
let targetWord = sampleWords[index];
console.log(targetWord);
let gridLayout = document.querySelectorAll('.square-input');
gridLayout.forEach((childNode) => {
  childNode.addEventListener('input', focusOnNextKey);
});
document.getElementById('key-board').addEventListener('click', keyBoardEvents);
document.getElementById('1-1').focus();
document.getElementById('enter').addEventListener('click', enterOrDeletekeyup);
document.getElementById('delete').addEventListener('click', enterOrDeletekeyup);
let currentCellId = '1-1';
function keyBoardEvents(event) {
  if (event.target.textContent === 'ENTER' || event.target.textContent === 'DELETE') {
    return
  }
  document.getElementById(currentCellId).color = '#fff';
  document.getElementById(currentCellId).value = event.target.textContent;
  focusOnNextKey(null, currentCellId);
}
function focusOnNextKey(event = null, cellId = null) {
  let cellIndex = cellId ? cellId : event.target.getAttribute('id');
  let cellValue = cellId ? document.getElementById(cellId).value : event.target.value;
  word += cellValue;
  let [row, column] = cellIndex.split('-');
  if (column < 5) {
    column++;
    currentCellId = [row, column].join('-');
    document.getElementById(currentCellId).focus();
  }
}
function checkWord() {
  word = word.toLowerCase();
  return [...word]
    .filter((charc) => { return [...targetWord].includes(charc) })
    .map((elem) => {
      return {
        character: elem,
        position: [...targetWord].indexOf(elem) === [...word].indexOf(elem),
        indexInTrial: [...word].indexOf(elem),
        lastIndexInTrial: [...word].lastIndexOf(elem)
      }
    }
    )
}
function applyCellValidations(row, validatorArr) {
  validatorArr.forEach((cellValidator) => {
    //create cell ids
    if (cellValidator.indexInTrial === cellValidator.lastIndexInTrial) {
      let cellId = `${row}-${cellValidator.indexInTrial + 1}`;
      //apply background css and animate
      applyColorAndAnimations(cellId, cellValidator.position)
    } else {
      let cellId1 = `${row}-${cellValidator.indexInTrial + 1}`;
      let cellId2 = `${row}-${cellValidator.lastIndexInTrial + 1}`;
      //apply background css and animate
      applyColorAndAnimations(cellId1, cellValidator.position);
      applyColorAndAnimations(cellId2, cellValidator.position)

    }

  });
  result = validatorArr.length == 5 && validatorArr.every(elem => { return elem.position == true });
  if (result) {
    // show success model window inject the same in dom;
    let modal = document.querySelector('.modal');
    modal.style.display = "block";
    modal.innerText = 'Congratulations!! The word is correct.'
  };
}

function enterOrDeletekeyup(event) {
  if (event.target.textContent === 'ENTER') {
    let diffWords = checkWord();
    let [row, column] = currentCellId.split('-');

    row++;
    column = 1;
    word = '';
    currentCellId = [row, column].join('-');
    applyCellValidations(row - 1, diffWords);
    if (row < 7) {
      document.getElementById(currentCellId).focus();
    }
    else if (!result) {
      //alert('Game Over! The correct word is ', targetWord);
      let modal = document.querySelector('.modal');
      modal.style.display = "block";
      modal.innerText = 'Game Over! The correct word is ' + targetWord;
    }

  }
  if (event.target.textContent === 'DELETE') {
    if (document.getElementById(currentCellId).value == '') {
      let [row, column] = currentCellId.split('-');
      column--;
      word = word.slice(0, -1);
      currentCellId = [row, column].join('-');
      document.getElementById(currentCellId).value = '';
      document.getElementById(currentCellId).focus();
    } else {
      document.getElementById(currentCellId).value = '';
    }
  }
}

function applyColorAndAnimations(cellId, isPositionTrue) {
  let cell = document.getElementById(cellId);
  let cellValue = cell.value;
  cell.value = null;
  cell.classList.add('square-flip');
  cell.style.background = isPositionTrue ? 'GREEN' : '#c9b458';
  cell.value = cellValue;
}

