
const typingText = document.getElementById('typingText');
const inputField = document.querySelector('.wrapper .inputField');
const time = document.querySelector('.time span b');
const mistake = document.querySelector('.mistakes span');
const Wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;



function loadParagraph(){
    const paragraph = ["The sun set behind the mountains, painting the sky with hues of orange and pink. A cool breeze whispered through the trees, carrying the scent of pine.",
        "The cat leapt gracefully onto the windowsill, its eyes fixed on the fluttering bird outside. It twitched its tail, ready to pounce at any moment.",
        "The rain poured relentlessly, drenching the streets and washing away the day's dust. People hurried under umbrellas, their footsteps splashing in puddles.",
        "She flipped through the pages of the old diary, her curiosity growing with each entry. Every word felt like a glimpse into a forgotten world",
        "He adjusted his tie nervously, stealing a glance at the clock on the wall. Time seemed to crawl as he awaited his turn for the interview.",
        "The library was quiet except for the soft rustle of pages turning. Rows of books stood like silent guardians of knowledge and stories",
        "A single candle illuminated the dark room, casting flickering shadows on the walls. She clutched the book tightly, lost in its gripping tale.",
        "The airplane soared above the clouds, revealing a breathtaking view of the endless blue sky. Passengers marveled at the beauty of the world below."];
    
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML ='';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
     typingText.querySelectorAll('span')[0].classList.add('active');
     document.addEventListener('keydown',()=>inputField.focus());
     typingText.addEventListener("click",()=>{inputField.focus()})
}

//handle userinput

function inItTyping() 
{
    const char = typingText.querySelectorAll('span');
    const typedChar = inputField.value.charAt(charIndex);

    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(inItTime,1000);
            isTyping = true;
        } 

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log('correct');
        }else{
            mistakes++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistake.innerText = mistakes; 
        cpm.innerText = charIndex - mistakes;
    }else{
clearInterval(timer); 
inputField.value = '';  
    }

function inItTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;
        const wpm = Math.round(((charIndex-mistakes)/5) /(maxTime - timeLeft)*60);
        Wpm.innerText = wpm;
    }else{
        clearInterval(timer); 
    }
}
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    inputField.value = '';
    charIndex = 0;
    mistakes = 0;
    isTyping = false ; 
    Wpm.innerText = 0;
    cpm.innerText  = 0;
    mistake.innerText = 0;
}

inputField.addEventListener("input",inItTyping);
btn.addEventListener("click",reset);
loadParagraph();
