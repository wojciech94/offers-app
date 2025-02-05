import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Navigation } from './components/Navigation/Navigation'
import './globals.css'

const poppins = Poppins({ variable: '--font-poppins', weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Offers App',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.variable} antialiased`}>
				<Navigation></Navigation>
				<main className='content px-8 py-4 max-w-[1200px] mx-auto'>{children}</main>
			</body>
		</html>
	)
}
