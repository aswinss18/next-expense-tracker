import ThemeRegistry from '@/components/ThemeRegistry';
import './globals.css';

export const metadata = {
  title: 'Personal Expense Tracker',
  description: 'Track and manage your personal expenses',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
