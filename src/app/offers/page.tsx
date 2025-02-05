'use client'

import { useState, useEffect, useMemo } from 'react'
import { Pagination } from '../components/Pagination/Pagination'
import { usePagination } from '../hooks/usePagination'
import { User, Calendar, MapPin } from 'react-feather'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '../components/Card/Card'

type Media = {
	url: string
}

type Offer = {
	id: string
	name: string
	status: string
	type: string
	currency: string
	country: string
	country_name: string
	description: string
	location: { city: string; province: string }
	min_age: string
	max_age: string
	min_trip_start_date: string
	max_trip_start_date: string
	min_trip_end_date: string
	max_trip_end_date: string
	min_price: string
	max_price: string
	media: Media[]
}

const fetchOffers = async (): Promise<Offer[]> => {
	const res = await fetch('/response_products.json')
	const data = await res.json()
	const offers: Offer[] = data.data || []
	return offers
}

const Offers = () => {
	const [offers, setOffers] = useState<Offer[]>([])
	const [itemsPerPage, setItemsPerPage] = useState(12)
	const { currentPage, totalPages, currentData, nextPage, prevPage, goToPage } = usePagination<Offer>({
		data: offers,
		itemsPerPage: itemsPerPage,
	})

	const defaultImageSrc = useMemo(() => {
		return 'https://picsum.photos/400/400'
	}, [])

	useEffect(() => {
		const getOffers = async () => {
			const data = await fetchOffers()
			setOffers(data)
		}

		getOffers()
	}, [])

	return (
		<div className='flex flex-col gap-4'>
			<div className='text-lg'>Oferty</div>
			{offers ? (
				offers.length > 0 ? (
					<>
						<div className='grid grid-cols-12 gap-4 mb-4'>
							{currentData.map(offer => (
								<div key={offer.id} className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3'>
									<Card className='h-full flex-col relative !p-0'>
										<div
											className='absolute top-0 right-0 mt-2 mr-2 bg-violet-300 p-2 rounded-full z-20'
											title={offer.status}></div>

										<div className='relative w-full h-40'>
											<Link
												className='text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200'
												href={'offers/bookings'}>
												<Image
													src={offer?.media?.length > 0 ? offer.media[0].url : defaultImageSrc}
													layout='fill'
													objectFit='cover'
													objectPosition='center'
													alt='Podgląd wycieczki'></Image>
											</Link>
										</div>
										<div className='p-2 w-full flex flex-col flex-1'>
											<Link className='font-medium hover:text-sky-500' href={'offers/bookings'}>
												{offer.name}
											</Link>
											<div>
												<Link
													className='text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200'
													href={'offers/bookings'}>
													{offer.type}
												</Link>
											</div>
											<div className='mb-4'>{offer.description}</div>
											<div className='mt-auto'>
												{(offer.min_trip_start_date || offer.max_trip_end_date) && (
													<div className='flex gap-2 items-center'>
														<Calendar size={16}></Calendar>
														<div className='text-sm'>{`${offer.min_trip_start_date || ''} - ${
															offer.max_trip_end_date || ''
														}`}</div>
													</div>
												)}
												<div className='w-full flex items-center gap-2 overflow-hidden whitespace-nowrap'>
													<MapPin size={16} className='flex-shrink-0' />
													<span
														className='truncate text-sm'
														title={`${offer.country_name}, ${offer.location.city}, ${offer.location.province}`}>{`${offer.country_name}, ${offer.location.city}, ${offer.location.province}`}</span>
												</div>
												<div className='flex gap-2 items-center'>
													<User size={16}></User>
													<div className='text-sm'>{`${offer.min_age} - ${offer.max_age}`}</div>
												</div>
												{(offer.min_price || offer.max_price) && (
													<div className='flex gap-2 items-center justify-end font-bold'>
														{`${offer.min_price} - ${offer.max_price}`} <div>{offer.currency}</div>
													</div>
												)}
											</div>
										</div>
									</Card>
								</div>
							))}
						</div>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							nextPage={nextPage}
							prevPage={prevPage}
							goToPage={goToPage}
							itemsPerPage={itemsPerPage}
							setItemsPerPage={setItemsPerPage}></Pagination>
					</>
				) : (
					<p>Brak dostępnych ofert</p>
				)
			) : (
				<p>Ładowanie ofert</p>
			)}
		</div>
	)
}

export default Offers
