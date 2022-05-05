import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateNameAction} from '../store/asyncMethods/profileMethods'
import toast, { Toaster } from "react-hot-toast";
import { RESET_PROFILE_ERRORS } from "../store/types/ProfileTypes";
import { useHistory } from "react-router-dom";

export default function UpdateName() {
  const [username, setUsername] = useState('')
  const {user: {name, _id}} = useSelector(state => state.AuthReducer)
  const {loading, redirect} = useSelector(state => state.PostReducer)
  const {updateErrors} = useSelector(state => state.updateName)
  const {push} = useHistory()

  const dispatch = useDispatch()

  const updateName = (e) =>{
    e.preventDefault()
    dispatch(updateNameAction({name: username, id: _id}))
  }

  useEffect(() =>{
    setUsername(name)
  },[])

  useEffect(() =>{
    if(updateErrors.length !== 0){
      updateErrors.map(error => toast.error(error.msg))
      dispatch({type: RESET_PROFILE_ERRORS})
    }
  },[updateErrors])
  
  useEffect(() =>{
    if(redirect){
      push('/dashboard')
    }
  },[redirect])

  return ( 
    <div className="container mt-10">
      <Helmet>
        <title>Update Name</title>
        <meta name="description" content="Update Username" />
      </Helmet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="row ml-minus-15 mr-minus-15">
        <div className="col-3 p-15">
          <Sidebar />
        </div>
        <div className="col-9 p-15">
          <div className="card">
            <h3 className="card__h3">Update name</h3>
            <form onSubmit={updateName}>
              <div className="group">
                <input
                  type="text"
                  name=""
                  className="group__control"
                  placeholder="Name"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="group">
                <input
                  type="submit"
                  value="Update Name"
                  className="btn btn-default btn-block"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
