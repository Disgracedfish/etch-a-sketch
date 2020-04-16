const container = document.querySelector('#container');
const clearButton = document.querySelector('#clearButton');
const newGridButton = document.querySelector('#newGridButton');
const removeGridButton = document.querySelector('#removeGridButton');
const colorSelection = document.getElementById('color-selector');
const eraserButton = document.getElementById('eraser')

const backgroundColor = '#dbd9d9';
var pixelsPerSide = 40;

function makeGrid() {
    pixelSize = (720/pixelsPerSide);
    for (let i=1; i<=pixelsPerSide;i++) {
        var row = document.createElement('div');
        row.className = 'row';
        for (let j=1; j<=pixelsPerSide; j++) {
            var gridSquare = document.createElement('div');
            gridSquare.classList += 'grid-square';
            gridSquare.style.width = pixelSize +'px';
            gridSquare.style.height = pixelSize +'px';
            gridSquare.style.backgroundColor = backgroundColor;
            addHoverListener(gridSquare)
            row.appendChild(gridSquare);
        }
        container.appendChild(row);
    }
}

function clearGrid() {
    let squares = document.getElementsByClassName('grid-square');
    for (i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = backgroundColor;
   }
}

function changeColor(e) {
    if (e.shiftKey) {
        e.target.style.backgroundColor = colorSelection.value;}
}

function resetColor(e) {
    let testColorDiv = document.createElement('div');
    testColorDiv.style.backgroundColor = backgroundColor;
    if (e.target.style.backgroundColor === testColorDiv.style.backgroundColor) {
        e.target.style.backgroundColor = colorSelection.value;
    } else {
        testColorDiv.style.backgroundColor = colorSelection.value;
        if (e.target.style.backgroundColor === testColorDiv.style.backgroundColor) {
                e.target.style.backgroundColor = backgroundColor;
        } else {
            e.target.style.backgroundColor = colorSelection.value;
        }
    }
}

function addHoverListener(element) {
    element.addEventListener('mouseover', changeColor);
    element.addEventListener('click', resetColor)
}

function removeTable() {
    let squares = document.getElementsByClassName('grid-square');
    while (squares.length >0) {
        squares[0].parentNode.removeChild(squares[0]);
    }
}

function newGrid() {
    userValue = prompt('how many pixels per side? ');
    if(!userValue) {
        return;}
    else {
        pixelsPerSide = userValue;
        removeTable();
        makeGrid();}
}

function toggleGrid(e) {
    let squares  = document.getElementsByClassName('grid-square');
    for (i=0; i<squares.length;i++) {
        squares[i].classList.toggle('noGrid');
    }
    if (e.target.textContent === 'Remove Gridlines') {
        e.target.textContent = 'Add Gridlines';
    } else {
        e.target.textContent = 'Remove Gridlines';
    }
}

// add click event listeners to buttons
clearButton.addEventListener('click', clearGrid);
newGridButton.addEventListener('click', newGrid);
removeGridButton.addEventListener('click', toggleGrid);
eraserButton.addEventListener('click', function(e) {colorSelection.value = backgroundColor;})

// initialize app on first visit
makeGrid();
