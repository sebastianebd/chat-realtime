import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import { chatHandler } from '../handlers/chatHandler';

describe('Socket.io Integration Tests', () => {
  let io, serverSocket, clientSocket, clientSocket2;
  let receivedHistory = null;

  beforeAll(async () => {
    const httpServer = createServer();
    io = new Server(httpServer);
    chatHandler(io);

    await new Promise((resolve) => {
      httpServer.listen(() => {
        const port = httpServer.address().port;
        clientSocket = new Client(`http://localhost:${port}`);
        clientSocket2 = new Client(`http://localhost:${port}`);
        
        io.on("connection", (socket) => {
          serverSocket = socket;
        });
        
        let connections = 0;
        
        // Capturamos el history tan pronto nos conectamos
        clientSocket2.on('history', (history) => {
          receivedHistory = history;
        });

        clientSocket.on("connect", () => {
          connections++;
          if (connections === 2) resolve();
        });
        clientSocket2.on("connect", () => {
          connections++;
          if (connections === 2) resolve();
        });
      });
    });
  });

  afterAll(() => {
    if (io) io.close();
    if (clientSocket) clientSocket.close();
    if (clientSocket2) clientSocket2.close();
  });

  it('debe recibir el historial al conectarse', () => {
    expect(Array.isArray(receivedHistory)).toBe(true);
  });

  it('debe retransmitir mensajes válidos a los clientes', async () => {
    const validMessage = {
      id: 'test-123',
      sender: 'TestUser',
      text: 'Integration Test Message',
      timestamp: Date.now()
    };

    const promise = new Promise((resolve) => {
      clientSocket2.once('message', (msg) => {
        expect(msg.id).toBe(validMessage.id);
        expect(msg.text).toBe(validMessage.text);
        resolve();
      });
    });

    clientSocket.emit('message', validMessage);
    await promise;
  });

  it('debe ignorar (no retransmitir) mensajes inválidos', async () => {
    const invalidMessage = {
      id: 'test-456',
      // Faltan campos, esto fallará la validación
    };

    let received = false;
    clientSocket2.once('message', () => {
      received = true;
    });

    clientSocket.emit('message', invalidMessage);

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(received).toBe(false);
  });
});
