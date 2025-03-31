# Application de Réservation de Rendez-vous (React - Vite - Tailwind)

Une application React permettant aux utilisateurs de réserver des créneaux horaires pour des rendez-vous. Elle propose un calendrier interactif, une sélection dynamique des créneaux horaires disponibles, et un système de gestion des créneaux adjacents pour éviter les créneaux vides entre deux rendez-vous.

## Fonctionnalités

- **Sélection de la date** : Les utilisateurs peuvent choisir une date dans un calendrier interactif.
- **Créneaux horaires disponibles** : En fonction de la date choisie, les créneaux horaires disponibles sont affichés.
- **Créneaux adjacents** : Lorsqu'un créneau est réservé, seuls les créneaux adjacents (avant et après) sont disponibles pour les autres utilisateurs. Cela permet de minimiser les créneaux vides entre les rendez-vous.
- **Réinitialisation** : Un bouton pour réinitialiser la sélection.
- **Modal d'informations** : Un modal affiche des informations sur le fonctionnement de l'application lorsque l'icône d'information est cliquée.

## Aperçu de l'interface

L'interface est conçue pour être claire et intuitive, avec un calendrier affichant les jours du mois, des créneaux horaires pour chaque jour et un bouton permettant de réinitialiser la sélection. De plus, un bouton d'information ouvre un modal expliquant les fonctionnalités de l'application.

## Fonctionnement du calendrier et des créneaux horaires

- **Réservation d'un créneau** : Lorsqu'un utilisateur choisit une date, les créneaux horaires du matin et de l'après-midi sont affichés. Les créneaux adjacents aux créneaux déjà réservés sont marqués comme disponibles.
- **Gestion des créneaux adjacents** : Par exemple, si un créneau de 9h00 est réservé, seuls les créneaux de 8h45 et 9h15 seront disponibles, afin d'éviter que le médecin ait des créneaux vides entre deux rendez-vous.
- **Stockage local** : Les réservations sont stockées dans le localStorage pour maintenir la persistance des données même après le rafraîchissement de la page. (version sans base de données oblige)

## Installation

1. Clonez ce projet sur votre machine :
```bash
git clone https://github.com/DonkeyhTv/reservation.git
```

2. Allez dans le répertoire du projet :
```bash
cd reservation
```

3. Installez les dépendances :
```bash
npm install
```

4. Lancez le serveur de développement :
```bash
npm start
```

L'application sera disponible sur http://localhost:3000.

## Dépendances

- **React** : La bibliothèque principale pour la création de l'interface utilisateur.
- **Day.js** : Utilisé pour la gestion des dates et des horaires.
- **Lucide React** : Librairie d'icônes, utilisée ici pour l'icône d'information.
- **Tailwind CSS** : Framework CSS utilitaire pour un design réactif et moderne.

## Améliorations possibles

- **Notifications** : Ajouter des notifications pour informer les utilisateurs de la confirmation ou de l'annulation de leurs réservations.
- **Gestion des utilisateurs** : Ajouter une fonctionnalité d'inscription et de connexion pour suivre les réservations des utilisateurs.
- **Backend** : Implémenter un backend pour une gestion centralisée des réservations et des utilisateurs.

## Auteur

- **Nom** : Steve Amissi
- **GitHub** : https://github.com/DonkeyhTv
