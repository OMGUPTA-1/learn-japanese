import { Box, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <Typography variant="h2" color="error" align="center">
                Page Not Found!
            </Typography>
        </Box>
    );
};

export default NotFound;
