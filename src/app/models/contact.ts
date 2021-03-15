import { Address } from "./address";

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    address: Address;
    aliases: string[];
}