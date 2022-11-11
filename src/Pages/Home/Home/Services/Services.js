import React, { useEffect, useRef, useState } from 'react';
import ServiceCart from './ServiceCart';

const Services = () => {
    const [services, setServices] = useState([])
    const [isAsc, setIsAsc] = useState(true)
    const [search, setSearch] = useState('')
    const searchRef = useRef();
    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'dsc'}`)
        .then(res => res.json())
        .then(data => setServices(data))
    }, [isAsc, search])

    const handleSearch = () => {
        setSearch(searchRef.current.value)

    }
    return (
        <div>
            <div>
                <p className='text-3xl font-bold text-orange-600'>Services</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input className='input input-sm' ref={searchRef} type="text" />
                <button onClick={handleSearch}>Search</button>
                <button onClick={() => setIsAsc(!isAsc)} className="btn btn-info">{isAsc ? 'dsc' : 'asc'}</button>
            </div>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServiceCart
                    
                        key = {service._id}
                        service = {service}
                    
                    ></ServiceCart>)
                }
            </div>
        </div>
    );
};

export default Services;