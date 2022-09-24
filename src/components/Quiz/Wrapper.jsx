import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

// Quiz Wrapper
const Wrapper = ({ endQuiz, data, Component }) => {
    const theme = useTheme();
    const [counter, setCounter] = useState(30);
    const [cur, setCur] = useState(null); // element
    const [wrong, setWrong] = useState([]); // wrong elements
    const [answer, setAnswer] = useState("");
    const [status, setStatus] = useState({
        correct: 0,
        incorrect: 0,
    });
    let copy = data;

    // Change Current Question
    const handleChangeQuestion = () => {
        let idx = Math.round(Math.random() * (copy.length - 1));
        setCur(copy[idx]);
        copy = copy.filter((p, i) => i !== idx);
    };

    // On Submit
    const handleSubmit = (isIncorrect, ques, ans, given = "") => {
        if (isIncorrect) {
            setWrong((prev) => [
                ...prev,
                { question: ques, answer: ans, given: given || answer },
            ]);
            setStatus((prev) => ({
                ...prev,
                incorrect: prev.incorrect + 1,
            }));
        } else {
            setStatus((prev) => ({ ...prev, correct: prev.correct + 1 }));
        }
        handleChangeQuestion();
        setAnswer("");
    };

    // On data change
    useEffect(() => {
        // Initialize kana
        handleChangeQuestion();

        // Timer runs every second
        const interval = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [data]);

    // End quiz when time runs out
    useEffect(() => {
        if (counter === 0) {
            endQuiz(status, wrong);
        }
    }, [counter]);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
                <Box>
                    <Typography variant="h6" align="left" color="text.primary">
                        Correct :{" "}
                        <span style={{ color: theme.palette.success.main }}>
                            {status.correct}
                        </span>
                    </Typography>
                    <Typography variant="h6" align="left" color="text.primary">
                        Incorrect :{" "}
                        <span style={{ color: theme.palette.error.main }}>
                            {status.incorrect}
                        </span>
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" align="right" color="text.primary">
                        Time Left :{" "}
                        <span className="highlight">{counter}s</span>
                    </Typography>
                </Box>
            </Box>
            {cur && (
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    sx={{ m: 2 }}
                >
                    <Component
                        answer={answer}
                        setAnswer={setAnswer}
                        handleSubmit={handleSubmit}
                        cur={cur}
                        data={data}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Wrapper;
