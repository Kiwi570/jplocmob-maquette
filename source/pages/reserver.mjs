/* Réserver : la demande de réservation simulée en étapes (module formulaire-par-etapes), le bon de sortie qui suit les choix. */
import { html, brut } from '../../outils/gabarit.mjs';
import { image, surtitre, titre, route, rangMobs } from '../gabarits/composants.mjs';
import { teteReserver } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'reserver', fichier: 'reserver', imagePartage: 'mob-bleue-herbe-1280.webp' };

const ICONES = {
  fallavier: '<path d="M6 26V12l3-2V6h3v3l4-3 4 3V6h3v4l3 2v14z"/><path d="M13 26v-6a3 3 0 0 1 6 0v6"/>',
  cremieu: '<path d="M4 26V10h4v4h4v-4h4v4h4v-4h4v4h4v12z"/><path d="M14 26v-5a2 2 0 0 1 4 0v5"/>',
  libre: '<path d="M16 28V16"/><path d="M16 16 8 6M16 16l8-10"/><path d="M5 9l3-3 3 3M21 9l3-3 3 3"/>',
  demi: '<circle cx="16" cy="16" r="11"/><path d="M16 5a11 11 0 0 1 0 22z" fill="currentColor"/>',
  mi: '<circle cx="16" cy="16" r="11"/><path d="M16 9v7l5 3"/>',
  journee: '<circle cx="16" cy="16" r="6"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3"/>',
};
const icone = (k) => brut(`<svg class="fpe__icone" viewBox="0 0 32 32" aria-hidden="true">${ICONES[k]}</svg>`);
const etoile = brut(' <i aria-hidden="true">*</i>');

