// Session/Break Container
const sessionMinus = document.querySelector('.session-minus')
const sessionPlus = document.querySelector('.session-plus')
const breakMinus = document.querySelector('.break-minus')
const breakPlus = document.querySelector('.break-plus')
const sessionValue = document.querySelector('.session-value')
const breakValue = document.querySelector('.break-value')
const defaultValue = document.querySelector('.default-value')

let svalue
let bvalue

sessionMinus.addEventListener('click', () => {
    svalue = Number(sessionValue.innerHTML)
    svalue <= 20 ? '' : (sessionValue.innerHTML = svalue - 1)
})

sessionPlus.addEventListener('click', () => {
    svalue = Number(sessionValue.innerHTML)
    svalue >= 30 ? '' : (sessionValue.innerHTML = svalue + 1)
})

breakMinus.addEventListener('click', () => {
    bvalue = Number(breakValue.innerHTML)
    bvalue <= 4 ? '' : (breakValue.innerHTML = bvalue - 1)
})

breakPlus.addEventListener('click', () => {
    bvalue = Number(breakValue.innerHTML)
    bvalue >= 6 ? '' :(breakValue.innerHTML = bvalue + 1)
})

defaultValue.addEventListener('click', () => {
    breakValue.innerHTML = 5
    sessionValue.innerHTML = 25
})

// Clock Container
const play = document.querySelector('.fa-play')
const pause = document.querySelector('.fa-pause')
const refresh = document.querySelector('.fa-refresh')
const stopp = document.querySelector('.fa-stop')
const display = document.querySelector('.timer')
const dot = document.querySelectorAll('.dot')

let startingMinutes
let time
let intervalo = null
let isPaused = false
let isPlaying = false
let isBreak = false
let timesRepeat = 0

play.addEventListener('click', () => {
    if (isPlaying == true) {
    } else if (isPaused == false){
        startingMinutes = Number(sessionValue.innerHTML)
        time = startingMinutes * 60
        intervalo = setInterval(countdownTimer , 1000)
    } else if(isPaused == true) {
        intervalo = setInterval(countdownTimer , 1000)
    }
    isPlaying = true 
    display.classList.add('timer-green')
})

pause.addEventListener('click', () => {
    isPaused = true
    isPlaying = false
    clearInterval(intervalo)
})

stopp.addEventListener('click', () => {
    isPaused = false
    isPlaying = false
    timesRepeat = 0
    dotRemove()
    clearInterval(intervalo)
    const minutes = Number(sessionValue.innerHTML)
    display.innerHTML = `${minutes}:00`
    display.classList.remove('timer-green')
    display.classList.remove('timer-yellow')
})

refresh.addEventListener('click', () => {
    isPaused = false
    isPlaying = false
    timesRepeat = 0
    clearInterval(intervalo)

    if(isBreak == false) {
        const minutes = Number(sessionValue.innerHTML)
        display.innerHTML = `${minutes}:00`
    } else {
        const minutes = Number(breakValue.innerHTML)
        display.innerHTML = `${minutes}:00`
    }
})

function countdownTimer(){
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.innerHTML = `${minutes}:${seconds}`;
    time !== 0 ? time-- : time;
    
    dotDone()

    if(isBreak == false) {
        breakTime();
        display.classList.remove('timer-yellow')
    } else {
        replayTime();
        display.classList.add('timer-yellow')
    }
}

function breakTime() {
    if(display.innerHTML == '0:00') {
        clearInterval(intervalo)
        startingMinutes = Number(breakValue.innerHTML)
        time = startingMinutes * 60
        intervalo = setInterval(countdownTimer , 1000)
        isBreak = true
    }
}

function replayTime() {
    if(display.innerHTML == '0:00') {
        clearInterval(intervalo)
        startingMinutes = Number(sessionValue.innerHTML)
        time = startingMinutes * 60
        intervalo = setInterval(countdownTimer , 1000)
        isBreak = false
        timesRepeat +=1
    }
}

function dotDone() {
    for(var i=0; i<4 ;i++)
        if(i == timesRepeat) {
            dot[i].classList.add('dotDone')
        }
} 

function dotRemove() {
    dot.forEach((num) => {
        num.classList.remove('dotDone')
    })
}

const configButton = document.querySelector('.fa-wrench')
const hideConfig = document.querySelector('.config')

configButton.addEventListener('click', () => {
    hideConfig.classList.toggle('config-display')
})


