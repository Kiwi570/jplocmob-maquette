/* Composants du site JP Loc Mob, communs à toutes les pages : image avec repli, surtitre, titre, borne kilométrique,
   route qui se dessine, plan des parcours, carte de balade, formules, pauses, questions, composeur, appel final. */
import { html, brut } from '../../outils/gabarit.mjs';
import { existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '../..');
let compteur = 0;
const id = (p) => `${p}-${++compteur}`;

export const existeImage = (nom) => {
  const dossier = join(racine, 'assets/images', dirname(nom)), base = nom.split('/').pop();
  return existsSync(dossier) && readdirSync(dossier).some((f) => f.startsWith(`${base}-`) && f.endsWith('.webp'));
};

/* Image du plan ; si elle manque encore (image Grok pas reçue), un visuel dessiné en code prend sa place : jamais un cadre vide. */
export function image(c, o) {
  if (existeImage(o.nom)) return c.media(o);
  const style = `--cadrage:50% 50%` + (o.ratio ? `;aspect-ratio:${o.ratio}` : '');
  return html`<figure class="media media--provisoire ${o.classe || ''}" data-visuel${brut(o.attrs ? ' ' + o.attrs : '')} style="${style}">
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"${brut(o.alt ? ` role="img" aria-label="${o.alt.replace(/"/g, '&quot;')}"` : ' aria-hidden="true"')}><rect width="400" height="300" fill="#dfe6cf"/><circle cx="310" cy="70" r="34" fill="#F2B632"/><path d="M0 190 C 80 140 150 170 220 150 S 340 120 400 160 V300 H0Z" fill="#7d9a6a"/><path d="M0 230 C 90 190 190 240 280 205 S 370 200 400 215 V300 H0Z" fill="#1F3B30"/><path d="M150 300 C 190 250 230 235 290 222" fill="none" stroke="#F3EDDC" stroke-width="14" stroke-linecap="round"/></svg>
  <figcaption class="mention-ia">${c.t('commun.provisoire')}</figcaption>
</figure>`;
}

export const surtitre = (c, cle) => html`<p class="surtitre" data-anime>${c.t(cle)}</p>`;
export const titre = (c, cle, { niveau = 2, classe = '' } = {}) => html`${brut(`<h${niveau} class="titre ${classe}" data-anime="lignes">`)}${c.tb(cle)}${brut(`</h${niveau}>`)}`;

/* Borne kilométrique : les kilomètres réels de la balade, qui comptent à l'apparition. */
export const borne = (c, b, { classe = '' } = {}) => html`<span class="borne ${classe}" data-effet="borne" data-anime>
  <span class="borne-tete" aria-hidden="true"></span>
  <strong class="borne-km chiffres"><span data-compteur="${b.km}">${b.km}</span> <small>${c.t(b.max ? 'commun.kmMax' : 'commun.km')}</small></strong>
