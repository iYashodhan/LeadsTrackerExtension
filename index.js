//DOM
saveBtn = document.getElementById("save-btn")
saveTabBtn = document.getElementById("saveTab-btn")
deleteBtn = document.getElementById("delete-btn")
inputEl = document.getElementById("input-el")
ulEl = document.getElementById("ul-el")

leads = []

if (localStorage.getItem("leads")) {
    leads = JSON.parse(localStorage.getItem("leads"))
    renderWith(leads)
}


saveBtn.addEventListener("click", function() {

    value = inputEl.value

    if (!value) return

    leads.push(value)
    localStorage.setItem("leads", JSON.stringify(leads))

    renderWith(leads)

})


function renderWith(thseseLeads) {

    inputEl.value = ""
    ulEl.innerHTML = ""

    for (let i=0; i<thseseLeads.length; i++) {
        ulEl.innerHTML += `
        <li>
            <a href="${thseseLeads[i]}" target="_blank">
            ${thseseLeads[i]}
            </a>
        </li>
      `
    }
}


deleteBtn.addEventListener("dblclick", function() {
    
    localStorage.clear()
    leads = []

    ulEl.innerHTML = ""
})


saveTabBtn.addEventListener("click", function(){

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        
        if (tabs[0].url === leads[-1]) return
        
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))

        renderWith(leads)
    })
})
