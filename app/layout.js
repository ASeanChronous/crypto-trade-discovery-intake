import './globals.css'  // ← This line is CRITICAL

export const metadata = {
  title: 'Crypto Trade Discovery Intake',
  description: 'Professional bulk cryptocurrency trading platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
