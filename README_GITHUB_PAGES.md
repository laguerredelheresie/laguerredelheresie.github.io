# La Guerre de l'Hérésie - version GitHub Pages

Cette version est prête pour GitHub Pages en mode statique.

## Changements effectués

- `index.php` est devenu `index.html`.
- Les pages dans `page/*.php` sont devenues `page/*.html`.
- Les liens internes `.php` ont été remplacés par `.html`.
- Le bloc PHP de compteur de visites a été retiré, car GitHub Pages ne lance pas de code serveur.
- L'ancien CSS partagé `https://www.naterscreations.com/css/hes.css` est remplacé par `css/hes.css` local.
- L'ancien script partagé `../jquery/monfichier_jquery_header.js` est remplacé par un fichier local vide pour éviter une erreur 404.
- `.nojekyll` est ajouté pour que GitHub Pages serve le site tel quel, sans transformation Jekyll.
- `404.html` redirige automatiquement les anciens liens finissant en `.php` vers leurs nouvelles pages `.html`.

## Déploiement rapide

1. Crée un repository GitHub, par exemple `laguerredelheresie`.
2. Copie tout le contenu de ce dossier à la racine du repository.
3. Dans GitHub: `Settings` → `Pages` → `Build and deployment`.
4. Sélectionne `Deploy from a branch`, puis branche `main`, dossier `/root`.
5. Le site sera disponible à une adresse du type `https://<ton-user>.github.io/laguerredelheresie/`.

## Domaine personnalisé

Si tu gardes `www.naterscreations.com`, configure le domaine dans `Settings` → `Pages` → `Custom domain`, puis adapte les DNS chez ton registrar. GitHub créera normalement un fichier `CNAME` quand le domaine est sauvegardé dans l'interface.

Si tu utilises une autre URL que `https://www.naterscreations.com/laguerredelheresie/`, pense à mettre à jour les URLs absolues dans `sitemap.xml`.

## Limite restante

Le compteur global de visites ne peut pas fonctionner tel quel sur GitHub Pages. Pour retrouver cette mesure, utilise un service externe comme Google Analytics, Plausible, Umami, ou un petit backend séparé.
