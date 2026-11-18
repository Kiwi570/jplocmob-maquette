# JP Loc Mob · plans de la v1 (direction A « Carte routière »)

Palette : papier #F3EDDC (fond dominant), papier foncé #E9E0C8 (rythme), sapin #1F3B30 (second fond : manifeste, carte, tarifs, pied), accent rouge borne #C93A1E (boutons, un mot par titre), ligne jaune #F2B632 (route, chiffres sur sapin).
Typographies : Bricolage Grotesque 800 serré pour les titres, Instrument Sans pour les textes. Français seul. Pas de son.

## Plan du site (v1)
| Page | Ouverture | Sections |
|---|---|---|
| Accueil | Scindée : titre « La route est à vous. », prix d'appel, deux boutons ; photo de la mobylette à la palissade en 4:3 ; la route passe dessous | Manifeste et route de campagne · Les 3 balades · Carte des parcours · Les mobylettes · Déroulé · Tarifs en direct · Pauses en terrasse · Questions · Appel |
| Balades et tarifs | Grand titre puis bandeau de collines, trois bornes 37 / 63 / 70 km qui servent de sommaire | Fallavier (tracé, étapes, photos, formules) · Brocanteurs et Crémieu · Itinéraire libre · Composeur de sortie · Pauses en terrasse · Appel |
| Les mobylettes | Mosaïque de deux photos en hauteur, « 5 » en très grand | Les cinq mobylettes (galerie) · Le café avant la route · Les conditions en chiffres (18 ans, 600 €, assurance, casques et gants) · Appel |
| Réserver | Bon de sortie : formulaire à gauche, ticket récapitulatif et prix en très grand à droite | Demande en étapes (balade, formule, mobylettes et date, coordonnées, récapitulatif) · Ce qui est compris · Appel téléphone |
| Contact | Numéro de téléphone en très grand, photo du chat sur la selle | Écrire (formulaire court simulé) · Chèzeneuve et alentours (petite carte) · Réseaux |
| 404 | « Sortie de route » : chemin en impasse et sa vache | Retour à l'accueil, aux balades |

Pied de page : sommaire, coordonnées, réseaux, « Mentions légales · à compléter », « Politique de confidentialité · à compléter ».
Téléphone : barre fixe Appeler / Réserver.

## Plan d'animation
Intro (moins de 3 s, accélérée au premier geste, passée au second) :
- 0 s : fond papier, tampon du logo entier au centre.
- 0,5 s : le tampon s'écrase d'un quart de tour, l'encre bave un instant.
- 1 s : un trait jaune part du tampon, la route se trace en travers de l'écran.
- 2 s : le tampon file vers la photo d'ouverture, le titre monte ligne à ligne, la photo se dévoile en rideau.
- 3 s : boutons et prix d'appel en place.
Voile entre les pages : papier, tampon au centre, nom de la page ; forme iris depuis l'objet de la page.

Effets propres au client (data-effet) :
- `tampon` : le logo en tampon qui se pose (intro, voile, appel final, confirmation de la demande).
- `route` : le tracé de route qui se dessine au défilement sous l'ouverture et entre les sections.
- `borne` : bornes kilométriques dont les kilomètres réels comptent à l'apparition (37, 63, 70).
- `parcours` : sur la carte, le tracé de chaque balade se dessine et une petite mobylette le suit, étape par étape.

Section par section (accueil) :
1. Ouverture : titre par lignes, photo en rideau, route (`route`), borne « dès 50 € ».
2. Manifeste : texte mot à mot sur sapin, bande photo plein cadre en parallaxe.
3. Les 3 balades : cartes en cascade, bornes (`borne`), inclinaison au survol.
4. Carte des parcours : cadre collant, tracés et mobylette (`parcours`), étapes qui s'allument.
5. Les mobylettes : rangée de photos qui glisse au défilement (sans épinglage), vitesse.
6. Déroulé : quatre étapes, trait de progression qui se trace, photos en zoom doux.
7. Tarifs en direct : composeur, prix qui roule, ticket qui se met à jour.
8. Pauses en terrasse : deux cartes en rideau.
9. Questions : accordéon animé.
10. Appel : route de peupliers en parallaxe, tampon (`tampon`), boutons magnétiques.
Pages intérieures : mêmes composants ; ouverture propre à chaque page (bornes qui se plantent, « 5 » qui se dessine, ticket qui remonte, numéro qui se compose).

## Plan des images
Voir `plan-images.json` (19 images du site, 7 scènes Grok dont 4 avec version téléphone).
- En grand (notées 4) : mobylette à la palissade (accueil), rangée vue de haut (Les mobylettes), bleue dans l'herbe (Réserver), chat sur la selle (Contact), Motobécane rouge (galerie), Fallavier vu du ciel et ruelle de Crémieu (cartes moyennes).
- En petit (notées 3) : terrasse, gros plan, sous-bois, brocanteurs, cloître, daims, panorama, comptoir, terrasse du Duplex.
- Jamais affichées : les deux captures de carte (redessinées en SVG).
- Grok : route de campagne (manifeste), fourche (carte Itinéraire libre), peupliers au soir (appel), collines (ouverture Balades), terrasse au café, casque et gants, impasse à la vache (404).

## Points confirmés par l'utilisateur (17 novembre, 20 h 02)
- Composeur : prix par mobylette (1 à 5), mention « prix à confirmer à la réservation ».
- Photo du loueur : taille moyenne, page Les mobylettes, sans nom ni légende inventée.
- Départ : « Départ et retour à Chèzeneuve », adresse exacte dans la fiche à fournir.

## État au 17 novembre, 21 h 10
- Les 5 pages et la 404 sont construites ; 7 emplacements attendent les images Grok (visuel provisoire « Image à venir »).
- Aperçu de l'accueil validé par l'utilisateur (films du 17 novembre, 21 h 07).
- Premier audit standard : 8 échecs, tous corrigés depuis ; pas encore relancé.
- À la réception de `jplocmob-grok.zip` : dézipper dans `recu/grok/`, `verifier-grok.mjs`, `produire.mjs`, `generer.mjs`, `partage.mjs`, audit standard, passe des formats, regard neuf, zip et commandes Terminal.
- Accueil : les deux pauses en terrasse sont résumées dans la section carte (lien vers Balades et tarifs) pour tenir sous 10 écrans.
