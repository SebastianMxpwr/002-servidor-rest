# 002-servidor-rest

Ejercicio de curso (noviembre-diciembre de 2020): API REST de una cafetería hecha con **Express 4** y **MongoDB** (Mongoose 5). Sirvió para practicar rutas, modelos de Mongoose y cifrado de contraseñas con bcrypt.

## Qué hace

Tiene un CRUD de usuarios, categorías y productos, más un login.

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/` | Mensaje de bienvenida |
| GET | `/usuario?desde=0&hasta=5` | Lista los usuarios activos, con paginación |
| POST | `/usuario` | Crea un usuario (`nombre`, `email`, `password`); guarda el password cifrado con bcrypt |
| PUT | `/usuario/:id` | Actualiza `nombre` y `email` |
| DELETE | `/usuario/:id` | Borrado lógico (`estado: false`) |
| POST | `/login` | Revisa `email` y `password` y responde con el usuario (no genera token) |
| GET | `/categoria?desde=0&hasta=5` | Lista las categorías con su usuario |
| POST | `/categoria` | Crea una categoría (`descripcion`, `usuario`) |
| PUT | `/categoria/:id` | Actualiza `descripcion` y `usuario` |
| DELETE | `/categoria/:id` | Borra una categoría |
| GET | `/productos?desde=0&hasta=5` | Lista los productos disponibles |
| POST | `/productos` | Crea un producto (`Nombre`, `PrecioUni`, `Categoria`, `Usuario`) |
| PUT | `/productos/:id` | Actualiza un producto |
| DELETE | `/productos/:id` | Borrado lógico (`Disponibilidad: false`) |

## Cómo correrlo

Necesita **MongoDB** local en `mongodb://localhost:27017` (usa la base `cafeteria`).

```bash
npm install
npm start        # http://localhost:3000  (cambia el puerto con la variable PORT)
```

Con npm 12 o más reciente, bcrypt necesita permiso para compilarse:

```bash
npm install-scripts approve bcrypt
npm rebuild bcrypt
```

## Limitaciones conocidas

Es un ejercicio y se quedó a medias. No está pensado para usarse en serio.

- No tiene autenticación: el login no genera token y cualquiera puede llamar a todas las rutas.
- `DELETE /categoria/:id` borra la primera categoría que encuentra, no la del id (`findOneAndRemove(id)`).
- El login y la lista de usuarios devuelven el hash del password.
- La dirección de MongoDB está fija en `server/server.js`. Si MongoDB no está corriendo, el servidor se cae a los ~30 segundos.
- Las dependencias son de 2020 y `npm audit` reporta vulnerabilidades. Para actualizar a Mongoose 7 o más reciente habría que reescribir las rutas, porque ya no acepta callbacks.

## Estructura

```
server/
├─ server.js          ← arranque, conexión a MongoDB y registro de rutas
├─ config/config.js   ← puerto
├─ models/            ← usuario, categoria, productos
└─ routes/            ← usuario, login, categoria, productos
```
