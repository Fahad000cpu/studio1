# **App Name**: LinkShare Lite

## Core Features:

- Product Feed: Display a responsive product feed on the homepage with product cards including image, name, description, price, and like/bookmark icons.
- Product Search: Include a search bar to filter displayed products.
- User Profile: User profile page accessible at /profile/[userId] displaying a large avatar, user's name, bio, email link, and social media links. Include tabs for 'Saved Products' and 'Shared Products'.
- Authentication: Implement user sign-up and sign-in with email and password using Firebase Auth; manage user state using AuthContext.
- AI product suggestion: As a tool to assist users, an AI that suggests products relevant to current user by evaluating user bio and comparing to all other product description on the platform.
- Responsive Navigation: Display a sticky header with navigation, logo, and user profile dropdown/sign-in; include a bottom navigation bar on mobile for quick access to core sections.

## Style Guidelines:

- Primary color: Vibrant purple (#9400D3) to align with user request
- Background color: Soft pastel purple (#E6E0EB), a lighter and desaturated version of the primary hue.
- Accent color: Muted teal (#70A1AF), an analogous color, shifted towards blue, creating a subtle yet contrasting highlight.
- Font: 'PT Sans' (sans-serif) for all body and headline text, as specified by the user.
- Use modern and consistent icons from ShadCN UI to represent actions and navigation items.
- Utilize ShadCN UI components for all UI elements like Cards, Buttons, Dialogs, Forms, and Avatars, ensuring a clean and consistent design.
- Ensure a fully responsive UI for desktop and mobile devices.