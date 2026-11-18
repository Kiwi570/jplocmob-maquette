# Rapport d’audit

Projet : `jplocmob-maquette` · 18/11/2026 15:57:07 · 23 min · 6 page(s) · audit complet

## Résumé

- Statut : **11 échec(s)**
- Passe : `20261118-143431-complet` · version ?v=2
- Échecs : **11**
- À regarder : **13**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (6), mesures (234), balayage (5), films d’ouverture (10), films de transition (10), bords de l’écran (6), intro accélérable et passable (7), menu (1), clavier (6), liens et boutons (6), liens profonds (8), liens vers la page en cours (5), changements de hauteur (5), parcours du projet (1), fluidité (10), défilement selon l’appareil (5), mouvement (10), effets du plan (4), souris immobile (10), vitesse (5), captures (1)

## Grille wouahou

| Point | État | Détail |
|---|---|---|
| 1. L’effet signature se manipule | ✓ présent | accueil et 1 autre(s) page(s) |
| 2. L’intro devient la page | ✓ présent | objet d’ouverture sur 5 page(s), versObjet dans l’intro |
| 3. La transition reprend le motif | ✓ présent | voile en iris |
| 4. Quelque chose relie les sections et les pages | ✓ présent | sur les 5 page(s) |
| 5. Un titre fait l’événement sur chaque page | ✗ absent | sur aucune page |
| 6. La scène est un geste du métier | · sans objet | aucune scène épinglée marquée ni galerie générique |
| 7. L’action principale a un retour physique | ✓ présent | sur /reserver |

Le script vérifie les marques (`data-grille`, `data-iris-centre`, forme du voile, `versObjet`) ; la force et la justesse de chaque point se jugent sur les captures et les films.

## Échecs

### texte coupé (10)