</span>`;

/* Route qui se dessine au défilement (fil du site). variante : 'papier' (route sombre sur papier) ou 'sapin' (route claire sur sapin). */
const ROUTES = [
  'M-20 78 C 180 10 380 120 640 60 S 1080 0 1460 70',
  'M-20 40 C 240 110 420 0 700 62 S 1180 118 1460 36',
  'M-20 60 C 160 120 360 14 620 70 S 1010 110 1220 50 S 1400 30 1460 60',
];
/* Points d'un tracé « M … C … S … », échantillonnés en fractions de la largeur et de la hauteur (pour la mobylette de l'ouverture). */
function echantillons(d, n = 14) {
  const j = d.match(/[MCS]|-?\d+(?:\.\d+)?/g), pts = [];
  let i = 0, p = null, c2 = null;
  const lire = () => [+j[i++], +j[i++]];
  const courbe = (a, b1, b2, z) => { for (let k = pts.length ? 1 : 0; k <= n; k++) { const t = k / n, u = 1 - t; pts.push([u * u * u * a[0] + 3 * u * u * t * b1[0] + 3 * u * t * t * b2[0] + t * t * t * z[0], u * u * u * a[1] + 3 * u * u * t * b1[1] + 3 * u * t * t * b2[1] + t * t * t * z[1]]); } };
  while (i < j.length) {
    const o = j[i++];
    if (o === 'M') p = lire();
    else if (o === 'C') { while (i < j.length && !/[MCS]/.test(j[i])) { const b1 = lire(), b2 = lire(), z = lire(); courbe(p, b1, b2, z); c2 = b2; p = z; } }
    else if (o === 'S') { while (i < j.length && !/[MCS]/.test(j[i])) { const b1 = [2 * p[0] - c2[0], 2 * p[1] - c2[1]], b2 = lire(), z = lire(); courbe(p, b1, b2, z); c2 = b2; p = z; } }
  }
  return pts.map(([x, y]) => [+(x / 1440).toFixed(4), +(y / 120).toFixed(4)]);
}
const CAVALIER = '<svg viewBox="0 0 44 30" aria-hidden="true"><g fill="none" stroke="#1F3B30" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="6.5" fill="#F3EDDC"/><circle cx="35" cy="21" r="6.5" fill="#F3EDDC"/><path d="M9 21 16 8h13l6 13M16 8l-3-5H9M29 8l2.4-6h4.4"/></g><path d="M17 5.6h9" stroke="#1F3B30" stroke-width="5" stroke-linecap="round"/><path d="M15 12h13l3 6H17z" fill="#C93A1E" stroke="#1F3B30" stroke-width="2" stroke-linejoin="round"/></svg>';
export function route(c, { variante = 'papier', forme = 0, classe = '' } = {}) {
  const m = id('route'), d = ROUTES[forme % ROUTES.length], entree = classe.includes('route--entree');
  const svg = html`<svg class="route route--${variante} ${entree ? 'route--entree' : classe}" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" data-effet="route" data-grille="fil" data-visuel>
  <mask id="${m}" maskUnits="userSpaceOnUse" x="-40" y="-40" width="1520" height="200"><path class="route-masque" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="40"/></mask>
  <g mask="url(#${m})"><path class="route-bord" d="${d}" fill="none"/><path class="route-ligne" d="${d}" fill="none"/></g>
