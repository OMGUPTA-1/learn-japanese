import { Card, InputBase, Typography } from "@mui/material";

// Kana Card
const Kana = ({ answer, setAnswer, handleSubmit, cur }) => {
    const correct = new Audio("/sounds/correct.wav");
    const incorrect = new Audio("/sounds/wrong.mp3");

    const handleKey = (e) => {
        if (e.keyCode === 13 && answer) {
            if (cur.roumaji.toLowerCase() !== answer.toLowerCase()) {
                incorrect.play();
            } else {
                correct.play();
            }
            handleSubmit(
                cur.roumaji.toLowerCase() !== answer.toLowerCase(),
                cur.kana,
                cur.roumaji
            );
        }
    };

    // Answer handler
    const handleChange = (e) => {
        setAnswer(e.target.value);
    };

    return (
        <Card sx={{ width: "100%", maxWidth: "350px", p: 2 }}>
            <Typography align="center" variant="h1">
                {cur.kana}
            </Typography>
            <InputBase
                sx={{
                    borderBottom: 1,
                    width: "100%",
                    align: "center",
                    "& input": {
                        textAlign: "center",
                    },
                }}
                value={answer}
                onChange={handleChange}
                placeholder="Type Romaji Here"
                onKeyDown={handleKey}
            />
        </Card>
    );
};

export default Kana;
