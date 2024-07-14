let collectedEmojis = [];
let score = 0;
let timeLeft = 60;
let gameMode = 'collect'; // 'collect' or 'story'
let timerInterval;

const tweets = [
    "Just had a great day at the beach! 🏖️☀️🌊",
    "Cooking up a storm in the kitchen 👨‍🍳🍳🥘",
    "Off to the gym for a workout 💪🏋️‍♀️🏃‍♂️",
    "Enjoying a relaxing evening with a book 📚🍵🛋️",
    "Exploring the city on a sunny day 🏙️🚶‍♀️☀️",
    "Music festival vibes all weekend long 🎵🎉🎸",
    "Stargazing on a clear night 🌠🔭🌙",
    "Planting new flowers in the garden 🌻🌷🌱"
];

document.addEventListener('DOMContentLoaded', () => {
    const tweetDisplay = document.getElementById('tweet-display');
    const emojiCollection = document.getElementById('emoji-collection');
    const sceneBuilder = document.getElementById('scene-builder');
    const fetchTweetButton = document.getElementById('fetch-tweet');
    const scoreDisplay = document.getElementById('score-display');
    const timerDisplay = document.getElementById('timer-display');
    const gameModeSelect = document.getElementById('game-mode');
    const startGameButton = document.getElementById('start-game');

    fetchTweetButton.addEventListener('click', fetchNewTweet);
    emojiCollection.addEventListener('click', handleEmojiClick);
    gameModeSelect.addEventListener('change', changeGameMode);
    startGameButton.addEventListener('click', startGame);

    updateScoreDisplay();
    updateTimerDisplay();
});

function startGame() {
    resetGame();
    fetchNewTweet();
    startTimer();
}

function resetGame() {
    score = 0;
    timeLeft = 60;
    collectedEmojis = [];
    updateScoreDisplay();
    updateTimerDisplay();
    document.getElementById('scene-builder').innerHTML = '';
    document.getElementById('emoji-collection').innerHTML = '';
}

function changeGameMode() {
    gameMode = document.getElementById('game-mode').value;
    resetGame();
}

function fetchNewTweet() {
    const tweet = getRandomTweet();
    document.getElementById('tweet-display').textContent = tweet;
    const emojis = extractEmojis(tweet);
    updateEmojiCollection(emojis);
}

function handleEmojiClick(event) {
    if (event.target.classList.contains('emoji')) {
        if (gameMode === 'collect') {
            collectEmoji(event.target);
        } else {
            moveEmojiToScene(event.target);
        }
    }
}

function collectEmoji(emojiElement) {
    const emoji = emojiElement.textContent;
    if (!collectedEmojis.includes(emoji)) {
        collectedEmojis.push(emoji);
        score += 10;
        emojiElement.classList.add('collected');
        updateScoreDisplay();
    }
}

function moveEmojiToScene(emojiElement) {
    const sceneBuilder = document.getElementById('scene-builder');
    const clonedEmoji = emojiElement.cloneNode(true);
    sceneBuilder.appendChild(clonedEmoji);
    score += 5;
    updateScoreDisplay();

    clonedEmoji.style.position = 'absolute';
    clonedEmoji.style.left = `${Math.random() * 80}%`;
    clonedEmoji.style.top = `${Math.random() * 80}%`;

    clonedEmoji.addEventListener('click', () => {
        sceneBuilder.removeChild(clonedEmoji);
        score -= 2;
        updateScoreDisplay();
    });
}

function getRandomTweet() {
    return tweets[Math.floor(Math.random() * tweets.length)];
}

function extractEmojis(text) {
    const emojiRegex = /[\p{Emoji_Presentation}\p{Emoji}\u200d]+/gu;
    return text.match(emojiRegex) || [];
}

function updateEmojiCollection(emojis) {
    const emojiCollection = document.getElementById('emoji-collection');
    emojiCollection.innerHTML = '';
    emojis.forEach(emoji => {
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = emoji;
        emojiSpan.classList.add('emoji');
        emojiCollection.appendChild(emojiSpan);
    });
}

function updateScoreDisplay() {
    document.getElementById('score-display').textContent = `Score: ${score}`;
}

function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = `Time: ${timeLeft}s`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your final score is ${score}`);
    resetGame();
}
