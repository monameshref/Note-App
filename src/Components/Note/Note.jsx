import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


export default function Note({note,getUserNotes}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLoddindUpd, setIsLoddindUpd] = useState(false);
    const [isLoddindDel, setIsLoddindDel] = useState(false);

    const userNotes = {
        title: "",
        content: ""
    }

    const validationSchema = yup.object({
        title:yup.string().min(5,"minlenght is 5").max(15,"maxlenght is 15 Character"),
        content:yup.string().min(5,"minlenght is 5").max(200,"maxlenght is 200 Character"),
    });

    async function updateNote(values) {
        setIsLoddindUpd(true);
        const id = note._id;
        try {
            const {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,values,{
                headers:{
                    token: `3b8ny__${localStorage.getItem("token-ToDo-List")}`
                }
            });
            if (data.msg == "done"){
                getUserNotes();
                setIsLoddindUpd(false);
            }
            console.log("updateNote", data);
        }
        catch(error){
            console.log("error updateNote",error);
        }
        finally {
            handleClose();
        }
        setIsLoddindUpd(false);
    }

    async function deleteNote() {
        setIsLoddindDel(true);
        const id = note._id;
        try {
            const {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{
                headers:{
                    token: `3b8ny__${localStorage.getItem("token-ToDo-List")}`
                }
            });
            if (data.msg == "done") {
                getUserNotes();
                setIsLoddindDel(false);
            }
            console.log("deleteNote", data);
        }
        catch(error){
            console.log("error deleteNote",error);
        }
        setIsLoddindDel(false);
    }

    const formik = useFormik({
        initialValues:userNotes,
        onSubmit: updateNote,
        validationSchema
    });

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='d-flex justify-content-center w-100'>Add Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={note.title} type="text" className='form-control mb-3' name="title" id="title" placeholder='Title...' />
                        { formik.errors.title && formik.touched.title ?
                            <div className='text-danger fw-bold px-2 pb-3 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                            {formik.errors.title}
                        </div> : "" }
                    <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={note.content} className='form-control' name="content" id="content" placeholder='Note...' cols="30" rows="5" ></textarea>
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
                    Update Note
                </Button>
            </Modal.Footer>
        </Modal>

        <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm overflow-hidden">
                    <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h6>{note.title}</h6>
                        </div>

                        <div className='d-flex ps-2'>
                            { isLoddindDel ? <i className="fa-solid fa-spinner fa-spin"></i>: <i onClick={deleteNote} className="fa-solid fa-trash-can fs-5 cursor-pointer icon-hover" title='Remove Note'></i> }
                            { isLoddindUpd ? <i className="fa-solid fa-spinner fa-spin"></i> : <i variant="primary" onClick={handleShow} className="fa-solid fa-pen-to-square ps-3 fs-5 cursor-pointer icon-hover" title='Edit Note'></i> }
                        </div>

                    </div>
                    <div className="card-body">
                        <p>{note.content}</p>
                    </div>
                    <div className="card-footer">
                        <h6 className='text-black-50 fs-sm text-end'>{note.updatedAt.split("T").slice(0, 3).join(" : ").split(".").slice(0, 1).join(" ")}</h6>
                    </div>
                </div>
        </div>
    </>
}