</svg>`;
  /* Ouverture : la route se trace à l'arrivée, puis une petite mobylette la remonte toute seule (une fois, sans boucle). */
  return entree ? html`<div class="${classe.replace('route--entree', '').trim()} route-cadre" data-audit-ignorer>${svg}<span class="route-mob" data-route-mob data-points="${JSON.stringify(echantillons(d))}" aria-hidden="true">${brut(CAVALIER)}</span></div>` : svg;
}

/* Petite mobylette dessinée (silhouette), pour le plan. */
const MOB = '<g class="plan-mob" data-mob><circle r="15" fill="#F3EDDC"/><g transform="translate(-11 -8)" fill="none" stroke="#1F3B30" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="4.5" cy="12" r="3.6"/><circle cx="17.5" cy="12" r="3.6"/><path d="M4.5 12 8 5.5h6.5l3 6.5M8 5.5 6.5 3h-2M14.5 5.5l1.2-3.2h2.4M9.5 5.5h4" /><path d="M9 4.4h4.2" stroke-width="2.6"/></g></g>';

/* Plan des parcours : tracés redessinés d'après les cartes du site ; noms des lieux en HTML par-dessus (lisibles à toutes les tailles). */
export function plan(c, { parcours = ['fallavier', 'cremieu'], classe = '' } = {}) {
  const k = c.donnees.carte;
  const noms = [...new Set(parcours.flatMap((p) => k.parcours[p].lieux))];
  /* Cadre du plan : la boîte des tracés affichés, avec de la place pour les noms à gauche et à droite. */
  const tous = [...parcours.flatMap((p) => k.parcours[p].points), ...noms.map((n) => k.lieux[n].p)];
  const xs = tous.map((p) => p[0]), ys = tous.map((p) => p[1]);
  const VX = Math.round(Math.min(...xs) - 190), VY = Math.round(Math.min(...ys) - 85), VL = Math.round(Math.max(...xs) - Math.min(...xs) + 450), VH = Math.round(Math.max(...ys) - Math.min(...ys) + 185);
  const u = +(VL / 830).toFixed(3);
  /* Nom d'un lieu : ancré à gauche ou à droite du point, avec une largeur bornée par la place restante (jamais coupé au bord). */
  const pos = (l) => {
    const x = ((l.p[0] - VX) / VL) * 100, y = (((l.p[1] - VY) / VH) * 100).toFixed(2);
    if (l.cote === 'gauche') return `right:${(100 - x).toFixed(2)}%;top:${y}%;max-width:calc(${x.toFixed(2)}% - 18px)`;
    if (l.cote === 'bas') return `left:${x.toFixed(2)}%;top:${y}%`;
    return `left:${x.toFixed(2)}%;top:${y}%;max-width:calc(${(100 - x).toFixed(2)}% - 20px)`;
  };
  const donnees = JSON.stringify(Object.fromEntries(parcours.map((p) => [p, k.parcours[p].points])));
  return html`<div class="plan ${classe}" data-effet="parcours" data-plan data-visuel style="--ratio:${(VL / VH).toFixed(3)};--u:${u}">
  <script type="application/json" class="plan-donnees">${brut(donnees)}</script>
  <div class="plan-carte">
    <svg class="plan-svg" viewBox="${VX} ${VY} ${VL} ${VH}" aria-hidden="true">
      <g class="plan-relief" fill="none"><path d="M-320 120 C -60 60 60 150 190 100 S 420 40 760 110"/><path d="M-320 260 C -40 210 120 300 250 250 S 470 190 760 270"/><path d="M-320 420 C -70 370 40 440 170 400 S 430 330 760 420"/><path d="M-320 510 C -90 470 60 540 200 500 S 450 450 760 520"/><path d="M-320 610 C -30 560 110 650 260 600 S 480 560 760 640"/><path d="M-320 700 C -60 660 90 730 240 690 S 470 650 760 720"/><ellipse cx="470" cy="150" rx="70" ry="36"/><ellipse cx="470" cy="150" rx="38" ry="18"/><ellipse cx="-60" cy="330" rx="74" ry="34"/><ellipse cx="-60" cy="330" rx="40" ry="16"/><ellipse cx="420" cy="640" rx="80" ry="30"/></g>
      ${parcours.map((p) => brut(`<path class="plan-fantome" d="${k.parcours[p].d}" fill="none"/><path class="plan-trace" data-trace="${p}" d="${k.parcours[p].d}" pathLength="1" fill="none"/>`))}
      ${noms.map((n) => brut(`<circle class="plan-point${n === 'depart' ? ' plan-point--depart' : ''}" cx="${k.lieux[n].p[0]}" cy="${k.lieux[n].p[1]}" r="${((n === 'depart' ? 11 : 7) * u).toFixed(1)}"/>`))}
      ${brut(`<g transform="translate(${k.lieux.depart.p[0]} ${k.lieux.depart.p[1]}) scale(${u})">${MOB}</g>`)}
    </svg>
    ${noms.map((n) => html`<span class="plan-nom plan-nom--${k.lieux[n].cote}${n === 'depart' ? ' plan-nom--depart' : ''}${k.lieux[n].secondaire ? ' plan-nom--secondaire' : ''}" data-repere style="${pos(k.lieux[n])}">${k.lieux[n].nom}</span>`)}
  </div>
  <p class="plan-note">${c.t('commun.traceIndicatif')}</p>
</div>`;
}

const prixDes = (c, b) => Math.min(...b.formules.map((f) => c.donnees.formules.formules[f].prix));

/* Carte d'une balade (accueil). */
export const carteBalade = (c, b) => html`<article class="carte-balade" id="carte-${b.id}" data-survol="incline" data-survol-force="4">
  ${image(c, { nom: b.image, alt: b.nom, cadrage: b.cadrage, classe: 'carte-balade-media', sizes: '(max-width: 760px) 86vw, 30vw', attrs: 'data-fx="zoom" data-fx-force="12"' })}
  ${borne(c, b, { classe: 'borne--carte' })}
  <div class="carte-balade-texte">
    <h3>${b.nom}</h3>
    <p>${b.texte}</p>
    <p class="carte-balade-bas"><span class="prix-des" data-prix>${c.t('commun.des')} <strong>${prixDes(c, b)} €</strong></span>${c.lien('balades-et-tarifs', { ancre: b.id, classe: 'lien-fleche', texte: c.t('commun.voirBalade'), attrs: `aria-label="${c.s('commun.voirBalade')} : ${b.nom}"` })}</p>
  </div>
