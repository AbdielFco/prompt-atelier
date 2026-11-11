# Before / after

## One job

Weak:

```text
Hazme la arquitectura de mi app, el código, los tests y el plan de marketing. Que quede bien.
```

Five tasks, no role, no context, no limit, no format. "Que quede bien" is not a metric.

Effective (architecture only; code, tests, and marketing are later prompts):

```text
Rol: Actúa como un arquitecto de software senior experto en AWS.

### Contexto
"""
Estamos migrando un monolito de pedidos a microservicios.
Pico: 2.000 req/s. Equipo de 6. Sin bases de datos relacionales.
"""

Tarea: Diseña solo la arquitectura de red.
No escribas código, tests ni marketing: eso va en prompts aparte.

Restricciones:
- No uses bases de datos relacionales.
- No inventes cifras que no estén en el contexto.
- Máximo 500 palabras.

Formato: una tabla Markdown (servicio, límite, motivo).

Ejemplo:
Entrada: un servicio de pedidos acoplado a una sola base.
Salida: tabla de límites de red, una fila por servicio.

Si falta un dato para decidir, hazme una sola pregunta y espera.
Genera tres rutas, descarta la que no cierra y quédate con la más sólida.
Responde solo con base en el texto provisto.
Let's think step by step.
```

## Debug

Weak:

```text
Arregla este bug de React.
```

No code, no stack trace, no expected behavior, no test framework.

Effective:

```text
Rol: revisor de TypeScript.
Stack: React 18, TypeScript 5, Jest. Componente funcional, solo hooks.

### Código
"""
function Total({ items }) {
  return items.reduce((sum, item) => sum + item.price);
}
"""

### Error exacto
"""
TypeError: Cannot read properties of undefined (reading 'reduce')
"""

Esperado: si items es undefined, devolver 0.
Métrica: cubrir happy path y ese edge case en Jest.

Analiza el stack trace paso a paso, identifica la línea,
explica por qué falla y luego entrega el código corregido y los tests.
Responde solo a partir del código y el error provistos.
```
