/* Page 404 aux couleurs du client : « Sortie de route ». */
import { html } from '../../outils/gabarit.mjs';
import { image, route } from '../gabarits/composants.mjs';
import { titreOuverture } from '../gabarits/ouvertures.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="tete tete--introuvable" id="debut">
  <div class="conteneur tete-grille">
    <div class="tete-texte">
      <p class="surtitre" data-entree>${c.t('introuvable.sur')}</p>
      ${titreOuverture(c, [c.tb('introuvable.titre')])}
      <p class="tete-intro" data-entree>${c.t('introuvable.texte')}</p>
      <p class="tete-actions" data-entree>
        ${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale data-survol="magnetique"' })}
        ${c.lien('balades-et-tarifs', { classe: 'bouton bouton--contour', texte: c.t('introuvable.balades') })}
      </p>
    </div>
    ${image(c, { nom: 'grok/g-404', alt: c.donnees.imagesAlt['g-404'], cadrage: '50% 55%', priorite: true, classe: 'tete-media', sizes: '(max-width: 760px) 100vw, 46vw', attrs: 'data-fx="parallaxe" data-fx-force="6" data-iris-centre' })}
  </div>
  ${route(c, { variante: 'papier', forme: 1, classe: 'hero-route route--entree' })}
</section>
`;