</article>`;

/* Formules et prix d'une balade. */
export const formules = (c, b, { anime = true } = {}) => html`<ul class="formules"${anime ? brut(' data-anime="cascade"') : ''}>${b.formules.map((f) => {
  const x = c.donnees.formules.formules[f];
  return html`<li class="formule"><span class="formule-nom"><strong>${x.nom}</strong><small>${x.horaires}</small></span><span class="formule-prix chiffres" data-prix>${x.prix} €</span></li>`;
})}</ul>`;

/* Deux pauses en terrasse. */
export const pauses = (c, cle) => html`<section class="section pauses" id="pauses">
  <div class="conteneur">
    <div class="section-tete">${surtitre(c, `${cle}.sur`)}${titre(c, `${cle}.titre`)}<p data-anime>${c.t(`${cle}.texte`)}</p></div>
    <div class="pauses-grille" data-anime="cascade">${c.donnees.pauses.map((p) => html`<article class="pause">
      ${image(c, { nom: p.image, alt: p.nom, classe: 'pause-media', sizes: '(max-width: 760px) 40vw, 240px' })}
      <div><h3>${p.nom}</h3><p class="pause-lieu">${p.lieu}</p><p>${p.texte}</p>${p.tel ? html`<p class="pause-tel">${p.telTexte} <a href="tel:${p.telLien}">${p.tel}</a></p>` : ''}</div>
    </article>`)}</div>
  </div>
</section>`;

export const questions = (c) => html`<div class="questions">${c.donnees.faq.map((f) => html`<details class="question" data-anime><summary><span>${f.q}</span><i aria-hidden="true"></i></summary><div class="question-reponse"><p>${f.r}</p></div></details>`)}</div>`;

/* Composeur de sortie (module composeur-de-formule de la bibliothèque) : durée × nombre de mobylettes. Les prix viennent des données. */
export function composeur(c, { prefixe = 'cdf' } = {}) {
  const F = c.donnees.formules, B = c.donnees.balades;
  const donnees = { devise: 'EUR', bases: Object.fromEntries(Object.entries(F.formules).map(([k, f]) => [k, { prix: f.prix, par: ['mobylettes'] }])), options: {}, remises: [] };
  return html`<div class="cdf composeur" data-module="composeur-de-formule" data-epingle data-caution="${F.caution}" data-reserver="${c.url('reserver')}">
  <script type="application/json" class="cdf__donnees">${brut(JSON.stringify(donnees))}</script>
  <div class="cdf__grille">
    <form class="cdf__form" novalidate>
      <fieldset class="cdf__groupe">
        <legend class="cdf__legende"><span class="cdf__num" aria-hidden="true">1</span>${c.t('composeur.balade')}</legend>
        <div class="cdf__choix-liste">${B.map((b, i) => html`
          <label class="cdf__choix"><input type="radio" name="balade" value="${b.id}" data-nom="${b.nom}" data-formules="${b.formules.join(' ')}"${i === 0 ? brut(' checked') : ''}><span class="cdf__carte"><b class="cdf__nom">${b.court}</b><small>${b.km} ${c.t(b.max ? 'commun.kmMax' : 'commun.km')}</small></span></label>`)}
        </div>
      </fieldset>
      <fieldset class="cdf__groupe">
        <legend class="cdf__legende"><span class="cdf__num" aria-hidden="true">2</span>${c.t('composeur.duree')}</legend>
        <div class="cdf__choix-liste">${Object.entries(F.formules).map(([k, f]) => html`
          <label class="cdf__choix" data-formule="${k}"><input type="radio" name="base" value="${k}" data-nom="${f.nom}" data-superpose${k === 'mi' ? brut(' checked') : ''}><span class="cdf__carte"><b class="cdf__nom">${f.nom}</b><small>${f.horaires}</small><span class="cdf__prix" data-prix></span></span></label>`)}
        </div>
        <p class="cdf__note" data-note-demi>${c.t('composeur.noteDemi')}</p>
      </fieldset>
      <fieldset class="cdf__groupe">
        <legend class="cdf__legende"><span class="cdf__num" aria-hidden="true">3</span>${c.t('composeur.combien')}</legend>
        <div class="cdf__qte">
          <label for="${prefixe}-mobylettes">${c.t('composeur.mobylettes')} <small>${c.t('composeur.mobylettesAide')}</small></label>
          <div class="cdf__pas">
            <button type="button" data-pas="-1" aria-label="${c.s('reserver.form.moins')}">−</button>
            <input id="${prefixe}-mobylettes" name="mobylettes" type="number" min="1" max="${F.mobsMax}" step="1" value="2" inputmode="numeric" data-unites="mobylette|mobylettes">
            <button type="button" data-pas="1" aria-label="${c.s('reserver.form.plus')}">+</button>
          </div>
        </div>
      </fieldset>
      <div class="cdf__mini" aria-hidden="true">
        <span class="cdf__mini-total"><small>${c.t('composeur.total')}</small> <b data-total-mini>—</b></span>
        <a class="bouton bouton--petit" href="#${prefixe}-recap" tabindex="-1" data-sans-transition>${c.t('composeur.detail')}</a>
      </div>
    </form>
    <aside class="cdf__recap ticket" id="${prefixe}-recap" data-tient aria-labelledby="${prefixe}-recap-titre">
      <p class="surtitre" id="${prefixe}-recap-titre">${c.t('composeur.votre')}</p>
      <p class="cdf__total chiffres"><span class="socle-sr">${c.t('composeur.total')} : </span><span data-total data-prix>—</span></p>
      <p class="cdf__par" data-par-unite></p>
      <p class="cdf__caution">${c.t('composeur.caution')} <strong class="chiffres" data-caution-total>${F.caution * 2} €</strong></p>
      <p class="cdf__mention">${c.t('commun.prixConfirmer')}</p>
      ${c.lien('reserver', { classe: 'bouton cdf__appel', texte: c.t('composeur.demander'), attrs: 'data-lien-reserver data-survol="magnetique"' })}
      <ul class="cdf__lignes" data-lignes aria-label="${c.s('composeur.detailCalcul')}"></ul>
      <p class="socle-sr" aria-live="polite" aria-atomic="true" data-annonce></p>
    </aside>
  </div>
