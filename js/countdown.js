const countdownElement = document.querySelector('.countdown');
console.log(countdownElement);

const springBreak = new Date('2026-03-02T23:59:59');
console.log(springBreak);

/* constant for calculation */
const oneDay = 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const oneMinute = 60 * 1000;

setInterval(() => {
  const now = new Date();
  let remaining = springBreak - now;
  console.log(remaining);

  const days = Math.floor(remaining / oneDay);

  remaining = remaining % oneDay;
  const hours = Math.floor(remaining / oneHour);

  remaining = remaining % oneHour;
  const minute = Math.floor(remaining / oneMinute);

  remaining = remaining % oneMinute;
  const second = Math.floor(remaining / 1000);

  countdownElement.textContent = `${days} days ${hours} hours ${minute} minutes ${second} seconds`;
}, 1000);
