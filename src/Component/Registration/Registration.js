import React from 'react';
import { registerForm } from '../../api/auth';
import Layout from '../Layout/Layout';
import './Registration.css'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

const Registration = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    registerForm({ email, password }).then((data) => {
      console.log('data', data);
      if (data.error) {
        console.log(data.erro);
        console.log('fail');
      } else {
        console.log('success');
      }
    })
  }
  return (
    <>
      <Layout
        title="E-commerce"
      >
        <section className='registrationForm'>
          <div className="wrapper">
            <div id="formContent">
              <h2 className="active">Create your account</h2>
              <div className="fadeIn first">
                <img src="https://www.bootdey.com/img/Content/avatar/avatar7.png" id="icon" alt="User Icon" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="fadeIn second" placeholder="login" {...register("email", { required: true })} />
                <input type="password" className="fadeIn third" placeholder="password" {...register("password", { required: true })} />
             {/*    <input type="submit" className="fadeIn fourth" value="Log In" /> */}
                <input type="submit" className="fadeIn fourth" value="Registration" />
              </form>
              <div className='loginLink'>
              <p>Already have a account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </div>
        </section>
      </Layout>

    </>
  )
}

export default Registration