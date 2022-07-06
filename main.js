let word = '';
let targetWord = 'force';
let gridLayout = document.querySelectorAll('.square-input');
gridLayout.forEach((childNode) => {
  childNode.addEventListener('input', focusOnNextKey);
});
document.getElementById('key-board').addEventListener('click', keyBoardEvents);
document.getElementById('1-1').focus();


let currentCellId = '1-1';
function keyBoardEvents(event) {
  document.getElementById(currentCellId).color = '#fff';
  document.getElementById(currentCellId).value = event.target.textContent;
  focusOnNextKey(null, currentCellId);
}
function focusOnNextKey(event = null, cellId = null) {
  let cellIndex = cellId ? cellId : event.target.getAttribute('id');
  let cellValue = cellId ? document.getElementById(cellId).value : event.target.value;
  word += cellValue;
  let [row, column] = cellIndex.split('-');
  if (column == 5) {
    let diffWords = checkWord();
    applyCellValidations(row, diffWords);
    row++;
    column = 1;
    word = '';
  } else {
    column++;
  };

  currentCellId = [row, column].join('-');
  document.getElementById(currentCellId).focus();
}
function checkWord() {
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
      let cell = document.getElementById(cellId);
      //apply background css
      cell.style.background = cellValidator.position ? 'GREEN' : '#c9b458';
    } else {
      let cellId1 = `${row}-${cellValidator.indexInTrial + 1}`;
      let cellId2 = `${row}-${cellValidator.lastIndexInTrial + 1}`;
      let cell2 = document.getElementById(cellId2);
      //apply background css
      cell2.style.background = cellValidator.position ? 'GREEN' : '#c9b458';
      let cell1 = document.getElementById(cellId1);
      //apply background css
      cell1.style.background = cellValidator.position ? 'GREEN' : '#c9b458';
    }

  })
}