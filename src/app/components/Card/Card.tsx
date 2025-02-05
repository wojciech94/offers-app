import { ReactNode } from 'react'

type Props = {
	children?: ReactNode
	className?: string | null
}

export const Card: React.FC<Props> = ({ children, className }) => {
	return (
		<div
			className={`p-2 bg-slate-200 border-slate-800 border- rounded-lg dark:bg-slate-700 dark:text-slate-100 dark:border-slate-200 overflow-hidden flex shadow-[0_0_8px_rgba(0,0,0,0.5)] shadow-slate-900 dark:shadow-slate-200 ${
				className ? className : ''
			}`}>
			{children}
		</div>
	)
}
