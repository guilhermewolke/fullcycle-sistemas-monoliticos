import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _zipcode: string;
    private _city: string;
    private _state: string;

    constructor(street: string, number: string, complement: string, zipcode: string, city:string, state:string) {
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._zipcode = zipcode;
        this._city = city;
        this._state = state;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get zipcode(): string {
        return this._zipcode;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }
}