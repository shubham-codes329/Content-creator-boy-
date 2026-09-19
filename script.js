// --- 1. Sound Generator using Web Audio API (No External Audio Files Needed) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'blessing') {
        // High magic chime sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'idea') {
        // Futuristic synth blip
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === 'joke') {
        // Funny boing sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(400, now + 0.15);
        osc.frequency.linearRampToValueAtTime(200, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'wealth') {
        // Cash register chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    }
}


// --- 2. Data Bank for Love (Ideas, Blessings, Jokes, Wealth) ---
const dataBank = {
    blessing: [
        {
            icon: "🔥",
            title: "Unstoppable Momentum",
            body: "To my brother Love: Every hour you spend cut-by-cut in the timeline is building your empire. You are destined to touch millions of hearts and earn big!"
        },
        {
            icon: "👑",
            title: "Master of the Craft",
            body: "May your render speed be lightning-fast, your cuts be seamless, and your creativity never run out. Success is already chasing you, Love!"
        },
        {
            icon: "🌟",
            title: "The Creator Blessing",
            body: "Greatness takes time. Never feel discouraged by low views today. One viral video will change your entire life, Love!"
        }
    ],
    idea: [
        {
            icon: "🎬",
            title: "Before vs After Editing Magic",
            body: "Show a raw, boring phone video for 3 seconds, then cut to your heavily color-graded, sound-designed version. Captions: 'What 1 year of editing practice looks like.'"
        },
        {
            icon: "📱",
            title: "Micro-Documentary Reels",
            body: "Edit a fast-paced 45-second story about how a famous YouTuber built their wealth. Use fast zoom-ins, SFX, and kinetic typography."
        },
        {
            icon: "🔊",
            title: "The Sound Design Test",
            body: "Play a video clip with ZERO audio. Then play it again with epic swooshes, impacts, and footsteps. Ask viewers: 'Can you feel the difference?'"
        },
        {
            icon: "💡",
            title: "The 'Secret Editing Trick' Reel",
            body: "Teach 1 quick transition tip in Premiere Pro or After Effects in under 30 seconds. Creators love saving these videos to their bookmarks!"
        }
    ],
    joke: [
        {
            icon: "🤣",
            title: "The Timeline Lie",
            body: "Client: 'Can you make one quick change?' Me: *Spends 4 hours completely re-editing the timeline*"
        },
        {
            icon: "💻",
            title: "Premiere Pro's Secret",
            body: "Premiere Pro doesn't crash randomly. It just takes an unexpected nap whenever you forget to press Ctrl + S!"
        },
        {
            icon: "📁",
            title: "File Naming Masters",
            body: "Project_Final.mp4 ➔ Project_Final_v2.mp4 ➔ Project_REAL_FINAL.mp4 ➔ Project_God_Please_Help_Me_FINAL.mp4"
        },
        {
            icon: "🎧",
            title: "Editor's Superpower",
            body: "I can re-watch the same 2-second video clip 500 times in a row without losing my mind... well, almost."
        }
    ],
    wealth: [
        {
            icon: "💸",
            title: "Viral Alert Activated!",
            body: "ALERT: Love's next Reel just hit 1,000,000 Views! +15,000 New Followers and 5 Brand Deal Sponsorship emails received!"
        },
        {
            icon: "💰",
            title: "Monetization Unlocked",
            body: "Your editing skill is now generating $5,000/month in client work, YouTube revenue, and preset sales. Keep grinding, Love!"
        },
        {
            icon: "🚀",
            title: "The Millionaire Editor",
            body: "Wealth blessing granted! Your timeline skills have successfully unlocked financial freedom. Time to buy that dream editing setup!"
        }
    ]
};

// Particle Emojis matching each category
const particleEmojis = {
    blessing: ['✨', '❤️', '🔥', '🚀', '👑'],
    idea: ['💡', '🎬', '📌', '🎥', '⚡'],
    joke: ['🤣', '💀', '🤡', '💻', '🎬'],
    wealth: ['💸', '💰', '💎', '📈', '💵']
};


// --- 3. Interactive Multi-Click Trigger Function ---
function triggerAction(type, event) {
    // Play Sound
    playSound(type);

    // Pick random item from data bank
    const items = dataBank[type];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    // Update Output Screen with smooth transition
    const screen = document.getElementById('output-screen');
    screen.style.transform = "scale(0.98)";
    screen.style.opacity = "0.7";

    setTimeout(() => {
        document.getElementById('output-icon').innerText = randomItem.icon;
        document.getElementById('output-title').innerText = randomItem.title;
        document.getElementById('output-body').innerText = randomItem.body;
        
        screen.style.transform = "scale(1)";
        screen.style.opacity = "1";
    }, 150);

    // Spawn Particles Explosion at cursor location
    spawnParticles(event.clientX, event.clientY, particleEmojis[type]);
}


// --- 4. Particle FX Engine ---
function spawnParticles(x, y, emojiList) {
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random emoji selection
        particle.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];

        // Calculate random explosive trajectory coordinates
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 120;
        const dx = `${Math.cos(angle) * distance}px`;
        const dy = `${Math.sin(angle) * distance - 50}px`; // slight upwards bias

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--dx', dx);
        particle.style.setProperty('--dy', dy);

        document.body.appendChild(particle);

        // Auto remove from DOM after animation completes
        setTimeout(() => particle.remove(), 1200);
    }
}


// --- 5. Smooth 3D Card Tilt Effect ---
const heroContainer = document.getElementById('hero-container');
const card3d = document.getElementById('card3d');

heroContainer.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const rect = heroContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((e.clientY - centerY) / rect.height) * -20;
        const rotateY = ((e.pageX - centerX) / rect.width) * 20;

        card3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

heroContainer.addEventListener('mouseleave', () => {
    card3d.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card3d.style.transition = `transform 0.5s ease`;
});

heroContainer.addEventListener('mouseenter', () => {
    card3d.style.transition = `none`;
});
