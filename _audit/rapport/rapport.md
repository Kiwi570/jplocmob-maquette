# Rapport d’audit

Projet : `jplocmob-maquette` · 17/11/2026 22:27:29 · 15 min · 6 page(s) · audit standard

## Résumé

- Statut : **tout a tourné, aucun échec**
- Passe : `20261117-211208-standard` · version ?v=1
- Échecs : **0**
- À regarder : **12**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (5), mesures (66), balayage (5), films d’ouverture (8), films de transition (8), bords de l’écran (5), intro accélérable et passable (7), menu (1), clavier (6), liens et boutons (6), liens profonds (8), liens vers la page en cours (5), changements de hauteur (4), parcours du projet (1), fluidité (8), défilement selon l’appareil (5), mouvement (8), effets du plan (4), souris immobile (5), vitesse (5), captures (1)

## Grille wouahou

| Point | État | Détail |
|---|---|---|
| 1. L’effet signature se manipule | ✗ absent | aucun data-grille="manipuler" sur l’accueil |
| 2. L’intro devient la page | ✓ présent | objet d’ouverture sur 5 page(s), versObjet dans l’intro |
| 3. La transition reprend le motif | ✓ présent | voile en iris |
| 4. Quelque chose relie les sections et les pages | ✓ présent | sur les 5 page(s) |
| 5. Un titre fait l’événement sur chaque page | ✗ absent | sur aucune page |
| 6. La scène est un geste du métier | · sans objet | aucune scène épinglée marquée ni galerie générique |
| 7. L’action principale a un retour physique | ✓ présent | sur /reserver |

Le script vérifie les marques (`data-grille`, `data-iris-centre`, forme du voile, `versObjet`) ; la force et la justesse de chaque point se jugent sur les captures et les films.

## Passes de cette version (?v=1)

Chaque passe garde son rapport dans `_audit/passes/` : une relance ciblée ne fait pas disparaître la preuve d’une passe plus large.

| Passe | Niveau | Pages | Étapes | Échecs | À regarder | Non lancé | Statut |
|---|---|---|---|---:|---:|---:|---|
| 20261117-192719-rapide | rapide | toutes | toutes | 17 | 19 | 1 | échecs |
| 20261117-193529-rapide-cible-partiel | rapide | /,/reserver | parcours, mesures | 7 | 7 | 0 | échecs |
| 20261117-194308-standard | standard | toutes | toutes | 8 | 32 | 1 | échecs |
| 20261117-204344-standard | standard | toutes | toutes | 1 | 23 | 1 | échecs |
| 20261117-205937-standard-cible-partiel | standard | /,/balades-et-tarifs,/contact | fichiers, mesures | 0 | 6 | 0 | complet |
| 20261117-210056-complet-partiel | complet | toutes | mesures, ecran | 4 | 4 | 0 | échecs |
| 20261117-210706-complet-cible-partiel | complet | /,/les-mobylettes,/reserver,/contact | fichiers, mesures | 0 | 5 | 0 | complet |
| **20261117-211208-standard** (celle-ci) | standard | toutes | toutes | 0 | 12 | 1 | complet |

## Échecs

Aucun.

## À regarder

