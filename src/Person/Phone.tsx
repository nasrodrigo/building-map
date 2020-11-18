import React, { useRef } from "react";

export interface Phone {
    phoneNumber?: string;
    phoneType?: string;
}

const PhoneForm = (props: any) => {

    let phone: Phone = {
        phoneNumber: undefined,
        phoneType: undefined,
    }

    return <div>
                <label htmlFor="phone-type">Phone Type</label>
                <select value={props.value} name="contact.phone.phoneType">
                    <option value="phone">Phone</option>
                    <option value="cellphone">Cell Phone</option>
                </select>
                <label htmlFor="phone">Phone </label>
                <input type="phone" value={props.value} name="contact.phone.phoneNumber" id="phone" placeholder="Phone" title="Field phone"/>
            </div>
}

export default PhoneForm; 