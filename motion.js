// Small, dependency-free interactions for the presentation layer.
// Project captures and their video overlays always keep their original geometry.
export function setupMotion(config = {}, flows = []) {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let enabled = false;
  const disposers = [];
  const listen = (target, event, handler, options) => {
    target.addEventListener(event, handler, options);
    disposers.push(() => target.removeEventListener(event, handler, options));
  };
  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.querySelector('.site-header')?.append(progress);

  // Scroll entrances are attached only below the fold. The hero is visible immediately.
  const revealNodes = [...document.querySelectorAll('.intro-copy, .feature-list article, .ribbon-heading, .demos-intro > h2, .chapter-heading, .faq, .ending > p')];
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });
  revealNodes.forEach((node, i) => {
    node.classList.add('motion-reveal');
    node.style.setProperty('--reveal-delay', node.matches('.feature-list article') ? `${i % 2 * 90}ms` : '0ms');
    revealObserver.observe(node);
  });
  const words = document.querySelector('.ending-word');
  if (words) {
    const text = words.textContent;
    words.setAttribute('aria-label', text);
    words.innerHTML = [...text].map((char, i) => `<span class="ending-letter" aria-hidden="true" style="--letter-index:${i}">${char}</span>`).join('');
    words.classList.add('motion-reveal');
    revealNodes.push(words);
    revealObserver.observe(words);
  }

  // Glow follows the pointer on the outer card only, never over product screenshots.
  const glowNodes = [...document.querySelectorAll('.feature-list article, .chapter, .ribbon-card')];
  glowNodes.forEach(node => {
    node.classList.add('pointer-light');
    listen(node, 'pointermove', event => {
      if (!enabled || !fine.matches || config.spotlight === false) return;
      const box = node.getBoundingClientRect();
      node.style.setProperty('--light-x', `${event.clientX - box.left}px`);
      node.style.setProperty('--light-y', `${event.clientY - box.top}px`);
      node.classList.add('is-lit');
    }, { passive: true });
    listen(node, 'pointerleave', () => node.classList.remove('is-lit'));
  });
  const magnets = [...document.querySelectorAll('.hero-actions .pill, .hero-watch, .ending .pill, .play-button')];
  magnets.forEach(node => {
    node.classList.add('magnetic');
    let box;
    listen(node, 'pointerenter', () => { box = node.getBoundingClientRect(); });
    listen(node, 'pointermove', event => {
      if (!enabled || !fine.matches || config.magnetic === false || !box) return;
      node.style.setProperty('--magnet-x', `${clamp((event.clientX - box.x - box.width / 2) * .12, -6, 6)}px`);
      node.style.setProperty('--magnet-y', `${clamp((event.clientY - box.y - box.height / 2) * .18, -4, 4)}px`);
    }, { passive: true });
    listen(node, 'pointerleave', () => {
      node.style.setProperty('--magnet-x', '0px');
      node.style.setProperty('--magnet-y', '0px');
    });
  });

  // A real horizontal gallery: mouse drag, trackpad, touch and keyboard all work.
  const rail = document.querySelector('.ribbon-track');
  if (rail) {
    let drag = null, suppressClick = false;
    listen(rail, 'dragstart', event => event.preventDefault());
    listen(rail, 'pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      suppressClick = false;
      drag = { id: event.pointerId, x: event.clientX, scroll: rail.scrollLeft, moved: false };
    });
    listen(rail, 'pointermove', event => {
      if (!drag) return;
      const delta = event.clientX - drag.x;
      if (!drag.moved && Math.abs(delta) > 6) {
        drag.moved = true;
        rail.setPointerCapture(drag.id);
        rail.classList.add('is-dragging');
      }
      if (drag.moved) rail.scrollLeft = drag.scroll - delta;
    });
    const releaseDrag = () => {
      if (!drag) return;
      suppressClick = drag.moved;
      if (rail.hasPointerCapture(drag.id)) rail.releasePointerCapture(drag.id);
      drag = null;
      rail.classList.remove('is-dragging');
    };
    listen(rail, 'pointerup', releaseDrag);
    listen(rail, 'pointercancel', releaseDrag);
    listen(rail, 'lostpointercapture', releaseDrag);
    listen(rail, 'pointerleave', () => { if (drag && !drag.moved) releaseDrag(); });
    listen(rail, 'click', event => {
      if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
    }, true);
    listen(rail, 'keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      rail.scrollBy({ left: event.key === 'ArrowRight' ? 300 : -300, behavior: enabled ? 'smooth' : 'instant' });
    });
    document.querySelectorAll('[data-ribbon-shift]').forEach(button => listen(button, 'click', () => {
      rail.scrollBy({ left: Number(button.dataset.ribbonShift) * 300, behavior: enabled ? 'smooth' : 'instant' });
    }));
    const updateRail = () => {
      const left = document.querySelector('[data-ribbon-shift="-1"]');
      const right = document.querySelector('[data-ribbon-shift="1"]');
      if (left) left.disabled = rail.scrollLeft < 2;
      if (right) right.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
    };
    listen(rail, 'scroll', updateRail, { passive: true });
    listen(window, 'resize', updateRail, { passive: true });
    updateRail();
  }

  const chapters = flows.map(flow => document.getElementById(`flow-${flow.id}`)).filter(Boolean);
  const dock = document.querySelector('.flow-dock');
  const dockLinks = dock ? [...dock.querySelectorAll('a')] : [];
  const demos = document.querySelector('.demos-intro');
  const chaptersContainer = document.querySelector('.chapters');
  const hero = document.querySelector('.hero');
  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    const extent = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${extent > 0 ? clamp(scrollY / extent) : 0})`;
    if (hero) hero.style.setProperty('--hero-tilt', enabled ? `${4 * (1 - clamp(scrollY / 650))}deg` : '0deg');
    if (!dock || !demos || !chaptersContainer) return;
    const region = chaptersContainer.getBoundingClientRect();
    const visible = demos.getBoundingClientRect().bottom < innerHeight * .7 && region.bottom > innerHeight * .5;
    dock.classList.toggle('is-visible', visible);
    dock.inert = !visible;
    let index = 0;
    chapters.forEach((chapter, i) => { if (chapter.getBoundingClientRect().top <= innerHeight * .48) index = i; });
    dockLinks.forEach((link, i) => {
      link.classList.toggle('is-active', i === index);
      if (i === index) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    const current = chapters[index]?.getBoundingClientRect();
    const fill = current ? clamp((innerHeight * .48 - current.top) / current.height) : 0;
    dock.style.setProperty('--chapter-progress', fill);
  }
  const scheduleScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
  listen(window, 'scroll', scheduleScroll, { passive: true });
  listen(window, 'resize', scheduleScroll, { passive: true });

  // A silver line field, rendered at 30 fps only while the hero is on screen.
  const canvas = hero?.querySelector('.hero-atmosphere');
  const ctx = canvas?.getContext('2d');
  let width = 0, height = 0, frame = 0, lastPaint = 0, clock = 0, heroVisible = true;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  function drawField() {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0, 0, width, height);
    if (config.ambient === false) return;
    const originX = width * (.52 + pointer.x * .12);
    const originY = height * (.4 + pointer.y * .12);
    const glow = ctx.createRadialGradient(originX, originY, 0, originX, originY, width * .65);
    glow.addColorStop(0, 'rgba(208,213,228,.055)');
    glow.addColorStop(1, 'rgba(208,213,228,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
    const count = width < 760 ? 17 : 29;
    for (let line = 0; line < count; line++) {
      const band = line / (count - 1);
      const shine = Math.pow((Math.sin(band * 10 - clock * .28) + 1) / 2, 5);
      ctx.beginPath();
      for (let point = 0; point <= 70; point++) {
        const u = point / 70;
        const x = u * width;
        const wave = Math.sin(u * 5.2 + clock * .11 + band * .8);
        const y = height * (.31 + band * .31 + wave * .14) + Math.sin(u * 9 - clock * .17) * height * .018 + pointer.y * 28 * Math.sin(u * Math.PI) + pointer.x * 16 * (band - .5);
        if (point) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.strokeStyle = `rgba(218,222,233,${.045 + shine * .11})`;
      ctx.lineWidth = .65 + shine * .55;
      ctx.stroke();
    }
  }
  function tick(now) {
    frame = 0;
    if (!enabled || !heroVisible || document.hidden || (config.ambient === false && config.parallax === false)) return;
    if (now - lastPaint >= 1000 / 30) {
      const delta = Math.min(now - lastPaint, 50);
      clock += delta / 1000;
      lastPaint = now;
      pointer.x += (pointer.targetX - pointer.x) * .09;
      pointer.y += (pointer.targetY - pointer.y) * .09;
      hero.style.setProperty('--hero-pointer-x', `${pointer.x * 1.6}deg`);
      hero.style.setProperty('--hero-pointer-y', `${-pointer.y * 1.2}deg`);
      hero.style.setProperty('--sheen-x', `${50 + pointer.x * 30}%`);
      drawField();
    }
    frame = requestAnimationFrame(tick);
  }
  function syncField() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (ctx && enabled && heroVisible && !document.hidden && (config.ambient !== false || config.parallax !== false)) frame = requestAnimationFrame(tick);
    else drawField();
  }
  let resizeObserver, heroObserver;
  if (ctx) {
    resizeObserver = new ResizeObserver(() => {
      const rect = hero.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawField();
    });
    resizeObserver.observe(hero);
    heroObserver = new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; syncField(); });
    heroObserver.observe(hero);
    listen(hero, 'pointermove', event => {
      if (!enabled || !fine.matches || config.parallax === false) return;
      const rect = hero.getBoundingClientRect();
      pointer.targetX = clamp((event.clientX - rect.left) / rect.width - .5, -.5, .5) * 2;
      pointer.targetY = clamp((event.clientY - rect.top) / rect.height - .5, -.5, .5) * 2;
    }, { passive: true });
    listen(hero, 'pointerleave', () => { pointer.targetX = 0; pointer.targetY = 0; });
  }
  function syncPreference() {
    enabled = config.enabled !== false && !reduce.matches;
    root.dataset.motion = enabled ? 'on' : 'off';
    if (!enabled) {
      revealNodes.forEach(node => node.classList.add('is-revealed'));
      glowNodes.forEach(node => node.classList.remove('is-lit'));
      pointer.x = pointer.y = pointer.targetX = pointer.targetY = 0;
      hero?.style.setProperty('--hero-pointer-x', '0deg');
      hero?.style.setProperty('--hero-pointer-y', '0deg');
    }
    window.dispatchEvent(new CustomEvent('youcreate:motion', { detail: { enabled } }));
    updateScroll(); syncField();
  }
  listen(reduce, 'change', syncPreference);
  listen(document, 'visibilitychange', syncField);
  listen(window, 'pageshow', () => { syncField(); scheduleScroll(); });
  listen(window, 'pagehide', () => { cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame); });
  syncPreference();
  return () => {
    disposers.forEach(dispose => dispose());
    cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame);
    revealObserver.disconnect(); resizeObserver?.disconnect(); heroObserver?.disconnect();
  };
}
