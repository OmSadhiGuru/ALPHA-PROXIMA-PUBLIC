# Importer le bootstrap dans GitHub sans toucher au Core privé

Dépôt cible exclusivement : `https://github.com/OmSadhiGuru/ALPHA-PROXIMA-PUBLIC`

**Statut initial observé lors de la préparation :** `main` contient seulement `README.md`; `main` n'est pas protégé. L'assistant a pu lire le dépôt, mais GitHub a refusé la création d'une branche (`403 Resource not accessible by integration`). **Aucun changement distant n'a été effectué.**

## Option A · Codex / Work Mode avec autorisation explicite

Demander d'exécuter dans le **dépôt public uniquement** :

> Prépare une branche `feat/public-foundation-mvp` dans `OmSadhiGuru/ALPHA-PROXIMA-PUBLIC`. Décompresse l'archive `ALPHA_PROXIMA_PUBLIC_Bootstrap_MVP_v1.zip` à la racine du dépôt public (sans créer de dossier enveloppe), lance les vérifications du README, et ouvre une pull request vers `main`. Ne pousse rien vers `ALPHA.PROXIMA.CORE-`, ne fusionne pas la PR et ne déploie pas avant mon approbation.

## Option B · Terminal sur Mac / PC

Prérequis : Git installé et authentifié auprès de ton compte GitHub. Télécharger puis décompresser l'archive localement.

```bash
# Travailler UNIQUEMENT dans le nouveau dépôt public.
git clone https://github.com/OmSadhiGuru/ALPHA-PROXIMA-PUBLIC.git
cd ALPHA-PROXIMA-PUBLIC
git switch -c feat/public-foundation-mvp

# Copier TOUS les fichiers décompressés à la racine de ce dossier,
# y compris les fichiers cachés .gitignore, .github/ et public/.nojekyll.
# Remplacer le README.md minimal par le nouveau README.md.

python3 scripts/check_public_safety.py
python3 -m unittest discover -s tests -v
node --check public/assets/app.js

git status --short
# Inspecter tous les fichiers ajoutés avant commit.
git add .
git commit -m "feat(public): bootstrap bilingual foundation MVP"
git push -u origin feat/public-foundation-mvp
```

Puis ouvrir **Pull requests > Compare & pull request**, base `main`, head `feat/public-foundation-mvp`. Examiner les fichiers, compléter le `CONTENT-APPROVAL.md`, configurer la protection de `main` et procéder seulement avec l'approbation du Founder.

## Attention

- **Ne pas** téléverser seulement le fichier `.zip` dans GitHub : la plateforme n'extraira pas automatiquement le site.
- **Ne pas** effectuer un `git push --force` et **ne pas** importer l'historique du dépôt privé.
- **Ne pas** créer de sous-module pointant vers le Core.
- Les mécanismes de sécurité CI sont un complément à une validation humaine obligatoire.
