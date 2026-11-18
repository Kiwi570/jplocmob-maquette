/* Accueil : ouverture, manifeste, les trois balades, carte des parcours, les mobylettes, déroulé, tarifs en direct,
   pauses en terrasse, questions, appel. Chaque section a un effet au défilement, visible aussi sur téléphone. */
import { html } from '../../outils/gabarit.mjs';
import { image, surtitre, titre, route, plan, carteBalade, questions, composeur, grilleTarifs, appel, borne } from '../gabarits/composants.mjs';
import { ouvertureAccueil } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'accueil-ouverture-1280.webp' };

const etapes = [
  { n: 1, image: 'terrasse-vintage', cadrage: '50% 40%' },
  { n: 2, image: 'grok/g-casque-gants', cadrage: '50% 50%' },
  { n: 3, image: 'mob-sous-bois', cadrage: '50% 55%' },
  { n: 4, image: 'mob-club', cadrage: '50% 50%' },
];

export default (c) => html`
${ouvertureAccueil(c)}

<section class="section sombre manifeste" id="esprit">
  <div class="conteneur manifeste-grille">
    <div>
      ${surtitre(c, 'accueil.manifeste.sur')}
      <p class="manifeste-texte" data-anime="mots">${c.t('accueil.manifeste.texte')}</p>
      <p class="manifeste-signature" data-anime>${c.t('accueil.manifeste.signature')}</p>
    </div>
  </div>
  ${image(c, { nom: 'grok/g-route-campagne', alt: c.donnees.imagesAlt['g-route-campagne'], cadrage: '50% 60%', classe: 'manifeste-media', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
</section>

<section class="section balades" id="balades">
  <div class="conteneur">
    <div class="section-tete">${surtitre(c, 'accueil.balades.sur')}${titre(c, 'accueil.balades.titre')}<p data-anime>${c.t('accueil.balades.texte')}</p></div>
    <div class="balades-grille" data-anime="cascade">${c.donnees.balades.map((b) => carteBalade(c, b))}</div>
    <p class="section-suite" data-anime>${c.lien('balades-et-tarifs', { classe: 'bouton bouton--contour', texte: c.t('accueil.balades.tout') })}</p>
  </div>
</section>

${route(c, { variante: 'papier', forme: 1, classe: 'route--jonction' })}
<section class="section sombre carte" id="carte">
  <div class="conteneur carte-grille">
    <div class="carte-plan">${plan(c)}</div>
    <div class="carte-texte">
      ${surtitre(c, 'accueil.carte.sur')}
      ${titre(c, 'accueil.carte.titre')}
      <p data-anime>${c.t('accueil.carte.texte')}</p>
      ${c.donnees.balades.filter((b) => b.etapes.length).map((b) => html`<article class="carte-boucle" data-boucle="${b.id}">
        <div class="carte-boucle-tete">${borne(c, b)}<h3>${b.nom}</h3></div>
        <div class="boucle-avance" aria-hidden="true" data-visuel><span class="boucle-barre"><span data-boucle-barre></span></span><span class="boucle-km chiffres"><span data-boucle-km>0</span> / ${b.km} km</span></div>
        <ol class="etapes" data-anime="cascade">${b.etapes.map((e) => html`<li>${e}</li>`)}</ol>
        <p>${c.lien('reserver', { params: `balade=${b.id}`, classe: 'lien-fleche', texte: c.t('commun.reserverCette'), attrs: `aria-label="${c.s('commun.reserverCette')} : ${b.nom}"` })}</p>
      </article>`)}
      <div class="carte-pauses" data-anime>
        <p><strong>${c.t('accueil.pauses.titre')}</strong></p>
        <p>${c.donnees.pauses.map((p) => `${p.nom} (${p.lieu})`).join(', ')}. ${c.lien('balades-et-tarifs', { ancre: 'pauses', classe: 'lien-fleche', texte: c.t('accueil.pauses.lien') })}</p>
      </div>
    </div>
  </div>
</section>

<section class="section mobs" id="mobylettes">
  <div class="conteneur section-tete section-tete--ligne">
    <div>${surtitre(c, 'accueil.mobs.sur')}${titre(c, 'accueil.mobs.titre')}</div>
    <div><p data-anime>${c.t('accueil.mobs.texte')}</p><p data-anime>${c.lien('les-mobylettes', { classe: 'lien-fleche', texte: c.t('accueil.mobs.lien') })}</p></div>
  </div>
  <div class="rangee" data-rangee data-ruban data-effet="rangee" tabindex="0" role="region" aria-label="${c.s('accueil.mobs.region')}">
    <div class="rangee-piste" data-rangee-piste>${c.donnees.galerie.filter((g) => !g.large).map((g) => html`<figure class="rangee-carte" data-fx="vitesse" data-fx-force="2.4">
      ${image(c, { nom: g.image, alt: c.donnees.imagesAlt[g.image], cadrage: g.cadrage, classe: 'rangee-media', sizes: '(max-width: 760px) 62vw, 26vw' })}
      <figcaption>${g.titre}</figcaption>
    </figure>`)}</div>
  </div>
</section>

<section class="section section--papier2 deroule" id="deroule">
  <div class="conteneur">
    <div class="section-tete">${surtitre(c, 'accueil.deroule.sur')}${titre(c, 'accueil.deroule.titre')}</div>
    <div class="deroule-ligne" aria-hidden="true" data-effet="progression" data-visuel><span data-progression></span></div>
    <ol class="deroule-grille" data-anime="cascade">${etapes.map((e) => html`<li class="deroule-etape" data-deroule-etape>
      <span class="deroule-n chiffres" aria-hidden="true">${e.n}</span>
      ${image(c, { nom: e.image, alt: c.donnees.imagesAlt[e.image.replace('grok/', '')], cadrage: e.cadrage, classe: 'deroule-media', sizes: '(max-width: 760px) 44vw, 22vw' })}
      <h3>${c.t(`accueil.deroule.e${e.n}Titre`)}</h3>
      <p>${c.t(`accueil.deroule.e${e.n}Texte`)}</p>
    </li>`)}</ol>
  </div>
</section>

${route(c, { variante: 'papier2', forme: 2, classe: 'route--jonction' })}
<section class="section sombre tarifs" id="tarifs">
  <div class="conteneur">
    <div class="section-tete">${surtitre(c, 'accueil.tarifs.sur')}${titre(c, 'accueil.tarifs.titre')}<p data-anime>${c.t('accueil.tarifs.texte')}</p></div>
    ${composeur(c, { prefixe: 'sortie' })}
    <noscript>${grilleTarifs(c)}</noscript>
  </div>
</section>

<section class="section section--papier2 faq" id="questions">
  <div class="conteneur faq-grille">
    <div class="section-tete faq-tete">${surtitre(c, 'accueil.faq.sur')}${titre(c, 'accueil.faq.titre')}
      ${image(c, { nom: 'chat-selle', alt: c.donnees.imagesAlt['chat-selle'], cadrage: '50% 38%', classe: 'faq-media', sizes: '(max-width: 760px) 50vw, 24vw', attrs: 'data-anime="rideau"' })}
    </div>
    ${questions(c)}
  </div>
</section>

${appel(c, { imageNom: 'grok/g-appel-soir' })}
`;