### « à compléter » visible (2)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)
- **« à compléter » visible** — `reserver.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### grille : effet signature qui ne se manipule pas (point 1) (1)

- **grille : effet signature qui ne se manipule pas (point 1)** — `/` — aucun élément data-grille="manipuler" sur l’accueil : objet à attraper, faire tourner ou glisser (module objet-a-faire-tourner, lumiere-au-pointeur…)

### grille : aucun titre ne fait l’événement (point 5) (1)

- **grille : aucun titre ne fait l’événement (point 5)** — sur aucune page : titre fabriqué par le métier, axe de police animé ou titre joué avec l’image (modules axes-au-defilement, titre-cousu, texte-grave-en-direct), marqué data-grille="typo"

### grille : objet d’ouverture hors du premier écran (1)

- **grille : objet d’ouverture hors du premier écran** — `/reserver` — 358 × 0 px visibles : l’intro et le voile s’ouvrent depuis le centre de l’écran à cette taille _(390×844)_

### section sans visuel (4)

- **section sans visuel** — `/` — section#tarifs « TARIFS EN DIRECT Votre sortie, votre prix Choisiss » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(768×1024 normal, 390×844 normal, 320×568 normal, 844×390 normal, 390×844 sansJs, 1366×768 normal, +5)_
- **section sans visuel** — `/` — section#questions « QUESTIONS PRATIQUES Avant de partir Qui peut louer » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(768×1024 normal, 390×844 normal, 320×568 normal, 844×390 normal, 390×844 sansJs, 390×844 sansWebgl, +1)_
- **section sans visuel** — `/balades-et-tarifs` — section#composer « COMPOSER SA SORTIE Calculez votre sortie Le total  » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(390×844 normal, 320×568 normal, 768×1024 normal, 844×390 normal, 390×844 sansJs, 1366×768 normal, +5)_
- **section sans visuel** — `/contact` — section#ecrire « ÉCRIRE Une question ? Écrivez-nous 06 82 38 21 43  » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(390×844 normal, 320×568 normal, 768×1024 normal, 844×390 normal, 390×844 sansJs, 1366×768 normal, +5)_

### retour avant : changement brusque (2)

- **retour avant : changement brusque** — `/balades-et-tarifs` — à 67 ms (différence 20 %) (films/retour-avant-1366.png) _(1366×768 retour avant)_
- **retour avant : changement brusque** — `/balades-et-tarifs` — à 99 ms (différence 21 %) (films/retour-avant-1366.png) _(1366×768 retour avant)_

### retour arrière : changement brusque (1)

- **retour arrière : changement brusque** — `/` — à 49 ms (différence 26 %) (films/retour-arrière-390.png) _(390×844 retour arrière)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 5 étape(s) notée(s), 383 min de travail pour 140 min de budget, 342 min d’attente de l’utilisateur.
- Journal : « analyse, favorites, bibliothèque, directions et questions » 305 min pour 20 prévues.
- Journal : « aperçu de l accueil en films, validé par l utilisateur (images Grok encore provisoires) » 10 min pour 5 prévues.
- Audit standard : étapes lourdes sur /, /balades-et-tarifs, /les-mobylettes, /reserver.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2558 ms depuis le premier octet
- Ouverture /balades-et-tarifs (1366×768) : 2494 ms depuis le premier octet
- film de l'ouverture /balades-et-tarifs 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /les-mobylettes (1366×768) : 2555 ms depuis le premier octet
- film de l'ouverture /les-mobylettes 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /reserver (1366×768) : 2494 ms depuis le premier octet
- Ouverture / (390×844) : 2496 ms depuis le premier octet
- Ouverture /balades-et-tarifs (390×844) : 2593 ms depuis le premier octet
- Ouverture /les-mobylettes (390×844) : 2547 ms depuis le premier octet
- Ouverture /reserver (390×844) : 2461 ms depuis le premier octet
- Bords de l’écran : 378 images d’intro, 30 de voile et 168 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /balades-et-tarifs : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /les-mobylettes : aucune section épinglée ou plein écran.
- Tient dans l'écran /reserver : aucune section épinglée ou plein écran.
- Fluidité / 1366×768 (molette) : 0 % d'images lentes sur 389, tâche la plus longue 0 ms
- Fluidité /balades-et-tarifs 1366×768 (molette) : 0 % d'images lentes sur 338, tâche la plus longue 0 ms
- Fluidité /les-mobylettes 1366×768 (molette) : 0 % d'images lentes sur 235, tâche la plus longue 0 ms
- Fluidité /reserver 1366×768 (molette) : 0 % d'images lentes sur 115, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1350, tâche la plus longue 0 ms
- Fluidité /balades-et-tarifs 390×844 (doigt) : 0 % d'images lentes sur 1342, tâche la plus longue 0 ms
- Fluidité /les-mobylettes 390×844 (doigt) : 0 % d'images lentes sur 1335, tâche la plus longue 0 ms
- Fluidité /reserver 390×844 (doigt) : 0 % d'images lentes sur 1340, tâche la plus longue 0 ms
- Vitesse / : 0.48 s de calcul au chargement (téléphone ralenti).
- Vitesse /balades-et-tarifs : 0.47 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.27 s de calcul au chargement (téléphone ralenti).
- Vitesse /les-mobylettes : 0.32 s de calcul au chargement (téléphone ralenti).
- Vitesse /reserver : 0.30 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
