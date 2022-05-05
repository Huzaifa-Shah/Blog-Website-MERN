import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <div className="notFound">
      <Helmet>
        <title>404- Page Not Found</title>
        <meta name="description" content="Oops! That page could not be found" />
      </Helmet>
      <div className="notFound__container__h1">404</div>
      <p className="notFound__container__p">
        Oops! That page could not be found
      </p>
    </div>
  );
}
