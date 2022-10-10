## Prerequisites
- Node v14+
- Main package manager: yarn

## Scripts
- Start: Yarn start
- Test: Yarn test
- Incase of cache/babel transpile error ETC clear cache with command "npx expo start -c"

## Features
- View List of the next 5 Live UK Bank Holidays within 6 months
- Ability to edit the holiday's details 
- All edited dates are saved to the device storage and can be viewed in the 'Saved Holidays' view
- Freely Toggle between live holidays page and saved holidays page
- Delete saved dates (Swipe to delete and delete button)
- Loading state detector
- Global State Manager
- Themes and Components from React Native Paper

## known issues
Native OS components (datePicker etc) not working on web browser (need to handle an implementation for this) 