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
    phone?: Phone;
    email?: string;
}

export interface Phone {
    phoneNumber?: string;
    phoneType?: string;
}

export interface Login {
    login?: string;
    password?: string;
    isAdmin?: boolean;
}

export interface Coordinate {
    x: number;
    y: number;
    scale: number;
    imgBase64: string;

}

// ==== Person Mockups ====
export let phone: Phone = {
    phoneNumber: '',
    phoneType: 'phone',
};

export let contact: Contact = {
    phone: phone,
    email: '',
};

export let possition: Coordinate = {
    x: 0,
    y: 0,
    scale: 0,
    imgBase64: '',
};

export let person: Person = {
    firstName: '',
    lastName: '',
    contact: contact,
    possition: possition,
};