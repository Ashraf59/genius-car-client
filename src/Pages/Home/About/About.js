import React from 'react';
import person from '../../../assets/images/about_us/person.jpg'
import parts from '../../../assets/images/about_us/parts.jpg'

const About = () => {
    return (
        <div className="hero my-5">
  <div className="hero-content flex-col lg:flex-row">
    <div className='relative w-1/2'>
    <img src={person} className="w-4/5 h-full max-w-sm rounded-lg shadow-2xl" />
    <img src={parts} className="absolute w-3/5 right-5 top-1/2 rounded-lg shadow-2xl border-8" />
    </div>
    <div className='w-1/2'>
        <p className='text-3xl font-bold text-orange-500'>About Us</p>
      <h1 className="text-5xl font-bold my-5">
      We are qualified <br/>& of experience <br/>in this field
      </h1>
      <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
      <p className="py-6">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
      <button className="btn bg-orange-500 border-0">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default About;