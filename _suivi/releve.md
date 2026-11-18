# Relevé factuel : JP LOC MOB (site actuel : https://jplocmob.wordpress.com)

Lu le 17 novembre 2026. Trois pages : L'entreprise (accueil), Balades et tarifs, Contact.

## Activité
- Location de mobylettes restaurées pour des balades en Isère, parcours proposés ou itinéraire libre.
- « Location de deux roues motorisées sur Chèzeneuve et ses alentours » (page Contact).
- Sorties évoquées : en solo, escapade en couple, journée entre amis.
- Accueil autour d'un café sur une terrasse « vintage », où le fonctionnement est expliqué.
- Présentation en « nous » : passionnés de mobylette. Aucun nom de personne sur le site.

## Offre et conditions (accueil)
- Réservé aux plus de 18 ans.
- 5 mobylettes disponibles, selon la demande et le planning.
- Caution : 600 € par mobylette.
- Mobylettes assurées ; le client en prend soin et conduit de façon responsable.
- Casques et gants fournis (page Balades).

## Balades et tarifs
1. **Balade Fallavier** : parcours de 37 km. Château de Fallavier, son parc au bord de l'étang, puis parc animalier du château de Moidière.
   - Mi-journée (10 h – 16 h) : 60 € · Journée (9 h – 18 h) : 70 €
2. **Village des brocanteurs et Crémieu** : parcours de 63 km. Village des brocanteurs, puis ville médiévale de Crémieu et ses remparts.
   - Mi-journée (10 h – 16 h) : 60 € · Journée (9 h – 18 h) : 70 €
3. **Itinéraire libre** : 70 km maximum. « La route est à vous ! »
   - 1/2 journée (8 h 30 – 12 h 30 ou 14 h 30 – 18 h) : 50 € · Mi-journée (10 h – 16 h) : 60 € · Journée (9 h – 18 h) : 70 €

Casques et gants fournis pour chaque formule.

## Adresses recommandées en route
- **Duplex 87**, Saint-Agnin-sur-Bion : cuisine locale, terrasse.
- **La Bascule**, Saint-Alban-de-Roche : café en terrasse, planche de charcuterie sur commande, réservation au 06 20 53 23 38.

## Coordonnées
- Téléphone : 06 82 38 21 43
- E-mail : jplocmob@gmail.com
- « Informations et réservation par mail ou téléphone »
- Facebook : https://www.facebook.com/profile.php?id=61550602001718
- Instagram : https://www.instagram.com/jp_loc_mob/ (@jp_loc_mob)
- Commune : Chèzeneuve (Isère). Pas d'adresse postale.

## Logo et images
- Logo : cropped-jp-loc-mob-_-logo.png (en-tête et pied de page).
- Accueil : image00015.jpeg (bannière), galerie « Une balade avec nous ? » (image00034, 00002, 00035, 00018, 00022, 00026).
- Balades : Fallavier (02-1, 2-1, 222-1, 2222-1), Brocanteurs et Crémieu (01-1, 1-1, 1111-1, 11-1.webp, 111-1), Libre (image00001), restauration (duplex.jpg, photo La Bascule).
- Contact : image00014.jpeg.
- À compléter après réception du zip : ce que montrent les photos, lesquelles tiennent en grand.

## Plateforme et défauts du site actuel
- WordPress.com gratuit (adresse en wordpress.com, bandeau WordPress, cookies Automattic, zone de commentaires de blog).
- Pas de formulaire : le lien « Contactez-nous » ouvre Gmail.
- Pas de carte, pas d'adresse, pas de point de départ.
- Conditions (18 ans, caution, assurance, 5 mobylettes) sur l'accueil seulement, loin des tarifs.
- Crédit « Site vitrine créé par Lea Huvet », « JP LOC MOB 2023 ».

## Absent du site (ne pas inventer)
- Adresse et point de départ précis, horaires et jours d'ouverture, saison.
- Modèles des mobylettes, permis requis (BSR, AM…), carburant, passager.
- Nombre de participants par balade, balade guidée ou non selon la formule.
- Conditions de réservation, d'annulation, de météo.
- Avis, chiffres, SIRET, nom du responsable, mentions légales.

## Incohérences relevées
- « 1/2 journée » (4 h, 50 €) et « Mi-journée » (10 h – 16 h, 60 €) : deux formules aux noms presque identiques, à clarifier dans la maquette (Demi-journée 4 h / Mi-journée 6 h / Journée 9 h).
- Les balades sont dites « guidées ou libres » à l'accueil, sans préciser lesquelles sont accompagnées.
- La caution de 600 € ne figure pas sur la page des tarifs.

