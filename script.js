// ============================================================
// PRANK RANSOMWARE V2 - FULL DEVICE DETECT
// 100% AMAN - GAK NYURI DATA
// ============================================================

const TOTAL_TIME = 600;
let timeLeft = TOTAL_TIME;
let timerInterval;

// ============================================================
// FORMAT TIME
// ============================================================

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ============================================================
// DETECT DEVICE NAME
// ============================================================

function detectDeviceName() {
  const ua = navigator.userAgent;
  let device = 'Unknown Device';

  // iPhone / iPad
  if (/iPhone/.test(ua)) device = 'Apple iPhone';
  else if (/iPad/.test(ua)) device = 'Apple iPad';
  else if (/iPod/.test(ua)) device = 'Apple iPod';

  // Samsung
  else if (/SM-/.test(ua)) {
    const match = ua.match(/SM-[A-Z0-9]+/);
    device = 'Samsung ' + (match ? match[0] : 'Galaxy');
  }
  // Xiaomi / Redmi / POCO
  else if (/Redmi/.test(ua)) device = 'Xiaomi Redmi';
  else if (/POCO/.test(ua)) device = 'Xiaomi POCO';
  else if (/Mi /.test(ua)) device = 'Xiaomi Mi';
  else if (/M20|M21|M31/.test(ua)) device = 'Xiaomi';
  // Oppo
  else if (/CPH/.test(ua)) {
    const match = ua.match(/CPH\d+/);
    device = 'Oppo ' + (match ? match[0] : '');
  }
  // Vivo
  else if (/V\d{4}/.test(ua)) {
    const match = ua.match(/V\d{4}/);
    device = 'Vivo ' + (match ? match[0] : '');
  }
  // Realme
  else if (/RMX/.test(ua)) {
    const match = ua.match(/RMX\d+/);
    device = 'Realme ' + (match ? match[0] : '');
  }
  // Huawei
  else if (/HUAWEI/.test(ua)) device = 'Huawei';
  else if (/ANE-|ELE-|VOG-/.test(ua)) device = 'Huawei P Series';
  // Asus
  else if (/ASUS/.test(ua)) device = 'Asus';
  // OnePlus
  else if (/OnePlus/.test(ua)) device = 'OnePlus';
  // Google Pixel
  else if (/Pixel/.test(ua)) device = 'Google Pixel';
  // Windows
  else if (/Windows NT 10/.test(ua)) device = 'Windows PC';
  else if (/Windows/.test(ua)) device = 'Windows PC';
  // Mac
  else if (/Macintosh/.test(ua)) device = 'Apple Mac';
  // Linux
  else if (/Linux/.test(ua)) device = 'Linux Device';

  return device;
}

// ============================================================
// DETECT OS
// ============================================================

function detectOS() {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) {
    const match = ua.match(/Android\s([\d.]+)/);
    return 'Android ' + (match ? match[1] : '');
  }
  if (/iPhone|iPad|iPod/.test(ua)) {
    const match = ua.match(/OS\s([\d_]+)/);
    return 'iOS ' + (match ? match[1].replace(/_/g, '.') : '');
  }
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows NT 6.3/.test(ua)) return 'Windows 8.1';
  if (/Windows NT 6.1/.test(ua)) return 'Windows 7';
  if (/Mac OS X/.test(ua)) {
    const match = ua.match(/Mac OS X\s([\d_]+)/);
    return 'macOS ' + (match ? match[1].replace(/_/g, '.') : '');
  }
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown OS';
}

// ============================================================
// DETECT BROWSER
// ============================================================

function detectBrowser() {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'Microsoft Edge';
  if (/OPR\//.test(ua) || /Opera/.test(ua)) return 'Opera';
  if (/Chrome\//.test(ua) && !/Edg|OPR/.test(ua)) {
    const match = ua.match(/Chrome\/([\d.]+)/);
    return 'Chrome ' + (match ? match[1].split('.')[0] : '');
  }
  if (/Firefox\//.test(ua)) {
    const match = ua.match(/Firefox\/([\d.]+)/);
    return 'Firefox ' + (match ? match[1].split('.')[0] : '');
  }
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) {
    const match = ua.match(/Version\/([\d.]+)/);
    return 'Safari ' + (match ? match[1].split('.')[0] : '');
  }
  if (/SamsungBrowser/.test(ua)) return 'Samsung Browser';
  return 'Unknown Browser';
}

// ============================================================
// DETECT IP & LOCATION (VIA PUBLIC API)
// ============================================================

