import { IconButton, Tooltip } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Reset = ({ handler, title = "Reset", size = "2rem" }) => {
    return (
        <Tooltip title={title}>
            <IconButton onClick={handler}>
                <RestartAltIcon sx={{ fontSize: size }} />
            </IconButton>
        </Tooltip>
    );
};

export default Reset;
