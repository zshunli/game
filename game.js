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
    },
    {
        question: '下列何者可回收？',
        choice1: 'Nokia的行動電話',
        choice2: '未使用過的塑膠叉子',
        choice3: '價值500元的電話卡',
        choice4: '破掉的全身鏡',
        answer: 1,
    },
    {
        question: '下列何者不可回收？',
        choice1: '不鏽鋼瓦斯爐',
        choice2: '壓克力板',
        choice3: '陶瓷花瓶',
        choice4: '乾淨的塑膠袋',
        answer: 3,
    },
    {
        question: '"回收三部曲"不包含下列何者？',
        choice1: '沖洗',
        choice2: '壓扁',
        choice3: '分類貯放',
        choice4: '晾乾',
        answer: 4,
    },
    {
        question: '下列何者可以屬於熟廚餘？',
        choice1: '咖啡豆',
        choice2: '中藥渣',
        choice3: '蛋殼',
        choice4: '種子果核',
        answer: 1,
    },
    {
        question: '"廢鐵類"中，何者屬不可回收？',
        choice1: '菜刀刀身',
        choice2: '鐵皮',
        choice3: '氣體鋼瓶',
        choice4: '鐵籠',
        answer: 3,
    },
    {
        question: '下列何者是可以回收的物品？',
        choice1: '保險箱',
        choice2: '滅火器',
        choice3: '鐵鍋',
        choice4: '冰櫃',
        answer: 3,
    },
    {
        question: '"紙類"中，下列何者不可回收？',
        choice1: '轉印紙',
        choice2: '包裝紙',
        choice3: '日曆',
        choice4: '瓦楞紙',
        answer: 1,
    },
    {
        question: '下列何者為一般垃圾？',
        choice1: '小燈泡',
        choice2: '水銀燈泡',
        choice3: '白熾燈泡',
        choice4: '逃生指示照明燈',
        answer: 4,
    },
    {
        question: '下列何者可以回收？',
        choice1: '木片便當盒',
        choice2: '便當紙盒',
        choice3: '砂紙',
        choice4: '唱片',
        answer: 2,
    },
    {
        question: '電子發票屬於哪類垃圾？',
        choice1: '紙類',
        choice2: '紙容器類',
        choice3: '一般垃圾',
        choice4: '其他類',
        answer: 3,
    },
    {
        question: '下列免洗餐具，何者是可以回收的？',
        choice1: '塑膠叉子',
        choice2: '免洗筷',
        choice3: '保麗龍製餐盤',
        choice4: '牙線',
        answer: 3,
    },
    {
        question: '何者類型的電池不可回收？',
        choice1: '水銀電池',
        choice2: '鋰電池',
        choice3: '1號乾電池',
        choice4: '工業用電池',
        answer: 4,
    },
    {
        question: '下列何者不屬於一般垃圾？',
        choice1: '木製音箱',
        choice2: '網路線',
        choice3: '滑鼠',
        choice4: '鍵盤',
        answer: 4,
    },
    {
        question: '膠囊咖啡可以直接丟進一般垃圾嗎？（請選擇道德正確性最高選項）',
        choice1: '可以，因為它就是一般垃圾',
        choice2: '不可以，因為內材質各有不同，不可隨意丟棄',
        choice3: '可以，反正沒人知道我丟掉它',
        choice4: '不可以，因為亂丟會被路邊小動物吃掉，牠們會死掉',
        answer: 2,
    },
    {
        question: '咖啡渣可以直接丟進一般垃圾嗎？',
        choice1: '可以，咖啡渣沒有利用價值',
        choice2: '可以，咖啡渣就屬於一般垃圾',
        choice3: '不可以，咖啡渣屬於廚餘類',
        choice4: '可以，沒人知道我亂丟咖啡渣',
        answer: 3,
    },
    {
        question: '貼身衣物可以回收嗎？',
        choice1: '可以，只要清洗乾淨即可回收',
        choice2: '可以，只要是名牌就會有人會收',
        choice3: '不可以，貼身衣物不可回收',
        choice4: '可以，只要沒破洞就可以回收',
        answer: 3,
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

var count = 16;
function countDown(){
    document.getElementById("timer").innerHTML = count-1;
    if(count > 0) {
        count--;
    }
    else if (count == 0){
        document.getElementById("timer").innerHTML = count;
        window.alert("遊戲時間結束")
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    setTimeout("countDown()", 1000);
}

countDown();

startGame()