# Ticket Management

App en ligne sur https://custom-tickets.netlify.app/ : gestion de tickets en temps réel.

- **Employés et techniciens** créent des tickets (contenu, priorité High / Medium / Low, 3 options),
  les modifient, les ferment ou les suppriment. La liste se met à jour **en temps réel**.
- **L'administrateur** crée les utilisateurs, ajoute des choix dans les menus « Option 1 / 2 / 3 »
  et peut se connecter au compte d'un utilisateur.
- **Mode test** (`/testmode`) : formulaires pré-remplis avec les comptes de démonstration,
  pour essayer l'app sans créer de compte.

Données : Firebase **Authentication** (comptes) et **Realtime Database**
(`tickets/`, `users/`, `select1/`, `select2/`, `select3/`).

Next.js 16 (Pages Router), React 19, Tailwind CSS 4, ESLint 9, Firebase 13, **Node.js 26** (`.nvmrc`).
Netlify redéploie automatiquement à chaque push sur `main`.

> Dépôt **public** : la configuration Firebase (clé « web ») et les comptes de démonstration
> y sont visibles. C'est voulu pour la démo ; la protection des données repose sur les
> **règles de sécurité** de la Realtime Database (console Firebase).

## Commandes

```bash
npm install        # installer les dépendances
npm run dev        # serveur de développement sur http://localhost:3000
npm run lint       # vérifier le code
npm run build      # construire la version de production
npm run start      # servir la version construite
```

## Où modifier quoi

| Quoi                                              | Fichier                                   |
| ------------------------------------------------- | ----------------------------------------- |
| Styles communs (boutons, formulaires, fond)       | `styles/globals.css`                      |
| Accueil et mode test                              | `components/HomePage.js`                  |
| Page admin                                        | `components/crud/Admin.js`, `OptionForm.js`, `Signup.js` |
| Page utilisateur                                  | `components/crud/User.js`                 |
| Tableau des tickets (tri, filtre, temps réel)     | `components/tickets/Tickets.js`, `Ticket.js` |
| Fenêtres de création / modification              | `components/modals/`                      |
| Comptes, messages d'erreur, accès à la base       | `firebase/firebaseContext.js`             |
| Format des dates                                  | `Utils/utils.js`                          |
