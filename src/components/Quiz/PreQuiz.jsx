import {
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// Rendered beore the quiz starts
const PreQuiz = ({ startQuiz, type, isKana, level, setLevel, isDisabled }) => {
    const [timer, setTimer] = useState(3);
    const [inter, setInter] = useState(null);
    const [disabled, setDisabled] = useState(isDisabled);

    // Handle Start Button
    const handleClick = () => {
        setDisabled(true);
        setInter(
            setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000)
        );
    };

    // Handle Level Selection
    const handleSelect = (e) => {
        setLevel(e.target.value);
    };

    // On timer change
    useEffect(() => {
        if (timer === 0) {
            clearInterval(inter);
            startQuiz();
        }
    }, [timer]);

    useEffect(() => {
        setDisabled(isDisabled);
    }, [isDisabled]);

    return (
        <Box sx={{ py: 3 }}>
            <Typography variant="h6" color="text.primary">
                The quiz will be timed for{" "}
                <span className="highlight">30 seconds</span>. The questions
                will be chosen randomly by the system. Try to maximize the
                number of questions attempted as well as correct answers. <br />
            </Typography>
            <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                Please click on the <span className="highlight">START</span>{" "}
                button to begin the quiz when you are ready.
            </Typography>
            {!isKana && (
                <Box display="flex" alignItems="center">
                    <InputLabel>JLPT Level</InputLabel>
                    <Select value={level} onChange={handleSelect} sx={{ m: 2 }}>
                        {[1, 2, 3, 4, 5].map((val, idx) => (
                            <MenuItem value={val} key={idx}>
                                N{val}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
            <Box display={"flex"} alignItems={"center"} sx={{ my: 3 }}>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    Start
                </Button>
                {inter && (
                    <Typography
                        sx={{ mx: 3, transition: "0.5s ease" }}
                        align="center"
                        color="text.primary"
                    >
                        {timer}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PreQuiz;
