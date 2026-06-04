// Système d'authentification simple avec localStorage

// Initialisation des données
function initializeData() {
    if (!localStorage.getItem('users')) {
        // Créer le compte admin principal
        const adminUser = {
            id: 'admin',
            email: 'rzvoltaylive@gmail.com',
            password: '', // À définir lors de la première connexion
            isAdmin: true,
            isApproved: true,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('users', JSON.stringify([adminUser]));
        localStorage.setItem('adminPasswordSet', 'false');
    }
}

// Vérifier si le mot de passe admin a été défini
function isAdminPasswordSet() {
    return localStorage.getItem('adminPasswordSet') === 'true';
}

// Définir le mot de passe admin
function setAdminPassword(password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const adminIndex = users.findIndex(u => u.email === 'rzvoltaylive@gmail.com');

    if (adminIndex !== -1) {
        users[adminIndex].password = password;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('adminPasswordSet', 'true');
        return true;
    }

    return false;
}

// Inscrire un nouvel utilisateur
function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users'));

    // Vérifier si l'email existe déjà
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Cet email est déjà utilisé' };
    }

    // Créer le nouvel utilisateur
    const newUser = {
        id: Date.now().toString(),
        email: email,
        password: password,
        isAdmin: false,
        isApproved: false, // En attente d'approbation
        createdAt: new Date().toISOString(),
        subscriptionStatus: 'inactive' // Pas encore abonné
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: 'Compte créé avec succès. En attente d\'approbation par l\'administrateur.' };
}

// Connecter un utilisateur
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return { success: false, message: 'Email ou mot de passe incorrect' };
    }

    if (!user.isApproved) {
        return { success: false, message: 'Votre compte est en attente d\'approbation' };
    }

    // Stocker la session
    localStorage.setItem('currentUser', JSON.stringify(user));

    return { success: true, user: user };
}

// Déconnecter l'utilisateur
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Obtenir l'utilisateur actuel
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Vérifier si l'utilisateur est admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.isAdmin;
}

// Vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Obtenir tous les utilisateurs (pour l'admin)
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

// Approuver un utilisateur
function approveUser(userId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex].isApproved = true;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    return false;
}

// Rejeter un utilisateur
function rejectUser(userId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    return false;
}

// Activer l'abonnement d'un utilisateur
function activateSubscription(userId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex].subscriptionStatus = 'active';
        users[userIndex].subscriptionStart = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));

        // Mettre à jour l'utilisateur actuel si c'est lui
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            currentUser.subscriptionStatus = 'active';
            currentUser.subscriptionStart = new Date().toISOString();
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        return true;
    }

    return false;
}

// Vérifier si l'utilisateur a un abonnement actif
function hasActiveSubscription() {
    const user = getCurrentUser();
    if (!user) return false;
    return user.subscriptionStatus === 'active';
}

// Initialiser les données au chargement
initializeData();
