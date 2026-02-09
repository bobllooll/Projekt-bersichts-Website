// Begrüßung basierend auf der Tageszeit anpassen

// --- MAGNETIC BUTTONS LOGIC ---
function initMagneticElements() {
    const magnets = document.querySelectorAll('.magnetic');

    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            // Mausposition relativ zur Mitte des Buttons
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Bewegungsfaktor (je höher, desto stärker der Magnet)
            const strength = 0.5;

            magnet.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        magnet.addEventListener('mouseleave', () => {
            // Zurückschnappen
            magnet.style.transform = 'translate(0, 0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // --- CONSOLE LOADING ANIMATION ---
    setTimeout(() => {
        let progress = 0;
        const systemLogs = [
            "Loading Kernel Modules...",
            "Mounting File System...",
            "Decrypting User Data...",
            "Establishing Secure Handshake...",
            "Verifying Integrity...",
            "Allocating Memory Blocks...",
            "Initializing GPU Drivers...",
            "Compiling Shaders...",
            "Optimizing Assets...",
            "Connecting to Neural Net..."
        ];

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 5) + 2;
            if (progress > 100) progress = 100;

            console.clear();

            // Ladebalken generieren
            const barLength = 30;
            const filledLength = Math.round((progress / 100) * barLength);
            const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);

            // Zufälligen Log auswählen für den Matrix-Effekt
            const currentLog = systemLogs[Math.floor(Math.random() * systemLogs.length)];
            console.log(`%c[SYSTEM] ${currentLog}`, "color: #0f0; font-family: monospace;");
            console.log(`%cDownloading Resources: [${bar}] ${progress}%`, "color: #0f0; font-family: monospace; font-weight: bold;");

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    console.clear();
                    console.log(
                        "%c" +
                        "██╗  ██╗ █████╗ ███╗   ██╗███╗   ██╗███████╗██╗  ██╗███████╗███╗   ██╗\n" +
                        "██║  ██║██╔══██╗████╗  ██║████╗  ██║██╔════╝██║ ██╔╝██╔════╝████╗  ██║\n" +
                        "███████║███████║██╔██╗ ██║██╔██╗ ██║█████╗  █████╔╝ █████╗  ██╔██╗ ██║\n" +
                        "██╔══██║██╔══██║██║╚██╗██║██║╚██╗██║██╔══╝  ██╔═██╗ ██╔══╝  ██║╚██╗██║\n" +
                        "██║  ██║██║  ██║██║ ╚████║██║ ╚████║███████╗██║  ██╗███████╗██║ ╚████║\n" +
                        "╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝",
                        "color: #d946ef; font-weight: bold; font-size: 10px; text-shadow: 0 0 10px rgba(217, 70, 239, 0.8);"
                    );
                }, 500);
            }
        }, 80);
    }, 500);

    // --- CINEMATIC PRELOADER ---
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.preloader-counter');
    const faviconLink = document.querySelector("link[rel~='icon']");
    let count = 0;

    // Simulierter Ladevorgang
    const loadInterval = setInterval(() => {
        // Zufällige Sprünge für Realismus
        count += Math.floor(Math.random() * 5) + 1;
        if (count > 100) count = 100;

        if (counter) counter.textContent = count + '%';

        // --- FAVICON ANIMATION (Ladebalken im Tab) ---
        if (faviconLink) {
            // Umfang des Rechtecks im SVG (ca. 366px)
            const perimeter = 366;
            const dash = (count / 100) * perimeter;
            // Wir aktualisieren den SVG-String direkt im href
            const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23050505' stroke='%23d946ef' stroke-width='6' stroke-dasharray='${dash} 400' /><text x='50' y='75' font-family='sans-serif' font-weight='900' font-size='65' text-anchor='middle' fill='%23ffffff'>H</text></svg>`;
            faviconLink.href = `data:image/svg+xml,${svg}`;
        }

        if (count === 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                if (preloader) preloader.classList.add('finished');
            }, 200); // Kurze Pause bei 100%
        }
    }, 20); // Geschwindigkeit des Zählers

    const headerP = document.querySelector('header p');
    const hour = new Date().getHours();
    let greeting = "Willkommen";

    if (hour < 12) greeting = "Wunderschönen guten Morgen";
    else if (hour < 18) greeting = "Moin";
    else greeting = "Wunderschönen guten Abend";

    // Text sanft aktualisieren
    if (headerP) headerP.textContent = `${greeting}! Hier ist eine Übersicht meiner Projekte.`;

    // --- PROJEKTE RENDERN ---
    const grid = document.querySelector('.project-grid');

    if (grid && typeof projectsData !== 'undefined') {
        grid.innerHTML = ''; // Container leeren

        projectsData.forEach((project, index) => {
            // Element erstellen (div für Platzhalter, a für Links)
            const card = document.createElement(project.isPlaceholder ? 'div' : 'a');
            card.className = `project-card ${project.isPlaceholder ? 'placeholder' : ''}`;

            if (!project.isPlaceholder) {
                card.href = project.link;
            }

            // Theme Color setzen (für CSS Variablen)
            const themeColor = project.themeColor || '#d946ef';
            card.style.setProperty('--theme-color', themeColor);

            // Zufällige Tech-ID generieren (für den Sci-Fi Look)
            const techId = `ID-${Math.floor(Math.random() * 900) + 100}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
            card.dataset.techId = techId; // Speichern für Scramble Effekt

            // Initial unsichtbar für Scroll Animation
            // Die Klasse 'visible' wird später per Observer hinzugefügt

            // Icon Inhalt bestimmen
            let iconHtml = '';
            if (project.icon.type === 'image') {
                const fallbackSvg = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
                iconHtml = `<img src="${project.icon.content}" alt="${project.title} Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><div style="display:none;">${fallbackSvg}</div>`;
            } else {
                iconHtml = project.icon.content;
            }

            card.innerHTML = `
                <span class="card-number">0${index + 1}</span>
                <span class="tech-id">${techId}</span>
                <div class="card-icon" style="background-color: ${project.isPlaceholder ? 'transparent' : '#000'};">
                    ${iconHtml}
                </div>
                <div class="card-content">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    ${!project.isPlaceholder ? '<span class="btn-link magnetic">App öffnen &rarr;</span>' : ''}
                </div>
            `;

            // Referenz zum Button für Feedback-Status speichern
            const linkBtn = card.querySelector('.btn-link');

            // --- URL CHECK & FALLBACK LOGIC ---
            if (!project.isPlaceholder) {
                card.addEventListener('click', async (e) => {
                    e.preventDefault();

                    // Button Feedback (Lade-Status)
                    const originalText = linkBtn ? linkBtn.textContent : '';
                    if (linkBtn) {
                        linkBtn.textContent = "Verbinde...";
                        linkBtn.style.opacity = "0.7";
                    }
                    card.style.cursor = "wait";

                    const fallbackUrl = project.fallbackLink;
                    const targetUrl = project.link;

                    // Wenn kein Fallback definiert ist, direkt weiterleiten
                    if (!fallbackUrl) {
                        window.location.href = targetUrl;
                        return;
                    }

                    try {
                        // Versuch die URL zu erreichen (Timeout 2s)
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 2000);

                        // mode: 'no-cors' erlaubt opaque responses. 
                        // Wir prüfen nur auf Netzwerk-Fehler (DNS, Timeout, Refused).
                        // HTTP Fehler (404, 500) werden als success gewertet bei no-cors,
                        // aber das ist meist okay, da wir ja "erreichbarkeit" testen.
                        await fetch(targetUrl, {
                            method: 'HEAD',
                            mode: 'no-cors',
                            signal: controller.signal
                        });

                        clearTimeout(timeoutId);
                        // Erfolg -> Original URL
                        window.location.href = targetUrl;

                    } catch (error) {
                        console.warn(`Haupt-URL ${targetUrl} nicht erreichbar, nutze Fallback: ${fallbackUrl}`, error);
                        // Fehler -> Fallback URL
                        // Kurzes Feedback für User
                        if (linkBtn) linkBtn.textContent = "Nutze Fallback...";

                        // Kurze Verzögerung für UX
                        setTimeout(() => {
                            window.location.href = fallbackUrl;
                        }, 500);
                    } finally {
                        // Reset UI (falls User zurückkommt oder Navigation abbricht)
                        setTimeout(() => {
                            if (linkBtn) {
                                linkBtn.textContent = originalText;
                                linkBtn.style.opacity = "1";
                            }
                            card.style.cursor = "pointer";
                        }, 3000);
                    }
                });
            }

            // --- 3D TILT EFFEKT ---
            // Macht die Karten interaktiv, als wären sie physische Objekte
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Mitte der Karte berechnen
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Für den Spotlight-Effekt im CSS
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // Rotation berechnen (max +/- 8 Grad für subtilen Effekt)
                // Wir nutzen einen sehr subtilen Tilt + Scale für das "Floating"-Gefühl
                const rotateX = ((y - centerY) / centerY) * -2;
                const rotateY = ((x - centerX) / centerX) * 2;

                // Transition für Transform entfernen, damit es der Maus sofort folgt
                // Box-Shadow behält die weiche Transition
                card.style.transition = 'box-shadow 0.3s ease, transform 0.05s linear';

                // Scale 1.03 hier festlegen, damit es konsistent mit dem Hover-Status ist
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

                // --- TECH ID SCRAMBLE EFFECT ---
                const techIdEl = card.querySelector('.tech-id');
                if (techIdEl && !techIdEl.dataset.animating) {
                    techIdEl.dataset.animating = "true";
                    let iterations = 0;
                    const originalText = card.dataset.techId;

                    const interval = setInterval(() => {
                        techIdEl.innerText = originalText.split("")
                            .map((letter, index) => {
                                if (index < iterations) return originalText[index];
                                return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                            })
                            .join("");

                        if (iterations >= originalText.length) {
                            clearInterval(interval);
                            techIdEl.dataset.animating = "";
                        }
                        iterations += 1 / 2; // Geschwindigkeit des Entschlüsselns
                    }, 30);
                }
            });

            card.addEventListener('mouseleave', () => {
                // Beim Verlassen sanft zurücksetzen
                card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                // Reset Mouse Position für Glow Fadeout
                card.style.setProperty('--mouse-x', `-999px`);
                card.style.setProperty('--mouse-y', `-999px`);
            });

            grid.appendChild(card);
        });

        // --- SCROLL ANIMATION OBSERVER ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Observer beenden, damit es nicht immer wieder animiert beim Rausscrollen
                    // observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1, // 10% der Karte müssen sichtbar sein
            rootMargin: "0px 0px -50px 0px" // Etwas Versatz nach unten
        });

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });

        // --- INITIALISIERUNG DER NEUEN EFFEKTE ---

        // 1. Magnetic Buttons aktivieren (auch für Header Links)
        document.querySelectorAll('.social-links a, .profile-link, .footer-cta').forEach(el => el.classList.add('magnetic'));
        initMagneticElements();

        // 2. High-Performance Scroll Loop
        // Wir cachen die Elemente, damit wir sie nicht bei jedem Scroll neu suchen müssen (Performance Boost!)
        const header = document.querySelector('header');
        const blobs = document.querySelectorAll('.blob');
        const projectCards = document.querySelectorAll('.project-card');
        let lastScrollY = window.scrollY;
        let scrollTimeout;
        let ticking = false;

        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;
            // --- MARQUEE SCROLL DIRECTION LOGIC ---
            // Wir steuern die Laufschrift basierend auf der Scroll-Richtung
            const marqueeContent = document.querySelector('.marquee-content');
            if (marqueeContent) {
                // Initialisierung (nur einmal)
                if (!window.marqueeInitialized) {
                    // Inhalt verdoppeln für nahtlosen Loop
                    marqueeContent.innerHTML += marqueeContent.innerHTML;
                    window.marqueePos = 0;
                    window.marqueeSpeed = 1; // Basisgeschwindigkeit
                    window.marqueeTargetSpeed = 1;
                    window.marqueeInitialized = true;

                    // Animation Loop
                    function animateMarquee() {
                        // Smooth Interpolation für Geschwindigkeit
                        window.marqueeSpeed += (window.marqueeTargetSpeed - window.marqueeSpeed) * 0.1;

                        window.marqueePos -= window.marqueeSpeed;

                        // Reset Logic (Loop)
                        // Wir nehmen an, der Inhalt wurde verdoppelt, also resetten wir bei der Hälfte
                        const halfWidth = marqueeContent.scrollWidth / 2;

                        if (window.marqueePos <= -halfWidth) window.marqueePos = 0;
                        if (window.marqueePos > 0) window.marqueePos = -halfWidth;

                        marqueeContent.style.transform = `translateX(${window.marqueePos}px)`;
                        requestAnimationFrame(animateMarquee);
                    }
                    animateMarquee();
                }

                // Geschwindigkeit basierend auf Scroll anpassen
                // Scroll runter -> Positiv (nach links), Scroll hoch -> Negativ (nach rechts)
                // Wir setzen einen Timeout, um zur Basisgeschwindigkeit zurückzukehren
                // Diese Logik ist unten im Scroll-Event integriert
            }

            // Scroll Velocity für Marquee
            if (window.marqueeInitialized) {
                // Wir berechnen Delta hier grob, für Marquee reicht das
                // Für präzise Physik nutzen wir die Render-Loop
                window.marqueeTargetSpeed = 3; // Standard Speed bei Bewegung

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    window.marqueeTargetSpeed = 1; // Zurück zu langsam
                }, 100);
            }

            // Request Animation Frame für visuelle Updates (verhindert Lag)
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateScrollVisuals(lastScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Die optimierte Render-Funktion
        function updateScrollVisuals(scrolled) {
            // Hero Parallax
            if (header) {
                // Nur berechnen wenn Header noch sichtbar ist (spart CPU)
                if (scrolled < 1000) {
                    header.style.opacity = 1 - (scrolled / 700);
                    header.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 - scrolled / 5000})`;
                }
            }

            // Blobs Parallax
            blobs.forEach((blob, index) => {
                const speed = 0.2 + (index * 0.1);
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Karten Nummern Parallax (Optimiert)
            projectCards.forEach(card => {
                const number = card.querySelector('.card-number');
                if (number) {
                    // Wir nutzen offsetTop statt getBoundingClientRect um Reflows zu minimieren
                    // Das ist viel schneller!
                    const cardTop = card.offsetTop;
                    const viewportTop = scrolled;
                    const windowHeight = window.innerHeight;

                    // Einfache Prüfung ob im Viewport (grob)
                    if (cardTop > viewportTop - 500 && cardTop < viewportTop + windowHeight) {
                        const yPos = (viewportTop + windowHeight - cardTop) * 0.05;
                        number.style.transform = `translateY(${yPos}px)`;
                    }
                }
            });
        }

        // --- BACK TO TOP BUTTON ---
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // --- EASTER EGG: KONAMI CODE ---
    // Tippe: Hoch, Hoch, Runter, Runter, Links, Rechts, Links, Rechts, B, A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let kIndex = 0;
    let confettiInterval;

    // Hilfsfunktionen für Party Mode
    function createConfetti() {
        // Neon-Farben passend zum Theme (Lila, Cyan, Pink, Grün, Blau)
        const colors = ['#d946ef', '#6366f1', '#2196f3', '#4caf50', '#ffb300', '#ff00ff', '#00ffff'];
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);

        // Entfernen nach Animation
        setTimeout(() => confetti.remove(), 5000);
    }

    function startConfetti() {
        if (!confettiInterval) confettiInterval = setInterval(createConfetti, 50);
    }

    function stopConfetti() {
        clearInterval(confettiInterval);
        confettiInterval = null;
        document.querySelectorAll('.confetti').forEach(c => c.remove());
    }

    function showToast(message) {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');

        // Auto-Hide nach 3 Sekunden
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[kIndex]) {
            kIndex++;
            if (kIndex === konamiCode.length) {
                document.body.classList.toggle('party-mode');
                const isParty = document.body.classList.contains('party-mode');

                if (isParty) {
                    showToast("🎉 Partymodus aktiviert!");
                    startConfetti();
                } else {
                    showToast("Partymodus deaktiviert");
                    stopConfetti();
                }

                // Titel wackeln lassen
                const h1 = document.querySelector('h1');
                if (h1) {
                    h1.style.animation = 'none';
                    h1.offsetHeight; /* Trigger reflow */
                    h1.style.animation = 'float 0.5s ease-in-out';
                }

                kIndex = 0;
            }
        } else {
            kIndex = 0;
        }
    });

    // --- DISCORD STATUS (via Lanyard) ---
    // 1. Tritt dem Lanyard Discord bei: https://discord.gg/lanyard
    // 2. Füge hier deine ID ein:
    const DISCORD_USER_ID = '473915884088328222';

    async function updateDiscordStatus() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
            const data = await response.json();

            if (data.success) {
                const status = data.data.discord_status; // online, idle, dnd, offline
                const badge = document.querySelector('.status-badge');

                if (badge) {
                    // Alle Status-Klassen entfernen
                    badge.classList.remove('busy', 'idle', 'offline');

                    // Neue Klasse setzen
                    switch (status) {
                        case 'dnd':
                            badge.classList.add('busy');
                            badge.title = "Bitte nicht stören";
                            break;
                        case 'idle':
                            badge.classList.add('idle');
                            badge.title = "Abwesend";
                            break;
                        case 'offline':
                            badge.classList.add('offline');
                            badge.title = "Offline";
                            break;
                        default:
                            badge.title = "Online"; // Standard ist Grün
                    }
                }

                // --- PROFILBILD VOM DISCORD LADEN ---
                const discordUser = data.data.discord_user;
                const profileImg = document.querySelector('.profile-img');

                if (discordUser && discordUser.avatar && profileImg) {
                    const avatarUrl = `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${discordUser.avatar}.png?size=256`;
                    // Nur aktualisieren, wenn es noch nicht gesetzt ist (verhindert Flackern)
                    if (!profileImg.src.includes(discordUser.avatar)) {
                        profileImg.src = avatarUrl;
                    }
                }
            }
        } catch (error) {
            console.log('Discord Status konnte nicht geladen werden:', error);
        }
    }

    // Status beim Laden abrufen und alle 60 Sekunden aktualisieren
    updateDiscordStatus();
    setInterval(updateDiscordStatus, 60000);
});