var h1 = document.querySelector('h1');
var lis = ['Welcome to hacklo', 'wElcome to hacklo', 'weLcome to hacklo', 'welCome to hacklo', 'welcOme to hacklo', 'welcoMe to hacklo', 'welcomE to hacklo', 'welcome to hacklo', 'welcome To hacklo', 'welcome tO hacklo', 'welcome to hacklo', 'welcome to Hacklo', 'welcome to hAcklo', 'welcome to haCklo', 'welcome to hacKlo', 'welcome to hackLo', 'welcome to hacklO']

var counter = 0
function change() {
    h1.innerText = lis[counter]
    counter++
    if(counter == lis.length){
        counter = 0
    }

}

setInterval(change, 180)

var ps = document.createElement("div")
ps.classList.toggle("ps")
ps.innerText = "Tap center of screen for keypad down"

if(window.innerWidth < 500) {
    document.body.appendChild(ps)
}

