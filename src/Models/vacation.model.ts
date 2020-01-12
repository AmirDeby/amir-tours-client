export interface IVacation {
    id: number,
    description: string,
    destination: string,
    image: string,
    startDate:Date,
    endDate: Date,
    price: number,
    isFollowed: boolean
}