import { describe, it, expect } from 'vitest';
import { validateMessage } from '../messageValidator';
import config from '../../config';

describe('messageValidator', () => {
  const validMessage = {
    id: '123-abc',
    sender: 'Alice',
    text: 'Hello World',
    timestamp: Date.now()
  };

  it('debe retornar null para un mensaje válido', () => {
    expect(validateMessage(validMessage)).toBeNull();
  });

  it('debe rechazar si el mensaje no es un objeto', () => {
    expect(validateMessage(null)).toBe('El mensaje debe ser un objeto válido');
    expect(validateMessage('hola')).toBe('El mensaje debe ser un objeto válido');
  });

  it('debe rechazar si falta el id o no es string', () => {
    expect(validateMessage({ ...validMessage, id: '' })).toBe("El campo 'id' es requerido y debe ser un string");
    expect(validateMessage({ ...validMessage, id: 123 })).toBe("El campo 'id' es requerido y debe ser un string");
  });

  it('debe rechazar si falta el sender o está vacío', () => {
    expect(validateMessage({ ...validMessage, sender: '   ' })).toBe("El campo 'sender' es requerido y no puede estar vacío");
    expect(validateMessage({ ...validMessage, sender: null })).toBe("El campo 'sender' es requerido y no puede estar vacío");
  });

  it('debe rechazar si el texto está vacío', () => {
    expect(validateMessage({ ...validMessage, text: '   ' })).toBe("El campo 'text' es requerido y no puede estar vacío");
  });

  it('debe rechazar si el texto excede la longitud máxima', () => {
    const longText = 'a'.repeat(config.maxMessageLength + 1);
    expect(validateMessage({ ...validMessage, text: longText })).toBe(`El mensaje no puede exceder ${config.maxMessageLength} caracteres`);
  });

  it('debe rechazar si el timestamp no es un número', () => {
    expect(validateMessage({ ...validMessage, timestamp: '2023-01-01' })).toBe("El campo 'timestamp' es requerido y debe ser un número");
  });
});
