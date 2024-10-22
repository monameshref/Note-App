import React from 'react'
import notesImg from "../../assets/images/notesBlack.png";

export default function Footer() {
    return <>
        <footer className='shadow'>
            <div className="container text-center">
                <div className="row">
                    <figure>
                        <img src={notesImg} alt="notes" />
                    </figure>
                    <div>
                        <p>© All rights reserved</p>
                        <p>Designed and developed by: Mona Meshref</p>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
