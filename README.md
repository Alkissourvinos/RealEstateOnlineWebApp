# Real Estate Online Web App

## Philosophy & Architecture
This React-based web application represents the frontend of the real estate platform. It follows a structured architecture separating concerns into:

### Component Structure
- **Renderer**: Handles the visual representation of components
- **Controller**: Manages component logic and user interactions
- **Models**: Defines data structures and interfaces
- **Store**: Centralizes state management using React Redux

The application emphasizes clean code organization while maintaining high performance and user experience.

## Tech Stack & Libraries

### Core Technologies
- **React** (v18+) - Frontend library
- **TypeScript** - Type-safe programming
- **React-Redux** - State management
- **Material-UI (MUI) v5** - UI component library

### Essential Dependencies
```
{
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.14.5",
    "@mui/icons-material": "^5.14.5",
    "axios": "^1.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "typescript": "^4.9.5"
  }
}
```

## Features

### Property Advertisement Attributes
- Property type and category
- Location details
- Size and dimensions
- Room specifications
- Energy ratings
- Price information
- Contact details

## Bonus Points
- ✨ Fully responsive design optimized for mobile devices
- 🔄 Direct database communication for real-time data
- 🎨 Polished UI with Material-UI components
- 📱 Mobile-friendly approach
- 🏗️ Scalable architecture

## Technical Notes
- Uses React Redux for state management
- Implements TypeScript for enhanced code reliability
- Features component isolation for better maintainability
- ## Technical Notes - Caching System Design
While the current implementation operates without caching, here's the planned caching strategy that was conceptualized but not implemented due to time constraints:

### Proposed Local Storage Caching
- **Key-Value Structure**: 
  - Key: User search parameters (serialized)
  - Value: API response data
  
### Cache Management
- **Expiration Strategy**:
  - 15-minute rolling window
  - Maximum 50 cached requests
  
### Optimization Logic
```typescript
interface CacheEntry {
  timestamp: number;
  data: PropertyData[];
  searchParams: SearchParameters;
}

const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes
const MAX_CACHE_ENTRIES = 50;

// FIFO (First In, First Out) cache cleanup
const cleanupCache = () => {
  const entries = getAllCacheEntries();
  if (entries.length > MAX_CACHE_ENTRIES) {
    removeOldestEntry();
  }
};

// Cache invalidation check
const isCacheValid = (entry: CacheEntry): boolean => {
  const now = Date.now();
  return (now - entry.timestamp) < CACHE_EXPIRY;
};
```
This caching system would significantly reduce API calls. Implementation was postponed because I could not get it working with the available time I have in my day to day

## Database Integration
Communicates with a dedicated API for:
- Property listing retrieval
- Advertisement submission
- Location data management

### Installation
1. Clone the repository
```bash
git clone https://github.com/Alkissourvinos/RealEstateOnlineWebApp.git
```
2. Install packagies
```bash
cd RealEstateOnlineWebApp
```
```bash
npm install
```
3. Run the server
```bash
npm start
```
⚠️ Note: Ensure you have the [API](https://github.com/Alkissourvinos/RealEastetOnlineAPI) running locally 
