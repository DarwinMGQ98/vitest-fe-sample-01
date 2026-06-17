import { describe, it, expect, beforeEach } from 'vitest';
import {
  crearTareaElemento,
  agregarTarea,
  eliminarTarea,
  alternarTarea,
  limpiarCompletadas,
  actualizarContador,
  mostrarError,
} from '../../src/js/dom/todo.js';

// Helper: crea una lista <ul> fresca para cada prueba
function crearLista() {
  return document.createElement('ul');
}

// ============================================================
// Pruebas de integración — manipulación del DOM
// ============================================================
describe('crearTareaElemento', () => {
  it('debe crear un elemento <li> con la clase "tarea-item"', () => {
    const li = crearTareaElemento('Test');
    expect(li.tagName).toBe('LI');
    expect(li.classList.contains('tarea-item')).toBe(true);
  });

  
});

describe('agregarTarea', () => {
  let lista;

  beforeEach(() => {
    lista = crearLista();
  });

  it('debe agregar un <li> a la lista cuando el texto es válido', () => {
    const resultado = agregarTarea('Aprender vitest', lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Aprender vitest');
  });

  // Tarea 2 — límite de 200 caracteres
  it('debe retornar error cuando el texto supera los 200 caracteres', () => {
    const textoLargo = 'A'.repeat(201);
    const resultado = agregarTarea(textoLargo, lista);

    expect(resultado.exito).toBe(false);
    expect(resultado.error).toBe('El texto no puede exceder los 200 caracteres.');
    expect(lista.children.length).toBe(0);
  });

  // Tarea 3 — mínimo de 2 palabras
  it('debe retornar error cuando la tarea tiene una sola palabra', () => {
    const resultado = agregarTarea('Estudiar', lista);

    expect(resultado.exito).toBe(false);
    expect(resultado.error).toBe('La tarea debe contener al menos 2 palabras.');
    expect(lista.children.length).toBe(0);
  });

  it('debe agregar correctamente una tarea con exactamente 2 palabras', () => {
    const resultado = agregarTarea('Lavar ropa', lista);

    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Lavar ropa');
  });
});

describe('eliminarTarea', () => {
  it('debe eliminar el elemento <li> del DOM', () => {
    const lista = crearLista();
    agregarTarea('Tarea a eliminar', lista);
    const li = lista.querySelector('.tarea-item');

    eliminarTarea(li);
    expect(lista.children.length).toBe(0);
  });

  // Tarea 2 — eliminación con múltiples elementos
  it('debe eliminar el elemento correcto cuando hay múltiples tareas', () => {
    const lista = crearLista();
    agregarTarea('Primera tarea', lista);
    agregarTarea('Segunda tarea', lista);
    const items = lista.querySelectorAll('.tarea-item');

    eliminarTarea(items[0]);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Segunda tarea');
  });
});

describe('alternarTarea', () => {
  it('debe agregar la clase "completada" cuando el checkbox está marcado', () => {
    const li = crearTareaElemento('Tarea test');
    const checkbox = li.querySelector('.tarea-checkbox');
    checkbox.checked = true;

    alternarTarea(li, checkbox);
    expect(li.classList.contains('completada')).toBe(true);
  });

  // Tarea 2 — simulación de evento para desmarcar
  it('debe quitar la clase "completada" al desmarcar el checkbox', () => {
    const li = crearTareaElemento('Tarea test');
    const checkbox = li.querySelector('.tarea-checkbox');

    checkbox.checked = true;
    alternarTarea(li, checkbox);
    expect(li.classList.contains('completada')).toBe(true);

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    expect(li.classList.contains('completada')).toBe(false);
  });
});

describe('limpiarCompletadas', () => {
  it('debe eliminar solo las tareas completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea pendiente', lista);
    agregarTarea('Tarea completada', lista);

    // Marcar la segunda como completada
    const items = lista.querySelectorAll('.tarea-item');
    const checkbox = items[1].querySelector('.tarea-checkbox');
    checkbox.checked = true;
    alternarTarea(items[1], checkbox);

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(1);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Tarea pendiente');
  });

  // Tarea 2 — limpiar todas cuando todas están completadas
  it('debe eliminar todas las tareas cuando todas están completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea uno completada', lista);
    agregarTarea('Tarea dos completada', lista);

    lista.querySelectorAll('.tarea-item').forEach((item) => {
      const checkbox = item.querySelector('.tarea-checkbox');
      checkbox.checked = true;
      alternarTarea(item, checkbox);
    });

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(2);
    expect(lista.children.length).toBe(0);
  });
});

describe('actualizarContador', () => {
  it('debe mostrar "0 tareas" cuando la lista está vacía', () => {
    const lista = crearLista();
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('0 tareas');
  });

  it('debe mostrar "1 tarea" cuando hay exactamente un elemento', () => {
    const lista = crearLista();
    agregarTarea('Única tarea', lista);
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('1 tarea');
  });

  
});

describe('mostrarError', () => {
  it('debe establecer el texto del contenedor con el mensaje de error', () => {
    const contenedor = document.createElement('div');
    mostrarError('Error de prueba', contenedor);
    expect(contenedor.textContent).toBe('Error de prueba');
  });


});

// ============================================================
// Pruebas adicionales — Tarea 2
// ============================================================
describe('Pruebas adicionales — Tarea 2', () => {
  it('debe eliminar el <li> de la lista al hacer clic en el botón eliminar', () => {
    const lista = document.createElement('ul');
    agregarTarea('Tarea a borrar', lista);
    const li = lista.querySelector('.tarea-item');
    const btnEliminar = li.querySelector('.btn-eliminar');

    btnEliminar.click();
    expect(lista.children.length).toBe(0);
  });

  it('debe alternar la clase "completada" mediante evento change en el checkbox', () => {
    const li = crearTareaElemento('Tarea evento change');
    const checkbox = li.querySelector('.tarea-checkbox');

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    expect(li.classList.contains('completada')).toBe(true);

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    expect(li.classList.contains('completada')).toBe(false);
  });

  it('debe agregar correctamente una tarea con exactamente 200 caracteres', () => {
    const lista = document.createElement('ul');
    const texto = 'A'.repeat(99) + ' ' + 'B'.repeat(100); // 200 chars, 2 palabras
    const resultado = agregarTarea(texto, lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
  });

  it('debe dejar la lista vacía cuando todas las tareas están completadas', () => {
    const lista = document.createElement('ul');
    agregarTarea('Primera tarea completa', lista);
    agregarTarea('Segunda tarea completa', lista);

    lista.querySelectorAll('.tarea-item').forEach((item) => {
      const checkbox = item.querySelector('.tarea-checkbox');
      checkbox.checked = true;
      alternarTarea(item, checkbox);
    });

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(2);
    expect(lista.children.length).toBe(0);
  });
});
