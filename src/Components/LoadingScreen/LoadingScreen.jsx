import React from 'react'
import noteImg from "../../assets/images/notesBlack.png"
import { BallTriangle, Watch } from 'react-loader-spinner'

export default function LoadingScreen() {
    return <>
        <div className='LoadingScreen d-flex flex-column justify-content-center align-items-center vh-100 w-100 bg-white bg-opacity-50'>
        <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#482d7a"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
            <figure className='w-100 text-center'>
                <img src={noteImg} className='pt-4' alt="noteImg" />
            </figure>
        </div>
    </>
}
