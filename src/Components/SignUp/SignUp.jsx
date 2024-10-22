import React, { useEffect, useState } from 'react'

import SignupImg  from "../../assets/images/Sign-up.png";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Vortex } from 'react-loader-spinner';
import * as yup from 'yup'
import {Helmet} from "react-helmet";




export default function SignUp() {
    //! Close & Open Button
    useEffect(function(){
        const passInputs = document.querySelector(`input[type='password']`);
        const passIcon = document.querySelector(".passIcon");
        const passBtn = document.querySelector(".passBtn");

        passBtn.addEventListener("click",function(){
        if( passInputs.type === "password") {
            passInputs.type = "text";
            passIcon.classList.remove("fa-eye-slash");
            passIcon.classList.add("fa-eye");
        }
        else {
            passInputs.type = "password";
            passIcon.classList.add("fa-eye-slash");
            passIcon.classList.remove("fa-eye");
        }
        });
    },[]);

    //! Send Data to Backend
    const [IsSucsess, setIsSucsess] = useState(false);
    const [errMessage, setErrMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const userData = {
        name: "",
        email: "",
        password: "",
        age: "",
        phone: ""
    }

    //! Validation Inputs By Yup
    const validationSchema = yup.object({
        name:yup.string().required("This Name Is Required").min(3,"minlenght is 3").max(10,"maxlenght is 10"),
        email:yup.string().email("Please Enter an Email Must Be In Format").required("This Email Is Required"),
        password:yup.string().required("This Password Is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Password Minimum Eight Characters, at least One Letter and One Number"),
        phone:yup.string().required("This Phone Is Required").matches(/^01[0125][0-9]{8}$/,"Please Enter a Phone Must Be an Egyption Number"),
        age:yup.number().required("This Age Is Required").min(18,"Age Must be at Least 18").max(99,"Age Must be at Most 99")
    });

    async function signUp(values){
        setIsLoading(true);
        try {
            const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,values);
            // console.log(data);
            setIsLoading(false);
            setIsSucsess(true);
                setTimeout(()=> {
                    setIsSucsess(false);
                    navigate("/Login");
                },1500);
        }
        catch(error){
            // console.log("eroooorrr",error.response.data);
            setIsLoading(false);
            setIsSucsess(false);
            setErrMessage(error.response.data.msg);
                setTimeout(()=> {
                    setErrMessage(false);
                },1500);
        }
    }

    const formik = useFormik({
        initialValues: userData,
        onSubmit: signUp,
        validationSchema
    });

    return <>
        <Helmet>
            <title>Sign up</title>
        </Helmet>
        <section>
            <div className="container p-5 px-4">
                <div className="row align-items-center py-5">
                    <div className="col-md-5">
                        <figure>
                            <img src={SignupImg} className='w-100' alt="Signup-Img" />
                        </figure>
                    </div>
                    <div className="col-md-7 shadow p-5 rounded border bg-body-tertiary">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='pb-4'>
                                <h2>Create an Account..</h2>
                                <h5>Let's Get Started For Free.</h5>
                            </div>

                            <div className="form-floating mb-3">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' type="text" className="form-control" id="name" placeholder='' />
                                <label htmlFor="name" className="d-flex align-items-center fw-bold text-black-50">Name</label>
                            </div>
                                { formik.errors.name && formik.touched.name ?
                                    <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.name}
                                </div> : "" }

                            <div className="form-floating mb-3">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' type="email" className="form-control" id="email" placeholder='' />
                                <label htmlFor="email" className="d-flex align-items-center fw-bold text-black-50">Email</label>
                            </div>
                                { formik.errors.email && formik.touched.email ?
                                    <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.email}
                                </div> : "" }

                            <div className="form-floating mb-3 position-relative">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' type="password" className="form-control" id="password" placeholder='' />
                                <label htmlFor="password" className="d-flex align-items-center fw-bold text-black-50">Password</label>
                                <span className='passBtn position-absolute cursor-pointer'>
                                    <i className="fa-solid fa-eye-slash passIcon"></i>
                                </span>
                            </div>
                                { formik.errors.password && formik.touched.password ?
                                    <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.password}
                                </div> : "" }

                            <div className="form-floating mb-3">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' type="tel" className="form-control" id="phone" placeholder='' />
                                <label htmlFor="phone" className="d-flex align-items-center fw-bold text-black-50">Phone</label>
                            </div>
                                { formik.errors.phone && formik.touched.phone ?
                                    <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.phone}
                                </div> : "" }

                            <div className="form-floating mb-3">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.age} name='age' type="number" className="form-control" id="age" placeholder='' />
                                <label htmlFor="age" className="d-flex align-items-center fw-bold text-black-50">Age</label>
                            </div>
                                { formik.errors.age && formik.touched.age ?
                                    <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.age}
                                </div> : "" }

                            <button type='submit' className='btn btn-hover text-white mb-2'>
                                Register
                                { isLoading ? <Vortex
                                    visible={true}
                                    height="30"
                                    width="30"
                                    ariaLabel="vortex-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="vortex-wrapper"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff', '#fff']}
                                    /> : ""}
                            </button>
                            <p>Already have an account? <Link to="/Login" className='text-decoration-none text-main fw-bold'>Sign in</Link> </p>

                            { IsSucsess ? <div className="alert alert-success text-center">Congratulations Your Account has Been Created</div> : ""}
                            { errMessage ? <div className="alert alert-danger text-center">{errMessage}</div> : ""}

                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}
