import './styles/globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Test App',
  description: 'App for testing purposes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
