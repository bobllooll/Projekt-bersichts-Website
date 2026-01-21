/**
 * PROJEKTE DATEN SCHEMA
 * 
 * Um ein neues Projekt hinzuzufügen, kopiere das Beispiel-Objekt und füge es in das Array ein.
 * 
 * --- COPY PASTE TEMPLATE ---
 * {
 *     title: "Projekt Name",
 *     description: "Kurze Beschreibung, was das Projekt macht.",
 *     link: "../pfad/zur/app.html",
 *     icon: {
 *         type: "svg", // "svg" für Inline-Code oder "image" für Bild-URL
 *         content: `<svg ...>...</svg>`, // Der SVG-String oder Pfad zum Bild
 *         bgColor: "#ffffff" // Hintergrundfarbe des Icons
 *     },
 *     themeColor: "#d946ef", // Die Hauptfarbe für Glow-Effekte
 *     isPlaceholder: false // Setze auf true für "Demnächst" Karten
 * }
 */

const projectsData = [
    {
        title: "NutriScan AI",
        description: "Dein intelligenter Ernährungs-Coach: Analysiert Essen per Foto (KI), scannt Barcodes und synchronisiert deine Fortschritte sicher in der Cloud.",
        link: "https://nutri-scan.hanneken.cloud",
        icon: {
            type: "svg",
            // Das offizielle Icon aus deiner App (Blue/Purple Gradient)
            content: `<svg viewBox="0 0 512 512"><defs><linearGradient id="grad_nutri_real" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a84ff"/><stop offset="100%" stop-color="#bf5af2"/></linearGradient></defs><rect width="512" height="512" rx="128" fill="#1c1c1e"/><path d="M160 96h-32a32 32 0 0 0-32 32v32m0 192v32a32 32 0 0 0 32 32h32m192 0h32a32 32 0 0 0 32-32v-32m0-192v-32a32 32 0 0 0-32-32h-32" fill="none" stroke="url(#grad_nutri_real)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><path d="M256 120c0 0 30 96 136 136 0 0-106 40-136 136 0 0-30-96-136-136 0 0 106-40 136-136z" fill="url(#grad_nutri_real)"/></svg>`,
            bgColor: "#1c1c1e"
        },
        themeColor: "#bf5af2" // Lila/Blau aus dem Gradient
    },
    {
        title: "Checkliste",
        description: "Eine smarte PWA Checkliste mit Echtzeit-Synchronisation, Offline-Modus und Verschlüsselung.",
        link: "https://checkliste.hanneken.cloud",
        icon: {
            type: "image",
            content: "https://checkliste.hanneken.cloud/Logo.png",
            bgColor: "#eef2ff"
        },
        themeColor: "#6366f1" // Indigo
    },
    {
        title: "Habits Tracker",
        description: "Ein umfangreicher Gewohnheitstracker mit Analysen, Gamification und Kalender-Sync.",
        link: "https://habits.hanneken.cloud",
        icon: {
            type: "image",
            content: "https://habits.hanneken.cloud/logo.svg",
            bgColor: "#e8f5e9"
        },
        themeColor: "#4caf50" // Green
    },
    {
        title: "Wetter App",
        description: "Aktuelle Wetterdaten mit dynamischen CSS-Landschaften, die sich dem Wetter und der Tageszeit anpassen.",
        link: "https://wetter.hanneken.cloud",
        icon: {
            type: "svg",
            content: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline></svg>`,
            bgColor: "#e3f2fd"
        },
        themeColor: "#2196f3" // Blue
    },
    {
        title: "Recap 2025",
        description: "Der interaktive Jahresrückblick mit Hall of Fame, Statistiken und Presenter-Mode.",
        link: "https://recap.hanneken.cloud",
        icon: {
            type: "svg",
            content: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffb300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
            bgColor: "#fff8e1"
        },
        themeColor: "#ffb300" // Amber
    },
    {
        title: "Demnächst",
        description: "Hier entsteht bald ein weiteres spannendes Projekt.",
        link: "#",
        isPlaceholder: true,
        icon: {
            type: "svg",
            content: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
            bgColor: "transparent" // Placeholder nutzt CSS opacity
        },
        themeColor: "#555555" // Grey
    }
];