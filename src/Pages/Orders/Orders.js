import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user, logOut} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    // console.log(Object.entries(orders));

    useEffect(()=> {

        fetch(`https://genius-car-server-two-kappa.vercel.app/orders?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('genius-token')}`
          }
        })
        
        .then(res => {
          if(res.status === 401 || res.status === 403){
              logOut()
          }
          return res.json()
          
        })

        .then(data => setOrders(data))
        // .catch(error => console.error(error))

    },[user?.email, logOut])

    const handleDelete = id => {
      const proceed = window.confirm('Are you sure to cancel the order')
      if(proceed){
        fetch(`https://genius-car-server-two-kappa.vercel.app/orders/${id}`, {
          method: 'DELETE'

        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.deletedCount > 0){
            alert('deleted successfully');
            const remaining = orders.filter(odr => odr._id !== id);
            setOrders(remaining)
          }
        })
      }
    }

    const handleStatusUpdate = id => {
      fetch(`https://genius-car-server-two-kappa.vercel.app/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'approved'})
      })

      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.modifiedCount > 0){
          const remaining = orders.filter(ord => ord._id !== id);
          const approving = orders.find(ord => ord._id === id);
          approving.status = 'Approved'

          const newOrders = [approving, ...remaining];
          setOrders (newOrders)

          
        }
      })
    }

    return (
        <div>
            <h2 className="text-5xl">You have orders: {orders.length}</h2>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      {
        orders.map(order => <OrderRow
        key = {order._id}
        order = {order}
        handleDelete = {handleDelete}
        handleStatusUpdate = {handleStatusUpdate}
        
        ></OrderRow>)
      }
      
    </tbody>
        
  </table>
</div>
        </div>
    );
};

export default Orders;