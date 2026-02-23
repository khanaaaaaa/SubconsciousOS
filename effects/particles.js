const canvas = document.createElement('canvas')
canvas.style.position = 'fixed'
canvas.style.top = '0'
canvas.style.left = '0'
canvas.style.width = '100%'
canvas.style.height = '100%'
canvas.style.pointerEvents = 'none'
canvas.style.zIndex = '999'
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
    })
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(p => {
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        
        p.x += p.speedX
        p.y += p.speedY
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
    })
    
    requestAnimationFrame(animate)
}
animate()
