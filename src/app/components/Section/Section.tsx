'use client'

import { ReactNode, useState } from 'react'
import { ArrowUp } from 'react-feather'

type Props = {
	children: ReactNode
	className?: string
	title: string
	toolbar?: ReactNode
	expanded?: Boolean
}

export const Section = ({ children, className, title, toolbar, expanded = false }: Props) => {
	const [isExpanded, setIsExpanded] = useState(expanded)

	return (
		<div className={`w-full overflow-hidden ${className ? className : ''}`}>
			<div
				onClick={() => setIsExpanded(prev => !prev)}
				className={`bg-slate-800 text-slate-200 px-4 py-2 border-t border-b border-slate-400 font-medium flex justify-between cursor-pointer`}>
				<div className='flex gap-2 items-center'>
					{title}
					<ArrowUp size={16} className={`${isExpanded ? 'rotate-180' : ''} transition-transform`} />
				</div>
				{toolbar && <div>{toolbar}</div>}
			</div>
			<div className={`transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-0 -mt-[1px]'}`}>
				{children}
			</div>
		</div>
	)
}
