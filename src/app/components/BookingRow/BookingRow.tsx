type Props = {
	label?: string
	value?: string
	className?: string
	valueClassName?: string
}

export const BookingRow = ({ label, value, className, valueClassName }: Props) => {
	return (
		<div className={`flex gap-3 items-center ${className ? className : ''}`}>
			{label && <div>{label}</div>}
			{value && <div className={`font-semibold ${valueClassName ? valueClassName : ''}`}>{value}</div>}
		</div>
	)
}
