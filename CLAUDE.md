---
## 🔍 Knowledge Graph (graphify)
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.
---

## 🎯 Obiettivo del Progetto
Creare un sito web statico per un fotografo/videomaker automotive con obiettivo finale di aumentare le vendite composto da:
- `index.html` (Homepage)
- `contatti.html` (Pagina contatti con form EmailJS)
- `chi sono.html` (Pagina con paragrafo su chi sono)
- `gallery.html` (Gallery con foto)
- `privacy.html` (Privacy Policy GDPR)

Il sito deve essere moderno, accattivante, mobile-first e **estremamente veloce** in caricamento e navigazione.

---

## ⚠️ Vincoli Critici (NON VIOLARE)
1. **Gestione Asset**: Tutte le immagini si trovano nella cartella `brand_assets/`. Riferisciti ad esse ESATTAMENTE con i nomi di file originali nel codice (`src="brand_assets/nome.ext"` o `url('brand_assets/nome.ext')`). 
   ⛔ NON tentare mai di leggere, aprire, analizzare, convertire o elaborare immagini. Usa solo percorsi e nomi così come sono.
   I file da cui prendere informazioni sono nella cartella `info/`
2. **Screenshot**: Qualsiasi screenshot creato per verifica di componenti o pagine deve essere salvato **esclusivamente** nella cartella `screenshots/`. ⛔ È vietato salvare screenshot in punti casuali della directory del progetto — tutti gli screenshot devono andare obbligatoriamente in `/screenshots`.
3. **Skill Obbligatorie**: 
   - Usa `frontend-design` per struttura componenti, markup semantico e organizzazione codice.
   - Usa `ui-ux` per gerarchia visiva, pattern interattivi, coerenza design system e accessibilità.

---

## 🚀 Performance & Velocità (Priorità Assoluta)
Il sito deve raggiungere prestazioni estreme. Implementa obbligatoriamente:
- **Stack Minimo**: HTML5 semantico + CSS3 moderno + Vanilla JS. Niente framework pesanti o librerie UI non essenziali.
- **Zero Render-Blocking**: CSS in file separato, JS caricato con `defer`, nessuna dipendenza esterna bloccante.
- **Ottimizzazione Immagini**: `loading="lazy"`, `decoding="async"`, dimensioni esplicite (`width`/`height`) per evitare CLS. Usa `<picture>` solo se strettamente necessario.
- **Layout Stabile & Cache-Friendly**: Struttura DOM leggera, CSS efficiente e riutilizzabile, file statici separati pronti per CDN/static hosting.
- **Core Web Vitals Target**: LCP < 2.5s, INP < 200ms, CLS ≈ 0. Raggiungibili tramite lazy loading, font swap nativo, layout grid/flex stabile e CSS critico inline se necessario.

---

## 🎨 UI/UX & Design System
- **Mobile-First Responsive**: Breakpoint ottimizzati per smartphone (320px+), tablet e desktop. Layout fluido con container max-width e griglie adattive.
- **Accessibilità WCAG AA**: Contrasti verificati, focus states visibili, `alt` descrittivi, struttura semantica (`<header>`, `<main>`, `<section>`, `<footer>`), ARIA dove necessario.
- **Grafica Moderna & Accattivante**: Palette coerente con il settore fotografia/videomaking automative (toni freschi, professionali), tipografia leggibile, spaziatura generosa, micro-interazioni CSS leggere (hover, focus, transizioni < 300ms).


## 📄 Struttura Pagine
### `index.html` — Homepage
- Hero section con titolo, sottotitolo e CTA primaria
- Sezione servizi (3 card: leggi info dal file corrispondente)
- Sezione "Come Lavoriamo" (5 step)
- Sezione "Chi Sono / Perché Scegliermi" (features grid) con collegamento a pagine dedicata "Chi Sono"
- Sezione statistiche animate (contatori)
- Sezione FAQ (accordion)
- Sezione testimonianze/recensioni (3 card)
- CTA finale
- Footer con link rapidi, servizi, contatti, social media (Instagram, Youtube, Linkedin con loghi fluttuanti)
- WhatsApp floating button + Back-to-top + Cookie banner

### `contatti.html` — Pagina Contatti
- Page hero con icona SVG animata
- Form completo: nome, email, telefono, tipo servizio, preferenza oraria, messaggio
- Validazione client-side in tempo reale (blur + input)
- Placeholder per integrazione EmailJS (commenti chiari su dove inserire Public Key e configurare template)
- Colonna info aziendali: cellulare, email, indirizzo, WhatsApp
- Google Maps embed
- CTA rapida "Scrivimi"
- Footer coerente con homepage (con link a Lavora con Noi)
- WhatsApp floating button + Back-to-top + Cookie banner

### `chi sono.html` — Pagina Info su di me
- Page hero con icona briefcase animata
- Informazioni deducibili dal file dedicato
- Footer coerente con homepage
- WhatsApp floating button + Back-to-top + Cookie banner
- CTA rapida "Scrivimi"
- Footer coerente con homepage (con link a Lavora con Noi)
- WhatsApp floating button + Back-to-top + Cookie banner

### `gallery.html` — Pagina Galley con foto
- Page hero con icona briefcase animata
- Gallery ( 9 card con foto deducibili dai nomi in brand_assets/)

### `privacy.html` — Privacy Policy GDPR
- Page hero titolo
- 12 sezioni complete: Titolare, Dati Trattati, Finalità/Base Giuridica (tabella), Sicurezza, Destinatari, Trasferimenti UE, Conservazione, Diritti Interessato, Cookie Policy, WhatsApp, Modifiche, Contatti
- Footer coerente con homepage
- Back-to-top + Cookie banner

---

## 🛠️ Workflow di Generazione
1. **Analisi**: Descrivi brevemente architettura UX/UI + strategia performance scelta
2. **Output File**: Fornisci codice completo e pronto all'uso per:
   - `index.html` (Homepage)
   - `contatti.html` (Pagina contatti con form EmailJS)
   - `gallery.html` (Pagina Galleria Fotografica con griglia responsive)
   - `chi sono.html` (Pagina con paragrafo su chi sono)
   - `privacy.html` (Privacy Policy GDPR)
   - `style.css` (CSS condiviso, mobile-first, zero dipendenze)
   - `script.js` (interazioni base, validazione form contatti, contatori, FAQ accordion, scroll spy, cookie banner, back-to-top, theme toggle)
3. **Documentazione**: Per ogni file includi:
   - Codice completo e ben commentato
   - Riferimenti esatti a `brand_assets/` con nomi originali
   - Note esplicative su come le scelte garantiscono velocità estrema
   - Istruzioni passo-passo per integrazione EmailJS
4. **Deploy**: Indica comandi/passaggi finali per test locale (es. Live Server) e deploy statico (Netlify/Vercel/GitHub Pages)

⚠️ **RICORDA**: NON generare logica che richieda lettura/elaborazione di immagini. Limitati a referenziarle per percorso/nome. Priorità assoluta a velocità, leggerezza e stabilità del layout. Segui alla lettera questo documento e le regole esistenti in CLAUDE.md.