- **texte coupé** — `/` — div.hero-texte > h1.tete-titre.hero-titre > span.ligne-masque:nth-of-type(2) > span.tete-ligne « est à vous. » — coupé par div.conteneur.hero-grille:nth-of-type(1) > div.hero-texte > h1.tete-titre.hero-titre > span.ligne-masque:nth-of-type(2) « est à vous. » _(390×844 normal, 375×667 normal, 320×568 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +33)_
- **texte coupé** — `/404` — div.tete-texte > h1.tete-titre.est-pose > span.ligne-masque > span.tete-ligne « Sortie de route » — coupé par div.conteneur.tete-grille:nth-of-type(1) > div.tete-texte > h1.tete-titre.est-pose > span.ligne-masque « Sortie de route » _(320×568 normal, 375×667 normal, 390×844 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +20)_
- **texte coupé** — `/404` — div.tete-texte > h1.tete-titre > span.ligne-masque > span.tete-ligne « Sortie de route » — coupé par div.conteneur.tete-grille:nth-of-type(1) > div.tete-texte > h1.tete-titre > span.ligne-masque « Sortie de route » _(320×568 sansJs, 375×667 sansJs, 390×844 sansJs, 844×390 sansJs, 768×1024 sansJs, 1024×768 sansJs, +7)_
- **texte coupé** — `/balades-et-tarifs` — div:nth-of-type(1) > h1.tete-titre.tete-titre--geant > span.ligne-masque > span.tete-ligne « Trois balades, trois routes » — coupé par div.conteneur.tete-haut:nth-of-type(1) > div:nth-of-type(1) > h1.tete-titre.tete-titre--geant > span.ligne-masque « Trois balades, trois routes » _(375×667 normal, 320×568 normal, 390×844 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +33)_
- **texte coupé** — `/contact` — div.tete-texte > h1.tete-titre.est-pose > span.ligne-masque > span.tete-ligne « Un appel, et on en parle » — coupé par div.conteneur.tete-grille:nth-of-type(1) > div.tete-texte > h1.tete-titre.est-pose > span.ligne-masque « Un appel, et on en parle » _(320×568 normal, 375×667 normal, 390×844 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +20)_
- **texte coupé** — `/contact` — div.tete-texte > h1.tete-titre > span.ligne-masque > span.tete-ligne « Un appel, et on en parle » — coupé par div.conteneur.tete-grille:nth-of-type(1) > div.tete-texte > h1.tete-titre > span.ligne-masque « Un appel, et on en parle » _(320×568 sansJs, 375×667 sansJs, 390×844 sansJs, 844×390 sansJs, 768×1024 sansJs, 1024×768 sansJs, +7)_
- **texte coupé** — `/les-mobylettes` — div.tete-texte:nth-of-type(1) > h1.tete-titre.est-pose > span.ligne-masque > span.tete-ligne « Cinq mobylettes restaurées » — coupé par div.conteneur.tete-grille > div.tete-texte:nth-of-type(1) > h1.tete-titre.est-pose > span.ligne-masque « Cinq mobylettes restaurées » _(320×568 normal, 375×667 normal, 390×844 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +20)_
- **texte coupé** — `/les-mobylettes` — div.tete-texte:nth-of-type(1) > h1.tete-titre > span.ligne-masque > span.tete-ligne « Cinq mobylettes restaurées » — coupé par div.conteneur.tete-grille > div.tete-texte:nth-of-type(1) > h1.tete-titre > span.ligne-masque « Cinq mobylettes restaurées » _(320×568 sansJs, 375×667 sansJs, 390×844 sansJs, 844×390 sansJs, 768×1024 sansJs, 1024×768 sansJs, +7)_
- **texte coupé** — `/reserver` — div.reserver-tete:nth-of-type(1) > h1.tete-titre.est-pose > span.ligne-masque > span.tete-ligne « Votre balade, en quatre étapes » — coupé par div.reserver-principal > div.reserver-tete:nth-of-type(1) > h1.tete-titre.est-pose > span.ligne-masque « Votre balade, en quatre étapes » _(320×568 normal, 375×667 normal, 390×844 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +20)_
- **texte coupé** — `/reserver` — div.reserver-tete:nth-of-type(1) > h1.tete-titre > span.ligne-masque > span.tete-ligne « Votre balade, en quatre étapes » — coupé par div.reserver-principal > div.reserver-tete:nth-of-type(1) > h1.tete-titre > span.ligne-masque « Votre balade, en quatre étapes » _(320×568 sansJs, 375×667 sansJs, 390×844 sansJs, 844×390 sansJs, 768×1024 sansJs, 1024×768 sansJs, +7)_

### accessibilité (axe) : color-contrast (1)

- **accessibilité (axe) : color-contrast** — `/404` — .route-bulle-doigt — Elements must meet minimum color contrast ratio thresholds _(390×844 normal)_

## À regarder

