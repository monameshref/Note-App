import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import NavbarComp from '../Navbar/Navbar'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from "yup";
import Note from '../Note/Note';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import EmptyNotes from '../EmptyNotes/EmptyNotes';
import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";

export default function Home() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [allNotes, setAllNotes] = useState(null);

    const [searchNotes, setSearchNotes] = useState([]);

    const userNotes = {
        title: "",
        content: ""
    }

    async function addNote(values) {
        // console.log(values);
        try {
            const {data} = await axios.post("https://note-sigma-black.vercel.app/api/v1/notes",values,{
                headers:{
                    token: `3b8ny__${localStorage.getItem("token-ToDo-List")}`
                }
            });
            console.log("addNote", data);
            if (data.msg == "done") {
                values.title = "";
                values.content = "";
                getUserNotes();
            }
        }
        catch(error){
            console.log("error addNote",error);
        }
        finally {
            handleClose();
        }
    }

    async function getUserNotes() {
        try {
            const {data} = await axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
                headers:{
                    token: `3b8ny__${localStorage.getItem("token-ToDo-List")}`
                }
            })
            setAllNotes(data.notes);
            return data;
        }
        catch(error){
            // console.log("error getUserNotes",error);
            if(error.response.data.msg == "not notes found") {
                setAllNotes(null);
            }
        }
    }

    const { isLoading } = useQuery("getUserNotes",getUserNotes);

    const validationSchema = yup.object({
        title:yup.string().required("This Title Is Required").min(5,"minlenght is 5").max(15,"maxlenght is 15 Character"),
        content:yup.string().required("This Content Is Required").min(5,"minlenght is 5").max(200,"maxlenght is 200 Character"),
    });

    const formik = useFormik({
        initialValues:userNotes,
        onSubmit: addNote,
        validationSchema
    });

    useEffect(()=>{
        getUserNotes();
    },[]);


    function search(event) {
        const term = event.target.value;
        const newSearchNotes = allNotes.filter((note)=>{return note.title.toLowerCase().trim().includes(term.toLowerCase().trim())});
        setSearchNotes(newSearchNotes);
    }

    if (isLoading) {
        return <LoadingScreen />
    }


    return <>

    <Helmet>
        <title>Your Notes</title>
    </Helmet>

        <NavbarComp />

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='d-flex justify-content-center w-100'>Add Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} type="text" className='form-control mb-3' name="title" id="title" placeholder='Title...' />
                        { formik.errors.title && formik.touched.title ?
                            <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                            {formik.errors.title}
                        </div> : "" }
                    <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content} className='form-control' name="content" id="content" placeholder='Note...' cols="30" rows="5" ></textarea>
                        { formik.errors.content && formik.touched.content ?
                            <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                            {formik.errors.content}
                        </div> : "" }
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button className='bg-main border-0 btn-hover' variant="primary" onClick={formik.handleSubmit}>
                    Add Note
                </Button>
            </Modal.Footer>
        </Modal>

        <section>
            <div variant="primary" onClick={handleShow} className='addNote bg-main rounded-circle text-white cursor-pointer fs-5 d-flex justify-content-center align-items-center' title='Add Note'>
                <i className="fa-solid fa-pencil"></i>
            </div>
            <div className="container py-5">
                <div className="input-group my-5 w-50 m-auto">
                    <span className="input-group-text bg-second" id="basic-addon1">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input disabled={!allNotes} onChange={search} type="search" className="form-control" placeholder="Search For Note..." aria-label="search" aria-describedby="basic-addon1"/>
                </div>

                <div className="row g-4">

                { searchNotes.length ? searchNotes.map(( note )=> { return <Note key={note._id} note={note} />})
                : <EmptyNotes />
                ? allNotes ? allNotes?.map((note)=>{ return <Note key={note._id} note={note} getUserNotes={getUserNotes()}/> })
                : <EmptyNotes />
                : allNotes?.map((note)=>{ return <Note key={note._id} note={note} getUserNotes={getUserNotes()}/> })}

                </div>
            </div>
        </section>
        <Footer />
    </>
}
