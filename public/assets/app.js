/** Public UI only. Never import private Core content or API credentials here. */
(() => {
  'use strict';
  const translations = {
    fr: {
      skip: 'Aller au contenu', navLabel: 'Navigation principale', navVision: 'Vision', navArchitecture: 'Architecture', navIntelligence: 'Intelligences', navPrinciples: 'Principes', source: 'GitHub ↗',
      preview: 'FONDATION PUBLIQUE · APERÇU', hero1: "L'intelligence", hero2: 'avec intention.',
      heroDescription: "Un écosystème d'intelligences spécialisées, coordonné sous une gouvernance humaine. Nous construisons une passerelle entre vision, savoir et action responsable.",
      explore: "Explorer l'architecture", approach: 'Notre approche',
      disclaimer: 'Site de présentation. Aucun accès public au noyau privé ni aux agents en direct.',
      artLabel: "Composition abstraite d'orbites interconnectées autour d'un noyau lumineux",
      visionIndex: 'VISION', visionTitle: "Une intelligence au service de l'humain.",
      visionBody: 'ALPHA PROXIMA relie des domaines de connaissance, des outils numériques et un cadre décisionnel clair. Chaque capacité reste vérifiable, chaque décision importante demeure sous contrôle humain.',
      visionNote: 'Du concept à la preuve, une étape à la fois.', architectureIndex: 'ARCHITECTURE',
      architectureTitle: 'Deux espaces. Une vision.',
      architectureIntro: 'Une frontière explicite sépare la mémoire institutionnelle des expériences destinées au public.',
      privateLayer: '01 · COUCHE PRIVÉE', restricted: 'ACCÈS RESTREINT', coreTitle: 'Le noyau institutionnel',
      coreBody: 'Référentiels, gouvernance, mémoire et processus internes. Protégés dans le dépôt privé canonique, non exposés par ce site.',
      publicLayer: '02 · COUCHE PUBLIQUE', previewStatus: 'APERÇU', publicTitle: 'La plateforme ouverte',
      publicBody: 'Présentations, documentation approuvée et futurs outils. Un espace de découverte sans accès direct aux données internes.',
      approval: 'Seules les informations approuvées peuvent traverser la frontière de publication.',
      intelligenceIndex: 'DOMAINES', intelligenceTitle: 'Des rôles distincts. Une direction.',
      intelligenceIntro: "Aperçu de certains domaines institutionnels envisagés. Cette vitrine n'offre pas de conversation avec des agents actifs.",
      lumiaion: 'Coordination institutionnelle et cohérence entre les domaines.',
      athena: "Intelligence d'information liée à la santé et au bien-être.",
      vortex: 'Recherche financière, scénarios et analyse des risques.',
      orion: 'Stratégie, structuration des projets et développement.',
      artemis: 'Création visuelle, médias et expression des idées.',
      sohma: 'Exploration des traditions, du sens et de la réflexion.',
      principlesIndex: 'PRINCIPES', principlesTitle: 'Conçu pour mériter la confiance.',
      principle1Title: 'Gouvernance humaine', principle1Body: "Les décisions sensibles restent soumises à l'autorité du fondateur et aux mécanismes de contrôle.",
      principle2Title: 'Preuves et transparence', principle2Body: 'Nous distinguons les fonctionnalités démontrées, les prototypes et les ambitions futures.',
      principle3Title: 'Confidentialité par conception', principle3Body: "Le site public ne lit pas le Vault privé et n'inclut aucun secret ni donnée personnelle.",
      coming: 'EN CONSTRUCTION · FONDATION V1', closingTitle: 'Le futur commence\navec une fondation solide.',
      closingBody: "Ce site est une première fenêtre publique sur le projet. La plateforme évoluera par étapes, avec des capacités annoncées seulement lorsqu'elles seront réellement disponibles.",
      viewRepo: 'Voir le dépôt public', footer: 'Fondation publique · Projet en développement · © {year} ALPHA PROXIMA'
    },
    en: {
      skip: 'Skip to content', navLabel: 'Main navigation', navVision: 'Vision', navArchitecture: 'Architecture', navIntelligence: 'Intelligences', navPrinciples: 'Principles', source: 'GitHub ↗',
      preview: 'PUBLIC FOUNDATION · PREVIEW', hero1: 'Intelligence', hero2: 'with intention.',
      heroDescription: 'An ecosystem of specialized intelligence domains under human governance. Building a bridge between vision, knowledge and responsible action.',
      explore: 'Explore the architecture', approach: 'Our approach',
      disclaimer: 'Presentation website only. No public access to the private Core or live agents.',
      artLabel: 'Abstract interconnected orbits surrounding a luminous core',
      visionIndex: 'VISION', visionTitle: 'Intelligence in service of people.',
      visionBody: 'ALPHA PROXIMA brings knowledge domains, digital tools and a clear decision framework together. Capabilities must be verifiable, and significant decisions remain under human control.',
      visionNote: 'From concept to evidence, one step at a time.', architectureIndex: 'ARCHITECTURE',
      architectureTitle: 'Two spaces. One vision.',
      architectureIntro: 'An explicit boundary separates institutional memory from public-facing experiences.',
      privateLayer: '01 · PRIVATE LAYER', restricted: 'RESTRICTED ACCESS', coreTitle: 'The institutional core',
      coreBody: 'References, governance, memory and internal workflows. Kept in the canonical private repository, never exposed by this site.',
      publicLayer: '02 · PUBLIC LAYER', previewStatus: 'PREVIEW', publicTitle: 'The open platform',
      publicBody: 'Presentations, approved documentation and future tools. A place to discover the project without direct access to internal data.',
      approval: 'Only approved information may cross the publication boundary.',
      intelligenceIndex: 'DOMAINS', intelligenceTitle: 'Distinct roles. Shared direction.',
      intelligenceIntro: 'An introduction to selected envisioned institutional domains. This preview does not provide access to live agents.',
      lumiaion: 'Institutional orchestration and cross-domain coherence.',
      athena: 'Health and wellbeing information intelligence.',
      vortex: 'Financial research, scenario planning and risk analysis.',
      orion: 'Strategy, project architecture and development.',
      artemis: 'Visual creation, media and expression of ideas.',
      sohma: 'Exploration of traditions, meaning and reflection.',
      principlesIndex: 'PRINCIPLES', principlesTitle: 'Designed to earn trust.',
      principle1Title: 'Human governance', principle1Body: 'Sensitive decisions remain subject to the Founder and defined oversight mechanisms.',
      principle2Title: 'Evidence and transparency', principle2Body: 'We distinguish demonstrated features, prototypes and future ambitions.',
      principle3Title: 'Privacy by design', principle3Body: 'The public site does not read the private Vault or embed secrets or personal data.',
      coming: 'IN DEVELOPMENT · FOUNDATION V1', closingTitle: 'The future starts\nwith a strong foundation.',
      closingBody: 'This is an early public window into the project. The platform will evolve in stages, with capabilities announced only once actually available.',
      viewRepo: 'Explore the public repository', footer: 'Public foundation · Work in progress · © {year} ALPHA PROXIMA'
    }
  };
  function setLanguage(language) {
    const lang = language === 'en' ? 'en' : 'fr';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = translations[lang][el.dataset.i18n];
      if (text !== undefined) el.textContent = text.replace('{year}', new Date().getFullYear().toString());
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const text = translations[lang][el.dataset.i18nAria];
      if (text !== undefined) el.setAttribute('aria-label', text);
    });
    const toggle = document.getElementById('language-toggle');
    if (toggle) {
      toggle.textContent = lang === 'fr' ? 'EN ↗' : 'FR ↗';
      toggle.setAttribute('aria-label', lang === 'fr' ? 'Switch language to English' : 'Passer en français');
    }
    document.querySelector('meta[name="description"]')?.setAttribute('content', lang === 'fr'
      ? "ALPHA PROXIMA : une architecture de collaboration entre humains et systèmes d'IA, construite avec rigueur et responsabilité."
      : 'ALPHA PROXIMA: a human-led architecture for responsible intelligence systems.');
    try { localStorage.setItem('alpha-proxima-public-language', lang); } catch (_error) { /* Storage is optional. */ }
  }
  let initial = 'fr';
  try { initial = localStorage.getItem('alpha-proxima-public-language') || 'fr'; } catch (_error) { /* Storage is optional. */ }
  setLanguage(initial);
  document.getElementById('language-toggle')?.addEventListener('click', () => setLanguage(document.documentElement.lang === 'fr' ? 'en' : 'fr'));
})();
