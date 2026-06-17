import { describe, it, expect } from 'vitest';
import { validarTexto, formatearTexto, contarPalabras } from '../../src/js/utils/texto.js';

// ============================================================
// Pruebas unitarias para validarTexto
// ============================================================
describe('validarTexto', () => {
  // --- Casos válidos ---
  it('debe retornar válido para un texto con 3 o más caracteres', () => {
    const resultado = validarTexto('Comprar pan');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar válido para un texto con exactamente 3 caracteres', () => {
    const resultado = validarTexto('ABC');
    expect(resultado.valido).toBe(true);
  });

  it('debe retornar válido para un texto con 200 caracteres (límite)', () => {
    const texto = 'A'.repeat(200);
    const resultado = validarTexto(texto);
    expect(resultado.valido).toBe(true);
  });

  // Tarea 1 — casos edge
  it('debe retornar válido para texto con caracteres especiales y emojis', () => {
    const resultado = validarTexto('Tarea con emoji 🎯');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar inválido para texto con espacios que al recortarse queda con menos de 3 caracteres', () => {
    const resultado = validarTexto('  AB  ');
    expect(resultado.valido).toBe(false);
    expect(resultado.error).toBe('El texto debe tener al menos 3 caracteres.');
  });

});

// ============================================================
// Pruebas unitarias para formatearTexto
// ============================================================
describe('formatearTexto', () => {
  it('debe convertir la primera letra a mayúscula y el resto a minúscula', () => {
    const resultado = formatearTexto('hOLA MUNDO');
    expect(resultado).toBe('Hola mundo');
  });

  it('debe retornar un string vacío si se ingresa un string vacío', () => {
    const resultado = formatearTexto('');
    expect(resultado).toBe('');
  });

  // Tarea 1 — casos edge
  it('debe formatear correctamente texto con caracteres acentuados', () => {
    const resultado = formatearTexto('áRBOL');
    expect(resultado).toBe('Árbol');
  });

  it('debe retornar el mismo texto si ya está correctamente formateado', () => {
    const resultado = formatearTexto('Hola mundo');
    expect(resultado).toBe('Hola mundo');
  });

});

// ============================================================
// Tarea 3 — Pruebas unitarias para contarPalabras
// ============================================================
describe('contarPalabras', () => {
  it('debe retornar 1 para un texto con una sola palabra', () => {
    expect(contarPalabras('Hola')).toBe(1);
  });

  it('debe retornar el número correcto de palabras para un texto normal', () => {
    expect(contarPalabras('Comprar leche y pan')).toBe(4);
  });

  it('debe retornar 0 para un texto vacío', () => {
    expect(contarPalabras('')).toBe(0);
  });

  it('debe contar correctamente cuando hay múltiples espacios entre palabras', () => {
    expect(contarPalabras('Hola   mundo')).toBe(2);
  });

  it('debe lanzar error si se recibe null o undefined', () => {
    expect(() => contarPalabras(null)).toThrow('El texto no puede ser nulo o indefinido.');
    expect(() => contarPalabras(undefined)).toThrow('El texto no puede ser nulo o indefinido.');
  });
});

// ============================================================
// Pruebas adicionales — Tarea 1
// ============================================================
describe('Pruebas adicionales — Tarea 1', () => {
  it('debe retornar válido para texto con caracteres especiales, tildes y eñes', () => {
    const resultado = validarTexto('árbol con niña 🌳');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar inválido para texto con 3 espacios y una letra ("   A")', () => {
    const resultado = validarTexto('   A');
    expect(resultado.valido).toBe(false);
    expect(resultado.error).toBe('El texto debe tener al menos 3 caracteres.');
  });

  it('debe formatear "árbol" correctamente a "Árbol"', () => {
    const resultado = formatearTexto('árbol');
    expect(resultado).toBe('Árbol');
  });

  it('no debe alterar un texto que ya está correctamente formateado', () => {
    const resultado = formatearTexto('Hola mundo');
    expect(resultado).toBe('Hola mundo');
  });
});
