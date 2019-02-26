import { IState } from "./istate";
import { IOrder } from "./iorder";

export interface Icustomer {

    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    city: string;
    state: IState;
    orders?: IOrder[];
    orderTotal?: number;
    latitude?: number;
    longitude?: number;
}
