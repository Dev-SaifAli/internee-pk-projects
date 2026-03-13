// CONFIGURATION & CONSTANTS

const STORAGE_KEY = "qubi_chat_history"; // localstorage key used to store user and chatBot msg objects.
const BOT_DELAY = 1000;

const BOT_RESPONSES = {
  greeting: [
    "Hey there! 👋 How can I help you today?",
    "Hello! I'm Qubi. Ready to assist with your marketing or sales needs.",
    "Hi! Nice to meet you! 😊",
  ],
  joke: [
    "Why don't scientists trust atoms? Because they make up everything! 😄",
    "Why did the computer go to the doctor? It had a virus! 💻",
  ],
  default: [
    "I've put together a draft based on the details you shared. Would you like to review it?",
    "That's a great point! How would you like to proceed?",
    "That sounds interesting! Tell me more. 🤔",
  ],
};

const KEYWORDS = {
  greeting: ["hi", "hello", "hey", "howdy"],
  joke: ["joke", "funny", "laugh"],
};

const Storage = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      console.log(`Failed to load messages : `, error);
      return [];
    }
  },
  save(msg) {
    try {
      const history = this.get();
      history.push(msg);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-50)));
      return true;
    } catch (error) {
      console.log(`Failed to save message: `, error);
      return false;
    }
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

// UI CONTROLLER
class Qubi {
  constructor() {
    this.nodes = {
      messageInput: document.getElementById("messageInput"),
      toast: document.getElementById("toast"),
      chatForm: document.getElementById("chatForm"),
      chatMessages: document.getElementById("chatMessages"),
      emojiBtn: document.getElementById("emojiBtn"),
      emojiPicker: document.getElementById("emojiPicker"),
      typingIndicator: document.getElementById("typingIndicator"),
    };
    this.init();
  }
  init() {
    console.log(`🚀 Qubi App Initializing...`);
    this.attachEvents();
    // this.loadHistory();
    if (this.nodes.messageInput) this.nodes.messageInput?.focus();
  }

  attachEvents() {
    this.nodes.chatForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleUserSend();
    });

    this.nodes.emojiBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.nodes.emojiPicker?.classList.toggle("hidden");
    });

    this.nodes.messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.nodes.chatForm.dispatchEvent(new Event("submit"));
      }
    });

    document.querySelectorAll(".emoji-item").forEach((item) =>
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const emoji = item.getAttribute("data-emoji") || item.textContent;
        this.nodes.messageInput.value += emoji;
        this.nodes.messageInput.focus();
      }),
    );

    this.nodes.messageInput.addEventListener("input", () => {
      this.adjustInputHeight();
    });

    // Global Events
    document.addEventListener("click", () => {
      this.nodes.emojiPicker?.classList.add("hidden");
    });
  }

  adjustInputHeight() {
    const input = this.nodes.messageInput;
    const prevHeight = input.offsetHeight;

    input.style.height = "auto";
    const newHeight = input.scrollHeight + `px`;
    input.style.height = prevHeight + `px`;

    requestAnimationFrame(() => {
      input.style.height = newHeight;
    });
  }

  handleUserSend() {
    const text = this.nodes.messageInput.value.trim();

    if (!text) {
      this.showToast("Enter a message!");
      return;
    }

    const msg = {
      id: Date.now(),
      text: text,
      type: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    this.addMsgToUI(msg);
    Storage.save(msg);

    this.processBotResponse(text);
  }

  async processBotResponse(inputText) {
    this.nodes.typingIndicator.classList.remove("hidden");
    this.scrollToBottom();

    const responseText = await Chatbot.generateResponse(inputText);

    // Hide indicator & Display msg
    this.nodes.typingIndicator.classList.add("hidden");
    const botMsg = {
      id: Date.now() + 1,
      type: "bot",
      text: responseText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    this.addMessageToUI(botMsg);
    Storage.save(botMsg);
  }

  showToast(msg) {
    const toast = this.nodes.toast;
    toast.style.opacity = 1;
    toast.innerText = msg;
    setTimeout(() => (toast.style.opacity = 0), 1000);
  }
}
const app = new Qubi();
