const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let randomQ = []

let questions = [
    {
        question: '複寫紙是什麼類？',
        choice1: '廢紙類',
        choice2: '一般垃圾類',
        choice3: '紙容器類',
        choice4: '其他金屬類',
        answer: 2,
    },
    {
        question: '在"舊衣類"中，下列何者不可回收？',
        choice1: '西裝',
        choice2: '洋裝',
        choice3: '圍裙',
        choice4: '外套',
        answer: 3,
    },
    {
        question: '下列何者為不可回收物？',
        choice1: '木製音箱',
        choice2: '咖啡機',
        choice3: '傳真機',
        choice4: '電暖爐',
        answer: 1,
    },
    {
        question: '在"廢塑膠類"中，下列何者可回收？',
        choice1: '塑膠玩具',
        choice2: '安全帽',
        choice3: '膠水瓶',
        choice4: '塑膠繩',
        answer: 3,
    },
    {
        question: '在"廢玻璃類"中，下列何者不可回收？',
        choice1: '玻璃墊',
        choice2: '門窗玻璃',
        choice3: '鏡子',
        choice4: '裝可樂的玻璃瓶',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

randomQ = [...questions]
var item = randomQ[Math.floor(Math.random()*randomQ.length)];
function getRandomArrayElements(arr, count) { 
    var shuffld = arr.slice(0);
    var i = arr.length;
    var min = i - count;
    var temp;
    var index;
    while(i-- >min) {
        index = Math.floor((i+1) * Math.random());
        temp = shuffld[index];
        shuffld[index] = shuffld[i]
        shuffld[i] = temp;
    }
    return shuffld.slice(min)
}

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = getRandomArrayElements(randomQ, 4)
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()