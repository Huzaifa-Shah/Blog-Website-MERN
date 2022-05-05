import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateImageAction } from "../store/asyncMethods/PostMethod";
import toast, { Toaster } from "react-hot-toast";
import {RESET_UPDATE_IMAGE_ERRORS} from '../store/types/PostTypes'

export default function EditImage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {updateImageErrors} = useSelector(state => state.UpdateImage)
  const {redirect} = useSelector(state => state.PostReducer)
  const {push} = useHistory()

  const [state, setState] = useState({
    image: "",
    imagePreview: "",
    imageName: "Choose Image",
  });
  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({
          ...setState,
          imagePreview: reader.result,
          image: e.target.files[0],
          imageName: e.target.files[0].name,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const updateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", state.image);
    dispatch(updateImageAction(formData));
  };
  useEffect(() =>{
    if(updateImageErrors.length !== 0){
      updateImageErrors.map(error => toast.error(error.msg))
      dispatch({type: RESET_UPDATE_IMAGE_ERRORS})
    }
  },[updateImageErrors])
  useEffect(() =>{
    if(redirect){
      push('/dashboard')
    }
  },[redirect])

  return (
    <div className="container mt-10">
      <Helmet>
        <title>Update Image </title>
        <meta name="description" content="Update Image " />
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
      <div className="row">
        <div className="col-6">
          <div className="card">
            <h3 className="card__h3">Update Post Image</h3>
            <form onSubmit={updateImage}>
              <div className="group">
                <label htmlFor="image" className="image__label">
                  {state.imageName}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={fileHandle}
                />
              </div>
              <div className="group">
                <div className="imagePreview">
                  {state.imagePreview ? (
                    <img src={state.imagePreview} alt="Preview" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="group">
                <input
                  type="submit"
                  value="Update Image"
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
