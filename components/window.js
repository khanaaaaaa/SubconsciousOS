export function createWindow(title) {
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
