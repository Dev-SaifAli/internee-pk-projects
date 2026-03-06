// 1. CONFIGURATION & CONSTANTS

const STORAGE_KEY = "qubi_chat_history";
const BOT_DELAY = 1000; // ms

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

// 2. DATA PERSISTENCE (LocalStorage)

const Storage = {
  get: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      console.error("Storage load error:", e);
      return [];
    }
  },
  save: (message) => {
    const history = Storage.get();
    history.push(message);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-50))); // Keep last 50
  },
  clear: () => localStorage.removeItem(STORAGE_KEY),
};

// 3. CHATBOT ENGINE

const Chatbot = {
  getIntent: (text) => {
    const lowerText = text.toLowerCase();
    for (const [intent, words] of Object.entries(KEYWORDS)) {
      if (words.some((word) => lowerText.includes(word))) return intent;
    }
    return "default";
  },

  generateResponse: async (input) => {
    await new Promise((r) => setTimeout(r, BOT_DELAY));
    const intent = Chatbot.getIntent(input);
    const responses = BOT_RESPONSES[intent] || BOT_RESPONSES.default;
    return responses[Math.floor(Math.random() * responses.length)];
  },
};

// 4. UI CONTROLLER (Main Class)

class QubiApp {
  constructor() {
    this.nodes = {
      chatMessages: document.getElementById("chatMessages"),
      messageInput: document.getElementById("messageInput"),
      chatForm: document.getElementById("chatForm"),
      typingIndicator: document.getElementById("typingIndicator"),
      welcomeMessage: document.getElementById("welcomeMessage"),
      emojiBtn: document.getElementById("emojiBtn"),
      emojiPicker: document.getElementById("emojiPicker"),
      clearChatBtn: document.getElementById("clearChatBtn"),
      toast: document.getElementById("toast"),
    };
    this.init();
  }

  init() {
    console.log("🚀 Qubi App Initializing...");
    this.attachEvents();
    this.loadHistory();
    if (this.nodes.messageInput) this.nodes.messageInput.focus();
  }

  attachEvents() {
    // Form Handling
    this.nodes.chatForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleUserSend();
    });

    // Emoji System
    this.nodes.emojiBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.nodes.emojiPicker?.classList.toggle("hidden");
    });

    // Prevent Enter from creating a new line & trigger submit instead
    this.nodes.messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.nodes.chatForm.dispatchEvent(new Event("submit"));
      }
    });
    // Dynamic Height Adjustment based on content
    this.nodes.messageInput.addEventListener("input", () => {
      this.adjustInputHeight();
    });

    document.querySelectorAll(".emoji-item").forEach((item) => {
      item.addEventListener("click", () => {
        const emoji = item.getAttribute("data-emoji") || item.textContent;
        this.nodes.messageInput.value += emoji;
        this.nodes.emojiPicker?.classList.add("hidden");
        this.nodes.messageInput.focus();
      });
    });

    // Clear Chat
    this.nodes.clearChatBtn?.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all chat messages?")) {
        Storage.clear();
        location.reload();
      }
    });

    // Global Clicks (Close popups)
    document.addEventListener("click", () => {
      this.nodes.emojiPicker?.classList.add("hidden");
    });
  }
  adjustInputHeight() {
    const input = this.nodes.messageInput;
    // Reset height to calculate scrollHeight correctly
    input.style.height = "auto";
    // Set new height based on scrollHeight
    input.style.height = input.scrollHeight + "px";
  }
  handleUserSend() {
    const text = this.nodes.messageInput.value.trim();

    if (!text) {
      this.showToast("Please enter a message!");
      return;
    }

    const msg = {
      id: Date.now(),
      type: "user",
      text: text,
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
    // Show indicator
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
    // Remove welcome screen on first interaction
    if (this.nodes.welcomeMessage) {
      this.nodes.welcomeMessage.remove();
      this.nodes.welcomeMessage = null;
    }

    const isBot = msg.type === "bot";

    // Use clean template string for engineer readability
    const template = `
            <div class="flex items-start gap-4 message-slide-in ${isBot ? "" : "flex-row-reverse"}">
                <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isBot ? "bg-[#dcf8c6]" : "bg-gray-200"}">
                    ${isBot ? this.getBotIcon() : this.getUserIcon()}
                </div>
                <div class="flex flex-col  max-w-[75%]">
                    <div class="py-3 px-4 rounded-2xl ${isBot ? "bg-white border border-gray-100" : "bg-purple-100 text-gray-900 border border-purple-200 shadow-sm"}">
        <p class="text-[15px] leading-relaxed break-words [word-break:break-word] overflow-hidden">${msg.text}</p>
                        <div class="flex items-center gap-1 mt-1 justify-end">
                            <span class="text-[10px] text-gray-400 font-medium">${msg.time}</span>
                            ${isBot ? "" : '<svg class="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>'}
                        </div>
                    </div>
                </div>
            </div>
        `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = template;

    // Always insert before the typing indicator
    this.nodes.chatMessages.insertBefore(
      wrapper.firstElementChild,
      this.nodes.typingIndicator,
    );
    this.scrollToBottom();
  }

  loadHistory() {
    const history = Storage.get();
    if (history.length > 0) {
      history.forEach((msg) => this.addMessageToUI(msg));
    }
  }

  scrollToBottom() {
    // scrollTo -built-in browser command

    this.nodes.chatMessages.scrollTo({
      top: this.nodes.chatMessages.scrollHeight,
      behavior: "smooth",
    });
  }

  showToast(message) {
    if (!this.nodes.toast) return;
    this.nodes.toast.textContent = message;
    this.nodes.toast.classList.remove("opacity-0");
    this.nodes.toast.classList.add("opacity-100");
    setTimeout(() => {
      this.nodes.toast.classList.replace("opacity-100", "opacity-0");
    }, 3000);
  }

  getBotIcon() {
    return `<div class="w-4 h-4 grid grid-cols-2 gap-0.5"><div class="w-1.5 h-1.5 bg-green-800 rounded-full"></div><div class="w-1.5 h-1.5 bg-green-800/30 rounded-full"></div><div class="w-1.5 h-1.5 bg-green-800/30 rounded-full"></div><div class="w-1.5 h-1.5 bg-green-800 rounded-full"></div></div>`;
  }

  getUserIcon() {
    return `<svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>`;
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  window.app = new QubiApp();
});
