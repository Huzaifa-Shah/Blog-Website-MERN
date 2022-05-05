import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postComment, postDetails } from "../store/asyncMethods/PostMethod";
import Loader from "./Loader";
import moment from "moment";
import { Helmet } from "react-helmet";
import Comments from "./Comments";

export default function Details() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.AuthReducer);
  const { loading, details, comments } = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')

  const addComment = e => {
    e.preventDefault()
    dispatch(postComment({id: details._id, comment, userName: user.name}))
    setComment('')
    dispatch(postDetails(id));
  }
  
  useEffect(() => {
    dispatch(postDetails(id));
  }, [id]);

  return (
    <div className="container">
      <div className="row mt-10">
        <div className="col-8">
          {!loading ? (
            <div className="post__details">
              <Helmet>
                <title>{details.title}</title>
              </Helmet>
              <div className="post__header">
                <div className="post__header__avator">
                  {details.userName ? details.userName[0] : ""}
                </div>
                <div className="post__header__user">
                  <span>{details.userName}</span>
                  <span>{moment(details.updatedAt).format("MMM Do YY")}</span>
                </div>
              </div>
              <div className="post__body">
                <h1 className="post__body__title">{details.title}</h1>
                <div className="post__body__details">{details.body}</div>
                <div className="post__body__image">
                  <img src={`/images/${details.image}`} alt={details.image} />
                </div>
              </div>
              {user ? (
                <>
                <div className="post__comment">
                  <form onSubmit={addComment}>
                    <div className="group">
                      <input
                        type="text"
                        className="group__control"
                        placeholder="Write a comment"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                    </div>
                    <div className="group">
                      <input
                        type="submit"
                        value="Post Comment"
                        className="btn btn-default"
                      />
                    </div>
                  </form>
                </div>
                <Comments comments={comments}/>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
