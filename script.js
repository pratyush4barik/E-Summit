// ------------------- Mobile navigation toggle -------------------
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ------------------- Smooth scrolling -------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent scroll ONLY if it's the AI button
        if (this.id === "ai-assessment-btn") {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ------------------- Navbar scroll effects -------------------
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// ------------------- Animate elements on scroll -------------------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.department-card, .about-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ------------------- Button ripple effect -------------------
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    /* Glassy Chatbot Modal */
    #chatbot-modal {
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    #chatbot-messages {
        background: rgba(255, 255, 255, 0.8);
        padding: 10px;
        border-radius: 8px;
        color: #000;
        max-height: 300px;
        overflow-y: auto;
    }
`;
document.head.appendChild(style);

// ------------------- CTA buttons -------------------
document.querySelector('.cta-button')?.addEventListener('click', function () {
    document.querySelector('#about')?.scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.view-all-btn')?.addEventListener('click', function () {
    alert('All departments view is not implemented in this demo. This would typically show a comprehensive list of all medical departments.');
});

document.querySelector('.read-more-btn')?.addEventListener('click', function () {
    alert('Read more functionality is not implemented in this demo. This would typically show more detailed information about the healthcare facility.');
});

// ------------------- Loading animation -------------------
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ------------------- Chatbot Modal Handling -------------------
const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotModal = document.getElementById("chatbot-modal");
const closeChatbot = document.getElementById("close-chatbot");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chatbot-messages");

if (chatbotBtn && chatbotModal) {
    chatbotBtn.addEventListener("click", () => {
        chatbotModal.style.display = "flex";
    });
}

if (closeChatbot) {
    closeChatbot.addEventListener("click", () => {
        chatbotModal.style.display = "none";
    });
}

// Send message to backend
if (sendBtn && userInput && messages) {
    sendBtn.addEventListener("click", async () => {
        const text = userInput.value.trim();
        if (!text) return;

        // User msg
        const userMsg = document.createElement("p");
        userMsg.textContent = "You: " + text;
        messages.appendChild(userMsg);

        userInput.value = "";

        try {
            const res = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();

            const botMsg = document.createElement("p");
            botMsg.textContent = "AI: " + (data.reply || "Sorry, I didn’t understand that.");
            messages.appendChild(botMsg);

            messages.scrollTop = messages.scrollHeight;
        } catch (err) {
            const errMsg = document.createElement("p");
            errMsg.textContent = "Error connecting to AI.";
            messages.appendChild(errMsg);
        }
    });
}

// ------------------- AI Assessment Button -------------------
document.addEventListener("DOMContentLoaded", function () {
    const aiBtn = document.getElementById("ai-assessment-btn");
    const modal = document.getElementById("chatbot-modal");

    if (aiBtn && modal) {
        aiBtn.addEventListener("click", function (event) {
            event.preventDefault(); // stop scroll
            modal.style.display = "flex"; // show chatbot modal
        });
    }
});
