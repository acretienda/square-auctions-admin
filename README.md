Panel de administración (Vite + React) - español

Cómo usar:
- Instalar dependencias: npm install
- Desarrollo: npm run dev
- Build: npm run build (publicar carpeta dist en Render)
- Asegúrate de configurar la variable VITE_API_BASE_URL apuntando a tu backend, por ejemplo:
  VITE_API_BASE_URL=https://square-auctions.onrender.com

Endpoints requeridos en el backend:
- POST /api/admin/login { identifier, password } -> { token }
- GET /api/admin (protegido) -> lista admins
- POST /api/admin (protegido) { email, username, password } -> crear admin
- DELETE /api/admin/:id (protegido) -> borrar admin
- CRUD de subastas en /api/auctions -> (opcional, debes implementar en backend)
