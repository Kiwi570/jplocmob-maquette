/* Contact : le numéro en très grand, un formulaire court simulé, la zone des balades et les réseaux. */
import { html } from '../../outils/gabarit.mjs';
import { surtitre, titre, route, plan, appel } from '../gabarits/composants.mjs';
import { ouvertureContact } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'chat-selle-1280.webp' };

export default (c) => {
  const k = c.site.contact;
  return html`
${ouvertureContact(c)}

<section class="section section--papier2 ecrire" id="ecrire">
  <div class="conteneur ecrire-grille">
    <div class="section-tete">${surtitre(c, 'contact.ecrire.sur')}${titre(c, 'contact.ecrire.titre')}
      <ul class="ecrire-moyens" data-anime="cascade">
        <li><a class="chiffres" href="tel:${k.telephoneLien}">${k.telephone}</a></li>
        <li><a href="mailto:${k.email}">${k.email}</a></li>
      </ul>
    </div>
    <form class="formulaire" data-formulaire data-anime>
      <div class="champ"><label for="c-nom">${c.t('contact.ecrire.nom')}</label><input id="c-nom" name="nom" autocomplete="name" required></div>
      <div class="champ"><label for="c-email">${c.t('contact.ecrire.email')}</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
      <div class="champ"><label for="c-message">${c.t('contact.ecrire.message')}</label><textarea id="c-message" name="message" rows="5" required></textarea></div>
      <p class="mention-donnees">${c.t('contact.ecrire.donnees')} ${c.t('commun.confidentialiteNote')}</p>
      <p><button class="bouton" type="submit" data-survol="magnetique">${c.t('contact.ecrire.envoyer')}</button></p>
      <p data-message-envoi hidden role="status"></p>
    </form>
  </div>
</section>

${route(c, { variante: 'papier2', forme: 1, classe: 'route--jonction' })}
<section class="section sombre zone" id="zone">
  <div class="conteneur zone-grille">
    <div class="zone-texte">
      ${surtitre(c, 'contact.zone.sur')}
      ${titre(c, 'contact.zone.titre')}
      <p data-anime>${c.t('contact.zone.texte')}</p>
      <p data-anime>${c.t('contact.zone.reseaux')}</p>
      <p class="zone-reseaux" data-anime>
        <a class="bouton bouton--contour" href="${k.facebook}" target="_blank" rel="noopener">${c.t('commun.facebook')}<span class="visuellement-cache"> (${c.t('commun.nouvelOnglet')})</span></a>
        <a class="bouton bouton--contour" href="${k.instagram}" target="_blank" rel="noopener">${c.t('commun.instagram')}<span class="visuellement-cache"> (${c.t('commun.nouvelOnglet')})</span></a>
      </p>
    </div>
    <div class="zone-plan">${plan(c)}</div>
  </div>
</section>

${appel(c, { forme: 0 })}
`;
};
