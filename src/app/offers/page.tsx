'use client'

import React, { useState, useEffect } from 'react'

type Offer = {
	currency: string
}

const fetchOffers = async (): Promise<Offer[]> => {
	const res = await fetch('/response_products.json')
	const data = await res.json()
	return data.data
}

const Offers = () => {
	const [offers, setOffers] = useState<Offer[] | null>(null)

	useEffect(() => {
		const getOffers = async () => {
			const data = await fetchOffers()
			setOffers(data)
		}

		getOffers()
	}, [])

	return (
		<div>
			<div>Offers</div>
			{offers ? (
				offers.length > 0 ? (
					<div>
						{offers.map((offer, index) => (
							<div key={index}>{offer.currency}</div>
						))}
					</div>
				) : (
					<p>No offers available</p>
				)
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default Offers
