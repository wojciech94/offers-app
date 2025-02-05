'use client'

import { useState, useEffect, useMemo } from 'react'
import { User, Calendar, MapPin } from 'react-feather'
import Image from 'next/image'
import { Card } from '@/app/components/Card/Card'
import { BookingRow } from '@/app/components/BookingRow/BookingRow'
import { status2bg, status2label, StatusType } from '@/app/constants/constants'
import { Section } from '@/app/components/Section/Section'

const fetchOffer = async (): Promise<Booking | null> => {
	const res = await fetch('/response_bookings.json')
	const { data }: { data: Booking[] } = await res.json()
	if (data && Array.isArray(data)) {
		return data[0]
	} else {
		return null
	}
}

type Parent = {
	id: string
	full_name: string
	city: string
	email: string
	phone: string
}

type Participants = {
	id: string
	city: string
	full_name: string
	pesel: string | null
	phone: string | null
}

type Company = {
	id: string
	name: string
}

type Location = {
	city: string
	province: string
	post_code: string
	house_number: string
	room_number: string
}

type ProductPhoto = {
	id: string
	url: string
}

type Product = {
	id: string
	name: string
	company: Company
	country_name: string
	description: string
	location: Location
	main_photo: ProductPhoto
	status: string
	transport_type: string
	type: string
}

type Trip = {
	advance: number
	advance_conditions: string
	company: Company
	full_price: number
	min_age: number
	max_age: number
	min_count: number
	max_count: number
	name: string
	status: string
	start_date: string
	end_date: string
}

type Booking = {
	id: string
	advance_payment_due_date: string
	advance_payment_price: number
	advance_payment_status: StatusType
	base_price_per_person: number
	company_name: string
	currency: string
	created_at: string
	start_date: string
	end_date: string
	total_price: number
	parent: Parent
	participants: Participants[]
	payment_status: StatusType
	payment_due_date: string
	product_data: Product
	status: StatusType
	status_label: string
	trip_data: Trip
	trip_name: string
	type_label: string
}

export default function page() {
	const [data, setData] = useState<Booking | null>(null)
	useEffect(() => {
		const getData = async () => {
			const res: Booking | null = await fetchOffer()
			if (res) setData(res)
		}
		getData()
	}, [])

	if (!data) return null
	console.log(data)

	return (
		<div className='flex-col flex gap-4'>
			<h2 className='text-xl'>Rezerwacje</h2>
			<Card className='flex-col !p-0'>
				<div className='flex flex-wrap justify-between'>
					<Section
						title='Zamówienie'
						expanded={true}
						toolbar={
							<div title={data.status_label} className={`rounded-full px-2 t text-slate-900 ${status2bg(data.status)}`}>
								{data.status_label}
							</div>
						}>
						<div className='flex justify-between gap-6 p-4'>
							<div className='flex-1'>
								<BookingRow className='justify-between' label='Nr zamówienia:' value={data.id}></BookingRow>
								<BookingRow className='justify-between' label='Rodzic:' value={data.parent.full_name}></BookingRow>
							</div>
							<div className='flex-1'>
								<BookingRow
									className='justify-between'
									label='Liczba uczestników:'
									value={(data.participants?.length).toString() || '-'}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Cena za osobę:'
									value={data.base_price_per_person.toString()}></BookingRow>
							</div>
						</div>
					</Section>
					<Section expanded={true} title='Product'>
						<div className='flex gap-2'>
							<div className='p-4 w-[50%]'>
								<BookingRow value={data.product_data.name} className='!font-semibold text-lg mb-2'></BookingRow>
								<BookingRow className='mb-1' value={data.product_data.description}></BookingRow>
								<BookingRow
									className='justify-between'
									valueClassName='text-violet-500'
									label='Typ:'
									value={data.product_data.type}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Termin:'
									value={`${data.start_date} - ${data.end_date}`}></BookingRow>
								<BookingRow className='justify-between' label='Firma:' value={data.company_name}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Lokalizacja:'
									value={`${data.product_data.country_name}, ${data.product_data.location.city} (${data.product_data.location.province})`}></BookingRow>
							</div>
							<div className='relative w-[50%] m-1 rounded-lg shadow-sm overflow-hidden'>
								<Image
									src={data.product_data.main_photo.url}
									alt='Zdjęcie produktu'
									layout='fill'
									objectFit='cover'></Image>
							</div>
						</div>
					</Section>
					<Section title='Podróż'>
						<div className='flex justify-between gap-6 p-4'>
							<div className='flex-1'>
								<BookingRow className='justify-between' label='Nazwa' value={data.trip_data.name}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Status'
									valueClassName='text-green-500'
									value={data.trip_data.status}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Wiek'
									value={`${data.trip_data.min_age} - ${data.trip_data.max_age}`}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Liczba uczestników'
									value={`${data.trip_data.min_count} - ${data.trip_data.max_count}`}></BookingRow>
							</div>
							<div className='flex-1'>
								<BookingRow
									className='justify-between'
									label='Zaliczka'
									value={`${data.trip_data.advance.toString()} ${data.currency}`}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Termin zaliczki'
									value={data.trip_data.advance_conditions}></BookingRow>
								<BookingRow
									className='justify-between'
									label='Termin podróży'
									value={`${data.trip_data.start_date} - ${data.trip_data.end_date}`}></BookingRow>
							</div>
						</div>
					</Section>
					<Section title='Płatność'>
						<div className='p-4 flex flex-col gap-2'>
							<BookingRow
								className='max-w-[50%] justify-between'
								label='Termin zapłaty zaliczki:'
								value={`${data.advance_payment_due_date}`}></BookingRow>
							<div className='flex gap-4 justify-between items-center'>
								<BookingRow
									className='flex-1 justify-between max-w-[50%]'
									label='Zaliczka:'
									value={`${data.advance_payment_price} ${data.currency}`}></BookingRow>
								<div className={`self-start me-auto rounded-full px-2 ${status2bg(data.advance_payment_status)}`}>
									{status2label(data.advance_payment_status)}
								</div>
							</div>
							<BookingRow
								className='max-w-[50%] justify-between'
								label='Termin zapłaty:'
								value={`${data.payment_due_date}`}></BookingRow>
							<div className=' flex gap-2 justify-between items-end'>
								<div className='font-semibold'>Całkowity koszt</div>
								<div className='text-2xl font-bold'>{`${data.total_price} ${data.currency}`}</div>
							</div>
						</div>
					</Section>
				</div>
			</Card>
		</div>
	)
}
