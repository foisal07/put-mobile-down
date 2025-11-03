const mainScreen = document.getElementById('main-screen');

if (!mainScreen) {
    console.warn('Main screen element not found; interactive audio features disabled.');
} else {
    const message = document.createElement('h2');
    mainScreen.appendChild(message);

    let audioContext;
    let whiteNoiseNode;
    let gainNode;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            whiteNoiseNode = audioContext.createBufferSource();
            const bufferSize = audioContext.sampleRate * 2; // 2 seconds of noise
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            whiteNoiseNode.buffer = buffer;
            whiteNoiseNode.loop = true;

            gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);

            whiteNoiseNode.connect(gainNode);
            gainNode.connect(audioContext.destination);
            whiteNoiseNode.start();
        }
    }

    mainScreen.addEventListener('click', () => {
        initAudio();
        const currentGain = gainNode.gain.value;
        const newGain = Math.min(currentGain + 0.1, 1);
        gainNode.gain.linearRampToValueAtTime(newGain, audioContext.currentTime + 0.1);

        if (newGain >= 1) {
            startSpeechRecognition();
        }
    });

    function startSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.onstart = () => {
                message.textContent = 'You can say anything that you feel like now';
            };

            recognition.onresult = (event) => {
                const spokenText = event.results[0][0].transcript;
                message.textContent = spokenText;
                generateImage(spokenText);
            };

            recognition.onend = () => {
                message.textContent = 'Tap to start again';
            };

            recognition.start();
        } else {
            message.textContent = 'Speech recognition not supported in your browser.';
        }
    }

    function generateImage(text) {
        // Mock AI image generation
        const imageUrl = `https://via.placeholder.com/500x500.png?text=${encodeURIComponent(text)}`;
        const image = document.createElement('img');
        image.src = imageUrl;
        mainScreen.innerHTML = '';
        mainScreen.appendChild(image);

        // Save image to local storage
        const images = JSON.parse(localStorage.getItem('generatedImages')) || [];
        images.push(imageUrl);
        localStorage.setItem('generatedImages', JSON.stringify(images));
    }
}
