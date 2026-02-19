# Rugby Transfer Market

A comprehensive platform for rugby player recruitment and club management. Functions as a specialized job board/transfer marketplace designed specifically for the rugby industry.

## Overview

Rugby Transfer Market connects players and clubs in the rugby world:

- **Players**: Create profiles, upload career information, images, skills, and apply for positions at rugby clubs
- **Clubs/Employers**: Post job openings for player positions, manage applications, scout players, and build teams
- **E-Commerce**: Integrated shop for purchasing rugby-related products

Supports multiple rugby formats: Rugby Union, Rugby League, and Rugby Sevens.

## Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 4.4.5** - Build tool and dev server
- **React Router DOM 6.17** - Client-side routing (SPA)
- **Redux Toolkit 1.9.7** - State management
- **SASS/SCSS** - Styling preprocessor
- **Bootstrap 5.2.3** - CSS framework
- **Material-UI 6.4.7** - UI components

### Backend & Database
- **Firebase Authentication** - User login/registration with email verification
- **Firestore** - NoSQL database
- **Firebase Storage** - File/image storage
- **Firebase Analytics** - Tracking and analytics
- **Firebase Cloud Messaging** - Push notifications

### Additional Integrations
- **Google Maps API** - Location services
- **Cloudinary** - Image management and CDN
- **Chart.js** - Dashboard analytics

## Project Structure

```
rugbymarket/
├── public/                          # Static assets (images, fonts, scss)
├── src/
│   ├── main.jsx                     # Entry point
│   ├── App.jsx                      # Main app with routing
│   ├── AuthContext.jsx              # Firebase auth context
│   ├── firebase.js                  # Firebase configuration
│   ├── components/                  # Reusable React components
│   │   ├── common/                  # Shared components (forms, headers)
│   │   ├── header/                  # Navigation headers
│   │   ├── footer/                  # Footer sections
│   │   ├── dashboard-pages/         # Dashboard UI components
│   │   ├── job-listing-pages/       # Job listing views
│   │   ├── candidates-listing-pages/# Candidate listing views
│   │   ├── public-profile/          # Public profile components
│   │   └── shop/                    # E-commerce components
│   ├── pages/                       # Page-level route components
│   ├── store/                       # Redux store configuration
│   ├── features/                    # Redux slices
│   ├── data/                        # Static data (positions, countries, etc.)
│   └── utils/                       # Utility functions
├── index.html
├── vite.config.js
├── package.json
└── vercel.json                      # Vercel deployment config
```

## Features

### Authentication & User Management
- Firebase Auth with email/password
- Email verification for new accounts
- Two user types: **Player** and **Club**
- Profile completion tracking with auto-redirects

### Player Features
- Dashboard with analytics
- Profile management (personal info, rugby career, images)
- Resume/CV upload and management
- Job applications tracking
- Short-listed/saved jobs
- Job alerts subscription
- Messaging with clubs

### Club/Employer Features
- Dashboard with applicant overview
- Company/club profile management
- Post and manage job listings
- View and filter applicants
- Short-list candidates
- Messaging with players
- Resume alerts

### Public Profiles
- Custom URL slugs (e.g., `/john.smith`)
- Privacy controls (`allowSearch` setting)
- Shareable player profiles

### E-Commerce Shop
- Product listing and details
- Shopping cart with Redux persistence
- Checkout flow

### Content
- Blog with multiple layouts
- Testimonials
- Pricing/packages
- FAQ and contact pages

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_ANALYTICS=your_analytics_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_API_KEY=your_api_key

# Google Maps
VITE_GOOGLE_API_KEY=your_google_api_key
```

### Development

```bash
npm run dev
```

Runs on `http://localhost:5174` with Hot Module Replacement.

### Build

```bash
npm run build
```

Produces optimized production bundle in `/dist`.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Database Structure (Firestore)

```
users/
├── {userId}/
│   ├── email, userType, profileSlug, profileCompleted
│   ├── education/          # Subcollection
│   └── work_experience/    # Subcollection

jobs/
├── {jobId}/
│   ├── [job details]
│   └── applications/       # Subcollection

messages/
├── {conversationId}/
│   └── [message data]
```

## Deployment

The project is configured for Vercel deployment with SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## Rugby Positions Supported

The platform supports all standard rugby positions:
- Fullback, Winger, Centre, Fly-half, Scrum-half
- Number Eight, Flanker, Lock, Hooker, Prop
- And more...

## Version

Current version: `19.02.26 - Initial release`

## License

Proprietary - All rights reserved.
