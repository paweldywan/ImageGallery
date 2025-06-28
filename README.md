# ImageGallery

A full-stack image gallery application built with ASP.NET Core (C#) for the backend and React (TypeScript) for the frontend.

## Live Demo
[https://imagegallery.paweldywan.com/](https://imagegallery.paweldywan.com/)

## Features
- Upload, view, and manage images
- RESTful API backend
- Modern React frontend with Vite
- Entity Framework Core for data access
- Modular architecture (BLL, DAL, Server, Client)

## Project Structure
- `ImageGallery.BLL/` - Business logic layer (services, models, interfaces)
- `ImageGallery.DAL/` - Data access layer (entities, migrations, context)
- `ImageGallery.Server/` - ASP.NET Core Web API (controllers, configuration)
- `imagegallery.client/` - React frontend (Vite, TypeScript, components)

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)

### Backend Setup
1. Navigate to the solution root:
   ```sh
   cd ImageGallery.Server
   ```
2. Restore dependencies and run migrations:
   ```sh
   dotnet restore
   dotnet ef database update
   ```
3. Run the server:
   ```sh
   dotnet run
   ```

### Frontend Setup
1. Navigate to the client folder:
   ```sh
   cd imagegallery.client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Usage
- The backend API will be available at `https://localhost:5001` (or as configured).
- The frontend will be available at `http://localhost:5173` (or as configured by Vite).

## Development
- Backend: C#, ASP.NET Core, Entity Framework Core
- Frontend: React, TypeScript, Vite

## License
MIT License
