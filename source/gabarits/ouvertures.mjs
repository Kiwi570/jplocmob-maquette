/* Ouvertures : une composition par page, tirée de son sujet. Mêmes conventions partout : un seul h1, [data-action-principale],
   [data-info-cle], image chargée en priorité, objet d'ouverture [data-iris-centre]. Les lignes du titre s'animent par une classe
   (jamais data-anime sur chaque ligne) : data-anime="gsap" est porté par le bloc. */
import { html, brut } from '../../outils/gabarit.mjs';
import { image, route, borne } from './composants.mjs';

/* Titre d'ouverture : « Ligne un | ligne <em>deux</em> » découpé en lignes masquées. */
export const titreOuverture = (c, lignes, classe = '') => html`<h1 class="tete-titre ${classe}" data-anime="gsap">${lignes.map((l) => html`<span class="ligne-masque"><span class="tete-ligne">${l}</span></span>`)}</h1>`;
/* Accueil : scindée, titre et actions à gauche, photo en 4:3 à droite, la route passe dessous. */
export const ouvertureAccueil = (c) => html`<section class="hero" id="debut">
  <div class="conteneur hero-grille">
    <div class="hero-texte">
      <p class="surtitre" data-entree>${c.t('accueil.hero.sur')}</p>
      ${titreOuverture(c, [c.t('accueil.hero.titre1'), c.tb('accueil.hero.titre2')], 'hero-titre')}
      <p class="hero-intro" data-entree>${c.t('accueil.hero.texte')} <span class="hero-intro-suite">${c.t('accueil.hero.texte2')}</span></p>
      <p class="hero-actions" data-entree>
        ${c.lien('reserver', { classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <a class="bouton bouton--contour" href="#balades" data-sans-transition>${c.t('accueil.hero.action2')}</a>
      </p>
      <p class="hero-info" data-info-cle data-entree><span class="pastille" aria-hidden="true"></span>${c.t('accueil.hero.info')}</p>
    </div>
    ${image(c, { nom: 'accueil-ouverture', alt: c.donnees.imagesAlt['accueil-ouverture'], cadrage: '50% 45%', priorite: true, classe: 'hero-media', sizes: '(max-width: 760px) 100vw, 52vw', attrs: 'data-fx="parallaxe" data-fx-force="6" data-iris-centre' })}
  </div>
  ${route(c, { variante: 'papier', forme: 0, classe: 'hero-route route--entree' })}
</section>`;

/* Balades et tarifs : grand titre, puis bandeau de collines ; trois bornes servent de sommaire. */
export const ouvertureBalades = (c) => html`<section class="tete tete--bandeau" id="debut">
  <div class="conteneur tete-haut">
    <div>
      <p class="surtitre" data-entree>${c.t('balades.hero.sur')}</p>
      ${titreOuverture(c, [c.tb('balades.hero.titre')], 'tete-titre--geant')}
    </div>
    <div class="tete-cote">
      <p class="tete-intro masque-ecran-tres-bas" data-entree>${c.t('balades.hero.texte')}</p>
      <p class="tete-actions" data-entree>
        ${c.lien('reserver', { classe: 'bouton', texte: c.t('balades.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <span class="tete-info" data-info-cle>${c.t('balades.hero.info')}</span>
      </p>
    </div>
  </div>
  <div class="bandeau">
    ${image(c, { nom: 'grok/g-collines', alt: c.donnees.imagesAlt['g-collines'], cadrage: '50% 60%', cadrageMobile: '50% 60%', priorite: true, classe: 'bandeau-media', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8" data-iris-centre' })}
    <nav class="bandeau-bornes" aria-label="${c.s('balades.hero.sommaire')}">${c.donnees.balades.map((b) => html`<a class="borne-lien" href="#${b.id}" data-sans-transition>${borne(c, b)}<span class="borne-nom">${b.court}</span></a>`)}</nav>
  </div>
</section>`;

