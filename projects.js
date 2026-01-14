// Begrüßung basierend auf der Tageszeit anpassen
document.addEventListener('DOMContentLoaded', () => {
    const headerP = document.querySelector('header p');
    const hour = new Date().getHours();
    let greeting = "Willkommen";

    if (hour < 12) greeting = "Wunderschönen guten Morgen";
    else if (hour < 18) greeting = "Moin";
    else greeting = "Wunderschönen guten Abend";

    // Text sanft aktualisieren
    if(headerP) headerP.textContent = `${greeting}! Hier ist eine Übersicht meiner Projekte.`;

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

            // Animation Delay dynamisch setzen (0.2s, 0.4s, 0.6s ...)
            // Das macht das CSS nth-child überflüssig für neue Elemente
            card.style.animationDelay = `${(index + 1) * 0.2}s`;

            // Icon Inhalt bestimmen
            let iconHtml = '';
            if (project.icon.type === 'image') {
                const fallbackSvg = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
                iconHtml = `<img src="${project.icon.content}" alt="${project.title} Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><div style="display:none;">${fallbackSvg}</div>`;
            } else {
                iconHtml = project.icon.content;
            }

            card.innerHTML = `
                <div class="card-icon" style="background-color: ${project.icon.bgColor || '#f1f2f6'};">
                    ${iconHtml}
                </div>
                <div class="card-content">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    ${!project.isPlaceholder ? '<span class="btn-link">App öffnen &rarr;</span>' : ''}
                </div>
            `;

            // --- 3D TILT EFFEKT ---
            // Macht die Karten interaktiv, als wären sie physische Objekte
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Mitte der Karte berechnen
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Rotation berechnen (max +/- 8 Grad für subtilen Effekt)
                const rotateX = ((y - centerY) / centerY) * -8; 
                const rotateY = ((x - centerX) / centerX) * 8;

                // Transition für Transform entfernen, damit es der Maus sofort folgt
                // Box-Shadow behält die weiche Transition
                card.style.transition = 'box-shadow 0.3s ease, transform 0.05s linear';
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                // Beim Verlassen sanft zurücksetzen
                card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });

            grid.appendChild(card);
        });
    }

    // --- EASTER EGG: KONAMI CODE ---
    // Tippe: Hoch, Hoch, Runter, Runter, Links, Rechts, Links, Rechts, B, A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let kIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[kIndex]) {
            kIndex++;
            if (kIndex === konamiCode.length) {
                document.body.classList.toggle('party-mode');
                const msg = document.body.classList.contains('party-mode') ? "🕹️ Cheat Code aktiviert! Party Mode ON!" : "Party Mode OFF";
                console.log(msg); // Kleines Feedback in der Konsole
                
                // Optional: Kurzes visuelles Feedback (z.B. Titel wackeln lassen)
                const h1 = document.querySelector('h1');
                if(h1) {
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