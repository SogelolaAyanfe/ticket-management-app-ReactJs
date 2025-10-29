# React Ticket Management System

A modern ticket management web application built with React, JavaScript, TypeScript, and Vite. Features secure authentication, full CRUD operations, and real-time dashboard statistics.

**Live Deployment** : https://ticket-management-web-application.netlify.app/

## Features

- **Authentication:** Secure signup/login with bcrypt password hashing
- **Ticket CRUD:** Create, read, update, and delete tickets with status tracking
- **Dashboard:** Real-time statistics for total, open, in-progress, and resolved tickets
- **Responsive UI:** Modern card-based design with smooth animations

## Tech Stack

React  • TypeScript • Vite • React Router • localStorage • bcryptjs

## Quick Start

```bash
# Clone repository
git clone https://github.com/SogelolaAyanfe/ticket-management-app-ReactJs.git
cd react-ticket-manager

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
├── modules/             # Business logic (auth, ticket-manager)
├── pages/              # Page components
└── styles/             # CSS files
```

## Usage

1. **Sign Up** - Create account (password min. 10 characters)
1. **Login** - Access your dashboard
1. **Dashboard** - View ticket statistics
1. **Manage Tickets** - Create, edit, or delete tickets

## Deployment

Deployed on Netlify. To deploy your own:

1. Push code to GitHub
1. Connect repo to Netlify
1. Build command: `npm run build`
1. Publish directory: `dist`



