const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector("[data-final-column]");
const cpuScoreSpan = document.querySelector("[data-cpu-score]")
const playerScoreSpan = document.querySelector("[data-player-score]")
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissor'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissor',
        emoji: '✌',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', (e) => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = getComputerChoice()
    const yourWinner = isWinner(selection, computerSelection)
    const cpuWinner = isWinner(computerSelection, selection)
    console.log(computerSelection);

    addSelectionResult(computerSelection, cpuWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) incrementScore(playerScoreSpan)
    if (cpuWinner) incrementScore(cpuScoreSpan);

}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}


function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner (selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}

