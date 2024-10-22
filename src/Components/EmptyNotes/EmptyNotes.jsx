import React from 'react'
import noteEmpty from "../../assets/images/no-notes.svg";


export default function EmptyNotes() {
    return <>
    <div className='d-flex justify-content-center align-items-center flex-column '>
        <h2>Your Notes is Empty...</h2>
        <figure className='w-25'>
            <img src={noteEmpty} className='w-100' alt="noteEmpty" />
        </figure>
    </div>
    </>
}
