import { Route } from "react-router-dom";
import Header from "../header";
import ListsEmployees from "../listsEmployees";

function Home() {
  return (
    <>
      <Header />

      <h2 className="d-flex mt-5" style={{justifyContent: 'center'}} >You need login to continue</h2>
    </>
  );
}

export default Home;
