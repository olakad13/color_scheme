
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()

    const seedColor = document.getElementById("color").value.substring(1)
    const colorMode = document.getElementById("color-scheme").value


    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorMode}`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors
            console.log(data)
            const colorSchemeArray = colors.map(color => {
                return `
                    <div class="color-container">
                        <div style="background-color: ${color.hex.value}" class="color-display"></div>
                        <div id="hidden" class="hidden">Copied!</div>
                        <div class="col-code" data-uuid="${color.hex.value}">${color.hex.value}</div>
                    </div>
                `
            }).join("")

            document.getElementById("Palette").innerHTML = colorSchemeArray
            
        }).catch(err => console.log("There was an Error"))
      
        
})
window.addEventListener("click", (e) => {

    if(e.target.dataset.uuid) {
        navigator.clipboard.writeText(e.target.textContent)
            .then(() => {
                document.getElementById("hidden").style.display = "block"
                setTimeout(() => {
                    document.getElementById("hidden").style.display = "none"
                }, 1000)
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    }
})



