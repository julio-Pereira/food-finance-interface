// src/app/layout.js
import './globals.css'; // Import any global styles
import { TableDataProvider } from './context/TableDataContext';

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TableDataProvider>
          {children}
        </TableDataProvider>
      </body>
    </html>
  );
}


