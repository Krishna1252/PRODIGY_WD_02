let startTime, interval;
let running = false;

const display = document.getElementById("display");
const lapList = document.getElementById("lap-list");

// Start Button
document.getElementById("start").addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - (window.elapsed || 0);
    interval = setInterval(() => {
      window.elapsed = Date.now() - startTime;
      display.textContent = formatTime(window.elapsed);
    }, 10);
    running = true;
  }
});

// Stop Button
document.getElementById("stop").addEventListener("click", () => {
  clearInterval(interval);
  running = false;
});

// Reset Button
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(interval);
  running = false;
  window.elapsed = 0;
  display.textContent = "00:00:00.000";
  lapList.innerHTML = "";
});

// Lap Button
document.getElementById("lap").addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = formatTime(window.elapsed);
    lapList.appendChild(li);
  }
});

// Format time: hh:mm:ss.mmm
function formatTime(ms) {
  const date = new Date(ms);
  const h = String(date.getUTCHours()).padStart(2, "0");
  const m = String(date.getUTCMinutes()).padStart(2, "0");
  const s = String(date.getUTCSeconds()).padStart(2, "0");
  const msStr = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${msStr}`;
}
