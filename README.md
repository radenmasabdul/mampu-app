<div align="center">
  
# UserOps - Mampu
### Explore users, their activity signals, posts, and todos — all in one workspace.

</div>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="50" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="50" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" width="50" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="50" />
</p>

## 🚀 Key Features

- 👥 User management dashboard
- 📊 Activity insights and monitoring
- 📝 Posts and todo exploration
- ⚡ Fast and responsive interface
- 🔄 Server state management with TanStack Query
- 📋 Advanced table handling with TanStack Table
- 🎨 Modern UI powered by Tailwind CSS & shadcn/ui
- 🧪 Testing setup with Jest and Testing Library
- 📱 Responsive design for multiple screen sizes
- 🛠️ Scalable and maintainable architecture

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI + Base UI
- **Server State Management**: TanStack Query
- **Data Tables**: TanStack Table
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Testing**: Jest + Testing Library
- **Code Quality**: ESLint

## 📋 Prerequisites

Before running Nexora App locally, make sure you have installed:

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Git**
- **Modern Browser** (Chrome, Edge, Firefox)
- **{JSON} Placeholder API** running for full backend integration

## ⚡ Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/radenmasabdul/mampu-app.git
cd mampu-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will run at http://localhost:3000

## 📁 Project Structure

```bash
mampu-app/
├── app/                                # Next.js App Router
│   ├── api/                            # API route handlers
│   │   └── users/                      # Users API routes
│   │       ├── [id]/                   # Dynamic user API route
│   │       │   └── route.ts            # Single user endpoint
│   │       └── route.ts                # Users endpoint
│   │
│   ├── users/                          # Users pages
│   │   ├── [id]/                       # User detail route
│   │   │   ├── error.tsx               # User detail error state
│   │   │   ├── loading.tsx             # User detail loading state
│   │   │   └── page.tsx                # User detail page
│   │   ├── error.tsx                   # Users page error state
│   │   └── page.tsx                    # Users list page
│   │
│   ├── favicon.ico                     # Application favicon
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   ├── not-found.tsx                   # 404 page
│   ├── page.tsx                        # Homepage
│   └── providers.tsx                   # Global providers setup
│
├── components/                         # Reusable React components
│   ├── common/                         # Shared feature components
│   └── ui/                             # UI components (shadcn/ui)
│
├── hooks/                              # Custom React hooks
│   ├── queries/                        # TanStack Query hooks
│   │   ├── posts/                      # Posts query hooks
│   │   │   ├── usePosts.ts             # Fetch all posts
│   │   │   └── useUserPosts.ts         # Fetch posts by user
│   │   │
│   │   ├── todos/                      # Todos query hooks
│   │   │   ├── useTodos.ts             # Fetch all todos
│   │   │   └── useUserTodos.ts         # Fetch todos by user
│   │   │
│   │   └── users/                      # Users query hooks
│   │       ├── useUsers.ts             # Fetch users list
│   │       └── useUser.ts              # Fetch single user
│   │
│   ├── users/                          # User utility hooks
│   │   ├── useUser.ts                  # User state & logic
│   │   └── useUserDetail.ts            # User detail utilities
│   │
│   └── use-mobile.ts                   # Mobile screen detection hook
│
├── lib/                                # Utilities & helper functions
│   ├── api/                            # API service layer
│   │   ├── client.ts                   # Axios client configuration
│   │   ├── users.ts                    # Users API services
│   │   ├── posts.ts                    # Posts API services
│   │   ├── todos.ts                    # Todos API services
│   │   └── index.ts                    # API exports
│   │
│   └── utils.ts                        # Shared utility functions
│
├── public/                             # Static public assets
│
├── tests/                              # Unit & integration tests
│   ├── user-detail.test.tsx            # User detail tests
│   ├── user-list.test.tsx              # Users list tests
│   └── useUserTable.test.ts            # User table hook tests
│
├── types/                              # Global TypeScript types
│   └── index.ts                        # Shared type exports
│
├── .env                                # Environment variables
├── .env.example                        # Example environment variables
├── .gitignore                          # Ignored files for Git
├── components.json                     # shadcn/ui configuration
├── eslint.config.mjs                   # ESLint configuration
├── jest.config.ts                      # Jest configuration
├── jest.setup.ts                       # Jest setup configuration
├── next-env.d.ts                       # Next.js TypeScript definitions
├── next.config.ts                      # Next.js configuration
├── package-lock.json                   # Dependency lock file
├── package.json                        # Dependencies & scripts
├── postcss.config.mjs                  # PostCSS configuration
├── README.md                           # Project documentation
└── tsconfig.json                       # TypeScript configuration
```

## 🌍 Live Demo

[Mampu App](https://mampu-app.vercel.app/)

## 👨‍💻 Author

**radenmasabdul**
- GitHub: [@radenmasabdul](https://github.com/radenmasabdul)
# 
