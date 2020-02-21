export interface House {
    coords: {
        lat: number,
        lon: number
    };
    params?: {
        rooms?: number,
        value?: number
    };
    street: string;
    distance?: {
        text?: string,
        value?: number
    };
}
