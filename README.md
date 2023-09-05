# Arquetipo Front - Angular

Se trata del arquetipo para Front desarrollado en Angular.

## Prerrequisitos

- Node 16

## Características integradas

Dentro del proyecto base se integran las siguientes características:

- Frontend Angular 9.1

## Documentación

- https://corpus.izertis.com/arquitectura/nodejs/angular/arquetipo944s/1-2-0

## Ejecución de tests

La ejecución del testing en entorno local se lanzará utilizando el comando:

```bash
ng test
```

Adicionalmente se ha creado una configuración de Karma para la ejecución de testing utilizando Chorme Headless, útil para la ejecución en entornos sin interfaz gráfica, como puede ser un entorno Docker o un entorno CI. Esta configuración se incluye en el fichero `karma.ci.conf.js`.
