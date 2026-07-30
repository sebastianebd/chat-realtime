# Real-Time Chat (Dual Architecture)

Este repositorio contiene una aplicación de chat en tiempo real completa, se incluyen dos aplicaciones de cliente con idéntica funcionalidad y diseño (una construida en **React** y otra en **Vue 3**), alimentadas por un único servidor backend Node.js.

## Estructura del Repositorio

```
├── server/        → Backend Node.js + Express + Socket.io
├── react-chat/    → Cliente con React 18, Vite, TypeScript y Zustand
├── vue-chat/      → Cliente con Vue 3, Vite, TypeScript (Composition API) y Pinia
└── README.md
```

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

### Ejecutar Tests

```bash
cd react-chat && npm test
cd vue-chat && npm test
cd server && npm test
```

---

## Decisiones Técnicas Relevantes y Arquitectura

### 1. Arquitectura Multicapa Desacoplada

Ambas aplicaciones siguen un patrón de diseño en **cinco capas** claramente delimitadas, que garantizan la separación total entre lógica de negocio, infraestructura y presentación:

```
src/
├── types/          → Contratos (interfaces TypeScript compartidas)
├── utils/          → Funciones puras (factories, formateo, avatar)
├── services/       → Capa de infraestructura (Socket.io singleton)
├── store/          → Estado global reactivo (Zustand / Pinia)
├── hooks/          → Orquestadores de ciclo de vida (React: hooks / Vue: composables)
└── components/     → UI pura (Dumb Components, sin lógica)
```

1. **Capa de Tipos** (`types/chat.ts`): Define las interfaces compartidas (`ChatMessage`, `UserProfile`, eventos del socket). Todos los módulos importan de aquí — nunca se definen tipos localmente.

2. **Capa de Utilidades** (`utils/`): Funciones puras y testables:
   - `messageFactory.ts` — Crea objetos `ChatMessage` con UUID y timestamp.
   - `avatar.ts` — Genera la URL del avatar basado en el nombre.
   - `formatTime.ts` — Formatea timestamps a hora legible.

3. **Capa de Infraestructura** (`services/socket.ts`): Socket.io encapsulado en un singleton. **Ningún** componente importa `socket.io-client` directamente; toda la emisión de eventos se centraliza en métodos del servicio (ej. `sendMessage`).

4. **Capa de Estado** (`store/chatStore.ts`):
   - En **React** se integró Zustand por su simpleza extrema (sin boilerplate).
   - En **Vue** se utilizó Pinia por ser el estándar modular actual de la Composition API.

5. **Capa de Orquestación** (`hooks/useChat.ts` / `composables/useChat.ts`): Encapsula la suscripción y limpieza de eventos del socket. Los componentes `App` simplemente invocan `useChat()` sin conocer la lógica de conexión.

6. **Capa de UI** (`components/`): Componentes "tontos" fuertemente tipados que se dedican exclusivamente a renderizar información del Store.

### 2. Backend Mejorado

El servidor va más allá del ejemplo de referencia:

- **Express** como base HTTP con endpoint de health check (`/health`).
- **CORS restrictivo**: Solo acepta conexiones de `localhost:5173` y `localhost:5174`.
- **Validación de mensajes**: Verifica estructura, tipos y longitud máxima (500 caracteres).
- **Historial en memoria**: Almacena los últimos 50 mensajes y los envía al cliente al conectarse.
- **Manejo de errores**: Try/catch en handlers con logging estructurado y timestamps.

### 3. Testing

El proyecto cuenta con cobertura de pruebas en sus tres capas (Frontend React, Frontend Vue y Backend Node.js) usando **Vitest**:

- **Tests de Interfaz y Estado (React/Vue)**:
  - Unit Tests del Store: Validan operaciones CRUD, persistencia en localStorage, y limpieza en logout.
  - Component Tests: Verifican el renderizado del indicador de conexión (🟢/🔴) interactuando con el DOM.
- **Tests del Servidor (Node.js)**:
  - Unit Tests: Validan la sanitización y validación estricta de payloads.
  - Integration Tests: Levantan un servidor Socket.io en memoria para probar el broadcast de mensajes y bloqueo de tramas inválidas.

```text
React:   3 archivos, 13 tests ✅
Vue:     3 archivos, 13 tests ✅
Node.js: 2 archivos, 10 tests ✅
```

### 4. Buenas Prácticas de Ingeniería

- **TypeScript**: Setup completo usando el flag estricto de TS, modelando con interfaces (ej. `ChatMessage` y `UserProfile`).
- **Autenticación + LocalStorage**: Existe un pequeño componente `Login` inicial. Al ingresar un nombre, la lógica utiliza `localStorage` para generar y recordar un _avatar automático_ del usuario basándose en UI-Avatars, persistiendo de modo que las recargas de página mantengan al usuario autenticado.
- **Manejo Correcto de Reconexión / Limpieza**: Se han envuelto los listeners en los Hooks primarios (`useEffect` en React, y `onUnmounted`/`Watchers` de ciclos de vida de Vue) lo que garantiza el correcto Cleanup de listeners al cerrar componentes. La reconexión automática se configuró explícitamente con `reconnectionAttempts: 5` y `reconnectionDelay: 1000ms`.
- **Autoscroll Dinámico**: Se aprovechan los observadores / watchers y `useRef` para mover el scroll al fondo dinámicamente cada vez que un nodo cambia dentro de la lista de mensajes reactiva.
- **Componentización**: Se separaron de forma lógica las estructuras (Barra de estado / Historial / Input) para lograr un código altamente escalable y mantenible.
