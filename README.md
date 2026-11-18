# JP Loc Mob · maquette web (v2)

Maquette du futur site de JP Loc Mob (location de mobylettes restaurées et balades en Isère, à Chèzeneuve), faite à partir du site actuel https://jplocmob.wordpress.com.
Adresse de la maquette : https://jplocmob-maquette.vercel.app (à intégrer telle quelle dans le module Wix « Intégrer un site »).

Direction « Carte routière » : papier crème, vert sapin, rouge borne, ligne jaune de la route ; titres en Bricolage Grotesque, textes en Instrument Sans.

## Pages

| Page | Fichier source | Contenu |
|---|---|---|
| Accueil | `source/pages/accueil.mjs` | Ouverture, manifeste, les 3 balades, carte des parcours, les mobylettes, déroulé, tarifs en direct, questions, appel |
| Balades et tarifs | `source/pages/balades-et-tarifs.mjs` | Les 3 balades en détail (tracé, étapes, photos, formules), composeur de sortie, pauses en terrasse |
| Les mobylettes | `source/pages/les-mobylettes.mjs` | Les mobylettes en images, le café avant la route, les conditions |
| Réserver | `source/pages/reserver.mjs` | Demande de réservation simulée en étapes, bon de sortie |
| Contact | `source/pages/contact.mjs` | Téléphone, e-mail, formulaire court simulé, zone des balades, réseaux |
| 404 | `source/pages/404.mjs` | « Sortie de route » |

Le site actuel n'a que trois pages (L'entreprise, Balades et tarifs, Contact) : toutes sont reprises.

## Modifier le site

- Textes : `donnees/textes/fr.json`. Balades, formules et prix : `donnees/balades.json`, `donnees/formules.json`. Questions : `donnees/faq.json`. Adresses de pause : `donnees/pauses.json`.
- Après chaque changement : `node outils/generer.mjs` (réécrit les pages ; ne jamais modifier les `.html` à la main).
- Images : `plan-images.json`, puis le pipeline de la bibliothèque (`produire.mjs`, `partage.mjs`).
- Audit : `node _audit/audit.mjs` (rapport dans `_audit/rapport/`).

## À fournir par le client (fiche récapitulative)

Marqué « à compléter » dans la maquette :
- **Mentions légales** : nom du responsable, statut, SIRET, adresse. Hébergeur de la maquette : Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (à confirmer sur vercel.com au moment de la mise en ligne).
- **Politique de confidentialité** : usage des données des deux formulaires (demande de réservation, message).
- **Assurances** : nom de l'assureur et ce que couvre l'assurance des mobylettes.

Absent du site actuel, donc absent de la maquette ou remplacé par une formule prudente :
- **Adresse du départ** : la maquette dit « Départ et retour à Chèzeneuve ». Les cartes du site épinglent « Route de Four » : adresse exacte à donner (pages Accueil, Balades et tarifs, Contact, pied de page).
- **Prix** : le site donne 50, 60 et 70 € sans dire si c'est par mobylette. La maquette calcule par mobylette et affiche « à confirmer à la réservation » (composeur, bon de sortie).
- **Jours et saison d'ouverture** : aucun horaire d'ouverture n'est affiché, seulement les horaires des formules.
- **Les mobylettes** : marques, modèles et années ne sont pas donnés ; la maquette dit seulement « cinq mobylettes restaurées ».
- **Permis ou brevet demandé, carburant, passager, nombre de personnes par sortie** : non précisés.
- **Balades guidées ou non** : le site parle de balades « guidées ou libres » sans dire lesquelles sont accompagnées ; la maquette ne le précise pas.
- **Réservation, annulation, météo, retard** : aucune condition n'est donnée.
- **Avis de clients** : aucun sur le site, donc aucun dans la maquette.
- **Nom du loueur** : la photo de l'accueil au café (page Les mobylettes) est montrée sans nom ni légende.
- **Photos des lieux** (château de Fallavier, Crémieu, village des brocanteurs, Moidière, Duplex 87, La Bascule) : reprises du site actuel ; leurs auteurs et les droits d'usage sont à vérifier, ou à remplacer par des photos du client.

Formules renommées pour éviter la confusion du site actuel entre « 1/2 journée » et « Mi-journée » : Demi-journée (8 h 30 – 12 h 30 ou 14 h 30 – 18 h, 50 €), Mi-journée (10 h – 16 h, 60 €), Journée (9 h – 18 h, 70 €).

## Images générées

Les images du dossier `assets/images/grok/` sont des illustrations générées : route de campagne (accueil, manifeste), route sous le noyer (balade « Itinéraire libre »), coucher de soleil sur les collines (appel de l'accueil), collines (ouverture de Balades et tarifs), table de café (Les mobylettes), casque et gants (accueil et Les mobylettes), route au cabanon (404). Deux d'entre elles (table de café, casque et gants) ont été recadrées pour retirer des bandes floues ajoutées en haut et en bas. Chacune porte la mention « Illustration générée » : **à garder sur le site final**. Aucune ne montre un lieu réel ni une mobylette du client.

## Audit de la v2 (18 novembre 2026)

- Audit complet (13 tailles, tous les modes, toutes les pages) : 11 échecs au premier passage, tous venus de deux ajouts de la v2 (titres d'ouverture coupés par leur masque, contraste de la bulle de la mobylette), corrigés ; mesures relancées sur les 6 pages à toutes les tailles : 0 échec. Les autres étapes (films, bords, parcours, fluidité, mouvement, vitesse, captures) étaient sans échec au passage complet. Rapport de la dernière passe dans `_audit/rapport/rapport.md` ; rapport et captures de la passe complète dans `_audit/passes/20261118-143431-complet/`.
- Non lancé : Safari (WebKit ne s'installe pas dans l'espace de travail). À vérifier sur le Mac : ouverture et rechargement de chaque page, voile entre les pages et retour arrière, défilement et en-tête, menu en mode iPhone, polices, images, formulaires et barre du bas.
- Points à regarder gardés tels quels : sections d'outil sans photo (composeur, questions sur téléphone, formulaire de contact), « à compléter » dans la mention des deux formulaires (politique de confidentialité), photo de la page Réserver sous le formulaire sur téléphone, léger changement d'image au retour arrière et au rechargement en milieu de page.
- v1 (17 novembre 2026) : audit standard et passe des formats, 0 échec.

## À la mise en ligne définitive

- Retirer : `noindex` (balise robots dans `source/gabarits/commun.mjs`, en-tête X-Robots-Tag dans `vercel.json`), les formulaires simulés (demande de réservation, message) à relier à un vrai envoi, les mentions « à compléter » du pied de page, la phrase « à confirmer à la réservation » une fois les prix confirmés.
- Garder : la mention « Illustration générée ».
- Les tracés des deux parcours sont indicatifs, redessinés d'après les cartes du site actuel.
