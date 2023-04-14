import "./css/student-profile.css";
import "./css/browsing.css";
import { JobDataGrid } from "./jobsDatagrid";
import { UserDataGrid } from "./userDatagrid";

export const AdminPage = () => {

    return (
        <div className="admin-page">
            <h1 className="admin-title">Job Postings:</h1>
            <JobDataGrid />
            <h1 className="admin-title">Users:</h1>
            <UserDataGrid />
        </div>
    )
}