### « à compléter » visible (2)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)
- **« à compléter » visible** — `reserver.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### journal du projet (1)

- **journal du projet** — aucune entrée pour la version 2 de donnees/site.json

### grille : aucun titre ne fait l’événement (point 5) (1)

- **grille : aucun titre ne fait l’événement (point 5)** — sur aucune page : titre fabriqué par le métier, axe de police animé ou titre joué avec l’image (modules axes-au-defilement, titre-cousu, texte-grave-en-direct), marqué data-grille="typo"

### grille : objet d’ouverture hors du premier écran (1)

- **grille : objet d’ouverture hors du premier écran** — `/reserver` — 358 × 0 px visibles : l’intro et le voile s’ouvrent depuis le centre de l’écran à cette taille _(390×844)_

### section sans visuel (4)

- **section sans visuel** — `/` — section#tarifs « TARIFS EN DIRECT Votre sortie, votre prix Choisiss » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(390×844 normal, 375×667 normal, 320×568 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +33)_
- **section sans visuel** — `/` — section#questions « QUESTIONS PRATIQUES Avant de partir Qui peut louer » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(390×844 normal, 375×667 normal, 320×568 normal, 844×390 normal, 768×1024 normal, 320×568 sansJs, +9)_
- **section sans visuel** — `/balades-et-tarifs` — section#composer « COMPOSER SA SORTIE Calculez votre sortie Le total  » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(375×667 normal, 320×568 normal, 390×844 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +33)_
- **section sans visuel** — `/contact` — section#ecrire « ÉCRIRE Une question ? Écrivez-nous 06 82 38 21 43  » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(320×568 normal, 375×667 normal, 390×844 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +33)_

### retour avant : changement brusque (1)

- **retour avant : changement brusque** — `/balades-et-tarifs` — à 132 ms (différence 21 %) (films/retour-avant-1366.png) _(1366×768 retour avant)_

### retour arrière : changement brusque (1)

- **retour arrière : changement brusque** — `/` — à 87 ms (différence 26 %) (films/retour-arrière-390.png) _(390×844 retour arrière)_

### rechargement au milieu de la page (2)

- **rechargement au milieu de la page** — `/balades-et-tarifs` — écran différent à la même position après rechargement (4.1 %), voir comparaisons/rechargement-balades-et-tarifs-*.png _(1366×768)_
- **rechargement au milieu de la page** — `/les-mobylettes` — écran différent à la même position après rechargement (4.7 %), voir comparaisons/rechargement-les-mobylettes-*.png _(1366×768)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=2
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2600 ms depuis le premier octet
- Ouverture /balades-et-tarifs (1366×768) : 2583 ms depuis le premier octet
- film de l'ouverture /balades-et-tarifs 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /contact (1366×768) : 2535 ms depuis le premier octet
- Ouverture /les-mobylettes (1366×768) : 2607 ms depuis le premier octet
- Ouverture /reserver (1366×768) : 2604 ms depuis le premier octet
- Ouverture / (390×844) : 2591 ms depuis le premier octet
- film de l'ouverture / 390×844 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /balades-et-tarifs (390×844) : 2767 ms depuis le premier octet
- Ouverture /contact (390×844) : 2527 ms depuis le premier octet
- film de l'ouverture /contact 390×844 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /les-mobylettes (390×844) : 2631 ms depuis le premier octet
- Ouverture /reserver (390×844) : 2557 ms depuis le premier octet
- bords de l’écran /contact 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 320 images d’intro, 33 de voile et 208 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /balades-et-tarifs : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /les-mobylettes : aucune section épinglée ou plein écran.
- Tient dans l'écran /reserver : aucune section épinglée ou plein écran.
- Fluidité / 1366×768 (molette) : 1 % d'images lentes sur 364, tâche la plus longue 58 ms
- Fluidité /balades-et-tarifs 1366×768 (molette) : 0 % d'images lentes sur 336, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 187, tâche la plus longue 0 ms
- Fluidité /les-mobylettes 1366×768 (molette) : 0 % d'images lentes sur 287, tâche la plus longue 0 ms
- Fluidité /reserver 1366×768 (molette) : 0 % d'images lentes sur 146, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1357, tâche la plus longue 0 ms
- Fluidité /balades-et-tarifs 390×844 (doigt) : 0 % d'images lentes sur 1361, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1357, tâche la plus longue 0 ms
- Fluidité /les-mobylettes 390×844 (doigt) : 0 % d'images lentes sur 1352, tâche la plus longue 0 ms
- Fluidité /reserver 390×844 (doigt) : 0 % d'images lentes sur 1345, tâche la plus longue 0 ms
- Vitesse / : 1.11 s de calcul au chargement (téléphone ralenti).
- Vitesse /balades-et-tarifs : 0.70 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.46 s de calcul au chargement (téléphone ralenti).
- Vitesse /les-mobylettes : 0.62 s de calcul au chargement (téléphone ralenti).
- Vitesse /reserver : 0.57 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --complet --pages=/,/404,/balades-et-tarifs,/contact,/les-mobylettes,/reserver --seulement=fichiers,mesures
```
