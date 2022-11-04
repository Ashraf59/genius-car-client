import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    // console.log(Object.entries(orders));

    useEffect(()=> {

        fetch(`http://localhost:5000/orders?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setOrders(data))
        // .catch(error => console.error(error))

    },[user?.email])

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
        
        ></OrderRow>)
      }
      
    </tbody>
        
  </table>
</div>
        </div>
    );
};

export default Orders;