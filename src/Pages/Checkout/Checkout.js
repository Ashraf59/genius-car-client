import React, { useContext } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Checkout = () => {
    const {_id, title, price} = useLoaderData();
    const {user} = useContext(AuthContext)
    console.log(user)
    console.log(title);
    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message

        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('Your order is placed successfully')
                form.reset();
            }
        })
        .catch(error => console.error(error) )
    }
    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
            <h2 className='text-4xl'>You are about to order: {title}</h2>
            <h4 className='text-3xl'>Price: {price}</h4>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-12'>
            <input name="firstName"type="text" placeholder="First Name" className="input input-ghost w-full input-bordered" required/>
            <input name="lastName"type="text" placeholder="Last Name" className="input input-ghost w-full input-bordered" required/>
            <input name="phone"type="text" placeholder="Phone Number" className="input input-ghost w-full input-bordered" />
            <input name="email"type="text" placeholder="Type here" defaultValue={user?.email} className="input input-ghost w- input-bordered" />
            </div>
            <textarea name="message" className="textarea textarea-bordered mb-6" placeholder="Message"></textarea>
            <br />
            <input className='btn mb-5' type="submit" value="place your order" required/>
        </form>

        </div>
            );
};

export default Checkout;