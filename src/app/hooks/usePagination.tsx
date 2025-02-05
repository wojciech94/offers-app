'use client'

import { useState } from 'react'

type Props<T> = {
	data: T[]
	itemsPerPage: number
}

export function usePagination<T>({ data, itemsPerPage }: Props<T>) {
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = Math.ceil(data.length / itemsPerPage)

	const start = (currentPage - 1) * itemsPerPage
	const end = start + itemsPerPage
	const currentData = data.slice(start, end)

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) setCurrentPage(page)
	}

	const nextPage = () => goToPage(currentPage + 1)
	const prevPage = () => goToPage(currentPage - 1)

	return { currentPage, totalPages, currentData, goToPage, nextPage, prevPage }
}
