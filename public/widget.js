(function () {

  const CHATBOT_URL = 'https://nobili-portrait.vercel.app';
  const style = document.createElement('style');

  style.innerHTML = `
    #neo-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-image: url('${CHATBOT_URL}/neo-avatar.png');
      background-size: cover;
      background-position: center;
      cursor: pointer;
      z-index: 999999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    #neo-widget-popup {
      position: fixed;
      bottom: 95px;
      right: 20px;
      background: #1d1d1d;
      color: white;
      padding: 18px 42px 18px 18px;
      border-radius: 18px;
      max-width: 260px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      z-index: 999999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      opacity: 0;
      transform: translateY(10px);
      transition: all .3s ease;
    }

    #neo-widget-popup.show {
      opacity: 1;
      transform: translateY(0);
    }

    .neo-popup-close {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      opacity: 0.55;
      font-family: Arial, sans-serif;
    }

    .neo-popup-close:hover {
      opacity: 1;
    }

    #neo-widget-chat {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 380px;
      height: 700px;
      border-radius: 24px;
      overflow: hidden;
      background: #000;
      z-index: 999999;
      display: none;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }

    #neo-widget-chat iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

    #neo-widget-chat-close {
      position: fixed;
      bottom: 765px;
      right: 34px;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      background: rgba(255,255,255,0.16);
      color: #ffffff;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000000;
      font-family: Arial, sans-serif;
      font-size: 22px;
      line-height: 1;
    }

    #neo-widget-chat-close:hover {
      background: rgba(255,255,255,0.25);
    }

    @media(max-width:768px) {
  #neo-widget-chat {
    width: calc(100vw - 24px);
    height: calc(100dvh - 24px);
    right: 12px;
    left: 12px;
    bottom: 12px;
    top: 12px;
    border-radius: 22px;
    max-width: none;
    max-height: none;
  }

  #neo-widget-chat iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  #neo-widget-chat-close {
    top: 22px;
    right: 22px;
    bottom: auto;
  }

  #neo-widget-popup {
    right: 15px;
    bottom: 90px;
    max-width: 220px;
    font-size: 13px;
    padding: 14px 38px 14px 16px;
  }

  #neo-widget-button {
    right: 15px;
    bottom: 15px;
  }
}

      #neo-widget-chat-close {
        top: 14px;
        right: 14px;
        bottom: auto;
        background: rgba(255,255,255,0.16);
      }

      #neo-widget-popup {
        right: 15px;
        bottom: 90px;
        max-width: 220px;
        font-size: 13px;
        padding: 14px 38px 14px 16px;
      }

      #neo-widget-button {
        right: 15px;
        bottom: 15px;
      }
    }
  `;

  document.head.appendChild(style);

  const popup = document.createElement('div');
  popup.id = 'neo-widget-popup';

  popup.innerHTML = `
    <div class="neo-popup-close">×</div>
    <strong>Ciao, sono NEO 👋</strong><br>
    Posso aiutarti a comprendere meglio la nostra proposta?
  `;

  document.body.appendChild(popup);

  popup.querySelector('.neo-popup-close').addEventListener('click', function () {
    popup.style.display = 'none';
  });

  setTimeout(function () {
    popup.classList.add('show');
  }, 1200);

  if (window.innerWidth <= 768) {
    setTimeout(function () {
      popup.classList.remove('show');
    }, 8000);
  }

  const button = document.createElement('div');
  button.id = 'neo-widget-button';
  document.body.appendChild(button);

  const chat = document.createElement('div');
  chat.id = 'neo-widget-chat';
  chat.innerHTML = `<iframe src="${CHATBOT_URL}"></iframe>`;
  document.body.appendChild(chat);

  const closeChat = document.createElement('div');
  closeChat.id = 'neo-widget-chat-close';
  closeChat.innerHTML = '×';
  document.body.appendChild(closeChat);

  function openChat() {
    chat.style.display = 'block';
    closeChat.style.display = 'flex';
    popup.style.display = 'none';
  }

  function closeChatBox() {
    chat.style.display = 'none';
    closeChat.style.display = 'none';
  }

  button.addEventListener('click', function () {
    if (chat.style.display === 'block') {
      closeChatBox();
    } else {
      openChat();
    }
  });

  closeChat.addEventListener('click', closeChatBox);

})();
