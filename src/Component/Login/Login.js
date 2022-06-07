import React from 'react'
import Layout from '../Layout/Layout'
import { useForm } from "react-hook-form";
import { authenticate, loginForm } from '../../api/auth';
const Login = () => {
  
	const {
		register,
		handleSubmit,
		setValue,
	} = useForm();

	//form on submit
	let onSubmit = (data) => {
		const { email, password } = data;
		loginForm({ email, password }).then((data) => {
			if (data.error) {
				console.log('fail');
			} else {
				authenticate(data, () => {
console.log('succeess');
				});
			}
		});
	};

  return (
    <>
    <Layout
        title="E-commerce"
      >
      <section className='registrationForm'>
      <div className="wrapper">
      <div id="formContent">
        <h2 className="active"> Login </h2>
        <div className="fadeIn first">
          <img src="https://www.bootdey.com/img/Content/avatar/avatar7.png" id="icon" alt="User Icon" />
        </div>
  
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" {...register("email", { required: true })} />
          <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" {...register("password", { required: true })} />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
      </section>
      </Layout>
   
    </>
  )
}

export default Login