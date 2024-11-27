# 🎉 **Sistema de Gestión de Eventos** 🎉

Desarrollar un sistema básico de gestión para administrar la información de los eventos, como **nombre**, **fecha**, **ubicación** y **descripción**. Los usuarios podrán:
- Ver una lista de eventos próximos.
- Registrarse para asistir a un evento.
- Confirmar su participación.
- Descargar un **certificado de participación**.

---

## 📑 **Índice**

1. [🚀 Características](#🚀-características)  
2. [🛠️ Tecnologías Utilizadas](#🛠️-tecnologías-utilizadas)  
3. [📋 Requisitos Previos](#📋-requisitos-previos)  
4. [📂 Instalación](#📂-instalación)  
5. [📖 Uso](#📖-uso)  
6. [📂 Estructura del Proyecto](#📂-estructura-del-proyecto)  
7. [🤝 Contribuciones](#🤝-contribuciones)  
8. [📜 Licencia](#📜-licencia)  

---

## 🚀 **Características**

### 🔹 **Gestión de Eventos:**
- ✅ Los **organizadores** pueden crear, editar y eliminar eventos.
- 📅 Los **usuarios** pueden visualizar una lista de eventos próximos y sus detalles.

### 🔹 **Registro y Confirmación:**
- 📝 Los usuarios pueden registrarse para asistir a un evento.
- 🛡️ Los organizadores pueden confirmar la participación de los usuarios.

### 🔹 **Descarga de Certificados:**
- 📄 Los usuarios que asistieron a un evento pueden descargar un certificado en **formato PDF**.

### 🔹 **Roles:**
- 👨‍💼 **Organizador:** Puede gestionar eventos y participantes.  
- 👤 **Asistente:** Puede registrarse y confirmar su participación en eventos.

---

## 🛠️ **Tecnologías Utilizadas**

### **Backend:**
- ⚙️ **Node.js**  
- ⚙️ **Express.js**  
- ⚙️ **MySQL**  

### **Frontend:**
- 🎨 **Angular**  

### **Otros:**
- 📱 **Bootstrap** (Diseño responsivo)  
- 🔑 **JWT** (Autenticación)  
- 🛠️ **Postman** (Pruebas de API)  

---

## 📋 **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- ✅ **Node.js** (versión 16 o superior).  
- ✅ **MySQL** (para la base de datos).  
- ✅ **Angular CLI** (para ejecutar el frontend).  

---

## 📂 **Instalación**

### **1. Clonar el repositorio**
```bash

git clone https://github.com/edumaldo94/Sistema-de-Gesti-n-de-Eventos
cd Sistema-de-Gesti-n-de-Eventos
```
### **2. Configurar el Backend**
Ve a la carpeta del backend:
cd backend

Instala las dependencias:
npm install

descargar Base de datos MySQL:
gestion_evetos_1.sql

Inicia el servidor:
npm start

### **3. Configurar el Frontend**

Ve a la carpeta del frontend:
cd frontend

Instala las dependencias:
npm install

Inicia la aplicación Angular:
ng serve o npm start


## 📖**Uso**

### **👨‍💼 Organizador**
* Inicia sesión con una cuenta de organizador.
* Gestiona eventos: crea, edita o elimina eventos desde la sección de administración.
* Marca la asistencia de los participantes y genera certificados.

### **👤 Asistente**

* Regístrate en un evento disponible.
* Confirma tu asistencia desde tu panel de usuario.
* Descarga tu certificado una vez asistido al evento.

## 📂** Estructura del Proyecto**

### **Backend:**
* 📁 routes/: Rutas para eventos, usuarios, etc.
* 📁 controllers/: Lógica de negocio.
* 📁 models/: Interacción con la base de datos.
* 📄 app.js: Configuración principal del servidor.

### **Frontend:**

* 📁 src/app/: Contiene los módulos y componentes principales.
* 📁 src/assets/: Archivos estáticos como imágenes y CSS.

## 📜 **Licencia**

Este proyecto está bajo la **Licencia EAM** *(Maldonado Eduardo Alberto)*.

📧 **Cualquier consulta**, comunícate a la siguiente dirección de correo:  
**[maldonado19994@gmail.com](mailto:maldonado19994@gmail.com)**  
