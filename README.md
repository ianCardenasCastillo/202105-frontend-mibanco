# Mi Banco

Este proyecto esta generado con [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

## Funciones
### Sing up / Sing in

En Mi Banco usted podra registrarse de forma simple y utilizar nuestros servicios de transferencias

### Añadir Destinatario

En Mi Banco usted podra registrar destinatarios para poder realizar transferencias 

### Transferir

Transfiere a tus contactos en 3 simples pasos:
- Busca y Selecciona
- Ingresa Monto
- Y Envia!

### Historial

Tambien podrás revisar el historial de trasnsferencias realizadas a tus destinatarios, a que banco, tipo de cuenta y monto transferido.

## Development server

Ejecute `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicacion se volvera a cargar automaticamente cuando se actualicen los archivos.

## Build

Ejecute `ng build` para construir el proyecto. Los archivos generados estaran en `dist/` . Use el `--prod` flag para un build de producción.

## Despliegue en Kubernetes

Para el despliegue del frontend Mi Banco en kubernetes debe ejecutar: `kubectl --context <contexto-cluster> apply -k ./` o `kubectl --context <contexto-cluster> apply -f ./mi-banco-deploy.yaml` junto con el servicio `kubectl --context <contexto-cluster> apply -f ./mi-banco-service.yaml`

## Dockerfile

```
### STAGE 1: Build ###
FROM node:15.10.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/trans-ripley /usr/share/nginx/html
```

## Autores ✒️

* **Ian Cárdenas Castillo** - *Desarrollo y Documentación* - [Ian Cárdenas C](https://github.com/ianCardenasCastillo)

---
⌨️ con ❤️ por [Ian Cárdenas C](https://github.com/ianCardenasCastillo) 😊
