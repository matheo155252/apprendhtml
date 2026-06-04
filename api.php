<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Fichier de stockage
$usersFile = 'users.json';

// Lire les données
function getUsers($usersFile) {
    if (!file_exists($usersFile)) {
        return ['users' => [], 'adminPasswordSet' => false];
    }
    $data = file_get_contents($usersFile);
    return json_decode($data, true);
}

// Sauvegarder les données
function saveUsers($usersFile, $data) {
    file_put_contents($usersFile, json_encode($data, JSON_PRETTY_PRINT));
}

// Réponse JSON
function jsonResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Action
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

$data = getUsers($usersFile);

switch ($action) {
    case 'check_admin_password':
        jsonResponse(true, 'OK', ['passwordSet' => $data['adminPasswordSet'] ?? false]);

    case 'set_admin_password':
        if ($method !== 'POST') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $password = $input['password'] ?? '';

        foreach ($data['users'] as &$user) {
            if ($user['email'] === 'rzvoltaylive@gmail.com') {
                $user['password'] = $password;
                break;
            }
        }
        $data['adminPasswordSet'] = true;
        saveUsers($usersFile, $data);
        jsonResponse(true, 'Mot de passe admin défini');

    case 'register':
        if ($method !== 'POST') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        // Vérifier si l'email existe déjà
        foreach ($data['users'] as $user) {
            if ($user['email'] === $email) {
                jsonResponse(false, 'Cet email est déjà utilisé');
            }
        }

        // Créer le nouvel utilisateur
        $newUser = [
            'id' => uniqid(),
            'email' => $email,
            'password' => $password,
            'isAdmin' => false,
            'isApproved' => false,
            'subscriptionStatus' => 'inactive',
            'createdAt' => date('c')
        ];

        $data['users'][] = $newUser;
        saveUsers($usersFile, $data);
        jsonResponse(true, 'Compte créé avec succès. En attente d\'approbation.');

    case 'login':
        if ($method !== 'POST') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $foundUser = null;
        foreach ($data['users'] as $user) {
            if ($user['email'] === $email && $user['password'] === $password) {
                $foundUser = $user;
                break;
            }
        }

        if (!$foundUser) {
            jsonResponse(false, 'Email ou mot de passe incorrect');
        }

        if (!$foundUser['isApproved']) {
            jsonResponse(false, 'Votre compte est en attente d\'approbation');
        }

        // Générer un token de session simple
        $sessionToken = bin2hex(random_bytes(32));
        $_SESSION['token'] = $sessionToken;
        $_SESSION['user'] = $foundUser;

        jsonResponse(true, 'Connexion réussie', [
            'user' => $foundUser,
            'token' => $sessionToken
        ]);

    case 'get_users':
        if ($method !== 'GET') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $token = $_GET['token'] ?? '';
        if (!$token) {
            jsonResponse(false, 'Non authentifié');
        }

        // Vérifier que c'est l'admin
        session_start();
        if (!isset($_SESSION['user']) || !$_SESSION['user']['isAdmin']) {
            jsonResponse(false, 'Non autorisé');
        }

        jsonResponse(true, 'OK', ['users' => $data['users']]);

    case 'approve_user':
        if ($method !== 'POST') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = $input['userId'] ?? '';

        // Vérifier admin
        session_start();
        if (!isset($_SESSION['user']) || !$_SESSION['user']['isAdmin']) {
            jsonResponse(false, 'Non autorisé');
        }

        foreach ($data['users'] as &$user) {
            if ($user['id'] === $userId) {
                $user['isApproved'] = true;
                saveUsers($usersFile, $data);
                jsonResponse(true, 'Utilisateur approuvé');
            }
        }
        jsonResponse(false, 'Utilisateur non trouvé');

    case 'reject_user':
        if ($method !== 'POST') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = $input['userId'] ?? '';

        // Vérifier admin
        session_start();
        if (!isset($_SESSION['user']) || !$_SESSION['user']['isAdmin']) {
            jsonResponse(false, 'Non autorisé');
        }

        foreach ($data['users'] as $key => $user) {
            if ($user['id'] === $userId) {
                unset($data['users'][$key]);
                $data['users'] = array_values($data['users']);
                saveUsers($usersFile, $data);
                jsonResponse(true, 'Utilisateur supprimé');
            }
        }
        jsonResponse(false, 'Utilisateur non trouvé');

    case 'activate_subscription':
        if ($method !== 'POST') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = $input['userId'] ?? '';

        // Vérifier admin
        session_start();
        if (!isset($_SESSION['user']) || !$_SESSION['user']['isAdmin']) {
            jsonResponse(false, 'Non autorisé');
        }

        foreach ($data['users'] as &$user) {
            if ($user['id'] === $userId) {
                $user['subscriptionStatus'] = 'active';
                $user['subscriptionStart'] = date('c');
                saveUsers($usersFile, $data);
                jsonResponse(true, 'Abonnement activé');
            }
        }
        jsonResponse(false, 'Utilisateur non trouvé');

    case 'check_session':
        if ($method !== 'GET') {
            jsonResponse(false, 'Méthode non autorisée');
        }
        $token = $_GET['token'] ?? '';

        session_start();
        if (isset($_SESSION['user'])) {
            jsonResponse(true, 'Session valide', ['user' => $_SESSION['user']]);
        }
        jsonResponse(false, 'Session invalide');

    default:
        jsonResponse(false, 'Action non reconnue');
}
