setIntercal(() => {
    document.querySelectorAll(".window").forEach(w => {
        w.style.transform =
          `translate(${Math.random()*10}px, ${Math.random()*10}px)`
    })
}, 4000)