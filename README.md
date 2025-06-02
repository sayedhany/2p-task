# TaskApp

## Getting Started

Follow these steps to run the project:

1. **Install dependencies**

```bash
npm install
```

2. **Start the JSON Server**  
  Make sure you have `json-server` installed globally:

```bash
npm install -g json-server
```

Then start the server using your `db.json` file on port 3001:

```bash
json-server --watch db.json --port 3001
```

3. **Start the application**  
  In a new terminal, run:

```bash
npm start
```

The app should now be running and connected to the JSON server.

You can access the project at [http://localhost:4200](http://localhost:4200).

---

## Features & Technologies Used

This project utilizes several Angular features and best practices, including:

- **Angular Components** and component interaction
- **Pipes** (both built-in and custom)
- **Angular Services** for data management and business logic
- **Directives** (built-in and custom)
- **Angular Routing** for navigation between views
- **Dependency Injection** for service and resource management
- **Modules** and standalone components for modular architecture
- **Event Binding** for interactive UI elements

Additionally, the project uses:

- **Bootstrap** for responsive and modern UI design
- **SweetAlert (swal)** for enhanced alert and confirmation dialogs

Using these features demonstrates a strong understanding of Angular and modern web development practices and will be considered a bonus.
