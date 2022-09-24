import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const links = [
    { path: "/quiz/hiragana", text: "あ", caption: "Hiragana" },
    { path: "/quiz/katakana", text: "ア", caption: "Katakana" },
    { path: "/quiz/vocab", text: "本", caption: "Vocab" },
];

const Home = () => {
    const navigate = useNavigate();

    const gotoPage = (path) => {
        navigate(path);
    };

    return (
        <>
            <Box className="group">
                <Typography variant="h3" color="primary" align="left">
                    Quiz
                </Typography>
                <Grid container>
                    {links.map((l, idx) => (
                        <Grid
                            item
                            key={idx}
                            xs={12}
                            sm={"auto"}
                            sx={(theme) => ({
                                p: 2,
                                [theme.breakpoints.down("sm")]: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                            })}
                        >
                            <Card
                                sx={(theme) => ({
                                    width: "200px",
                                })}
                            >
                                <CardActionArea
                                    onClick={() => {
                                        gotoPage(l.path);
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        fontSize={"10rem"}
                                        align="center"
                                    >
                                        {l.text}
                                    </Typography>
                                    <CardContent>
                                        <Typography variant="h6" align="center">
                                            {l.caption}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Home;
