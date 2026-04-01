/* ═══════════════════════════════════════════════
   50/50 — App
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  const SPOTIFY_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>`;

  // ── Render Record Crate ────────────────
  function renderCrate() {
    const container = document.getElementById('crate-records');
    if (!container) return;

    TRACKS.forEach((track, i) => {
      const record = document.createElement('div');
      record.className = 'crate__record';
      record.dataset.index = i;

      record.innerHTML = `<img src="${track.imageUrl}" alt="" loading="eager">`;
      container.appendChild(record);
    });
  }

  // ── Crate Auto-Play Animation ───────────
  // Auto-flips through records in ~3s when section enters view, then scrolls to first era
  function initCrateAnimation() {
    const crateSection = document.querySelector('.crate-section');
    const crate = document.querySelector('.crate');
    const records = gsap.utils.toArray('.crate__record');
    if (!crateSection || records.length === 0) return;

    const numRecords = records.length;
    const stagger = 3 / numRecords; // spread all flips across 3 seconds

    // Set initial stacking
    records.forEach((record, i) => {
      gsap.set(record, {
        zIndex: numRecords - i,
        z: i * -6,
        y: i * -4,
        rotationX: i * 1,
      });
    });

    // Build the auto-play timeline (paused until triggered)
    const tl = gsap.timeline({ paused: true, onComplete: scrollToFirstEra });

    records.forEach((record, i) => {
      tl.to(record, {
        rotationX: -80,
        y: -180,
        z: 150,
        opacity: 0,
        scale: 0.92,
        duration: stagger * 1.5,
        ease: 'power2.in',
      }, i * stagger);

      if (i < numRecords - 1) {
        tl.to(records[i + 1], {
          y: 0,
          z: 0,
          rotationX: 0,
          duration: stagger * 0.8,
          ease: 'power1.out',
        }, i * stagger + stagger * 0.4);
      }
    });

    // Add "Riffling through the crate..." text with animated dots
    const riffleText = document.createElement('div');
    riffleText.className = 'crate__riffle-text';
    riffleText.innerHTML = `
      <span class="crate__riffle-words">Riffling through the crate</span><span class="crate__riffle-dots"><span class="crate__dot">.</span><span class="crate__dot">.</span><span class="crate__dot">.</span></span>
    `;
    riffleText.style.cssText = `
      font-family: var(--font-display);
      font-size: clamp(1rem, 2.5vw, 1.3rem);
      letter-spacing: 0.1em;
      text-align: center;
      margin-bottom: 2rem;
      opacity: 0;
      color: var(--neon-pink);
      text-shadow: 0 0 10px rgba(255, 45, 149, 0.6), 0 0 30px rgba(255, 45, 149, 0.3);
    `;
    crate.parentElement.insertBefore(riffleText, crate);

    // Animated dots CSS
    const dotStyle = document.createElement('style');
    dotStyle.textContent = `
      .crate__riffle-dots .crate__dot {
        opacity: 0;
        animation: dotPulse 1.5s infinite;
      }
      .crate__riffle-dots .crate__dot:nth-child(1) { animation-delay: 0s; }
      .crate__riffle-dots .crate__dot:nth-child(2) { animation-delay: 0.3s; }
      .crate__riffle-dots .crate__dot:nth-child(3) { animation-delay: 0.6s; }
      @keyframes dotPulse {
        0%, 20% { opacity: 0; }
        40% { opacity: 1; }
        60%, 100% { opacity: 0.3; }
      }
    `;
    document.head.appendChild(dotStyle);

    // Trigger once when crate section is fully visible
    ScrollTrigger.create({
      trigger: crateSection,
      start: 'top 20%',
      once: true,
      onEnter: () => {
        // Fade in text first
        gsap.to(riffleText, {
          opacity: 1,
          duration: 0.6,
          onComplete: () => {
            // Then start flipping
            tl.play();
          }
        });
      }
    });

    function scrollToFirstEra() {
      // Fade out text, then scroll
      gsap.to(riffleText, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          const firstEra = document.querySelector('.era');
          if (firstEra) {
            gsap.to(window, {
              scrollTo: { y: firstEra, offsetY: 50 },
              duration: 1,
              ease: 'power2.inOut',
            });
          }
        }
      });
    }
  }

  // ── Render Liner Notes ───────────────────
  function renderLinerNotes() {
    const el = document.getElementById('liner-notes-text');
    if (!el || typeof INTRO_TEXT === 'undefined' || !INTRO_TEXT) return;
    el.innerHTML = INTRO_TEXT
      .split(/\n\n+/)
      .filter(p => p.trim())
      .map(p => `<p>${p.trim()}</p>`)
      .join('');
  }

  // ── Render Track Cards ───────────────────
  function renderTracks() {
    const eraContainers = {
      '80s': document.getElementById('tracks-80s'),
      '90s': document.getElementById('tracks-90s'),
      '00s': document.getElementById('tracks-00s'),
      '2010s': document.getElementById('tracks-2010s'),
      '2020s': document.getElementById('tracks-2020s')
    };

    TRACKS.forEach((track, index) => {
      const container = eraContainers[track.era];
      if (!container) return;

      const card = document.createElement('div');
      card.className = 'track-card';
      card.setAttribute('data-index', index);

      card.innerHTML = `
        <div class="track-card__inner">
          <div class="track-card__front">
            ${track.imageUrl
              ? `<img class="track-card__image" src="${track.imageUrl}" alt="${track.title} by ${track.artist}" loading="lazy">`
              : `<div class="track-card__image" style="background: linear-gradient(135deg, var(--era-accent), var(--midnight));"></div>`
            }
            <span class="track-card__year-badge">${track.year}</span>
            <div class="track-card__info">
              <div class="track-card__title">${track.title}</div>
              <div class="track-card__artist">${track.artist}</div>
            </div>
          </div>
          <div class="track-card__back">
            <div class="track-card__back-title">${track.title}</div>
            <div class="track-card__back-artist">${track.artist}</div>
            <p class="track-card__message">${track.message}</p>
            <a href="${track.spotifyUrl}" target="_blank" rel="noopener" class="track-card__play-btn" onclick="event.stopPropagation()">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span>Play on Spotify</span>
            </a>
          </div>
        </div>
      `;

      // Mobile tap to flip
      card.addEventListener('click', function (e) {
        if (window.matchMedia('(hover: none)').matches) {
          document.querySelectorAll('.track-card.flipped').forEach(c => {
            if (c !== card) c.classList.remove('flipped');
          });
          card.classList.toggle('flipped');
        }
      });

      container.appendChild(card);
    });
  }

  // ── Scroll Animations ───────────────────
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Liner notes fade-in
    const linerNotes = document.querySelector('.liner-notes__content');
    if (linerNotes && linerNotes.textContent) {
      ScrollTrigger.create({
        trigger: linerNotes,
        start: 'top 80%',
        onEnter: () => linerNotes.classList.add('in-view')
      });
    }

    // Crate animation first
    initCrateAnimation();

    // Year counter & nav visibility
    const yearCounter = document.querySelector('.year-counter');
    const yearValue = document.querySelector('.year-counter__value');
    const eraNav = document.querySelector('.era-nav');

    ScrollTrigger.create({
      trigger: '.era',
      start: 'top 80%',
      onEnter: () => {
        yearCounter.classList.add('visible');
        eraNav.classList.add('visible');
      }
    });

    // Year counter updates based on scroll position
    const firstEra = document.querySelector('.era');
    const lastEra = document.querySelector('.era:last-of-type');

    if (firstEra && lastEra) {
      ScrollTrigger.create({
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const year = Math.round(1980 + self.progress * 46);
          yearValue.textContent = year;

          const currentEra = getCurrentEra(self.progress);
          updateEraStyles(currentEra);
        }
      });
    }

    // Era header animations
    document.querySelectorAll('.era__header').forEach(header => {
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Card entry animations
    document.querySelectorAll('.track-card').forEach((card, i) => {
      const era = card.closest('.era').dataset.era;
      const isEven = i % 2 === 0;

      const animProps = {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => card.classList.add('in-view')
        }
      };

      switch (era) {
        case '80s':
          animProps.rotation = isEven ? -1.5 : 1;
          break;
        case '90s':
          animProps.rotation = isEven ? 0.5 : -1;
          break;
        case '00s':
          animProps.scale = 1;
          gsap.set(card, { scale: 0.9 });
          break;
        case '2010s':
          break;
        case '2020s':
          animProps.rotation = -0.5;
          break;
      }

      gsap.to(card, animProps);
    });

    // Era nav click handlers
    document.querySelectorAll('.era-nav__dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const era = dot.dataset.era;
        const section = document.getElementById(`era-${era}`);
        if (section) {
          gsap.to(window, {
            scrollTo: { y: section, offsetY: 50 },
            duration: 1.5,
            ease: 'power3.inOut'
          });
        }
      });
    });

    // Update active nav dot on scroll
    document.querySelectorAll('.era').forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveNavDot(section.dataset.era),
        onEnterBack: () => setActiveNavDot(section.dataset.era)
      });
    });

    // CRT + grain intensity tied to era + silhouette visibility
    document.querySelectorAll('.era').forEach(section => {
      const era = section.dataset.era;
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          updateOverlays(era);
          section.classList.add('in-view');
        },
        onEnterBack: () => {
          updateOverlays(era);
          section.classList.add('in-view');
        }
      });
    });
  }

  // ── Helpers ──────────────────────────────
  function getCurrentEra(progress) {
    if (progress < 0.2) return '80s';
    if (progress < 0.4) return '90s';
    if (progress < 0.6) return '00s';
    if (progress < 0.8) return '2010s';
    return '2020s';
  }

  function updateEraStyles(era) {
    const eraData = ERAS[era];
    if (!eraData) return;
    document.documentElement.style.setProperty('--era-accent', eraData.color);
    document.documentElement.style.setProperty('--era-glow', eraData.color);
  }

  function setActiveNavDot(era) {
    document.querySelectorAll('.era-nav__dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.era === era);
    });
  }

  function updateOverlays(era) {
    const crt = document.querySelector('.crt-overlay');
    const grain = document.querySelector('.grain-overlay');
    const intensities = {
      '80s':   { crt: 0.4,  grain: 0.08 },
      '90s':   { crt: 0.3,  grain: 0.10 },
      '00s':   { crt: 0.15, grain: 0.04 },
      '2010s': { crt: 0.05, grain: 0.02 },
      '2020s': { crt: 0.2,  grain: 0.05 }
    };
    const vals = intensities[era] || intensities['80s'];
    crt.style.setProperty('--crt-opacity', vals.crt);
    grain.style.setProperty('--grain-opacity', vals.grain);
    gsap.to(crt, { opacity: vals.crt, duration: 1 });
    gsap.to(grain, { opacity: vals.grain, duration: 1 });
  }

  // ── Spotify Play Interaction ─────────────
  function initSpotifyPlay() {
    const link = document.getElementById('spotify-play');
    const vinyl = document.querySelector('.hero__vinyl');
    if (!link || !vinyl) return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.href;

      // Spin up the record
      vinyl.classList.add('playing');

      // Open Spotify after a beat
      setTimeout(() => {
        window.open(href, '_blank');
      }, 2000);
    });
  }

  // ── Init ────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    renderLinerNotes();
    renderCrate();
    renderTracks();
    initScrollAnimations();
    initSpotifyPlay();
  });

})();
