/* Les mobylettes : les cinq mobylettes en images, le café avant la route, les conditions de location. */
import { html } from '../../outils/gabarit.mjs';
import { image, surtitre, titre, route, appel } from '../gabarits/composants.mjs';
import { ouvertureMobylettes } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'les-mobylettes', fichier: 'les-mobylettes', imagePartage: 'mob-rangee-1280.webp' };

export default (c) => html`
${ouvertureMobylettes(c)}

<section class="section section--papier2 parc" id="galerie">
  <div class="conteneur">
    <div class="section-tete">${surtitre(c, 'mobylettes.galerie.sur')}${titre(c, 'mobylettes.galerie.titre')}</div>
    <div class="parc-grille">${c.donnees.galerie.filter((g) => !['mob-rangee', 'mob-rouge', 'mob-sous-bois'].includes(g.image)).map((g, i) => html`<figure class="parc-carte parc-carte--${g.large ? 'large' : i % 3}" data-anime>
      ${image(c, { nom: g.image, alt: c.donnees.imagesAlt[g.image], cadrage: g.cadrage, classe: 'parc-media', sizes: g.large ? '(max-width: 760px) 100vw, 62vw' : '(max-width: 760px) 46vw, 30vw', attrs: 'data-fx="parallaxe" data-fx-force="7"' })}
      <figcaption>${g.titre}</figcaption>
    </figure>`)}
      <div class="parc-note" data-anime>
        <h3>${c.t('mobylettes.galerie.noteTitre')}</h3>
        <p>${c.t('mobylettes.galerie.noteTexte')}</p>
        <p>${c.lien('reserver', { classe: 'lien-fleche', texte: c.t('mobylettes.galerie.noteLien') })}</p>
      </div>
    </div>
  </div>
</section>

<section class="section cafe" id="accueil-cafe">
  <div class="conteneur cafe-grille">
    <div class="cafe-visuels">
      ${image(c, { nom: 'terrasse-vintage', alt: c.donnees.imagesAlt['terrasse-vintage'], cadrage: '50% 45%', classe: 'cafe-a', sizes: '(max-width: 760px) 60vw, 28vw', attrs: 'data-anime="rideau"' })}
      ${image(c, { nom: 'grok/g-terrasse', alt: c.donnees.imagesAlt['g-terrasse'], cadrage: '50% 50%', classe: 'cafe-b', sizes: '(max-width: 760px) 40vw, 18vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
    </div>
    <div class="cafe-texte">
      ${surtitre(c, 'mobylettes.cafe.sur')}
      ${titre(c, 'mobylettes.cafe.titre')}
      <p data-anime>${c.t('mobylettes.cafe.texte')}</p>
      <p data-anime>${c.t('mobylettes.cafe.texte2')}</p>
      ${image(c, { nom: 'loueur', alt: c.donnees.imagesAlt['loueur'], cadrage: '50% 30%', classe: 'cafe-c', sizes: '(max-width: 760px) 60vw, 22vw', attrs: 'data-anime="rideau"' })}
    </div>
  </div>
</section>

${route(c, { variante: 'papier', forme: 2, classe: 'route--jonction' })}
<section class="section sombre conditions" id="conditions">
  <div class="conteneur">
    <div class="section-tete">${surtitre(c, 'mobylettes.conditions.sur')}${titre(c, 'mobylettes.conditions.titre')}</div>
    <div class="conditions-grille" data-anime="cascade">
      <article class="condition"><p class="condition-chiffre chiffres"><span data-compteur="18">${c.t('mobylettes.conditions.c1Chiffre')}</span> <small>${c.t('mobylettes.conditions.c1Unite')}</small></p><p>${c.t('mobylettes.conditions.c1Texte')}</p></article>
      <article class="condition"><p class="condition-chiffre chiffres" data-prix><span data-compteur="600">${c.t('mobylettes.conditions.c2Chiffre')}</span> <small>${c.t('mobylettes.conditions.c2Unite')}</small></p><p>${c.t('mobylettes.conditions.c2Texte')}</p></article>
      <article class="condition"><h3>${c.t('mobylettes.conditions.c3Titre')}</h3><p>${c.t('mobylettes.conditions.c3Texte')}</p></article>
      <article class="condition condition--image">${image(c, { nom: 'grok/g-casque-gants', alt: c.donnees.imagesAlt['g-casque-gants'], cadrage: '50% 50%', classe: 'condition-media', sizes: '(max-width: 760px) 100vw, 22vw' })}<h3>${c.t('mobylettes.conditions.c4Titre')}</h3><p>${c.t('mobylettes.conditions.c4Texte')}</p></article>
    </div>
  </div>
</section>

${appel(c, { forme: 2 })}
`;
