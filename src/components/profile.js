import PersonIcon from "@mui/icons-material/Person";

// need to implement onClick function (Justin)
export const ProfileMenu = () => {
    return (
        <button className="btn profile" /* onClick={() => console.log("World Hello")} */><PersonIcon style={{fontSize:'small'}}/></button>
    )
}