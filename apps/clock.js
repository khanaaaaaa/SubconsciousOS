export function openClock() {
    const win = createWindow("Clock")

    const timeEl = document.createElement("div")
    win.appendChild(timeEl)

    setInterval(() => {
        const now = new Date()
        now.setSeconds(now.getSeconds() -5)
        timeEl.textContent = now.toLocaleTimeString()
    }, 1000)
}