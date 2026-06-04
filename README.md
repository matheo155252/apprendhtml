# HTML Master - Site d'apprentissage HTML

Site web pour apprendre HTML en 1 mois avec des exercices pratiques.

## 🚀 Fonctionnalités

- **Cours HTML structurés sur 4 semaines**
- **Système d'inscription avec approbation admin**
- **Panel administrateur pour gérer les utilisateurs**
- **Abonnement mensuel à 2€ via PayPal**
- **Exercices pratiques pour chaque semaine**
- **Tableau de bord utilisateur**

## 📁 Structure du projet

```
html-course-site/
├── index.html              # Page d'accueil
├── programme.html          # Présentation du programme
├── register.html           # Page d'inscription
├── login.html              # Page de connexion
├── set-admin-password.html # Définition du mot de passe admin
├── dashboard.html          # Tableau de bord utilisateur
├── admin.html              # Panel administrateur
├── semaine1.html           # Cours semaine 1
├── semaine2.html           # Cours semaine 2
├── semaine3.html           # Cours semaine 3
├── semaine4.html           # Cours semaine 4
├── css/
│   └── style.css           # Feuille de style principale
├── js/
│   └── auth.js             # Script d'authentification
└── README.md               # Ce fichier
```

## 🔑 Configuration initiale

### 1. Premier lancement

Ouvrez `index.html` dans votre navigateur.

### 2. Configuration du compte admin

1. Allez sur la page de connexion
2. Connectez-vous avec l'email : `rzvoltaylive@gmail.com`
3. Vous serez redirigé vers la page de définition du mot de passe
4. Définissez votre mot de passe (⚠️ Attention : vous ne pourrez plus le changer !)

### 3. Lien PayPal

Le lien PayPal pour les paiements est : https://paypal.me/worldgeek461

## 👥 Utilisation

### Pour les utilisateurs :

1. **Inscription** : Créez un compte sur la page d'inscription
2. **Attente** : Votre compte sera en attente d'approbation
3. **Paiement** : Payez 2€ via le lien PayPal
4. **Contact** : Contactez l'admin pour activer votre abonnement
5. **Accès** : Une fois approuvé et avec abonnement actif, accédez aux cours

### Pour l'administrateur :

1. **Connexion** : Connectez-vous avec `rzvoltaylive@gmail.com` et votre mot de passe
2. **Panel admin** : Vous aurez accès au panel administrateur
3. **Approbation** : Approuvez ou rejetez les inscriptions
4. **Activation** : Activez les abonnements après confirmation du paiement

## 📚 Programme des cours

### Semaine 1 : Introduction au HTML
- Qu'est-ce que le HTML ?
- Structure d'un document HTML
- Votre première page HTML

### Semaine 2 : Structure et balises
- Les balises de texte
- Les listes
- Les liens et les images

### Semaine 3 : Formulaires et médias
- Introduction aux formulaires
- Créer un formulaire complet
- Médias et iframes

### Semaine 4 : Pratique avancée
- Tableaux HTML
- Divisions et span
- Projet final

## ⚠️ Important

- Ce site utilise `localStorage` pour stocker les données utilisateurs
- Les données sont stockées localement dans le navigateur
- Pour un environnement de production, utilisez un vrai backend avec base de données
- Le système d'authentification est basique et convient pour un prototype/démonstration
- Le mot de passe admin ne peut pas être changé après sa définition initiale

## 🚀 Déploiement

Pour mettre ce site en ligne :

1. Hébergez les fichiers sur un serveur web (Apache, Nginx, etc.)
2. Ou utilisez des services d'hébergement statique (GitHub Pages, Netlify, Vercel)
3. Assurez-vous que le lien PayPal est correctement configuré
4. Pour un vrai système de production, remplacez le localStorage par une base de données

## 🔒 Sécurité

⚠️ Ce site est un prototype/démonstration. Pour une utilisation en production :

- Ajoutez un vrai backend (Node.js, PHP, Python, etc.)
- Utilisez une base de données sécurisée (MySQL, PostgreSQL, MongoDB)
- Implémentez un vrai système d'authentification avec hachage de mot de passe
- Ajoutez HTTPS
- Utilisez des sessions ou des JWT sécurisés
- Validez toutes les entrées utilisateur
- Implémentez une véritable intégration PayPal avec webhooks

## 📞 Support

Pour toute question ou problème, contactez l'administrateur.

## 📄 Licence

Ce projet est fourni tel quel pour un usage éducatif.
