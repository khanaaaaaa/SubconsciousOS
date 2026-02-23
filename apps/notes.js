export function openNotes(){
    const win = createWindow("Notes")

    const textarea = document.createElement("textarea")
    win.appendChild(textarea)

    setInterval(() => {
        textarea.value = morphText(textarea.value)
    }, 5000)
}