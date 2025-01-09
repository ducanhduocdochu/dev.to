# Dev.to Clone Project

Welcome to the Dev.to Clone Project! This project replicates the functionality and design of the [dev.to](https://dev.to/) platform using modern technologies and tools.

---

## 🚀 Technologies Used

### **1. Create-App-T3**

Create-App-T3 is a versatile framework designed to streamline the development of full-stack TypeScript applications. It comes pre-configured with TypeScript, Prisma, TailwindCSS, and tRPC, providing a powerful foundation for scalable projects.

---

### **2. Deployment on Vercel**

The project is deployed on [Vercel](https://vercel.com/), a robust platform for hosting and deploying web applications. Key features include:

- **Automatic CI/CD:** Seamlessly integrates with GitHub to enable automatic deployments on every push.
- **Global Edge Network:** Ensures fast response times by serving content from the nearest edge location.

---

### **3. PostgreSQL Database on Railway**

The project uses [Railway](https://railway.app/) to host the PostgreSQL database. Railway provides:

- **Scalability:** Effortless scaling as the database grows.
- **Ease of Use:** Simple setup and management of database instances.
- **Integration:** Smooth integration with modern application stacks.

---

### **4. Prisma ORM**

[Prisma](https://www.prisma.io/) is utilized as the ORM to interact with the PostgreSQL database. It offers:

- **Type-Safe Database Queries:** Ensures strong type safety when querying the database.
- **Database Migrations:** Simplifies schema changes with migration support.
- **Developer Productivity:** Auto-generated CRUD operations.

---

### **5. TailwindCSS**

The project leverages [TailwindCSS](https://tailwindcss.com/) to build responsive and highly customizable user interfaces. Highlights include:

- **Utility-First Framework:** Enables rapid UI development with pre-defined utility classes.
- **Responsive Design:** Built-in responsiveness and theming.

---

### **6. tRPC for Client-Server Interaction**

Using [tRPC](https://trpc.io/) eliminates the need to write traditional RESTful APIs or GraphQL schemas. tRPC provides:

- **End-to-End Type Safety:** Ensures type consistency between client and server.
- **Streamlined Development:** Simplifies API development with a declarative syntax.

---

## 🎯 Key Features

### **1. User Interface**

- Pixel-perfect design replicating the dev.to platform.
- Intuitive navigation and responsive layout.

### **2. Authentication**

- **Powered by NextAuth.js:**
  - Supports Google, GitHub, and Facebook OAuth.
  - Easy registration and login for users.

### **3. Create and Manage Articles**

- Rich text editor with support for:
  - Bold, markdown, and code blocks.
  - Image uploads using [Cloudinary](https://cloudinary.com/).
- Full CRUD functionality:
  - Create, edit, delete, and publish articles.

### **4. Personal Profile Page**

- Showcases user information and published articles.
- Fully customizable user settings.

### **5. Permissions and Tagging**

- Fine-grained control over who can view articles.
- Tagging system for easy categorization and filtering.

### **6. Comments and Reactions**

- **Comments:**
  - Add, edit, and delete comments.
  - React to comments with emojis.
- **Article Reactions:**
  - Express emotions with a variety of reaction options.

### **7. Search Functionality**

- Powerful search engine to find content by:
  - Text, users, articles, and tags.
- Beautifully designed search results page.

### **8. Real-Time Notifications**

- **Powered by WebSocket:**
  - Instant notifications for likes, comments, and updates.

---

## 📸 Screenshots

### Authentication Interface:

![Authentication](https://github.com/user-attachments/assets/ce23dd43-04a2-43d0-823a-29934c355b4c)

### Home Page:

![Home Page](https://github.com/user-attachments/assets/beb92397-c21b-4c30-b0ec-b39e895e5259)

### Rich Text Editor:

![Text Editor](https://github.com/user-attachments/assets/d85df52c-7cb0-4773-af36-d90290666390)

### Profile Page:

![Profile Page](https://github.com/user-attachments/assets/02ff69c9-6876-40a7-bc48-a1b736a013c5)

### Comments:

![Comments](https://github.com/user-attachments/assets/3b006283-df90-4ac4-a58d-90a7ee8c5f17)

### Reactions:

![Reactions](https://github.com/user-attachments/assets/18b1ae5c-fd59-4d57-8f27-69c171fd6746)

### Comment Reactions:

![Comment Reactions](https://github.com/user-attachments/assets/63e129a4-fd5f-4cde-99c6-703b4b4f7ce4)

---

## 📌 Project Highlights

- **Seamless Authentication** using OAuth providers.
- **Interactive Text Editor** for content creation.
- **Real-Time User Interactions** with WebSocket notifications.
- **Type-Safe APIs** via tRPC.
- **Scalable Deployment** on Vercel and Railway.

---

## 🤝 Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

---

## 🛠️ Getting Started

To set up the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install` or `pnpm install`.
3. Configure environment variables for Vercel, PostgreSQL, and NextAuth.
4. Run the development server: `npm run dev` or `pnpm run dev`.
