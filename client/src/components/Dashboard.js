import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  REDIRECT_FALSE,
  REMOVE_MESSAGE,
  SET_LOADER,
  CLOSE_LOADER,
  SET_MESSAGE,
} from "../store/types/PostTypes";
import toast, { Toaster } from "react-hot-toast";
import { fetchPosts } from "../store/asyncMethods/PostMethod";
import { Link, useParams } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { BsArchive, BsImages } from "react-icons/bs";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import axios from "axios";
import moment from 'moment'

export default function Dashboard() {
  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
  );
  const dispatch = useDispatch();
  const {
    user: { _id },
    token,
  } = useSelector((state) => state.AuthReducer);
  const { posts, count, perPage } = useSelector((state) => state.FetchPosts);
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }

  const deletePost = async (id) => {
    const confirm = window.confirm("Do you want to delete this post");
    if (confirm) {
      dispatch({ type: SET_LOADER });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const {
          data: { msg },
        } = await axios.get(`/delete/${id}`, config);
        dispatch(fetchPosts(_id, page));
        dispatch({type: SET_MESSAGE, payload: msg})
      } catch (error) {
        dispatch({ type: CLOSE_LOADER });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
    
  }, [message]);

  useEffect(() => {
    dispatch(fetchPosts(_id, page));
  }, [page]);

  return (
    <>
      <Helmet>
        <title>User Dashboard</title>
        <meta name="description" content="User Dashboard" />
      </Helmet>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />

      <div className="container mt-10">
        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-3 p-15">
            <Sidebar />
          </div>
          <div className="col-9">
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="dashboard__posts" key={post._id}>
                    <div className="dashboard__posts__title">
                      <Link to={`/details/${post.slug}`}>{post.title}</Link>
                      <span>Published {moment(post.updatedAt).fromNow()}</span>
                    </div>
                    <div className="dashboard__posts__links">
                      <Link to={`/updateImage/${post._id}`} className="icon">
                        <BsImages />
                      </Link>
                      <Link to={`/edit/${post._id}`}>
                        <BsPencil className="icon" />
                      </Link>
                      <BsArchive
                        onClick={() => deletePost(post._id)}
                        className="icon"
                      />
                    </div>
                  </div>
                ))
              ) : (
                "You dont have any posts"
              )
            ) : (
              <Loader />
            )}
            <Pagination path="dashboard" page={page} perPage={perPage} count={count} />
          </div>
        </div>
      </div>
    </>
  );
}
