# Sleep Plus Admin Panel

A modern admin panel built with refine.dev, React, and Ant Design for managing sleep clinic operations.

## Features

- 🏥 **Patient Management**: Create, edit, view, and manage patient records
- 👨‍⚕️ **Doctor Management**: Manage doctor profiles and availability
- 📅 **Appointment System**: Schedule and track appointments
- 📊 **Dashboard**: Overview of clinic statistics and recent activities
- 🔐 **Authentication**: Secure login system with role-based access
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: [refine.dev](https://refine.dev/)
- **UI Library**: [Ant Design](https://ant.design/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **State Management**: React Query (via refine)
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vargasmmi/sleep-plus-front-2.git
cd sleep-plus-front-2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Default Login Credentials

- **Email**: admin@sleepplus.com
- **Password**: demo123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Serve production build

## Project Structure

```
src/
├── pages/           # Page components
│   ├── patients/    # Patient CRUD pages
│   ├── doctors/     # Doctor CRUD pages
│   ├── appointments/# Appointment CRUD pages
│   ├── dashboard/   # Dashboard page
│   └── login/       # Login page
├── authProvider.ts  # Authentication logic
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── index.css       # Global styles
```

## Deployment

### Docker

The project includes a Dockerfile for easy deployment:

```bash
docker build -t sleep-plus-admin .
docker run -p 3000:3000 sleep-plus-admin
```

### EasyPanel

This project is configured for deployment on EasyPanel. Simply connect your GitHub repository and EasyPanel will automatically build and deploy the application.

## Environment Variables

No environment variables are required for the basic setup. The application uses a mock API for demonstration purposes.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
