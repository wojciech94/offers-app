import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Navigation } from './components/Navigation/Navigation'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

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
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Navigation></Navigation>
				<div className='content px-8 py-4'>{children}</div>
			</body>
		</html>
	)
}
