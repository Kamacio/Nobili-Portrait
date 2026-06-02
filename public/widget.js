<script>
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
      cursor: pointer;
      opacity: .7;
    }

    #neo-widget-chat {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 390px;
      height: 700px;
      border-radius: 26px;
      overflow: hidden;
      background: #f7f3ec;
      z-index: 999999;
      display: none;
      box-shadow: 0 28px 80px rgba(0,0,0,0.18);
      border: 1px solid rgba(20,20,20,0.10);
    }

    #neo-widget-chat iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      background: #f7f3ec;
    }

    #neo-widget-chat-close {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 42px;
      height: 42px;
      border-radius: 999px;
      background: rgba(0,0,0,0.82);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000002;
      font-family: Arial, sans-serif;
      font-size: 22px;
      font-weight: 700;
      line-height: 1;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    }

    @media(max-width:768px) {
      #neo-widget-chat {
        top: 0 !important;
        left: 0 !important;
        right: auto !important;
        bottom: auto !important;
        width: 100vw !important;
        height: 100svh !important;
        border-radius: 0 !important;
      }

      #neo-widget-popup {
        right: 16px;
        bottom: 88px;
        width: 250px;
        max-width: calc(100vw - 32px);
        font-size: 13px;
        line-height: 1.4;
        padding: 14px 38px 14px 16px;
        border-radius: 18px;
      }

      #neo-widget-button {
        right: 15px;
        bottom: 15px;
      }

      #neo-widget-chat.keyboard-open {
        height: 58vh !important;
      }
    }
  `;

  document.head.appendChild(style);

  function createWidget() {
    const popup = document.createElement('div');
    popup.id = 'neo-widget-popup';
    popup.innerHTML = `
      <div class="neo-popup-close">×</div>
      <strong>Ciao, sono NEO 👋</strong><br>
      Posso aiutarti a capire meglio questa proposta.
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

    chat.innerHTML = `
      <iframe src="${CHATBOT_URL}" allow="clipboard-write"></iframe>
      <div id="neo-widget-chat-close">×</div>
    `;

    document.body.appendChild(chat);

    const closeButton = chat.querySelector('#neo-widget-chat-close');

    function openChat() {
      chat.style.display = 'block';
      popup.style.display = 'none';

      if (window.innerWidth <= 768) {
        button.style.display = 'none';
      }
    }

    function closeChatBox() {
      chat.style.display = 'none';
      button.style.display = 'block';
    }

    button.addEventListener('click', function () {
      if (chat.style.display === 'block') {
        closeChatBox();
      } else {
        openChat();
      }
    });

    closeButton.addEventListener('click', closeChatBox);

    if (window.visualViewport) {
      const baseHeight = window.visualViewport.height;

      window.visualViewport.addEventListener('resize', function () {
        if (window.innerWidth > 768) return;

        const currentHeight = window.visualViewport.height;

        if (currentHeight < baseHeight - 120) {
          chat.classList.add('keyboard-open');
        } else {
          chat.classList.remove('keyboard-open');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
</script>
