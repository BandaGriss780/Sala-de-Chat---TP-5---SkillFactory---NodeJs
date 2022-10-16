const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// obtiene el nombre de usuario y la sala desde la URL 
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// obtiene el usuario y la sala 
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// mensaje del servidor
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Barra de Scroll 
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// mensaje subido
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // obtener mensaje del chat
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // emitir mensaje al server
  socket.emit('chatMessage', msg);

  // limpiar input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// mensaje de salida llevado al doom
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// agregra nombre de la sala al doom
function outputRoomName(room) {
  roomName.innerText = room;
}

// agregar nombre del usuario al doom
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt para cuando el usuario quiere salir de la sala 
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Estas por dejar la sala, ¿Estas seguro ?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
