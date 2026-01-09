# Quick Setup Guide

## ⚠️ Important: Backend Changes Required

To enable the frontend to communicate with your backend, you need to add CORS configuration to your NestJS backend.

### Backend CORS Configuration

Edit `/home/mubtasim-shahriar/Documents/Angel/backend-project/src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ ADD THIS CORS CONFIGURATION
  app.enableCors({
    origin: 'http://localhost:3001',  // Allow frontend
    credentials: true,                 // Allow cookies
  });
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## 📝 Frontend Setup

### 1. Create Environment File

Create `.env.local` in the frontend root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Install Dependencies (Already Done)

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 3. Start the Backend

In a terminal, navigate to the backend and start it:

```bash
cd /home/mubtasim-shahriar/Documents/Angel/backend-project
npm run start:dev
```

The backend should be running on `http://localhost:3000`

### 4. Start the Frontend

In another terminal, navigate to the frontend and start it:

```bash
cd /home/mubtasim-shahriar/Documents/Angel/next-app-angel
npm run dev
```

The frontend will be running on `http://localhost:3001`

## 🎯 Testing the Application

### 1. Register a Moderator
- Visit: http://localhost:3001/register
- Fill in email, password, display name (optional), and bio (optional)
- Click "Create Account"

### 2. Login
- Visit: http://localhost:3001/login
- Enter your credentials
- Click "Sign In"

### 3. Explore Dashboard
- View dashboard statistics
- Navigate to "Moderators" to see all moderators

### 4. View Moderator Details
- Click on any moderator card
- View their profile information

### 5. Manage Tracks
- On a moderator's detail page, add tracks
- Delete tracks
- See the list update in real-time

## 📊 Assignment Verification Checklist

### ✅ 5+ Axios Data Fetching (20 marks)
- [ ] Login form works (POST /auth/login) - CSR
- [ ] Register form works (POST /auth/register) - CSR
- [ ] Dashboard shows moderators (GET /moderators) - SSR
- [ ] Moderators page shows list (GET /moderators) - SSR
- [ ] Moderator detail page works (GET /moderators/:id) - SSR
- [ ] Tracks list loads (GET /moderators/:id/tracks) - CSR
- [ ] Add track form works (POST /moderators/:id/tracks) - CSR
- [ ] Delete track works (DELETE /moderators/tracks/:trackId) - CSR
- [ ] Status toggle works (PATCH /moderators/:id/status) - CSR

### ✅ Proper Layout & Components (5 marks)
- [ ] Header with navigation visible
- [ ] Footer on all pages
- [ ] Reusable components (Button, Card, Input, etc.)
- [ ] Responsive design works on mobile
- [ ] Consistent Tailwind CSS styling

### ✅ Different Routing (5 marks)
- [ ] Folder-based routes: /, /login, /register, /dashboard, /moderators
- [ ] Dynamic route: /moderators/[id]
- [ ] loading.tsx files show loading states
- [ ] not-found.tsx shows 404 page (visit /nonexistent)
- [ ] error.tsx catches errors

### ✅ Validation & Authentication (5 marks)
- [ ] Form validation shows errors
- [ ] Can't submit invalid email
- [ ] Password must be 6+ characters
- [ ] Login redirects to dashboard
- [ ] Protected routes redirect to login
- [ ] Logout works
- [ ] Token stored in cookies (check browser DevTools)

## 🐛 Troubleshooting

### Backend Connection Error
- Make sure backend is running on port 3000
- Check CORS is enabled in backend
- Verify `.env.local` has correct API URL

### 401 Unauthorized
- Token might be expired, logout and login again
- Check cookies in browser DevTools

### Port Already in Use
- Kill the process using the port or change the port in package.json

## 📚 Technologies Demonstrated

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Server-Side Rendering (SSR)** for dashboard and lists
- **Client-Side Rendering (CSR)** for forms and actions
- **Dynamic Routing** with [id] parameter
- **Middleware** for route protection
- **Cookie-based Authentication** (more secure than localStorage)
- **Form Validation** with Zod and React Hook Form
- **Axios Interceptors** for automatic token management
- **Tailwind CSS 4** for modern styling
- **Special Route Files** (loading, not-found, error)

## 🎉 Success Criteria

Your application is successful if:
1. ✅ You can register and login
2. ✅ Dashboard displays moderator statistics
3. ✅ You can view all moderators
4. ✅ You can view individual moderator details
5. ✅ You can add and delete tracks
6. ✅ All forms validate properly
7. ✅ Protected routes work correctly
8. ✅ UI is responsive and looks good
9. ✅ No console errors or linter warnings

---

**Ready to test!** Start both backend and frontend, then visit http://localhost:3001

