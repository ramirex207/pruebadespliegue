import './globals.css'
import Nav from '@components/Nav'
export const metadata = {
  title: 'OpenAI',
  description: 'app probando OpenAI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-zinc-950'>
        <Nav />
        {children}
      </body>
    </html>
  )
}