/* Les mobylettes : deux photos en hauteur décalées, « 5 » en très grand, tampon qui tourne. */
export const ouvertureMobylettes = (c) => html`<section class="tete tete--mosaique" id="debut">
  <div class="conteneur tete-grille">
    <div class="tete-texte">
      <p class="surtitre" data-entree>${c.t('mobylettes.hero.sur')}</p>
      ${titreOuverture(c, [c.tb('mobylettes.hero.titre')])}
      <p class="tete-intro masque-ecran-tres-bas" data-entree>${c.t('mobylettes.hero.texte')}</p>
      <p class="tete-actions" data-entree>
        ${c.lien('reserver', { classe: 'bouton', texte: c.t('mobylettes.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      </p>
      <p class="hero-info" data-info-cle data-entree><span class="pastille" aria-hidden="true"></span>${c.t('mobylettes.hero.info')}</p>
    </div>
    <div class="mosaique">
      <span class="mosaique-chiffre chiffres" aria-hidden="true" data-audit-ignorer>${c.t('mobylettes.hero.chiffre')}</span>
      ${image(c, { nom: 'mob-rangee', alt: c.donnees.imagesAlt['mob-rangee'], cadrage: '50% 50%', priorite: true, classe: 'mosaique-a', sizes: '(max-width: 760px) 58vw, 30vw', attrs: 'data-fx="parallaxe" data-fx-force="6" data-iris-centre' })}
      ${image(c, { nom: 'mob-rouge', alt: c.donnees.imagesAlt['mob-rouge'], cadrage: '50% 60%', priorite: true, classe: 'mosaique-b', sizes: '(max-width: 760px) 40vw, 20vw', attrs: 'data-entree-rideau' })}
      <img class="mosaique-tampon" src="/assets/images/logo-240.png" alt="" width="120" height="120" data-effet="tampon" data-tampon-tourne>
    </div>
  </div>
</section>`;

/* Réserver : titre et appel à gauche ; à droite, photo en hauteur et bon de sortie posé dessus. Le formulaire suit dans la même grille. */
export const teteReserver = (c) => html`<div class="reserver-tete">
  <p class="surtitre" data-entree>${c.t('reserver.hero.sur')}</p>
  ${titreOuverture(c, [c.tb('reserver.hero.titre')])}
  <p class="tete-intro" data-entree>${c.t('reserver.hero.texte')}</p>
  <p class="tete-actions" data-entree>
    <a class="bouton" href="tel:${c.site.contact.telephoneLien}" data-action-principale data-survol="magnetique">${c.t('commun.appeler')} ${c.site.contact.telephone}</a>
    <a class="bouton bouton--contour" href="mailto:${c.site.contact.email}">${c.site.contact.email}</a>
  </p>
  <p class="hero-info" data-info-cle data-entree><span class="pastille" aria-hidden="true"></span>${c.t('reserver.hero.info')}</p>
</div>`;

/* Contact : le numéro en très grand, le chat sur la selle. */
export const ouvertureContact = (c) => html`<section class="tete tete--numero" id="debut">
  <div class="conteneur tete-grille">
    <div class="tete-texte">
      <p class="surtitre" data-entree>${c.t('contact.hero.sur')}</p>
      ${titreOuverture(c, [c.tb('contact.hero.titre')])}
      <p class="tete-intro masque-ecran-tres-bas" data-entree>${c.t('contact.hero.texte')}</p>
      <p class="numero" data-entree><a class="numero-lien chiffres" href="tel:${c.site.contact.telephoneLien}" data-action-principale aria-label="${c.s('contact.hero.action')}">${c.site.contact.telephone.split(' ').map((x) => html`<span class="numero-paire">${x}</span>`)}</a></p>
      <p class="hero-info" data-info-cle data-entree><span class="pastille" aria-hidden="true"></span><a href="mailto:${c.site.contact.email}">${c.t('contact.hero.info')}</a></p>
    </div>
    ${image(c, { nom: 'chat-selle', alt: c.donnees.imagesAlt['chat-selle'], cadrage: '50% 38%', priorite: true, classe: 'tete-media tete-media--haute', sizes: '(max-width: 760px) 100vw, 36vw', attrs: 'data-fx="parallaxe" data-fx-force="6" data-iris-centre' })}
  </div>
  ${route(c, { variante: 'papier', forme: 2, classe: 'hero-route route--entree' })}
</section>`;
