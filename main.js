import { openClock } from "./apps/clock.js"
import { openNotes } from "./apps/notes.js"
import { openFiles } from "./apps/files.js"

document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", () => {
        const app = icon.dataset.app

        if (app === "clock") openClock()
        if (app === "notes") openNotes()
        if (app === "files") openFiles()

        localStorage.setItem("layout",JSON.stringify(state))
    })
})