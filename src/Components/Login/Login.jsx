import React, { useEffect, useState } from 'react'
import loginImg  from "../../assets/images/login.png";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { Vortex } from 'react-loader-spinner';
import axios from 'axios';
import { useFormik } from 'formik';
import {Helmet} from "react-helmet";

export default function Login() {
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

    const navigate = useNavigate();

    const [IsSucsess, setIsSucsess] = useState(false);
    const [errMessage, setErrMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const userData = {
        email: "",
        password: "",
    }

    const validationSchema = yup.object({
        email:yup.string().email("Please Enter an Email Must Be In Format").required("This Email Is Required"),
        password:yup.string().required("This Password Is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Password Minimum Eight Characters, at least One Letter and One Number"),
    });

    async function signUp(values){
        setIsLoading(true);
        try {
            const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values);
            // console.log(data);
            setIsLoading(false);
            setIsSucsess(true);
                setTimeout(()=> {
                    setIsSucsess(false);
                    navigate("/Home");
                },1500);
            localStorage.setItem("token-ToDo-List",data.token);
        }
        catch(error){
            // console.log("eroooorrr",error.response.data.msg);
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
            <title>Sign in</title>
        </Helmet>
        <section>
            <div className="container p-5">
                <div className="row align-items-center py-5">
                    <div className="col-md-5">
                        <figure>
                            <img src={loginImg} className='w-75' alt="Signup-Img" />
                        </figure>
                    </div>
                    <div className="col-md-7 shadow p-5 rounded border bg-body-tertiary">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='pb-4'>
                                <h2>Welcome Back
                                    <i className="fa-solid fa-heart ps-2" />
                                </h2>
                                <h6>Thanks For retuning! please signin accsess your account.</h6>
                            </div> 
                            <div className="form-floating mb-3">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' type="email" className="form-control" id="floatingInput" placeholder='' />
                                <label htmlFor="floatingInput" className="d-flex align-items-center fw-bold text-black-50">Email</label>
                            </div>
                                { formik.errors.email && formik.touched.email ?
                                    <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.email}
                                </div> : "" }
                            <div className="form-floating mb-3">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' type="password" className="form-control" id="floatingInput" placeholder='' />
                                <label htmlFor="floatingInput" className="d-flex align-items-center fw-bold text-black-50">Password</label>
                                <span className='passBtn position-absolute cursor-pointer'>
                                    <i className="fa-solid fa-eye-slash passIcon"></i>
                                </span>
                            </div>
                                { formik.errors.password && formik.touched.password ?
                                    <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.password}
                                </div> : "" }
                            <button type='submit' className='btn btn-hover text-white mb-2'>
                                Sign in
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
                            <p>Don’t have an account? <Link to="/SignUp" className='text-decoration-none text-main fw-bold'>Sign up</Link> </p>

                            { IsSucsess ? <div className="alert alert-success text-center">Sucsess...</div> : ""}
                            { errMessage ? <div className="alert alert-danger text-center">{errMessage}</div> : ""}

                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}
