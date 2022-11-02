import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Signup = () => {

        
        const {createUser} = useContext(AuthContext);

    const handleSignup = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error => console.error(error));
      }
    return (
        <div className="hero w-full my-20">
  <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
    <div className="text-center lg:text-left">
        <img className='w-3/4' src={img} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-12 px-6">
    <h1 className="text-5xl font-bold text-center">Sign Up</h1>

      <form onSubmit={handleSignup} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name="email" placeholder="email" className="input input-bordered" required/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" name="password" placeholder="password" className="input input-bordered" required/>
          
        </div>
        <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Sign Up" />
          
        </div>
      </form>
      <p className='text-center'>Haven't you account? Please <Link className='font-semibold text-orange-600' to = '/login'>Login</Link></p>
    </div>
  </div>
</div>
    );
};

export default Signup;