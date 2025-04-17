# Real Estate Listing

## Features

- **Property Catalog**: Browse through available properties with essential details
- **Advanced Filtering**: Filter properties by bedrooms, bathrooms, parking spaces, and price range
- **Property Details**: View comprehensive information about each property
- **Contact Form**: Reach out to agents about specific properties with a validated contact form
- **Save Favorites**: Save properties to your favorites list for quick access
- **Responsive Design**: Optimized for all device sizes from mobile to desktop

## Additional Features

- **Icons**: Added icons for following fields: Beds, Baths, Parking, SQFT, Year Built,
and the Search button.
- **Saved Properties**: Added a "Saved Properties" button that opens a modal displaying
the saved properties.
- **Within the Card Component**: 
    - The property image is now displayed as a link to the property details page.
    - A button has been added to save the property.
- **Within the Contact Form**: Implemented additional field validations according to requested
rules (all fields should not be empty):
    - Full Name: Must be at least 3 characters.
    - Phone Number: Must contain at least 8 digits.
    - Comments: Must be at least 10 characters.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: Browser's localStorage for saved properties
- **Type Safety**: TypeScript for robust type checking
- **API Routes**: Next.js API Routes for data fetching

### Best Practices

#### Accessibility
- Semantic HTML elements 
- ARIA attributes where necessary
- Keyboard navigation support
- Proper form labeling and validation

#### Performance
- Image optimization with Next.js Image component
- Efficient state management
- Minimized re-renders

#### Code Quality
- TypeScript for type safety
- JSDoc comments for all components and functions
- Consistent code style and formatting
- Component modularization for reusability

#### Responsive Design
- Mobile-first approach
- Flexible layouts using CSS Grid and Flexbox
- Responsive typography and spacing

#### SEO
- Proper metadata
- Semantic HTML structure
- Alt text for images

## Project Structure

```
/
├── app/                        # Next.js App Router
│   ├── api/                    # API Routes
│   │   └── properties/         # Property API endpoints
│   ├── property/               # Property details page
│   │   └── [id]/               # Dynamic route for individual properties
│   └── page.tsx                # Home page
├── components/                 # React components
│   ├── ui/                     # UI components
│   ├── ContactForm.tsx         # Contact form component
│   ├── FilterSection.tsx       # Property filtering component
│   ├── PropertyCard.tsx        # Property card component
│   ├── PropertyList.tsx        # Property list component
│   └── SavedPropertiesModal.tsx # Saved properties modal
├── data/                       # Mock data
│   └── listings.json           # Property listings data
├── public/                     # Static assets
└── types/                      # TypeScript type definitions
    └── property.ts             # Property type definitions
```

## Implementation Details

### Architecture

The application follows a modern React architecture with Next.js App Router for routing and API routes for data handling. It employs a client-side component model with state management through React hooks.

### Component Design

1. **PropertyList**: Main container for displaying property cards in a responsive grid
2. **PropertyCard**: Displays individual property information in a card format
3. **FilterSection**: Handles property filtering through various criteria
4. **SavedPropertiesModal**: Modal for displaying and managing saved properties
5. **ContactForm**: Form with validation for property inquiries

### Data Flow

The application manages three main types of data:
- **Property data**: Fetched from API routes that read from a JSON file
- **Filter state**: Managed in the home page component and passed to child components
- **Saved properties**: Stored in localStorage and managed through state

### API Design

The application uses Next.js API routes to create RESTful endpoints.

- `GET /api/properties`: Returns all property listings
- `GET /api/properties/[id]`: Returns a specific property by ID

To test these endpoints during development:
- All properties: http://localhost:3000/api/properties
- Single property: http://localhost:3000/api/properties/2534

## API Simulation

The application uses a JSON file to simulate a backend API. 
The data structure in `data/listings.json` follows this format:

```json
[
  {
    "Id": 2534,
    "DateListed": "2023-03-03 17:41:13",
    "Title": "Lovely House with Mountain View",
    "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum convallis vehicula. Morbi ac gravida mi. Nullam aliquam ut lorem ut fringilla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur consequat magna risus, at tempus magna semper eget. Sed eget finibus nisl, ut pellentesque mi. Pellentesque vulputate ultricies posuere. Vestibulum sagittis at eros non accumsan. Proin nec sollicitudin ante, tempus dignissim velit. Quisque bibendum pharetra purus, in cursus tortor condimentum et. Etiam vel dictum lacus. Nulla non ligula at tortor cursus sollicitudin blandit ut sem.",
    "Sale Price": 349000,
    "ThumbnailURL": "https://dummyimage.com/150x150/AAF4EE/000000",
    "PictureURL": "https://dummyimage.com/350x350/AAF4EE/000000",
    "Location": "Paris",
    "Sqft": 4638,
    "Bedrooms": 4,
    "Bathrooms": 3,
    "Parking": 4,
    "YearBuilt": 2006
  },
]
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clendson-goncalves/real-state-assesstment.git
cd real-state-assesstment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```
