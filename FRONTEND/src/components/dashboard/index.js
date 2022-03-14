import Header from "../header";
import ListsEmployees from "../listsEmployees";
import listDepartments from "../listDepartments";
import {Route} from "react-router-dom";

function dashBoard ({setAuth}) {
    return(
        <>
            <Header setAuth={setAuth}/>
            <ListsEmployees />
        </>
    )
}

export default dashBoard;