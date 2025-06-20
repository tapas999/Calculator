const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function playClickSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4 note
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.08); // short beep
    oscillator.onended = () => ctx.close();
}

buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Animation
        btn.classList.remove('clicked');
        void btn.offsetWidth; // trigger reflow
        btn.classList.add('clicked');
        // Sound
        playClickSound();
    });
});

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
display.value = '';
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}