</div>`;
}

/* Tableau des tarifs, lisible sans JavaScript et sans le composeur. */
export const grilleTarifs = (c) => html`<div class="grille-tarifs" data-anime="cascade">${c.donnees.balades.map((b) => html`<div class="grille-tarifs-carte"><h3>${b.court}</h3><p class="grille-tarifs-km">${b.km} ${c.t(b.max ? 'commun.kmMax' : 'commun.km')}</p>${formules(c, b, { anime: false })}</div>`)}</div>`;

/* Appel final : avec photo (accueil) ou avec la route et le tampon (autres pages : aucune photo répétée d'une page à l'autre). */
export function appel(c, { imageNom = '', forme = 1 } = {}) {
  const k = c.site.contact;
  return html`<section class="appel ${imageNom ? 'appel--photo' : ''}" id="appel">
  ${imageNom ? image(c, { nom: imageNom, alt: '', classe: 'appel-media', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' }) : route(c, { variante: 'sapin', forme, classe: 'appel-route' })}
  <div class="conteneur appel-contenu">
    <img class="appel-tampon" src="/assets/images/logo-240.png" alt="" width="132" height="132" loading="lazy" data-effet="tampon" data-tampon>
    ${surtitre(c, 'commun.appelSur')}
    ${titre(c, 'commun.appelTitre')}
    <p data-anime>${c.t('commun.appelTexte')}</p>
    <p class="appel-actions" data-anime>
      ${c.lien('reserver', { classe: 'bouton', texte: c.t('commun.appelAction'), attrs: 'data-survol="magnetique"' })}
      <a class="bouton bouton--contour" href="tel:${k.telephoneLien}" data-survol="magnetique">${k.telephone}</a>
    </p>
  </div>
</section>`;
}
