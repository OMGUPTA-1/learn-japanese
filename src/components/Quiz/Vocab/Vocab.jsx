import {
    Card,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const selectOption = (data, n) => {
    let res = [];
    for (let i = 0; i < n; i++) {
        let idx = Math.round(Math.random() * (data.length - 1));
        res.push(data[idx].meaning.split(";")[0].trim());
    }
    return res;
};

// Kana Card
const Vocab = ({ answer, setAnswer, handleSubmit, cur, data }) => {
    const correct = new Audio("/sounds/correct.wav");
    const incorrect = new Audio("/sounds/wrong.mp3");
    const [options, setOptions] = useState([]);

    // Handle Key
    const handleSelect = (e) => {
        const ans = e.target.value;
        if (ans) {
            setAnswer(ans);
            if (cur.meaning.toLowerCase() !== ans.toLowerCase()) {
                incorrect.play();
            } else {
                correct.play();
            }
            handleSubmit(
                cur.meaning.toLowerCase() !== ans.toLowerCase(),
                cur.word,
                cur.meaning,
                ans
            );
        }
    };

    // Make first letter uppercase
    const firstLetterUpper = (s) => {
        return s[0].toUpperCase() + s.substr(1);
    };

    useEffect(() => {
        setOptions(() => {
            let temp = selectOption(data, 3);
            temp.push(cur.meaning.split(";")[0].trim());
            let randIdx = Math.round(Math.random() * (temp.length - 1));
            let n = temp[randIdx];
            temp[randIdx] = temp[temp.length - 1];
            temp[temp.length - 1] = n;
            return temp;
        });
    }, [cur]);

    return (
        <Card sx={{ width: "100%", maxWidth: "350px", p: 2 }}>
            {cur.furigana && (
                <Typography align="center">({cur.furigana})</Typography>
            )}
            <Typography align="center" variant="h3">
                {cur.word}
            </Typography>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {options.map((o, idx) => (
                    <FormControlLabel
                        key={idx}
                        value={o}
                        control={<Radio />}
                        label={firstLetterUpper(o)}
                        onClick={handleSelect}
                    />
                ))}
            </RadioGroup>
            {/* <Grid container>
                {options.map((o, idx) => (
                    <Grid item key={idx}>
                        <Radio />
                    </Grid>
                ))}
            </Grid> */}
            {/* <InputBase
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
                placeholder="Type english meaning here"
                onKeyDown={handleKey}
            /> */}
        </Card>
    );
};

export default Vocab;
