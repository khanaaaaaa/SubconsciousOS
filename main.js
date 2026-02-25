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
    const canvas = document.createElement("canvas")
    canvas.width = 200
    canvas.height = 200
    canvas.style.display = 'block'
    canvas.style.margin = '20px auto'
    win.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    let secondAngle = 0
    let direction = 1
    let speed = 30

    function draw() {
        ctx.clearRect(0, 0, 200, 200)
        const centerX = 100
        const centerY = 100

        ctx.beginPath()
        ctx.arc(centerX, centerY, 90, 0, Math.PI * 2)
        ctx.strokeStyle = '#ddd'
        ctx.lineWidth = 2
        ctx.stroke()

        const now = new Date()
        const hours = now.getHours() % 12
        const minutes = now.getMinutes()

        const hourAngle = (hours * 30 + minutes * 0.5 - 90) * Math.PI / 180
        const minuteAngle = (minutes * 6 - 90) * Math.PI / 180

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(hourAngle) * 50, centerY + Math.sin(hourAngle) * 50)
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 6
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(minuteAngle) * 70, centerY + Math.sin(minuteAngle) * 70)
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
    win.style.width = '500px'
    win.style.height = '400px'

    const container = document.createElement("div")
    container.style.position = 'relative'
    container.style.width = '100%'
    container.style.height = '350px'
    container.style.overflow = 'hidden'
    
    const ghostLayer = document.createElement("div")
    ghostLayer.style.position = 'absolute'
    ghostLayer.style.top = '0'
    ghostLayer.style.left = '0'
    ghostLayer.style.width = '100%'
    ghostLayer.style.height = '100%'
    ghostLayer.style.padding = '10px'
    ghostLayer.style.fontFamily = 'Segoe UI'
    ghostLayer.style.fontSize = '14px'
    ghostLayer.style.color = 'rgba(0,0,0,0.15)'
    ghostLayer.style.pointerEvents = 'none'
    ghostLayer.style.whiteSpace = 'pre-wrap'

    const textarea = document.createElement("textarea")
    textarea.style.position = 'absolute'
    textarea.style.top = '0'
    textarea.style.left = '0'
    textarea.style.width = '100%'
    textarea.style.height = '100%'
    textarea.style.border = 'none'
    textarea.style.padding = '10px'
    textarea.style.fontFamily = 'Segoe UI'
    textarea.style.fontSize = '14px'
    textarea.style.resize = 'none'
    textarea.style.background = 'transparent'
    
    container.appendChild(ghostLayer)
    container.appendChild(textarea)
    win.appendChild(container)
    
    const words = ['dream', 'memory', 'shadow', 'whisper', 'echo', 'void', 'time', 'space', 'thought', 'feeling']
    const letters = 'abcdefghijklmnopqrstuvwxyz '
    
    const synonyms = {
        'hello': ['hi', 'hey', 'greetings'],
        'world': ['universe', 'earth', 'globe'],
        'good': ['great', 'nice', 'fine'],
        'bad': ['poor', 'terrible', 'awful'],
        'happy': ['joyful', 'glad', 'cheerful'],
        'sad': ['unhappy', 'sorrowful', 'gloomy'],
        'big': ['large', 'huge', 'enormous'],
        'small': ['tiny', 'little', 'mini'],
        'fast': ['quick', 'rapid', 'swift'],
        'slow': ['sluggish', 'gradual', 'leisurely'],
        'dream': ['vision', 'fantasy', 'illusion'],
        'memory': ['recollection', 'remembrance', 'recall'],
        'shadow': ['shade', 'silhouette', 'darkness'],
        'time': ['moment', 'instant', 'period']
    }
    
    let history = []
    let currentText = ''
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            const char = letters[Math.floor(Math.random() * letters.length)]
            textarea.value += char
        }
    }, 1500)
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            const word = words[Math.floor(Math.random() * words.length)]
            textarea.value += (textarea.value.length > 0 ? ' ' : '') + word
        }
    }, 4000)
    
    textarea.addEventListener('input', () => {
        history.push(currentText)
        if (history.length > 5) history.shift()
        currentText = textarea.value
    })
    
    setInterval(() => {
        if (textarea.value.length > 0) {
            let words = textarea.value.split(' ')
            let changed = false
            
            words = words.map(word => {
                if (Math.random() > 0.7 && synonyms[word.toLowerCase()]) {
                    changed = true
                    const syns = synonyms[word.toLowerCase()]
                    return syns[Math.floor(Math.random() * syns.length)]
                }
                return word
            })
            
            if (changed) {
                const cursorPos = textarea.selectionStart
                textarea.value = words.join(' ')
                textarea.setSelectionRange(cursorPos, cursorPos)
            }
        }
    }, 3000)
    
    setInterval(() => {
        if (history.length > 0 && Math.random() > 0.7) {
            const oldText = history[Math.floor(Math.random() * history.length)]
            ghostLayer.textContent = oldText
            ghostLayer.style.color = 'rgba(0,0,0,0.3)'
            setTimeout(() => {
                ghostLayer.style.color = 'rgba(0,0,0,0.15)'
                ghostLayer.textContent = ''
            }, 500)
        }
    }, 4000)
    
    setInterval(() => {
        const text = textarea.value
        if (text.length > 0 && Math.random() > 0.5) {
            textarea.style.letterSpacing = (Math.random() * 3) + 'px'
            setTimeout(() => {
                textarea.style.letterSpacing = '0px'
            }, 1000)
        }
    }, 2000)
}

function openFiles() {
    const win = createWindow("Files")
    const content = document.createElement("div")
    content.style.padding = '20px'
    content.innerHTML = '<p>📁 Documents</p><p>📁 Pictures</p><p>📁 Downloads</p>'
    win.appendChild(content)
}

const icons = document.querySelectorAll(".icon")

icons.forEach((icon, index) => {
    const data = {
        element: icon,
        x: Math.random() * (window.innerHeight - 100)
        y: Math.random() * (window.innerHeight - 200)
        vx: 0
        vy: 0
        settled: false
    };
    iconData.push(data);
    })
})
