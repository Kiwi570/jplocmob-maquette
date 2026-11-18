/* Effets propres à JP Loc Mob. Le socle gère l'ouverture, le voile, l'en-tête, le menu, les mesures et la bibliothèque d'effets
   (lignes, mots, cascade, rideau, parallaxe, zoom, magnétique, incline). Ici : le tampon, la route qui se dessine, les bornes,
   le plan des parcours, la rangée des mobylettes, le déroulé, les questions, le composeur et la demande de réservation. */
import { demarrer, versObjet, etat, rafraichir, quand } from './socle/index.js?v=2';
import { init as initComposeur } from './modules/composeur-de-formule/module.js?v=2';
import { init as initFormulaire } from './modules/formulaire-par-etapes/module.js?v=2';

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const retour = () => etat.arrivee === 'retour';
const euros = (n) => `${new Intl.NumberFormat('fr-FR').format(n)} €`;

/* ---------- Route qui se dessine au défilement (data-effet="route") ---------- */
function routes() {
  $$('.route:not(.route--entree)').forEach((svg) => {
    const m = $('.route-masque', svg);
    if (!m) return;
    gsap.fromTo(m, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: svg, start: 'top 96%', end: 'top 38%', scrub: 0.5 } });
  });
}

/* ---------- Tampon du logo (data-effet="tampon") ---------- */
function tampons() {
  $$('[data-tampon]').forEach((el) => {
    if (retour()) { gsap.set(el, { opacity: 1 }); return; }
    gsap.fromTo(el, { opacity: 0, scale: 1.7, rotation: -46 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.7, ease: 'back.out(2.4)', immediateRender: false,
      scrollTrigger: { trigger: el.parentElement, start: 'top 78%', once: true } });
  });
  $$('[data-tampon-tourne]').forEach((el) => {
    gsap.fromTo(el, { rotation: -12 }, { rotation: 150, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top top', end: 'bottom top', scrub: 0.6 } });
  });
}

/* ---------- Plan des parcours : le tracé se dessine, la mobylette le suit, les lieux s'allument au passage,
   les kilomètres comptent ; un bouton rejoue le tracé (data-effet="parcours") ---------- */
function plans() {
  $$('[data-plan]').forEach((plan) => {
    let donnees;
    try { donnees = JSON.parse($('.plan-donnees', plan).textContent); } catch { return; }
    const noms = Object.keys(donnees);
    const traces = noms.map((n) => {
      const pts = donnees[n].points, cumul = [0];
      for (let i = 1; i < pts.length; i++) cumul.push(cumul[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const section = plan.closest('section') || plan;
      const boucle = $(`[data-boucle="${n}"]`, section);
      return { n, pts, cumul, total: cumul[cumul.length - 1], km: donnees[n].km, nom: donnees[n].nom, el: $(`[data-trace="${n}"]`, plan),
        lieux: donnees[n].lieux.map((l) => ({ t: l.t, els: $$(`[data-lieu="${l.n}"]`, plan) })),
        barre: boucle && $('[data-boucle-barre]', boucle), kmBoucle: boucle && $('[data-boucle-km]', boucle), boucle, kmVu: -1 };
    });
    const mob = $('[data-mob]', plan), depart = traces[0].pts[0];
    const section = plan.closest('section') || plan;
    const boucles = $$('[data-boucle]', section);
    const kmEl = $('[data-plan-km]', plan), nomEl = $('[data-plan-nom]', plan);
    /* Position sur le tracé, calculée sur les points échantillonnés : aucune mesure dans la page pendant le défilement. */
    const point = (t, p) => {
      const d = p * t.total;
      let a = 0, b = t.cumul.length - 1;
      while (b - a > 1) { const m = (a + b) >> 1; if (t.cumul[m] <= d) a = m; else b = m; }
      const k = (d - t.cumul[a]) / ((t.cumul[b] - t.cumul[a]) || 1);
      return [t.pts[a][0] + (t.pts[b][0] - t.pts[a][0]) * k, t.pts[a][1] + (t.pts[b][1] - t.pts[a][1]) * k];
    };
    let actif = '', kmVu = -1;
    const rendre = (p) => {
      const n = traces.length, part = 1 / n;
      let courant = traces[0], local = 0;
      traces.forEach((t, i) => {
        const l = Math.min(1, Math.max(0, (p - i * part) / (part * 0.92)));
        t.el.style.strokeDashoffset = String(1 - l);
        t.lieux.forEach((x) => x.els.forEach((e) => e.classList.toggle('est-passe', l >= x.t - 0.004 && l > 0)));
        if (t.barre) t.barre.style.transform = `scaleX(${l.toFixed(3)})`;
        const km = Math.round(l * t.km);
        if (t.kmBoucle && km !== t.kmVu) { t.kmVu = km; t.kmBoucle.textContent = String(km); }
        if (l > 0 && (l < 1 || i === n - 1 || p < (i + 1) * part)) { courant = t; local = l; }
      });
      const [x, y] = point(courant, local);
      if (mob) mob.setAttribute('transform', `translate(${(x - depart[0]).toFixed(1)} ${(y - depart[1]).toFixed(1)})`);
      const km = Math.round(local * courant.km);
      if (kmEl && km !== kmVu) { kmVu = km; kmEl.textContent = String(km); }
      if (courant.n !== actif) {
        actif = courant.n;
        if (nomEl) nomEl.textContent = courant.nom;
        boucles.forEach((b) => b.classList.toggle('est-active', b.dataset.boucle === actif));
      }
    };
    /* Rejouer : le tracé repart de zéro et se redessine tout seul ; le défilement reprend la main ensuite. */
    let rejoue = null;
    const bouton = $('[data-plan-rejouer]', plan);
    if (bouton) bouton.addEventListener('click', () => {
      if (rejoue) rejoue.kill();
      const e = { p: 0 };
      rejoue = gsap.to(e, { p: 1, duration: 4.5 * traces.length, ease: 'power1.inOut', onUpdate: () => rendre(e.p), onComplete: () => { rejoue = null; } });
    });
    if (retour()) { rendre(1); return; }
    ScrollTrigger.create({ trigger: boucles.length ? section : plan, start: boucles.length ? 'top 55%' : 'top 82%', end: boucles.length ? 'bottom 85%' : 'bottom 45%', scrub: 0.6,
      onUpdate: (s) => { if (!rejoue) rendre(s.progress); }, onRefresh: (s) => { if (!rejoue) rendre(s.progress); } });
  });
}

/* ---------- Rangée des mobylettes : elle glisse au défilement (data-effet="rangee") ---------- */
function rangees() {
  $$('[data-rangee]').forEach((el) => {
    const piste = $('[data-rangee-piste]', el);
    if (!piste) return;
    el.removeAttribute('tabindex'); el.removeAttribute('role'); el.removeAttribute('aria-label');
    gsap.fromTo(piste, { x: 0 }, { x: () => -Math.max(0, piste.scrollWidth - el.clientWidth), ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 18%', scrub: 0.5, invalidateOnRefresh: true } });
  });
}

/* ---------- Déroulé : le trait de progression (data-effet="progression") ---------- */
function progressions() {
  $$('[data-progression]').forEach((el) => {
    const section = el.closest('section') || el, etapes = $$('[data-deroule-etape]', section);
    let vu = -1;
    const allumer = (p) => { const n = Math.min(etapes.length, Math.floor(p * etapes.length + 0.35)); if (n === vu) return; vu = n; etapes.forEach((e, i) => e.classList.toggle('est-faite', i < n)); };
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 60%', end: 'bottom 75%', scrub: 0.5, onUpdate: (s) => allumer(s.progress), onRefresh: (s) => allumer(s.progress) } });
  });
}

/* ---------- Questions : ouverture et fermeture animées, positions recalculées ensuite ---------- */
function questions() {
  $$('details.question').forEach((d) => {
    const s = $('summary', d), corps = $('.question-reponse', d);
    if (!s || !corps) return;
    let anim = null;
    s.addEventListener('click', (e) => {
      e.preventDefault();
      if (anim) anim.cancel();
      const ouvre = !d.open;
      if (ouvre) d.open = true;
      const h = corps.scrollHeight;
      anim = corps.animate([{ height: ouvre ? '0px' : `${h}px`, opacity: ouvre ? 0 : 1 }, { height: ouvre ? `${h}px` : '0px', opacity: ouvre ? 1 : 0 }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
      anim.onfinish = () => { if (!ouvre) d.open = false; anim = null; rafraichir(); };
    });
  });
}

/* Rangée de petites mobylettes : autant d'allumées que de mobylettes choisies. */
function ranger(rang, n) {
  if (!rang) return;
  [...rang.children].forEach((m, i) => m.classList.toggle('est-la', i < n));
}

/* ---------- Composeur de sortie (module) : demi-journée réservée à l'itinéraire libre, caution, lien prérempli ---------- */
function composeurs() {
  $$('[data-module="composeur-de-formule"]').forEach((el) => {
    const form = $('.cdf__form', el), lien = $('[data-lien-reserver]', el), caution = $('[data-caution-total]', el);
    const regler = () => {
      const b = $('input[name="balade"]:checked', form);
      const permises = (b?.dataset.formules || '').split(' ');
      let change = false;
      $$('input[name="base"]', form).forEach((i) => {
        const ok = permises.includes(i.value);
        i.disabled = !ok;
        i.closest('.cdf__choix').classList.toggle('est-indispo', !ok);
        if (!ok && i.checked) { i.checked = false; change = true; }
      });
      if (change) { const autre = $('input[name="base"][value="mi"]', form); if (autre) { autre.checked = true; autre.dispatchEvent(new Event('change', { bubbles: true })); } }
    };
    const suivre = () => {
      const b = $('input[name="balade"]:checked', form)?.value || '', f = $('input[name="base"]:checked', form)?.value || '';
      const n = Math.min(5, Math.max(1, parseInt($('input[name="mobylettes"]', form).value, 10) || 1));
      if (caution) caution.textContent = euros(n * (+el.dataset.caution || 0));
      ranger($('[data-rang-mobs]', el), n);
      if (lien) lien.href = `${el.dataset.reserver}?balade=${b}&formule=${f}&mobylettes=${n}`;
    };
    regler();
    initComposeur(el, { parUnite: 'mobylettes', textes: { total: 'Total estimé', parUnite: 'soit {prix} par {unite}' } });
    form.addEventListener('change', (e) => { if (e.target.name === 'balade') regler(); suivre(); });
    form.addEventListener('input', suivre);
    form.addEventListener('click', () => requestAnimationFrame(suivre));
    el.addEventListener('composeur:change', suivre);
    suivre();
  });
}

/* ---------- Demande de réservation (module) : choix repris de l'adresse, bon de sortie qui suit, tampon à l'envoi ---------- */
function reservation() {
  const el = $('[data-module="formulaire-par-etapes"]');
  if (!el) return;
  const form = $('form', el), bon = $('[data-bon]');
  let tarifs = null;
  try { tarifs = JSON.parse($('.bon-donnees').textContent); } catch { /* le bon reste tel quel */ }
  const params = new URLSearchParams(location.search);
  const cocher = (nom, v) => { const i = v && $(`input[name="${nom}"][value="${CSS.escape(v)}"]`, form); if (i && !i.disabled) i.checked = true; };
  const date = $('input[name="date"]', form);
  if (date) { const d = new Date(); date.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
  cocher('balade', params.get('balade'));
  const nb = $('input[name="mobylettes"]', form);
  if (params.get('mobylettes')) nb.value = String(Math.min(5, Math.max(1, parseInt(params.get('mobylettes'), 10) || 2)));
  const regler = () => {
    const b = $('input[name="balade"]:checked', form)?.value;
    const permises = b && tarifs ? tarifs.balades[b].formules : Object.keys(tarifs?.formules || {});
    $$('input[name="formule"]', form).forEach((i) => {
      const ok = permises.includes(i.value);
      i.disabled = !ok; i.closest('.fpe__carte').classList.toggle('est-indispo', !ok);
      if (!ok) i.checked = false;
    });
  };
  regler();
  cocher('formule', params.get('formule'));
  const total = { v: 0 };
  let tween = null;
  const ecrire = (sel, txt) => { const x = bon && $(sel, bon); if (x) x.textContent = txt; };
  const suivre = () => {
    if (!bon || !tarifs) return;
    const b = $('input[name="balade"]:checked', form)?.value, f = $('input[name="formule"]:checked', form)?.value;
    const n = Math.min(5, Math.max(1, parseInt(nb.value, 10) || 1));
    ecrire('[data-bon-balade]', b ? tarifs.balades[b].nom : 'à choisir');
    ecrire('[data-bon-formule]', f ? tarifs.formules[f].nom : 'à choisir');
    ecrire('[data-bon-mobs]', String(n));
    ranger($('[data-rang-mobs]', bon), n);
    ecrire('[data-bon-caution]', euros(n * tarifs.caution));
    const cible = f ? tarifs.formules[f].prix * n : 0, sortie = $('[data-bon-total]', bon);
    sortie.toggleAttribute('data-vide', !f);
    if (!f) { sortie.textContent = '—'; total.v = 0; return; }
    if (tween) tween.kill();
    tween = gsap.to(total, { v: cible, duration: 0.6, ease: 'power3.out', onUpdate: () => { sortie.textContent = euros(Math.round(total.v)); } });
  };
  form.addEventListener('change', (e) => { if (e.target.name === 'balade') regler(); suivre(); });
  form.addEventListener('input', suivre);
  initFormulaire(el, { mailto: el.dataset.mailto || '', sujet: el.dataset.sujet || '' });
  suivre();
  /* Retour de l'action : le tampon se pose sur le bon, et le message de fin revient à l'écran. */
  el.addEventListener('formulaire:envoye', () => {
    if (bon) {
      bon.classList.add('est-tamponne');
      gsap.fromTo($('[data-bon-tampon]', bon), { scale: 2, rotation: -50, opacity: 0 }, { scale: 1, rotation: -14, opacity: 1, duration: 0.6, ease: 'back.out(2.6)' });
    }
    const attendre = () => { const fin = $('.fpe__fin', el); if (fin && !fin.hidden) fin.scrollIntoView({ block: 'center' }); };
    setTimeout(attendre, 450);
  });
  el.addEventListener('click', (e) => { if (e.target.closest('[data-recommencer]') && bon) { bon.classList.remove('est-tamponne'); gsap.set($('[data-bon-tampon]', bon), { clearProps: 'transform,opacity' }); setTimeout(() => { regler(); suivre(); }, 50); } });
}

/* ---------- Ouverture : la petite mobylette remonte la route toute seule, une fois ; puis elle se conduit :
   elle suit la souris le long de la route, ou file là où l'on touche (data-grille="manipuler") ---------- */
const cavaliers = [];
function preparerCavaliers() {
  $$('[data-route-mob]').forEach((el) => {
    let pts;
    try { pts = JSON.parse(el.dataset.points); } catch { return; }
    const cadre = el.parentElement, dessin = $('[data-route-dessin]', el), bulle = $('[data-route-bulle]', el), etatMob = { p: 0 };
    let L = cadre.clientWidth, H = cadre.clientHeight, gauche = 0, sens = 1, prise = false;
    const placer = () => {
      const f = Math.min(0.999, Math.max(0, etatMob.p)) * (pts.length - 1), a = Math.min(pts.length - 2, Math.floor(f)), k = f - a;
      const x = (pts[a][0] + (pts[a + 1][0] - pts[a][0]) * k) * L, y = (pts[a][1] + (pts[a + 1][1] - pts[a][1]) * k) * H;
      const angle = Math.atan2((pts[a + 1][1] - pts[a][1]) * H, (pts[a + 1][0] - pts[a][0]) * L) * 180 / Math.PI;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -92%)`;
      if (dessin) dessin.style.transform = `rotate(${(angle * sens).toFixed(1)}deg) scaleX(${sens})`;
    };
    /* Taille et position du cadre relues seulement quand elles changent ou quand la souris entre, jamais pendant le défilement. */
    const mesurer = () => { L = cadre.clientWidth; H = cadre.clientHeight; gauche = cadre.getBoundingClientRect().left; };
    if ('ResizeObserver' in window) new ResizeObserver(() => { mesurer(); placer(); }).observe(cadre);
    /* Fraction du tracé pour une abscisse donnée (le tracé va de gauche à droite). */
    const versX = (clientX) => {
      const fx = Math.min(0.97, Math.max(0.03, (clientX - gauche) / (L || 1)));
      let a = 0, b = pts.length - 1;
      while (b - a > 1) { const m = (a + b) >> 1; if (pts[m][0] <= fx) a = m; else b = m; }
      const k = (fx - pts[a][0]) / ((pts[b][0] - pts[a][0]) || 1);
      return (a + k) / (pts.length - 1);
    };
    const aller = (clientX) => {
      const cible = versX(clientX);
      if (Math.abs(cible - etatMob.p) < 0.004) return;
      if (!prise) { prise = true; if (bulle) bulle.classList.add('est-partie'); }
      sens = cible < etatMob.p ? -1 : 1;
      gsap.to(etatMob, { p: cible, duration: Math.min(1.1, 0.35 + Math.abs(cible - etatMob.p) * 1.6), ease: 'power2.out', overwrite: true, onUpdate: placer, onComplete: () => { sens = 1; placer(); } });
    };
    cadre.addEventListener('pointerenter', mesurer);
    cadre.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') aller(e.clientX); });
    cadre.addEventListener('pointerdown', (e) => { mesurer(); aller(e.clientX); });
    cavaliers.push({ el, etatMob, placer, pris: () => prise, bulle });
  });
}
function lancerCavaliers(direct) {
  cavaliers.forEach(({ el, etatMob, placer, pris, bulle }) => {
    if (pris()) return;
    gsap.killTweensOf(etatMob);
    el.style.opacity = '1';
    if (direct) { etatMob.p = 0.3; placer(); if (bulle) bulle.classList.add('est-la'); return; }
    etatMob.p = 0.03; placer();
    gsap.to(etatMob, { p: 0.3, duration: 3.2, ease: 'power2.out', onUpdate: placer, onComplete: () => { if (bulle && !pris()) bulle.classList.add('est-la'); } });
  });
}

/* ---------- Ouverture de chaque page : titre ligne à ligne, textes, photo en rideau, route, bornes ---------- */
function entree(tl, t) {
  const existe = (s) => document.querySelector(s);
  if (existe('.tete-titre')) tl.call(() => $('.tete-titre').classList.add('est-pose'), null, t + 0.55);
  if (existe('.tete-titre')) tl.set('.tete-titre', { opacity: 1 }, t).fromTo('.tete-ligne', { yPercent: 115 }, { yPercent: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' }, t);
  if (existe('[data-entree]')) tl.fromTo('[data-entree]', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, t + 0.1);
  if (existe('[data-entree-rideau]')) tl.fromTo('[data-entree-rideau]', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.inOut' }, t + 0.1);
  if (existe('.route--entree .route-masque')) tl.fromTo('.route--entree .route-masque', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' }, t + 0.05);
  if (existe('.numero-paire')) tl.fromTo('.numero-paire', { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.8)' }, t + 0.25);
  if (existe('.borne-lien')) tl.fromTo('.borne-lien', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' }, t + 0.25);
  if (cavaliers.length) tl.call(() => lancerCavaliers(false), null, t + 0.8);
  /* La photo d'ouverture se pose doucement, une seule fois (lancée à part : elle n'allonge pas l'intro). */
  tl.call(() => { const img = $('[data-iris-centre] img'); if (img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 6, ease: 'power1.out' }); }, null, t);
  if (existe('.mosaique-tampon')) tl.fromTo('.mosaique-tampon', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }, t + 0.35);
}

demarrer({
  preparer() {
    if (!gsap || !ScrollTrigger) return;
    routes(); tampons(); plans(); rangees(); progressions(); preparerCavaliers();
    questions(); composeurs(); reservation();
  },
  /* Intro (moins de 3 s) : le tampon se pose, la route se trace, le tampon file vers l'objet de la page, le titre monte. */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.ouverture-logo', { scale: 0.8, duration: 0.16, ease: 'power2.in' }, 0.12)
      .to('.ouverture-logo', { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' }, 0.28)
      .fromTo('.ouverture-encre', { scale: 0.9, opacity: 0.55 }, { scale: 1.9, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.28)
      .fromTo('.ouverture-route path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.36)
      .fromTo('.ouverture-ligne', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 }, 0.5)
      .to('.ouverture-ligne, .ouverture-route', { opacity: 0, duration: 0.25 }, 0.98);
    versObjet(tl, { a: 1.0 });
    entree(tl, 1.38);
    return tl;
  },
  /* État final (retour arrière, secours) : tout est en place, sans animation. */
  etatFinal() {
    if (!gsap) return;
    gsap.set('.tete-titre, [data-entree], .numero-paire, .borne-lien, .mosaique-tampon, [data-tampon]', { opacity: 1 });
    gsap.set('.tete-ligne, [data-entree], .numero-paire, .borne-lien, .mosaique-tampon', { clearProps: 'transform' });
    gsap.set('[data-entree-rideau]', { clearProps: 'clipPath' });
    gsap.set('[data-iris-centre] img', { scale: 1 });
    $$('.tete-titre').forEach((h) => h.classList.add('est-pose'));
    gsap.set('.route--entree .route-masque', { strokeDashoffset: 0 });
    lancerCavaliers(true);
  },
  /* Arrivée par un lien interne : le premier écran se met en place pendant que le voile se retire. */
  arrivee() {
    if (!gsap) return;
    const tl = gsap.timeline({ delay: 0.12 });
    entree(tl, 0);
  },
});
