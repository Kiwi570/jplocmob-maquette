/* Balades et tarifs : les trois balades en détail (tracé, étapes, photos, formules), le composeur, les pauses. */
import { html } from '../../outils/gabarit.mjs';
import { image, surtitre, titre, route, plan, formules, pauses, composeur, grilleTarifs, appel, borne } from '../gabarits/composants.mjs';
import { ouvertureBalades } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'balades-et-tarifs', fichier: 'balades-et-tarifs', imagePartage: 'fallavier-chateau-1280.webp' };

const balade = (c, b, i) => html`<section class="section balade ${i % 2 ? 'section--papier2 balade--inverse' : ''}" id="${b.id}">
  <div class="conteneur balade-grille">
    <div class="balade-texte">
      ${borne(c, b, { classe: 'borne--grande' })}
      <h2 class="titre" data-anime="lignes">${b.nom}</h2>
      <p class="balade-accroche" data-anime>${b.accroche}</p>
      <p data-anime>${b.texte}</p>
      ${b.etapes.length ? html`<h3 class="petit-titre" data-anime>${c.t('balades.parcours')}</h3>
      <ol class="etapes etapes--ligne" data-anime="cascade">${b.etapes.map((e) => html`<li>${e}</li>`)}</ol>` : html`<h3 class="petit-titre" data-anime>${c.t('balades.libreTitre')}</h3><p data-anime>${c.t('balades.libreTexte')}</p>`}
      <h3 class="petit-titre" data-anime>${c.t('balades.formules')}</h3>
      ${formules(c, b)}
      <p class="note" data-anime>${c.t('commun.inclus')}. ${c.t('commun.prixConfirmer')}</p>
      <p data-anime>${c.lien('reserver', { params: `balade=${b.id}`, classe: 'bouton', texte: c.t('commun.reserverCette'), attrs: `data-survol="magnetique" aria-label="${c.s('commun.reserverCette')} : ${b.nom}"` })}</p>
    </div>
    <div class="balade-visuel">
      ${b.etapes.length ? plan(c, { parcours: [b.id], classe: 'plan--seul' }) : image(c, { nom: b.image, alt: c.donnees.imagesAlt['g-route-libre'], cadrage: b.cadrage, classe: 'balade-libre-media', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
    </div>
  </div>
  ${b.vignettes.length ? html`<div class="conteneur balade-photos" data-anime="cascade">
    ${image(c, { nom: b.grande || b.image, alt: c.donnees.imagesAlt[b.grande || b.image], cadrage: b.cadrageGrande || b.cadrage, classe: 'balade-photo balade-photo--grande', sizes: '(max-width: 760px) 100vw, 44vw' })}
    ${b.vignettes.map((v) => image(c, { nom: v.image, alt: c.donnees.imagesAlt[v.image], classe: 'balade-photo', sizes: '(max-width: 760px) 46vw, 20vw', legende: v.legende }))}
  </div>` : ''}
</section>`;

export default (c) => html`
${ouvertureBalades(c)}

${c.donnees.balades.map((b, i) => balade(c, b, i))}

${route(c, { variante: 'papier', forme: 1, classe: 'route--jonction' })}
<section class="section sombre tarifs" id="composer">
  <div class="conteneur">
    <div class="section-tete">${surtitre(c, 'balades.composeur.sur')}${titre(c, 'balades.composeur.titre')}<p data-anime>${c.t('balades.composeur.texte')}</p></div>
    ${composeur(c, { prefixe: 'sortie' })}
    <noscript>${grilleTarifs(c)}</noscript>
  </div>
</section>

${pauses(c, 'balades.pauses')}

${appel(c, { forme: 0 })}
`;
