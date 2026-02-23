setInterval(() => {
    if (Math.random() > 0.7) {
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 3})`
        setTimeout(() => {
            document.body.style.filter = 'none'
        }, 200)
    }
}, 3000)

setInterval(() => {
    const windows = document.querySelectorAll('.window')
    windows.forEach(w => {
        if (Math.random() > 0.8) {
            w.style.filter = 'invert(1)'
            setTimeout(() => w.style.filter = 'none', 100)
        }
    })
}, 2000)
