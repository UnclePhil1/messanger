import './globals.css'


export const metadata = {
  title: 'Messanger',
  description: 'GChatting Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>{children}</body>
    </html>
  )
}
