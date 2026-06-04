// Système d'authentification avec API PHP

const API_URL = 'api.php';

// Fonction pour appeler l'API
async function apiCall(action, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data && method === 'POST') {
        options.body = JSON.stringify(data);
    }

    if (method === 'GET' && data) {
        const params = new URLSearchParams(data).toString();
        return fetch(`${API_URL}?action=${action}&${params}`, options);
    }

    return fetch(`${API_URL}?action=${action}`, options);
}

// Vérifier si le mot de passe admin a été défini
async function isAdminPasswordSet() {
    const response = await apiCall('check_admin_password', 'GET');
    const result = await response.json();
    return result.data.passwordSet;
}

// Définir le mot de passe admin
async function setAdminPassword(password) {
    const response = await apiCall('set_admin_password', 'POST', { password });
    const result = await response.json();
    return result.success;
}

// Inscrire un nouvel utilisateur
async function registerUser(email, password) {
    const response = await apiCall('register', 'POST', { email, password });
    const result = await response.json();
    return result;
}

// Connecter un utilisateur
async function loginUser(email, password) {
    const response = await apiCall('login', 'POST', { email, password });
    const result = await response.json();

    if (result.success && result.data) {
        localStorage.setItem('currentUser', JSON.stringify(result.data.user));
        localStorage.setItem('token', result.data.token);
    }

    return result;
}

// Déconnecter l'utilisateur
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
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
async function getAllUsers() {
    const token = localStorage.getItem('token');
    const response = await apiCall('get_users', 'GET', { token });
    const result = await response.json();
    if (result.success) {
        return result.data.users;
    }
    return [];
}

// Approuver un utilisateur
async function approveUser(userId) {
    const response = await apiCall('approve_user', 'POST', { userId });
    const result = await response.json();
    return result.success;
}

// Rejeter un utilisateur
async function rejectUser(userId) {
    const response = await apiCall('reject_user', 'POST', { userId });
    const result = await response.json();
    return result.success;
}

// Activer l'abonnement d'un utilisateur
async function activateSubscription(userId) {
    const response = await apiCall('activate_subscription', 'POST', { userId });
    const result = await response.json();

    if (result.success) {
        // Mettre à jour l'utilisateur actuel si c'est lui
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            currentUser.subscriptionStatus = 'active';
            currentUser.subscriptionStart = new Date().toISOString();
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }

    return result.success;
}

// Vérifier si l'utilisateur a un abonnement actif
function hasActiveSubscription() {
    const user = getCurrentUser();
    if (!user) return false;
    return user.subscriptionStatus === 'active';
}
