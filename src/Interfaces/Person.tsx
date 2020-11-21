export default interface Person {
    id?: string;
    firstName?: string;
    lastName?: string;
    contact?: Contact;
    login?: Login;
    photo?: string;
    possition: Coordinate;
} 

export interface Contact {
    id?: string;
    phone?: Phone;
    email?: string;
}

export interface Phone {
    phoneNumber?: string;
    phoneType?: string;
}

export interface Login {
    id?: string;
    login?: string;
    password?: string;
    isAdmin?: boolean;
}

export interface Coordinate {
    id?: string;
    x: number;
    y: number;
}

// ==== Person Mockups ====
export let phone: Phone = {
    phoneNumber: '',
    phoneType: '',
};

export let contact: Contact = {
    phone: phone,
    email: '',
};

export let possition: Coordinate = {
    x: 0,
    y: 0,
};

export let person: Person = {
    firstName: '',
    lastName: '',
    contact: contact,
    possition: possition,
};