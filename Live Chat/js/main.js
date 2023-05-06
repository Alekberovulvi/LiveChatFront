// Get elements
const chatButton = document.querySelector('.live-chat-toggle');
const chatForm = document.querySelector('.live-chat-form');
const chatHeader = document.querySelector('.live-chat-header');
const chatTitle = document.querySelector('.live-chat-title');
const chatClose = document.querySelector('.live-chat-close');
const chatOptions = document.querySelector('.live-chat-options');
const messageForm = document.querySelector('.live-chat-message-form');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const messageInput = document.querySelector('#message');
const sendButton = document.querySelector('.live-chat-send');

// Open and close chat form
chatButton.addEventListener('click', () => {
  chatButton.style.display = 'none';
  chatForm.style.display = 'block';
});

chatClose.addEventListener('click', () => {
  chatButton.style.display = 'block';
  chatForm.style.display = 'none';
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    chatButton.style.display = 'block';
    chatForm.style.display = 'none';
  }
});

// Show message form on option click
chatOptions.addEventListener('click', (event) => {
  if (event.target.classList.contains('live-chat-option')) {
    chatTitle.textContent = event.target.textContent;
    chatOptions.style.display = 'none';
    messageForm.style.display = 'block';
  }
});

// Send message
sendButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  // Validate inputs
  if (!name || !phone || !message) {
    alert('Please fill in all fields');
    return;
  }

  // Send message via AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'send_message.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      alert('Your message has been sent');
      nameInput.value = '';
      phoneInput.value = '';
      messageInput.value = '';
      chatTitle.textContent = 'Hello, how can I help you?';
      messageForm.style.display = 'none';
      chatOptions.style.display = 'block';
    } else {
      alert('There was an error sending your message');
    }
  };
  xhr.send(`name=${name}&phone=${phone}&message=${message}`);
});
