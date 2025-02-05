'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navigation = () => {
	const pathName = usePathname()
	const pathClass = 'text-sky-600 hover:text-sky-800'
	const activePathClass = 'hover:text-sky-500'
	return (
		<ul className='flex gap-4 align-center px-8 py-4'>
			<li>
				<Link href={'/'} className={`${pathName === '/' ? pathClass : activePathClass} transition-colors duration-200`}>
					Strona główna
				</Link>
			</li>
			<li>
				<Link
					href={'/offers'}
					className={`${pathName === '/offers' ? pathClass : activePathClass} transition-colors duration-200`}>
					Oferty
				</Link>
			</li>
		</ul>
	)
}
