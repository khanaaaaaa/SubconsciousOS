const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playGlitch() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = Math.random() * 200 + 100;
    gain.gain.value = 0.1;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.stop(audioCtx.currentTime + 0.1);
}

const icons = document.querySelectorAll('.icon');
const iconData = [];

icons.forEach((icon, i) => {
    const startX = 20;
    const startY = 20 + (i * 100);
    icon.style.left = startX + 'px';
    icon.style.top = startY + 'px';
    
    iconData.push({
        element: icon,
        x: startX,
        y: startY,
        vx: 0,
        vy: 0,
        onTaskbar: false
    });
});

document.addEventListener('mousemove', (e) => {
    iconData.forEach(icon => {
        if (icon.onTaskbar) return;
        
        const iconX = icon.x + 40;
        const iconY = icon.y + 40;
        const dx = e.clientX - iconX;
        const dy = e.clientY - iconY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
            const force = (200 - distance) / 200;
            icon.vx = -dx * force * 2;
            icon.vy = -dy * force * 2;
            if (Math.abs(icon.vx) > 1 || Math.abs(icon.vy) > 1) {
                if (Math.random() > 0.95) playGlitch();
            }
        }
    });
});

function animate() {
    iconData.forEach(icon => {
        if (icon.onTaskbar) {
            icon.vx += (Math.random() - 0.5) * 5;
            icon.vy += (Math.random() - 0.5) * 5;
            icon.vx *= 0.9;
            icon.vy *= 0.9;
        } else {
            icon.vy += 0.5;
            icon.vx *= 0.95;
            icon.vy *= 0.95;
        }

        icon.x += icon.vx;
        icon.y += icon.vy;

        if (icon.y >= window.innerHeight - 150) {
            icon.y = window.innerHeight - 150;
            icon.vy = -icon.vy * 0.3;
            icon.onTaskbar = true;
        }

        if (icon.y < 0) {
            icon.y = 0;
            icon.vy = -icon.vy * 0.5;
        }
        if (icon.y >= window.innerHeight - 150) {
            icon.y = window.innerHeight - 150;
            icon.vy = -icon.vy * 0.3;
            icon.onTaskbar = true;
        }

        if (icon.x < 0) {
            icon.x = 0;
            icon.vx = -icon.vx * 0.5;
        }

        icon.element.style.left = icon.x + 'px';
        icon.element.style.top = icon.y + 'px';
    });

    requestAnimationFrame(animate);
}
animate();

function createWindow(title) {
    const win = document.createElement("div")
    win.className = "window"
    win.style.position = 'fixed'
    win.style.top = `${Math.random() * 40 + 10}%`
    win.style.left = `${Math.random() * 40 + 10}%`
    win.style.width = '400px'
    win.style.minHeight = '200px'
    win.style.background = '#fff'
    win.style.border = '1px solid #0078d4'
    win.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'
    win.style.borderRadius = '8px'
    win.style.overflow = 'hidden'
    win.style.zIndex = '1000'

    const header = document.createElement("div")
    header.textContent = title
    header.style.background = '#0078d4'
    header.style.color = '#fff'
    header.style.padding = '12px'
    header.style.fontWeight = '600'
    header.style.cursor = 'move'
    header.style.userSelect = 'none'

    const closeBtn = document.createElement("span")
    closeBtn.textContent = '×'
    closeBtn.style.float = 'right'
    closeBtn.style.fontSize = '1.5rem'
    closeBtn.style.cursor = 'pointer'
    closeBtn.style.lineHeight = '1'
    closeBtn.onclick = () => win.remove()
    header.appendChild(closeBtn)

    win.appendChild(header)
    document.getElementById("windows").appendChild(win)

    let isDragging = false
    let offsetX, offsetY

    header.onmousedown = (e) => {
        isDragging = true
        offsetX = e.clientX - win.offsetLeft
        offsetY = e.clientY - win.offsetTop
    }

    document.onmousemove = (e) => {
        if (isDragging) {
            win.style.left = (e.clientX - offsetX) + 'px'
            win.style.top = (e.clientY - offsetY) + 'px'
        }
    }

    document.onmouseup = () => {
        isDragging = false
    }

    return win
}

function openClock() {
    const win = createWindow("Clock")
    win.style.width = '300px'
    win.style.height = '300px'
    win.style.background = '#fff'

    const canvas = document.createElement('canvas')
    canvas.width = 250
    canvas.height = 250
    canvas.style.display = 'block'
    canvas.style.margin = '10px auto'
    win.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    const centerX = 125
    const centerY = 125
    const radius = 100

    let secondAngle = 0
    let speed = 20
    let minuteAngle = 0
    let hourAngle = 0
    let minuteSpeed = 8
    let hourSpeed = 4
    let direction = 1

    function draw() {
        ctx.clearRect(0, 0, 250, 250)

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = '#0078d4'
        ctx.lineWidth = 3
        ctx.stroke()

        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180
            const x1 = centerX + Math.cos(angle) * (radius - 10)
            const y1 = centerY + Math.sin(angle) * (radius - 10)
            const x2 = centerX + Math.cos(angle) * (radius - 20)
            const y2 = centerY + Math.sin(angle) * (radius - 20)
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = '#333'
            ctx.lineWidth = 2
            ctx.stroke()
        }

        hourAngle += hourSpeed * direction
        minuteAngle += minuteSpeed * direction
        if (hourAngle >= 360) hourAngle -= 360
        if (hourAngle < 0) hourAngle += 360
        if (minuteAngle >= 360) minuteAngle -= 360
        if (minuteAngle < 0) minuteAngle += 360

        const hourRad = (hourAngle - 90) * Math.PI / 180
        const minuteRad = (minuteAngle - 90) * Math.PI / 180

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(hourRad) * 50, centerY + Math.sin(hourRad) * 50)
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 6
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(minuteRad) * 70, centerY + Math.sin(minuteRad) * 70)
        ctx.strokeStyle = '#666'
        ctx.lineWidth = 4
        ctx.stroke()

        const secAngle = (secondAngle - 90) * Math.PI / 180
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(secAngle) * 85, centerY + Math.sin(secAngle) * 85)
        ctx.strokeStyle = '#ff0000'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
        ctx.fillStyle = '#0078d4'
        ctx.fill()
    }

    setInterval(() => {
        if (Math.random() > 0.9) {
            direction = Math.random() > 0.5 ? 1 : -1
            speed = Math.random() * 60 + 20
        }

        secondAngle += speed * direction
        if (secondAngle >= 360) secondAngle -= 360
        if (secondAngle < 0) secondAngle += 360

        draw()
    }, 50)
}

function openNotes() {
    const win = createWindow("Notes")
    const textarea = document.createElement("textarea")
    textarea.style.width = '100%'
    textarea.style.height = '200px'
    textarea.style.border = 'none'
    textarea.style.padding = '10px'
    textarea.style.fontFamily = 'Segoe UI'
    textarea.style.resize = 'none'
    win.appendChild(textarea)
}

function openFiles() {
    const win = createWindow("Files")
    const content = document.createElement("div")
    content.style.padding = '20px'
    content.innerHTML = '<p>📁 Documents</p><p>📁 Pictures</p><p>📁 Downloads</p>'
    win.appendChild(content)
}

document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", () => {
        const app = icon.dataset.app

        if (app === "clock") openClock()
        if (app === "notes") openNotes()
        if (app === "files") openFiles()
    })
})
