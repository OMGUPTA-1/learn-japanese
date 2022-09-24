import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import Reset from "../Reset/Reset";

// Rendered after the quiz ends
const PostQuiz = ({ state, reset }) => {
    const correct = state.state.correct;
    const incorrect = state.state.incorrect;
    const theme = useTheme();

    const renderWrongSubmission = (question, answer, given, head = false) => {
        return (
            <>
                <TableCell>
                    <Typography
                        color={head ? "primary" : "text.primary"}
                        align="center"
                    >
                        {question}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        color={head ? "primary" : theme.palette.success.main}
                        align="center"
                    >
                        {answer}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        color={head ? "primary" : "error"}
                        align="center"
                    >
                        {given}
                    </Typography>
                </TableCell>
            </>
        );
    };

    if (correct + incorrect === 0)
        return (
            <Box sx={{ mt: 3 }}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h5" color="error" align="center">
                        You did not attempt any question!
                    </Typography>
                    <Reset handler={reset} title={"Restart"} />
                </Box>
            </Box>
        );
    return (
        <Box sx={{ mt: 3 }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    [theme.breakpoints.down("sm")]: {
                        flexDirection: "column",
                    },
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        align="center"
                        color="text.primary"
                    >
                        Your Score
                    </Typography>
                    <Typography
                        variant="h1"
                        align="center"
                        color="text.primary"
                    >
                        <span
                            style={{
                                color:
                                    correct < incorrect
                                        ? theme.palette.error.main
                                        : theme.palette.success.main,
                            }}
                        >
                            {correct}
                        </span>{" "}
                        /{" "}
                        <span style={{ color: theme.palette.primary.main }}>
                            {correct + incorrect}
                        </span>
                    </Typography>
                </Box>
                <Box sx={{ mx: 3 }}>
                    <Reset handler={reset} title={"Restart"} size="5rem" />
                </Box>
            </Box>
            <Box sx={{ my: 2 }}>
                {incorrect ? (
                    <>
                        <Typography variant="h5" color="error">
                            Wrong Answers
                        </Typography>
                        <Typography color="text.primary">
                            Your wrong submissions are listed below. Practice
                            more to get better.
                        </Typography>
                        <TableContainer sx={{ mt: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {renderWrongSubmission(
                                            "Question",
                                            "Answer",
                                            "Your Answer",
                                            true
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.wrong.map((w, idx) => (
                                        <TableRow key={idx}>
                                            {renderWrongSubmission(
                                                w.question,
                                                w.answer,
                                                w.given
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <Typography
                        variant="h6"
                        color={theme.palette.success.main}
                        align="center"
                    >
                        おめでとうございます！ You solved all the questions
                        correctly.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PostQuiz;
