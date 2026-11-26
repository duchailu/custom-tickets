# CLAUDE.md — Ticket Management de Joseph Griffon

Instructions pour Claude Code, lues automatiquement au début de chaque conversation.
Ce fichier est versionné : il suit le projet sur toutes les machines.

## Le projet

- App en ligne sur https://custom-tickets.netlify.app/ (listée dans la page Projets du site CV
  https://josephgriffon.org, dépôt `duchailu/mon-site-cv-next`).
- Repo GitHub **PUBLIC** : `duchailu/custom-tickets` — branche principale : `main`.
  Tout ce qui est commité est visible par tous : ne jamais y mettre de vrai secret ni de donnée personnelle.
- Next.js 16 (Pages Router), React 19, Tailwind CSS 4, ESLint 9, Firebase 13. **Node.js 26** requis (`.nvmrc`).
- Netlify redéploie automatiquement **à chaque push sur `main`** (Node 26 imposé par `netlify.toml`).
- Firebase : **Authentication** (comptes) et **Realtime Database** (`tickets/`, `users/`, `select1/2/3`),
  projet `real-time-ticket-management`. Voir le README pour le détail des données.
- **Démo de portfolio** : `/testmode` pré-remplit les comptes de démonstration (admin `admin@test.com`,
  utilisateurs `test1@test.com`…). Leurs mots de passe sont dans le code public : c'est voulu.
  Ne pas les afficher dans les réponses ni les journaux ; ne pas les modifier sans demande.

## Avec l'utilisateur

- Répondre **en français**, simplement, en expliquant ce qui est fait et pourquoi.
  Il a repris le développement fin 2026 après une longue pause et débute avec Claude Code.
- Il veut pouvoir modifier lui-même les styles : garder `styles/globals.css` organisé et commenté
  (sections THÈME / BASE / COMPOSANTS).

## Règles de travail

1. **Début de session :** `git fetch` puis `git pull` sur la branche en cours.
2. **Jamais de travail direct sur `main`** : créer une branche, puis `npm run lint` et `npm run build`.
3. **Demander l'accord avant tout `git push`** et avant toute action sur GitHub ou Netlify.
   Une fusion sur `main` met l'app en ligne.
4. **Pour valider avant mise en ligne :** ouvrir une pull request (avec son accord) : Netlify crée
   un aperçu `deploy-preview-N--custom-tickets.netlify.app` (il utilise la vraie base Firebase).
5. **Claude ne se connecte pas à l'app** (vrai Firebase) : il vérifie `/` et `/testmode` sans compte,
   et **l'utilisateur teste la partie connectée** sur l'aperçu (via `/testmode`).
6. **Fin de session :** committer et, avec son accord, pousser la branche de travail.

## Si « rien ne se passe » à l'enregistrement

L'app affiche maintenant un message rouge. Pour diagnostiquer sans se connecter, interroger la base :
`curl "<databaseURL de firebase/Firebase.js>/tickets.json?shallow=true"`
- `"has been deactivated"` (HTTP 423) → base désactivée par Firebase : l'utilisateur la réactive dans la
  console Firebase (projet real-time-ticket-management → Realtime Database). Déjà arrivé en 2026-11.
- `"Permission denied"` (HTTP 401) → normal sans connexion. Si l'écriture échoue aussi une fois connecté,
  vérifier l'onglet Règles. Règles en place depuis 2026-11 (choix assumé pour la démo, Firebase affiche
  un avertissement « non sécurisées » qu'on peut ignorer) :
  `{ "rules": { ".read": "auth != null", ".write": "auth != null" } }`

## Points techniques à connaître

- `firebase/firebaseContext.js` : une seule écoute de connexion (`user`) ; lectures uniques avec `get()` ;
  écritures entourées de `withTimeout` (10 s) et messages via `getDbErrorMessage`.
  **Ne pas utiliser `onValue` pour une lecture unique** (écoute jamais fermée). La seule écoute
  en temps réel est celle de la liste des tickets dans `components/tickets/Tickets.js` (refermée au démontage).
- L'admin est reconnu par son email (`ADMIN_EMAIL` dans `components/HomePage.js`).
- Créer un utilisateur depuis la page admin **connecte aussitôt ce nouveau compte** (comportement de
  Firebase côté navigateur) : l'admin est remplacé par le nouvel utilisateur. Connu et accepté.
- Classes Tailwind : toujours écrites en entier (ex. `text-red-500`), jamais construites
  (`text-${couleur}-500`) : Tailwind ne les détecte pas (bug déjà corrigé dans `EditPriorityChoice.js`).
- Dates des tickets au format JJ-MM-AA (`Utils/utils.js`, avec `padStart`).
- `package.json` → `overrides.magic-string` = 0.30 : la 1.x (utilisée par Tailwind 4) ne se charge pas
  dans Turbopack. À retirer quand ce sera corrigé (tester avec `rm -rf .next && npm run build`).

## État d'avancement

- [x] Modernisation Next 16 / React 19 / Tailwind 4 / Firebase 13 / Node 26 et corrections — en ligne (PR #1, 2026-11-26)
- [x] Base Realtime Database réactivée et règles corrigées par l'utilisateur (2026-11-26)
- [x] Messages d'erreur d'enregistrement — en ligne (PR #2)
- [ ] Idée : règles Firebase plus fines (seul l'admin ajoute des options, chacun modifie sa fiche)

Mettre à jour cette liste à chaque étape terminée.
