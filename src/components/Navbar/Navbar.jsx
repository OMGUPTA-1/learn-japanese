import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const theme = useTheme();
    return (
        <AppBar
            position="static"
            // sx={{ background: theme.palette.background.default }}
        >
            <Toolbar>
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                    }}
                >
                    <Typography variant="h5">Go Nihongo</Typography>
                </Link>
                <Box display="flex" flexGrow={1} />
                <Box
                    display={"flex"}
                    alignItems="center"
                    sx={{
                        ">*": {
                            mx: 1,
                        },
                    }}
                >
                    <NavLink
                        to="/dictionary"
                        style={{
                            textDecoration: "none",
                            color: theme.palette.text.primary,
                        }}
                    >
                        <Typography>Dictionary</Typography>
                    </NavLink>
                    <NavLink
                        to="/about"
                        style={{
                            textDecoration: "none",
                            color: theme.palette.text.primary,
                        }}
                    >
                        <Typography>About</Typography>
                    </NavLink>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
