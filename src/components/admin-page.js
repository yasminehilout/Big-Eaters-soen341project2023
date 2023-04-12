import "./css/student-profile.css";
import "./css/browsing.css";
import { JobDataGrid } from "./data-grid-jobs";
import { UserDataGrid } from "./data-grid-users";

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