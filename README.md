Panel admin simple (React + Vite) - listo para producción

Instrucciones rápidas:
1. Copia el contenido de .env.example a un archivo .env y ajusta VITE_API_URL si es necesario.
2. Subir al repo `square-auctions-admin` y desplegar en Render como Web Service o Static Site.
3. Render ejecutará `npm install && npm run build && npm start`.
4. Accede al panel con admin: admin@example.com / admin123

Rutas que espera el backend:
- POST {VITE_API_URL}/admin/login  -> { identifier, password } -> { token }
- GET {VITE_API_URL}/admins -> lista de admins (protegido con Bearer token)
- GET {VITE_API_URL}/auctions -> lista de subastas
