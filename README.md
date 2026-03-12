# Chat Realtime (Prueba Técnica)

Este repositorio contiene la solución completa a la prueba técnica para Desarrollador Frontend.
Se incluyen dos aplicaciones de cliente con idéntica funcionalidad (react-chat y vue-chat) y un servidor backend de referencia.

## Estructura del Repositorio

- `server/`: Backend básico Node.js + Socket.io (Referencia para pruebas locales).
- `react-chat/`: Cliente desarrollado con React 18, Vite, TypeScript y Zustand.
- `vue-chat/`: Cliente desarrollado con Vue 3, Vite, TypeScript (Composition API) y Pinia.

## Instrucciones de Ejecución

Para arrancar todo el entorno adecuadamente, abra **tres** terminales distintas:

### 1. Iniciar el Servidor Backend

```bash
cd server
npm install
npm start
```

> El servidor se ejecutará en http://localhost:3001

### 2. Iniciar la Aplicación React

```bash
cd react-chat
npm install
npm run dev
```

> La app React correrá en http://localhost:5173

### 3. Iniciar la Aplicación Vue 3

```bash
cd vue-chat
npm install
npm run dev
```

> La app Vue correrá en http://localhost:5174

---

## Decisiones Técnicas Relevantes y Arquitectura

### 1. Arquitectura Desacoplada

Para evitar el acoplamiento conocido como "Spaghetti Code" o componentes sobrecargados, ambas aplicaciones siguen el mismo patrón de diseño en tres capas:

1. **Servicio de Red (Capa de Infraestructura)**: Se abstrajo Socket.io mediante un archivo `socket.ts` en formato singleton. **Ningún** componente importa o manipula `socket.io-client` de forma directa; toda la emisión de eventos se centraliza en métodos del servicio (ej. `sendMessage`), garantizando una limpieza de eventos adecuada sin memory leaks.
2. **Sistema de Estado Global (Capa Lógica)**:
   - En **React** se integró Zustand por su simpleza extrema (sin boilerplate).
   - En **Vue** se utilizó Pinia por ser el estándar modular actual de la Composition API.
     De esta forma, el UI simplemente reacciona a los cambios en el estado y solo emite acciones.
3. **Capa Ui (Vista)**: Componentes tontos (Dumb Components) fuertemente tipados que se dedican solo a inyectar información.

### 2. Buenas Prácticas y Cumplimiento de Bonus Points

Se ha invertido esfuerzo de forma modular en todos los puntos bonus solicitados:

- **TypeScript**: Setup completo usando el flag estricto de TS, modelando con interfaces (ej. `ChatMessage` y `UserProfile`).
- **Autenticación + LocalStorage**: Existe un pequeño componente `Login` inicial. Al ingresar un nombre, la lógica utiliza `localStorage` para generar y recordar un _avatar automático_ del usuario basándose en UI-Avatars, persistiendo de modo que las recargas de página mantengan al usuario autenticado.
- **Manejo Correcto de Reconexión / Limpieza**: Se han envuelto los listeners en los Hooks primarios (`useEffect` en React, y `onUnmounted`/`Watchers` de ciclos de vida de Vue) lo que garantiza el correcto Cleanup de listeners al cerrar componentes. La reconexión automática se configuró explícitamente con `reconnectionAttempts: 5` y `reconnectionDelay: 1000ms`.
- **Autoscroll Dinámico**: Se aprovechan los observadores / watchers y `useRef` para mover el scroll al fondo dinámicamente cada vez que un nodo cambia dentro de la lista de mensajes reactiva.
- **Componentización**: Se separaron de forma lógica las estructuras (Barra de estado / Historial / Input) cumpliendo la premisa de la prueba.
