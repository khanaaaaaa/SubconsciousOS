export function openClock() {
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
    let speed = 6
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

        const now = new Date()
        const hours = now.getHours() % 12
        const minutes = now.getMinutes()

        const hourAngle = ((hours + minutes / 60) * 30 - 90) * Math.PI / 180
        const minuteAngle = ((minutes + now.getSeconds() / 60) * 6 - 90) * Math.PI / 180

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
            speed = Math.random() * 30 + 5
        }

        secondAngle += speed * direction
        if (secondAngle >= 360) secondAngle -= 360
        if (secondAngle < 0) secondAngle += 360

        draw()
    }, 50)
}
