import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { homePosts } from "../store/asyncMethods/PostMethod";
import Loader from "./Loader";
import moment from "moment";
import Pagination from "./Pagination";

export default function Home() {
  const { loading } = useSelector((state) => state.PostReducer);
  const { posts, perPage, count } = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();
  let { page } = useParams();

  if (page === undefined) {
    page = 1;
  }
  useEffect(() => {
    dispatch(homePosts(page));
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Web articles</title>
        <meta
          name="desxription"
          content="Learn HTML,CSS,JS,React and MERN stack"
        />
      </Helmet>
      <div className="container">
        <div className="row mt-10" style={{ marginBottom: "30px" }}>
          <div className="col-9 home">
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="row post-style" key={post._id}>
                    <div className="col-8">
                      <div className="post">
                        <div className="post__header">
                          <div className="post__header__avator">
                            {post.userName[0]}
                          </div>
                          <div className="post__header__user">
                            <span>{post.userName}</span>
                            <span>
                              {moment(post.updatedAt).format("MMM Do YY")}
                            </span>
                          </div>
                        </div>
                        <div className="post__body">
                          <h1 className="post__body__title">
                            <Link to={`/details/${post.slug}`}>{post.title}</Link>
                          </h1>
                          <div className="post__body__details">
                            {post.body.slice(0, 300)}....
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="post__image">
                        <img src={`/images/${post.image}`} alt={post.image} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                "No Posts"
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <Pagination path="home" page={page} perPage={perPage} count={count} />  
          </div>
        </div>
      </div>
    </>
  );
}
