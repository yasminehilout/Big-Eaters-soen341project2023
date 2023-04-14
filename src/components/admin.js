import "./css/student-profile.css";
import "./css/browsing.css";
import { JobDataGrid } from "./jobsDatagrid";
import { UserDataGrid } from "./userDatagrid";

export const AdminPage = () => {

    /* This is a JSX code block that returns a div element with a class name of "admin-page". Inside
    the div, there are two h1 elements with class names of "admin-title" and two components,
    JobDataGrid and UserDataGrid. This code block is rendering the AdminPage component, which
    displays job postings and user data in a grid format. */
    return (
        <div className="admin-page">
            <h1 className="admin-title">Job Postings:</h1>
            <JobDataGrid />
            <h1 className="admin-title">Users:</h1>
            <UserDataGrid />
        </div>
    )
}