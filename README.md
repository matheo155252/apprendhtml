# HTML Master - Site d'apprentissage HTML

Site web pour apprendre HTML en 1 mois avec des exercices pratiques.

## 🚀 Fonctionnalités

- **Cours HTML structurés sur 4 semaines**
- **Système d'inscription avec approbation admin**
- **Panel administrateur pour gérer les utilisateurs**
- **Abonnement mensuel à 2€ via PayPal**
- **Exercices pratiques pour chaque semaine**
- **Tableau de bord utilisateur**
- **Stockage des données dans un fichier JSON** (fonctionne en ligne !)
- **API PHP pour la gestion des utilisateurs**
- **L'admin peut accéder aux exercices sans abonnement**

## 📁 Structure du projet

```
html-course-site/
├── api.php                 # API PHP pour gérer l'authentification
├── users.json              # Fichier de stockage des utilisateurs
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
│   └── auth.js             # Script d'authentification (communique avec l'API PHP)
└── README.md               # Ce fichier
```

## 🔧 Configuration requise

- **PHP 7.0 ou supérieur** (pour l'API)
- **Serveur web** (Apache, Nginx, ou PHP built-in server)
- **Permissions d'écriture** sur le fichier `users.json`

## 🔑 Configuration initiale

### 1. Premier lancement local

Ouvrez un terminal dans le dossier et lancez le serveur PHP :
```bash
cd /home/matheo/html-course-site/
php -S localhost:8000
```

Puis ouvrez http://localhost:8000 dans votre navigateur.

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
5. **Accès aux cours** : En tant qu'admin, vous avez accès à tous les exercices sans abonnement

## 🚀 Déploiement sur AMEN

### Étapes pour héberger sur AMEN :

1. **Préparez les fichiers** :
   ```bash
   cd /home/matheo/html-course-site/
   ```

2. **Uploadez les fichiers** :
   - Utilisez le gestionnaire de fichiers d'AMEN ou un client FTP (FileZilla)
   - Uploadez tous les fichiers dans le dossier `public_html` ou `www`
   - Assurez-vous que `users.json` a les permissions d'écriture (chmod 666)

3. **Vérifiez les permissions** :
   - Le fichier `users.json` doit être accessible en écriture par le serveur PHP
   - Vous pouvez définir les permissions via FTP ou le panel AMEN

4. **Testez le site** :
   - Allez sur votre domaine
   - Testez l'inscription et la connexion
   - Vérifiez que le fichier `users.json` se remplit correctement

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

- Ce site utilise un **fichier JSON** pour stocker les données
- Les données sont partagées entre tous les utilisateurs (contrairement au localStorage)
- L'admin peut voir et gérer tous les utilisateurs
- L'admin a accès aux exercices sans abonnement
- Pour un environnement de production, envisagez une vraie base de données (MySQL)
- Le système d'authentification est basique mais fonctionne pour un usage modéré
- Le mot de passe admin ne peut pas être changé après sa définition initiale

## 🔒 Sécurité

⚠️ Ce site est amélioré par rapport à localStorage mais reste basique. Pour une utilisation en production :

- Utilisez HTTPS (disponible sur AMEN avec certificat SSL)
- Implémentez le hachage de mot de passe (password_hash/password_verify en PHP)
- Validez toutes les entrées utilisateur
- Limitez les tentatives de connexion
- Utilisez une vraie base de données (MySQL) pour plus de sécurité
- Sauvegardez régulièrement le fichier `users.json`

## 🐛 Dépannage

### Le fichier users.json ne se crée pas
- Vérifiez les permissions d'écriture du dossier
- Créez le fichier manuellement avec les permissions 666

### Erreur 500 sur api.php
- Vérifiez que PHP est installé et actif sur votre serveur
- Consultez les logs d'erreur du serveur

### Les utilisateurs ne s'enregistrent pas
- Vérifiez que `users.json` est accessible en écriture
- Testez l'API directement dans le navigateur

## 📞 Support

Pour toute question ou problème, contactez l'administrateur.

## 📄 Licence

Ce projet est fourni tel quel pour un usage éducatif.
