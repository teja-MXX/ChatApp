var socket = io();
        socket.on('connect', function() {
        
        socket.emit('my event', {data: 'I\'m connected!', id: socket.id});
          
        socket.on('broadcast', function(user) {
          console.log("Broadcasted")
          var txtarea = document.querySelector('#textarea')
          var connDiv = document.createElement('div')
          var connP = document.createElement('p')
          connP.innerText = user
          connP.classList.toggle('newUserP')
          connDiv.classList.toggle('newUser')
          connDiv.appendChild(connP)
          connDiv.style.width = screen.width
          txtarea.appendChild(connDiv)
          textarea.scrollBy(0, textarea.scrollHeight)
          });
          

      });

      
var tar = document.querySelector('#textarea');
tar.style.marginTop = ( screen.height * 0.1 ).toString()+"px"

var chat = document.querySelector('#type');
chat.addEventListener('click', function(e) {
  e.preventDefault();
  // chat.style.outline = "none";
  // chat.style.borderColor = "transparent";
  if(window.innerWidth < 500) {
    tar.style.height = (window.innerHeight * 0.4)+"px";
    if(chat === document.activeElement) {
      tar.scrollBy(0, tar.scrollHeight)
    }
  }
  
})


console.log(chat === document.activeElement)

chat.addEventListener('keydown', function(e) {
  if(e.key === "Enter") {
    socket.emit("messageToPython", { msg: chat.value, sockId : socket.id })
    chat.value = ""
  }

})


socket.on("messageToJS", function(msg) {
  var div = document.createElement('div');
  console.log(msg)
  div.classList.toggle('chat');
  var p = document.createElement('p');
  var span = document.createElement('span');
  var sub = document.createElement('sub');
  var time = new Date();
  var minutes = time.getMinutes()
  var hours = time.getHours()
  if(minutes < 10){
    time = hours+":"+"0"+minutes;
  }
  else {
    time = hours+":"+minutes;
  }
  
  sub.innerText = time
  p.innerText = msg.msg;
  span.appendChild(sub);
  p.appendChild(span);
  var uname = document.createElement('div');
  uname.innerText = msg.uname
  const details = { "name" : msg.uname}
  uname.style.fontWeight = "900"
  uname.style.color = "#2D7861";
  div.appendChild(uname)
  div.appendChild(p);
  var textarea = document.querySelector('#textarea');
  console.log(div.style.height+"opera")
  console.log(p.style.height)
  console.log(msg.uname, details.name+"io")
  div.style.height = p.style.height+"px"
  if(msg.sockId == socket.id) {
    div.classList.toggle('right');
    uname.style.color = "grey"
  }
  
  textarea.appendChild(div);
  textarea.scrollBy(0, textarea.scrollHeight)
  
})

tar.addEventListener('click', function() {
  tar.classList.toggle('txtaa')
  tar.style.height = "74vh"
})



