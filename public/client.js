let socket = io();

let btnSend = document.getElementById('btnSend')
let chatMessageTextBox = document.getElementById('chatMessageTextBox')
let chatMessageList = document.getElementById('chatMessageList')
let chatMessageUser = document.getElementById('chatMessageUser')

btnSend.addEventListener('click', function(){

  let message = chatMessageUser.value + ': ' + chatMessageTextBox.value
  socket.emit('chat', message)
})

socket.on('chat', function(message){
  console.log(message)
  let chatMessageLI = document.createElement('li')
  chatMessageLI.innerHTML = message
  chatMessageList.appendChild(chatMessageLI)
})
