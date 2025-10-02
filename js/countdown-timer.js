// Countdown Timer Logic
const countdownTimer = () => {
    const birthDate = new Date('October 8, 2003 00:00:00').getTime(); // Updated birth date

    const updateTimer = () => {
        const now = new Date().getTime();
        const age = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24 * 365.25)); // Calculate age

        const nextBirthday = new Date(`October 8, ${new Date().getFullYear()} 00:00:00`).getTime();
        const timeLeft = nextBirthday - now;

        if (timeLeft <= 0) {
            document.getElementById('countdownTimer').innerHTML = `<h2>Happy ${age + 1}th Birthday! 🎉</h2>`;
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('countdownTimer').innerHTML = `
            <h2>Your Beautiful Journey</h2>
            <p>Dearest, you are <strong>${age}</strong> years young, and every moment has been a treasure. 💖</p>
            <p>Counting down to your next magical chapter:</p>
            <div class="timer-display">
                <span>${days.toString().padStart(2, '0')}</span> Days
                <span>${hours.toString().padStart(2, '0')}</span> Hours
                <span>${minutes.toString().padStart(2, '0')}</span> Minutes
                <span>${seconds.toString().padStart(2, '0')}</span> Seconds
            </div>
        `;
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to display immediately
};

// Initialize the countdown timer
countdownTimer();
