/* Parcours propres à JP Loc Mob : composeur de sortie (totaux vérifiés par le calcul, demi-journée réservée à l'itinéraire libre,
   lien prérempli vers la réservation) et demande de réservation (choix repris de l'adresse, bon de sortie, étapes, envoi simulé). */
export default async function ({ contexte, attendrePret, attendre, BASE, R, T }) {
  const chiffres = (s) => parseInt(String(s).replace(/[^\d]/g, ''), 10);
  for (const taille of ['390×844', '1366×768']) {
    const { ctx, page } = await contexte({ taille: T(taille) });
    try {
      /* 1. Composeur de l'accueil. */
      await page.goto(BASE + '/', { waitUntil: 'load' });
      await attendrePret(page);
      await page.locator('#tarifs').scrollIntoViewIfNeeded();
      await attendre(400);
      await page.locator('#tarifs input[name="balade"][value="libre"]').evaluate((el) => el.click());
      await page.locator('#tarifs input[name="base"][value="demi"]').evaluate((el) => el.click());
      await page.locator('#tarifs input[name="mobylettes"]').fill('3');
      await page.locator('#tarifs input[name="mobylettes"]').dispatchEvent('change');
      await attendre(1300);
      let e = await page.evaluate(() => ({ total: document.querySelector('#tarifs [data-total]').textContent, caution: document.querySelector('#tarifs [data-caution-total]').textContent, lien: document.querySelector('#tarifs [data-lien-reserver]').getAttribute('href') }));
      if (chiffres(e.total) !== 150) R.echec('composeur', `total affiché « ${e.total} » au lieu de 150 € (demi-journée × 3 mobylettes)`, { page: '/', taille });
      if (chiffres(e.caution) !== 1800) R.echec('composeur', `caution affichée « ${e.caution} » au lieu de 1 800 €`, { page: '/', taille });
      if (!/balade=libre&formule=demi&mobylettes=3/.test(e.lien)) R.echec('composeur', `lien de réservation non prérempli : ${e.lien}`, { page: '/', taille });
      await page.locator('#tarifs input[name="balade"][value="fallavier"]').evaluate((el) => el.click());
      await attendre(1300);
      e = await page.evaluate(() => ({ total: document.querySelector('#tarifs [data-total]').textContent, demi: document.querySelector('#tarifs input[name="base"][value="demi"]').disabled, base: document.querySelector('#tarifs input[name="base"]:checked')?.value }));
      if (!e.demi || e.base !== 'mi') R.echec('composeur', `la demi-journée reste proposée hors itinéraire libre (formule ${e.base})`, { page: '/', taille });
      if (chiffres(e.total) !== 180) R.echec('composeur', `total affiché « ${e.total} » au lieu de 180 € (mi-journée × 3 mobylettes)`, { page: '/', taille });

      /* 2. Demande de réservation préremplie par l'adresse. */
      await page.goto(BASE + '/reserver?balade=cremieu&formule=journee&mobylettes=4', { waitUntil: 'load' });
      await attendrePret(page);
      await attendre(900);
      e = await page.evaluate(() => ({ balade: document.querySelector('[data-bon-balade]').textContent, formule: document.querySelector('[data-bon-formule]').textContent, total: document.querySelector('[data-bon-total]').textContent, caution: document.querySelector('[data-bon-caution]').textContent }));
      if (!/Crémieu/.test(e.balade) || !/Journée/.test(e.formule)) R.echec('réservation', `choix de l'adresse non repris sur le bon : ${e.balade} / ${e.formule}`, { page: '/reserver', taille });
      if (chiffres(e.total) !== 280) R.echec('réservation', `total du bon « ${e.total} » au lieu de 280 € (journée × 4)`, { page: '/reserver', taille });
      if (chiffres(e.caution) !== 2400) R.echec('réservation', `caution du bon « ${e.caution} » au lieu de 2 400 €`, { page: '/reserver', taille });
      const suivant = page.locator('.fpe [data-suivant]');
      await suivant.click(); await attendre(700);
      await suivant.click(); await attendre(700);
      await suivant.click(); await attendre(700);
      /* Étape des coordonnées : sans rien remplir, on ne passe pas. */
      await suivant.click(); await attendre(500);
      const erreurs = await page.locator('.fpe [aria-invalid="true"]').count();
      if (!erreurs) R.echec('réservation', 'coordonnées vides acceptées sans erreur', { page: '/reserver', taille });
      await page.fill('#res-prenom', 'Camille'); await page.fill('#res-nom', 'Essai'); await page.fill('#res-email', 'camille@exemple.fr'); await page.fill('#res-tel', '06 00 00 00 00');
      await page.locator('.fpe input[name="majeur"]').evaluate((el) => el.click());
      await page.locator('.fpe input[name="accord"]').evaluate((el) => el.click());
      await suivant.click(); await attendre(800);
      const recap = await page.locator('.fpe__recap').innerText();
      if (!/Crémieu/.test(recap) || !/Camille/.test(recap)) R.echec('réservation', 'récapitulatif incomplet avant l’envoi', { page: '/reserver', taille });
      const envoyer = page.locator('.fpe button[type="submit"]');
      await envoyer.click(); await envoyer.click({ timeout: 800 }).catch(() => {});
      await attendre(1200);
      e = await page.evaluate(() => { const f = document.querySelector('.fpe__fin'); const r = f.getBoundingClientRect(); return { fin: !f.hidden, visible: r.top < innerHeight && r.bottom > 0, tampon: document.querySelector('[data-bon]').classList.contains('est-tamponne'), texte: f.textContent }; });
      if (!e.fin) R.echec('réservation', 'aucun message après l’envoi', { page: '/reserver', taille });
      else if (!/rien n.a été envoyé/i.test(e.texte)) R.echec('réservation', 'le message ne dit pas que l’envoi est simulé', { page: '/reserver', taille });
      if (e.fin && !e.visible) R.echec('réservation', 'le message de fin est hors de l’écran', { page: '/reserver', taille });
      if (!e.tampon) R.regarder('réservation', 'le tampon ne se pose pas sur le bon après l’envoi', { page: '/reserver', taille });
    } catch (err) {
      R.echec('parcours du projet', String(err.message).split('\n')[0], { page: '/reserver', taille });
    } finally { await ctx.close(); }
  }
}
