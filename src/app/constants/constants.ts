export type StatusType = 'PAID' | 'NOT_PAID' | 'ADVANCE_PAID' | 'ADVANCE_NOT_PAID'

export const status2label = (status: 'PAID' | 'NOT_PAID' | 'ADVANCE_PAID' | 'ADVANCE_NOT_PAID'): string => {
	switch (status) {
		case 'NOT_PAID':
			return 'Nieopłacone'
		case 'ADVANCE_PAID':
			return 'Zaliczka opłacona'
		case 'PAID':
			return 'Opłacone'
		case 'ADVANCE_NOT_PAID':
			return 'Zaliczka nieopłacona'
		default:
			return 'Nieznany status'
	}
}

export const status2bg = (status: StatusType): string => {
	switch (status) {
		case 'PAID':
			return 'bg-green-500'
		case 'NOT_PAID':
			return 'bg-red-500'
		case 'ADVANCE_PAID':
			return 'bg-yellow-500'
		case 'ADVANCE_NOT_PAID':
			return 'bg-orange-500'
		default:
			return 'bg-gray-500'
	}
}
