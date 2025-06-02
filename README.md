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
