export function createWindow(title) {
    const win = document.createElement("div")
    win.className = "window"

    const header = document.createElement("div")
    header.textContent = title

    win.appendChild(header)
    document.getElementById("windows").appendChild(win)

    return win
}