async function detectIP() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    document.getElementById('devIP').textContent = data.ip || 'Hidden';
    document.getElementById('devLoc').textContent = 
      (data.city || '?') + ', ' + (data.country_name || '?');
    document.getElementById('devISP').textContent = data.org || 'Unknown';
  } catch (e) {
    document.getElementById('devIP').textContent = 'Unable to detect';
    document.getElementById('devLoc').textContent = 'Unable to detect';
    document.getElementById('devISP').textContent = 'Unable to detect';
  }
}

// ============================================================
// DETECT SCREEN
// ============================================================

function detectScreen() {
  const s = screen;
  return `${s.width}x${s.height} @ ${window.devicePixelRatio}x`;
}

// ============================================================
// DETECT BATTERY
// ============================================================

function detectBattery() {
  if (navigator.getBattery) {
    navigator.getBattery().then(bat => {
      const level = Math.round(bat.level * 100);
      const status = bat.charging ? '⚡ Charging' : '🔋 Discharging';
      document.getElementById('devBattery').textContent = `${level}% ${status}`;
    });
  } else {
    document.getElementById('devBattery').textContent = 'N/A';
  }
}

// ============================================================
// DETECT TIMEZONE
// ============================================================

function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return 'Unknown';
  }
}

// ============================================================
// DETECT LANGUAGE
// ============================================================

function detectLanguage() {
  return navigator.language || navigator.userLanguage || 'Unknown';
}

// ============================================================
// DETECT CPU
// ============================================================

function detectCPU() {
  return navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' cores' : 'Unknown';
}

// ============================================================
// DETECT RAM
// ============================================================

function detectRAM() {
  return navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Unknown';
}

// ============================================================
// INIT ALL DETECTION
// ============================================================

function initDetection() {
  document.getElementById('devName').textContent = detectDeviceName();
  document.getElementById('devOS').textContent = detectOS();
  document.getElementById('devBrowser').textContent = detectBrowser();
  document.getElementById('devScreen').textContent = detectScreen();
  document.getElementById('devTZ').textContent = detectTimezone();
  document.getElementById('devLang').textContent = detectLanguage();
  document.getElementById('devCPU').textContent = detectCPU();
  document.getElementById('devRAM').textContent = detectRAM();
  detectBattery();
  detectIP();
}

// ============================================================
// COUNTDOWN TIMER
// ============================================================

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(timerInterval);
      document.getElementById('status').textContent = 'TIME UP';
    }
    document.getElementById('countdown').textContent = formatTime(timeLeft);
    document.getElementById('timeLeft').textContent = formatTime(timeLeft);
  }, 1000);
}

// ============================================================
// FILE COUNT FAKE
// ============================================================

function startFileCount() {
  let count = 1247;
  setInterval(() => {
    count += Math.floor(Math.random() * 5);
    document.getElementById('fileCount').textContent = count.toLocaleString();
  }, 2000);
}

// ============================================================
// FAKE TERMINAL
// ============================================================

const terminalLines = [
  '> Scanning filesystem...',
  '> Accessing /storage/emulated/0/DCIM...',
  '> Accessing /storage/emulated/0/Download...',
  '> Accessing /storage/emulated/0/WhatsApp...',
  '> Encrypting files with AES-256...',
  '> Encrypting files with RSA-4096...',
  '> Uploading keys to remote server...',
  '> Deleting shadow copies...',
  '> Removing backup files...',
  '> Encryption complete: 100%',
  '> Waiting for payment...',
  '> Contact: hacker@darkweb.onion',
  '> BTC: 1A2B3C4D5E6F7G8H9I0J',
  '> Time is running out...'
];

function startTerminal() {
  const term = document.getElementById('terminal');
  let i = 0;
  setInterval(() => {
    const line = document.createElement('div');
    line.textContent = terminalLines[i % terminalLines.length];
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
    if (term.children.length > 6) term.removeChild(term.firstChild);
    i++;
  }, 1500);
}

// ============================================================
// PANIC BUTTON
// ============================================================

function panicMode() {
  if (confirm('⚠️ Yakin mau keluar?\n\nIni cuma PRANK. HP lu AMAN.')) {
    clearInterval(timerInterval);
    document.getElementById('lockScreen').style.display = 'none';
    document.getElementById('panicScreen').style.display = 'flex';
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  }
}

function closePrank() {
  document.getElementById('panicScreen').style.display = 'none';
  document.getElementById('lockScreen').style.display = 'flex';
  timeLeft = TOTAL_TIME;
  startTimer();
}

// ============================================================
// ANTI-CLOSE
// ============================================================

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
});

history.pushState(null, null, location.href);
window.addEventListener('popstate', () => {
  history.pushState(null, null, location.href);
});

// ============================================================
// START
// ============================================================

initDetection();
startTimer();
startFileCount();
startTerminal();

if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 500]);