## Catégorie
Tourisme, loisirs et activités (location, balades en plein air).
- Le visiteur vient chercher : les balades, les prix, les conditions (âge, caution), comment réserver, où ça se passe.
- Preuve de confiance : vraies photos des mobylettes et des balades, assurance, casques et gants fournis, accueil.
- Action principale : réserver par téléphone ou par e-mail (demande de réservation simulée).
- Fonctionnalités : fiches balades (km, étapes, prix), composeur de sortie avec prix en direct, carte des parcours, demande de réservation en étapes, FAQ pratique à partir des seules conditions connues, barre Appeler / Réserver sur téléphone.
- Règles : aucun horaire d'ouverture ni « ouvert maintenant » (non fournis), pas d'avis, pas de faux lieu.

## Notes de projet
- 17 novembre, 18 h 35 : `images/recuperer.mjs` a échoué sur l'accueil (« Execution context was destroyed, most likely because of a navigation ») : la page WordPress.com navigue toute seule pendant le défilement, et comme l'accueil échoue, aucune autre page n'est lue. Copie corrigée `_suivi/recuperer-jplocmob.mjs` (nouvel essai après la navigation, puis relevé sans défilement), testée sur un site d'essai local. Leçon à proposer en fin de projet (correctif à reporter dans la bibliothèque).
- `favoris.json` absent du dépôt de la bibliothèque : planche faite avec 7 favorites nommées dans la skill.
- 17 novembre, 18 h 42 : la première copie corrigée n'a rendu qu'un `recuperation.json` vide (1 page, 0 image) : Chromium ne reçoit qu'une page sans lien ni image, qui navigue en boucle. Seconde copie `_suivi/recuperer-jplocmob-2.mjs` : si le navigateur échoue ou rend une page vide, le HTML est demandé par Node puis relu sans JavaScript ; lectures et fermetures bornées dans le temps. Testée sur un site d'essai local (page d'attente en boucle pour le navigateur, vraie page pour Node) : 3 pages, 3 images.
- 18 h 47 : l'utilisateur a envoyé deux films et deux planches d'un autre projet (Magik Fenêtre), sans consigne : demandé ce qu'il en attend.

## Photos reçues (zip du 17 novembre, 19 h 02 : 21 images, 3 pages lues)
- **Logo** : tampon rond noir et blanc, silhouette de mobylette, « JP LOC MOB » en couronne (512 px, fond transparent). Lisible sur fond clair seulement ; à vectoriser pour l'intro et le voile.
- **Photos du client, mobylettes** (9, presque toutes en hauteur, 1500×2000, prises au téléphone, couleurs vives) :
  - balades-tarifs : mobylette gris-bleu à sacoches de cuir devant une palissade en bois, herbe : la meilleure, seule en largeur (2000×1500).
  - balade-nous-4 : mobylette bleue à sacoche dans l'herbe, ciel bleu, vue basse : belle.
  - balade-nous-5 : rangée de mobylettes bleues et rouge vue de haut, sur le gravier : belle.
  - balade-nous-2 : rangée de mobylettes, Motobécane rouge au premier plan, herbe et arbres : belle.
  - balade-nous-3 : gros plan d'une mobylette bleue « Club » : correcte.
  - contactez-nous : chat roux assis sur une selle : attachante.
  - image : un homme debout derrière la rangée de mobylettes (visage visible, sans doute le loueur) : à confirmer avant de l'afficher en grand.
  - balade-nous : terrasse et comptoir « vintage », guirlande, ancienne pompe rouge, tonneau en table : l'accueil au café.
  - balade-nous-6 : mobylette en sous-bois, petite (900×1600).
- **Photos de lieux** (sans doute prises ailleurs sur le web, droits à vérifier par le client ; plusieurs petites) : rue de Crémieu (1729×2000), château de Fallavier vu du ciel (2000×1124), village des brocanteurs (enseigne 1600×920, hangar à l'avion 1000×667), cloître (925×540), château de Moidière et ses daims (514×338), panorama (750×420), bar (2000×1500), terrasse du Duplex (828×452).
- **Documents** : deux captures de carte Google des parcours Fallavier et Crémieu : jamais en image ; elles servent à redessiner les tracés en SVG.
- Couleurs réelles : mobylettes bleues (marine et ciel) et rouges, herbe verte, bois, logo noir et blanc.
- Conséquence : les mobylettes du client tiennent en grand (beaucoup en portrait : cadres en hauteur, galerie) ; les lieux vont en vignettes ou cartes moyennes ; les grandes ambiances manquantes (route de campagne, lumière) viennent de Grok, sans jamais montrer un lieu réel ni une fausse mobylette.
- Parcours lus sur les deux captures de carte du site (départ et retour au même point, épinglé « Route de Four », à Chèzeneuve) :
  - Fallavier : Route de Four → Crachier → Vignieu → parc animalier du château de Moidière → parc de Fallavier → château de Fallavier → retour.
  - Brocanteurs et Crémieu : Route de Four → Domarin → Bourgoin-Jallieu → Villemoirieu → Pont-de-Chéruy → Crémieu → Trept → Saint-Savin → Bourgoin-Jallieu → retour.
  - L'adresse exacte du départ n'est écrite nulle part sur le site : afficher « Départ et retour à Chèzeneuve », l'adresse va dans la fiche à compléter.
