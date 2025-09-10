Square Auctions - Admin panel (Vite + React)

Quick steps to deploy (no local install required):
1. Upload the files of this project to your GitHub repo `square-auctions-admin`.
2. In Render create a new Static Site and connect that repo.
   - Build command: npm install && npm run build
   - Publish directory: dist
3. (Optional) Add environment variable VITE_API_BASE_URL with value: https://square-auctions.onrender.com
4. Default admin credentials (created by backend when you deployed backend update): admin / password123

Notes:
- The panel calls the backend endpoints under: <VITE_API_BASE_URL>/api/...
- If your backend uses different routes for auctions/bids update the paths in src/services/api.js