export default (c) => {
  const F = c.donnees.formules, B = c.donnees.balades, f = (k) => c.t(`reserver.form.${k}`);
  const tarifs = { caution: F.caution, formules: Object.fromEntries(Object.entries(F.formules).map(([k, x]) => [k, { nom: x.nom, prix: x.prix }])), balades: Object.fromEntries(B.map((b) => [b.id, { nom: b.nom, formules: b.formules }])) };
  return html`
<section class="reserver" id="debut">
  <div class="conteneur reserver-grille">
    <div class="reserver-principal">
      ${teteReserver(c)}
      <div class="fpe" data-module="formulaire-par-etapes" id="demande" data-mailto="${c.site.contact.email}" data-sujet="${c.s('reserver.form.sujetMail')}">
        <div class="fpe__carton">
          <form class="fpe__form" action="#" method="post" novalidate>
            <div class="fpe__progression">
              <ol class="fpe__reperes" aria-label="${c.s('reserver.form.progression')}"></ol>
              <div class="fpe__barre" aria-hidden="true"><span></span></div>
              <p class="fpe__etat" aria-live="polite"></p>
            </div>

            <fieldset class="fpe__etape" data-etape="${c.s('reserver.form.e1')}">
              <legend class="fpe__legende"><h2 class="fpe__titre">${f('e1Titre')}</h2></legend>
              <div class="fpe__groupe fpe__cartes" data-libelle="${c.s('reserver.form.e1Libelle')}">${B.map((b, i) => html`
                <label class="fpe__carte"><input type="radio" name="balade" value="${b.id}"${i === 0 ? brut(' required') : ''}>${icone(b.id)}<span class="fpe__carte-titre">${b.nom}</span><span class="fpe__carte-texte">${b.km} ${c.t(b.max ? 'commun.kmMax' : 'commun.km')} · ${b.accroche}</span></label>`)}
              </div>
            </fieldset>

            <fieldset class="fpe__etape" data-etape="${c.s('reserver.form.e2')}">
              <legend class="fpe__legende"><h2 class="fpe__titre">${f('e2Titre')}</h2></legend>
              <div class="fpe__groupe fpe__cartes" data-libelle="${c.s('reserver.form.e2Libelle')}">${Object.entries(F.formules).map(([k, x], i) => html`
                <label class="fpe__carte" data-formule="${k}"><input type="radio" name="formule" value="${k}"${i === 0 ? brut(' required') : ''}>${icone(k)}<span class="fpe__carte-titre">${x.nom} · <span data-prix>${x.prix} €</span></span><span class="fpe__carte-texte">${x.horaires}</span></label>`)}
              </div>
              <p class="fpe__aide" data-note-demi>${f('e2Note')}</p>
            </fieldset>

            <fieldset class="fpe__etape" data-etape="${c.s('reserver.form.e3')}">
              <legend class="fpe__legende"><h2 class="fpe__titre">${f('e3Titre')}</h2></legend>
              <div class="fpe__grille">
                <div class="fpe__champ"><label for="res-mobylettes">${f('mobsLibelle')}${etoile} <small>${f('mobsAide')}</small></label><input id="res-mobylettes" name="mobylettes" type="number" min="1" max="${F.mobsMax}" step="1" value="2" inputmode="numeric" required></div>
                <div class="fpe__champ"><label for="res-date">${f('date')}</label><input id="res-date" name="date" type="date"></div>
              </div>
              <div class="fpe__champ"><label for="res-message">${f('message')}</label><textarea id="res-message" name="message" rows="3"></textarea></div>
            </fieldset>

            <fieldset class="fpe__etape" data-etape="${c.s('reserver.form.e4')}">
              <legend class="fpe__legende"><h2 class="fpe__titre">${f('e4Titre')}</h2></legend>
              <div class="fpe__grille">
                <div class="fpe__champ"><label for="res-prenom">${f('prenom')}${etoile}</label><input id="res-prenom" name="prenom" autocomplete="given-name" required></div>
                <div class="fpe__champ"><label for="res-nom">${f('nom')}${etoile}</label><input id="res-nom" name="nom" autocomplete="family-name" required></div>
                <div class="fpe__champ"><label for="res-email">${f('email')}${etoile}</label><input id="res-email" name="email" type="email" autocomplete="email" required></div>
                <div class="fpe__champ"><label for="res-tel">${f('tel')}${etoile}</label><input id="res-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9 +().\\-]{8,20}" required></div>
              </div>
              <label class="fpe__case"><input type="checkbox" name="majeur" value="oui" required data-libelle="${c.s('reserver.form.majeurLibelle')}"><span class="fpe__choix-texte">${f('majeur')}${etoile}</span></label>
              <label class="fpe__case"><input type="checkbox" name="accord" value="oui" required data-libelle="${c.s('reserver.form.accordLibelle')}" data-hors-recap><span class="fpe__choix-texte">${f('accord')}${etoile}</span></label>
              <p class="fpe__aide">${f('donnees')} ${c.t('commun.confidentialiteNote')} ${f('obligatoires')}</p>
            </fieldset>

            <fieldset class="fpe__etape" data-etape="${c.s('reserver.form.e5')}" data-recap>
              <legend class="fpe__legende"><h2 class="fpe__titre">${f('e5Titre')}</h2></legend>
              <div class="fpe__recap"><p>${f('recapVide')}</p></div>
            </fieldset>

            <div class="fpe__nav">
              <button class="fpe__bouton fpe__bouton--ligne" type="button" data-precedent>${f('retour')}</button>
              <button class="fpe__bouton" type="button" data-suivant data-retour="${c.s('reserver.form.revenir')}">${f('continuer')}</button>
              <button class="fpe__bouton" type="submit">${f('envoyer')}</button>
            </div>
          </form>

          <div class="fpe__fin" hidden>
            <svg class="fpe__coche" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28"/><path d="M20 33l8 8 16-17"/></svg>
            <h2>${f('finTitre')}</h2>
            <p data-resume></p>
            <p>${f('finTexte')}</p>
            <div class="fpe__fin-actions">
              <a class="fpe__bouton" href="mailto:${c.site.contact.email}" data-mailto hidden>${f('finMail')}</a>
              <button class="fpe__bouton fpe__bouton--ligne" type="button" data-recommencer>${f('finNouveau')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <aside class="reserver-cote" aria-label="${c.s('reserver.ticket.titre')}">
      ${image(c, { nom: 'mob-bleue-herbe', alt: c.donnees.imagesAlt['mob-bleue-herbe'], cadrage: '50% 68%', priorite: true, classe: 'reserver-media masque-ecran-tres-bas', sizes: '(max-width: 760px) 100vw, 34vw', attrs: 'data-fx="parallaxe" data-fx-force="6" data-iris-centre' })}
      <div class="ticket bon" data-bon data-grille="retour">
        <script type="application/json" class="bon-donnees">${brut(JSON.stringify(tarifs))}</script>
        <p class="bon-titre">${c.t('reserver.ticket.titre')}</p>
        <dl class="bon-lignes">
          <div><dt>${c.t('reserver.ticket.balade')}</dt><dd data-bon-balade>${c.t('reserver.ticket.vide')}</dd></div>
          <div><dt>${c.t('reserver.ticket.formule')}</dt><dd data-bon-formule>${c.t('reserver.ticket.vide')}</dd></div>
          <div><dt>${c.t('reserver.ticket.mobs')}</dt><dd class="chiffres" data-bon-mobs>2</dd></div>
        </dl>
        ${rangMobs(F.mobsMax, 2)}
        <p class="bon-total"><span>${c.t('reserver.ticket.total')}</span><strong class="chiffres" data-bon-total data-prix data-vide>—</strong></p>
        <p class="bon-caution"><span>${c.t('reserver.ticket.caution')}</span><span class="chiffres" data-bon-caution>${F.caution * 2} €</span></p>
        <p class="bon-note">${c.t('reserver.ticket.note')}</p>
        <img class="bon-tampon" src="/assets/images/logo-240.png" alt="" width="96" height="96" loading="lazy" data-bon-tampon>
      </div>
    </aside>
  </div>
</section>

${route(c, { variante: 'papier', forme: 0, classe: 'route--jonction' })}
<section class="section sombre compris" id="compris">
  <div class="conteneur compris-grille">
    <div>
      ${surtitre(c, 'reserver.compris.sur')}
      ${titre(c, 'reserver.compris.titre')}
      <ul class="compris-liste" data-anime="cascade">${[1, 2, 3, 4].map((i) => html`<li><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11"/><path d="M7 12.5l3.2 3.2L17 9"/></svg>${c.t(`reserver.compris.i${i}`)}</li>`)}</ul>
    </div>
    <div class="compris-appel" data-anime>
      <img class="compris-tampon" src="/assets/images/logo-240.png" alt="" width="110" height="110" loading="lazy" data-effet="tampon" data-tampon>
      <h3>${c.t('reserver.compris.appelTitre')}</h3>
      <p>${c.t('reserver.compris.appelTexte')}</p>
      <p class="compris-numero"><a class="chiffres" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></p>
      <p><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
    </div>
  </div>
</section>
`;
};
