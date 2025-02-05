import { Card } from './components/Card/Card'

export default function Home() {
	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-xl'>Witaj na stronie!</h1>
			<Card hasIcon={true}>Zawartość tymczasowo niedostępna</Card>
		</div>
	)
}
