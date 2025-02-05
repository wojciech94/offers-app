import { ChevronLeft, ChevronRight } from 'react-feather'

type Props = {
	currentPage: number
	totalPages: number
	itemsPerPage: number
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>
	nextPage: () => void
	prevPage: () => void
	goToPage: (val: number) => void
}

const options = [4, 8, 12, 16, 24, 36, 48]

export const Pagination: React.FC<Props> = ({
	currentPage,
	totalPages,
	itemsPerPage,
	setItemsPerPage,
	nextPage,
	prevPage,
	goToPage,
}) => {
	const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1)
	return (
		<div className='flex justify-between items-center gap-4'>
			<div>{`Page ${currentPage} z ${totalPages}`}</div>
			<div className='flex items-center gap-3'>
				<button
					className='flex items-center justify-center w-8 h-8 bg-slate-400 hover:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors duration-200 rounded-lg'
					onClick={prevPage}>
					<ChevronLeft size={16} />
				</button>
				{pagesArray &&
					pagesArray.length > 0 &&
					pagesArray.map((p, id) => (
						<button
							key={id}
							disabled={currentPage === p}
							className=' disabled:!bg-indigo-500 flex items-center justify-center w-8 h-8 bg-slate-400 hover:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors duration-200 rounded-lg disabled:cursor-not-allowed'
							onClick={() => goToPage(p)}>
							{p}
						</button>
					))}
				<button
					className='flex items-center justify-center w-8 h-8 bg-slate-400 hover:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors duration-200 rounded-lg'
					onClick={nextPage}>
					<ChevronRight size={16} />
				</button>
			</div>
			<div>
				<select
					className='dark:text-slate-900'
					value={itemsPerPage}
					name='paginationSelect'
					onChange={e => setItemsPerPage(Number.parseInt(e.target.value))}
					id='paginationSelect'>
					{options.map((option, id) => (
						<option key={id} className='dark:text-slate-900' value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
