import Link from 'next/link'

export const Navigation = () => {
	return (
		<ul className='flex gap-4 align-center px-8 py-4'>
			<li>
				<Link href={'/home'}>Home</Link>
			</li>
			<li>
				<Link href={'/offers'}>Offers</Link>
			</li>
		</ul>
	)
}
