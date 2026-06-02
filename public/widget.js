(function () {
  const CHATBOT_URL = 'https://nobili-portrait.vercel.app';

  function initNeoWidget() {
    if (document.getElementById('neo-widget-button')) return;

    const style = document.createElement('style');

    style.innerHTML = `
      #neo-widget-button {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-image: url('${CHATBOT_URL}/neo-avatar.png');
        background-size: cover;
        background-position: center;
        background-color: #111;
        cursor: pointer;
        z-index: 2147483646;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      }

      #neo-widget-popup {
        position: fixed;
        right: 20px;
        bottom: 95px;
        max-width: 260px;
        background: #1d1d1d;
        color: #fff;
        padding: 18px 42px 18px 18px;
        border-radius: 18px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        z-index: 2147483645;
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
        right: 20px;
        bottom: 100px;
        width: 390px;
        height: 700px;
        max-width: calc(100vw - 40px);
        max-height: calc(100vh - 130px);
        border-radius: 26px;
        overflow: hidden;
        background: #f7f3ec;
        z-index: 2147483647;
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
        z-index: 2147483647;
        font-family: Arial, sans-serif;
        font-size: 22px;
        font-weight: 700;
        line-height: 1;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      }

      @media (max-width: 768px) {
        #neo-widget-chat {
          top: var(--neo-top, 0px) !important;
          left: 0 !important;
          right: auto !important;
          bottom: auto !important;
          width: 100vw !important;
          height: var(--neo-height, 100svh) !important;
          max-width: none !important;
          max-height: none !important;
          border-radius: 0 !important;
        }

        #neo-widget-button {
          right: 15px;
          bottom: 15px;
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

        #neo-widget-chat-close {
          top: calc(14px + env(safe-area-inset-top));
          right: 14px;
        }
      }
    `;

    document.head.appendChild(style);

    const popup = document.createElement('div');
    popup.id = 'neo-widget-popup';
    popup.innerHTML = `
      <div class="neo-popup-close">×</div>
      <strong>Ciao, sono NEO 👋</strong><br>
      Posso aiutarti a capire meglio questa proposta.
    `;
    document.body.appendChild(popup);

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

    const popupClose = popup.querySelector('.neo-popup-close');
    const chatClose = chat.querySelector('#neo-widget-chat-close');

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function updateMobileSize() {
      if (!isMobile()) return;

      let height = window.innerHeight;
      let top = 0;

      if (window.visualViewport) {
        height = window.visualViewport.height;
        top = window.visualViewport.offsetTop;
      }

      document.documentElement.style.setProperty('--neo-height', height + 'px');
      document.documentElement.style.setProperty('--neo-top', top + 'px');
    }

    function openChat() {
      updateMobileSize();

      chat.style.display = 'block';
      popup.style.display = 'none';

      if (isMobile()) {
        button.style.display = 'none';
      }

      setTimeout(updateMobileSize, 300);
      setTimeout(updateMobileSize, 700);
    }

    function closeChat() {
      chat.style.display = 'none';
      button.style.display = 'block';
      document.documentElement.style.removeProperty('--neo-height');
      document.documentElement.style.removeProperty('--neo-top');
    }

    button.addEventListener('click', function () {
      if (chat.style.display === 'block') {
        closeChat();
      } else {
        openChat();
      }
    });

    chatClose.addEventListener('click', closeChat);

    popupClose.addEventListener('click', function () {
      popup.style.display = 'none';
    });

    setTimeout(function () {
      popup.classList.add('show');
    }, 1200);

    if (isMobile()) {
      setTimeout(function () {
        popup.classList.remove('show');
      }, 8000);
    }

    window.addEventListener('resize', updateMobileSize);
    window.addEventListener('orientationchange', function () {
      setTimeout(updateMobileSize, 300);
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateMobileSize);
      window.visualViewport.addEventListener('scroll', updateMobileSize);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNeoWidget);
  } else {
    initNeoWidget();
  }
})();
