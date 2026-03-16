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

const Chatbot = {
  getIntent(text) {
    const lowerText = text.toLowerCase();
    for (const [intent, words] of Object.entries(KEYWORDS)) {
      if (words.some((word) => lowerText.includes(word))) {
        return intent;
      }
    }
  },
  async generateResponse(text) {
    await new Promise((resolve) => setTimeout(resolve, BOT_DELAY));
    const intent = this.getIntent(text);
    const responses = BOT_RESPONSES[intent] || BOT_RESPONSES.default;
    return responses[Math.floor(Math.random() * responses.length)];
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
      welcomeMessage: document.getElementById("welcomeMessage"),
      clearChatBtn: document.getElementById("clearChatBtn"),
    };
    this.init();
  }
  init() {
    console.log(`🚀 Qubi App Initializing...`);
    this.attachEvents();
    this.loadHistory();
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

    this.nodes.clearChatBtn.addEventListener("click", () => {
      if (confirm("Are you sure to delete all the messages!")) {
        Storage.clear();
        location.reload();
      }
    });

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

    this.addMessageToUI(msg);
    Storage.save(msg);
    this.nodes.messageInput.value = "";
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

  addMessageToUI(msg) {
    if (this.nodes.welcomeMessage) {
      this.nodes.welcomeMessage.remove();
    }

    const isBot = msg.type === "bot";
    const template = `<div class = " flex gap-4 items-start message-slide-in ${isBot ? "" : "flex-row-reverse"}">
    <div class = flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 items-center justify-center ${isBot ? "bg-[#dcf8c6]" : "bg-gray-200"} " >${isBot ? this.getBotIcon() : this.getUserIcon()}</div>
    <div class="flex   max-w-[75%]">
    <div class="py-3 px-4 rounded-2xl ${
      isBot
        ? " bg-white border border-gray-100"
        : "bg-purple-100 text-gray-900 border border-purple-200 shadow-sm"
    }">
        <p class="text-[15px] leading-relaxed break-words [word-break:break-word] overflow-hidden">${msg.text}</p>
        <div class="flex items-center gap-1 mt-1 justify-end">
            <span class="text-[10px] text-gray-400 font-medium">${msg.time}</span>
            ${isBot ? "" : '<svg class="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>'}
        </div>
    </div>
    
</div>

    
    </div>`;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = template;

    this.nodes.chatMessages.insertBefore(wrapper, this.nodes.typingIndicator);
    this.scrollToBottom();
  }
  getBotIcon() {
    return `<div class="w-4 h-4 grid grid-cols-2 gap-0.5"><div class="w-1.5 h-1.5 bg-green-800 rounded-full"></div><div class="w-1.5 h-1.5 bg-green-800/30 rounded-full"></div><div class="w-1.5 h-1.5 bg-green-800/30 rounded-full"></div><div class="w-1.5 h-1.5 bg-green-800 rounded-full"></div></div>`;
  }

  getUserIcon() {
    return `<svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>`;
  }

  scrollToBottom() {
    this.nodes.chatMessages.scrollTo({
      top: this.nodes.chatMessages.scrollHeight,
      behavior: "smooth",
    });
  }
  showToast(msg) {
    const toast = this.nodes.toast;
    toast.style.opacity = 1;
    toast.innerText = msg;
    setTimeout(() => (toast.style.opacity = 0), 1000);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const app = new Qubi();
});
