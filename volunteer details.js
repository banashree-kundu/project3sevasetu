/* script.js */
// Handle Flexible Time Commitment
const slider = document.getElementById('time-slider');
const timeVal = document.getElementById('time-val');

slider.addEventListener('input', (e) => {
    const hours = e.target.value;
    timeVal.innerHTML = `<strong>${hours} Hours</strong>`;
});

// Simple toggle logic for skills is handled by CSS :checked, 
// but you can add logic here to save state if needed.