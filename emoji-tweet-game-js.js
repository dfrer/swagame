// Simulated tweets with emojis
const tweets = [
    "Just had a great day at the beach! 🏖️☀️🌊",
    "Cooking up a storm in the kitchen 👨‍🍳🍳🥘",
    "Off to the gym for a workout 💪🏋️‍♀️🏃‍♂️",
    "Enjoying a relaxing evening with a book 📚🍵🛋️"
];

let collectedEmojis = [];

document.addEventListener('DOMContentLoaded', () => {
    const tweetDisplay = document.getElementById('tweet-display');
    const emojiCollection = document.getElementById('emoji-collection');
    const sceneBuilder = document.getElementById('scene-builder');
    const fetchTweetButton = document.getElementById('fetch-tweet');

    fetchTweetButton.addEventListener('click', () => {
        const tweet = getRandomTweet();
        tweetDisplay.textContent = tweet;
        const emojis = extractEmojis(tweet);
        updateEmojiCollection(emojis);
    });

    emojiCollection.addEventListener('click', (event) => {
        if (event.target.classList.contains('emoji')) {
            moveEmojiToScene(event.target);
        }
    });
});

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

function moveEmojiToScene(emojiElement) {
    const sceneBuilder = document.getElementById('scene-builder');
    const clonedEmoji = emojiElement.cloneNode(true);
    sceneBuilder.appendChild(clonedEmoji);
    collectedEmojis.push(clonedEmoji.textContent);
}
