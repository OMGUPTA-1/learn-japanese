import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Quiz from "./components/Quiz/Quiz";
import NotFound from "./components/NotFound/NotFound";
import Dictionary from "./components/Dictionary/Dictionary";
import "./App.css";

function App() {
    const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Box
                    sx={{
                        background: theme.palette.background.default,
                        minHeight: "100vh",
                    }}
                >
                    <Navbar />
                    <Container sx={{ py: 5 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/quiz/:type" element={<Quiz />} />
                            <Route
                                path="/dictionary"
                                element={<Dictionary />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
