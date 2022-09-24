import { Pause, PlayArrow } from "@mui/icons-material";
import {
    alpha,
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Examples = ({ examples }) => {
    const [hide, setHide] = useState(true);
    return (
        <Box>
            {hide ? (
                <Example example={examples[0]} idx={1} />
            ) : (
                examples.map((e, i) => (
                    <Example key={i + 1} example={e} idx={i + 1} />
                ))
            )}
            <Button
                onClick={() => setHide((prev) => !prev)}
                disableRipple
                sx={{
                    textTransform: "none",
                    p: 0,
                    background: "trasnparent",
                    "&:hover": {
                        background: "transparent",
                        textDecoration: "underline",
                    },
                }}
            >
                {hide ? "Show all" : "Hide examples"}
            </Button>
        </Box>
    );
};

const Example = ({ example, idx }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();

    // Handle the sound click
    const handleSound = () => {
        setIsPlaying((prev) => {
            if (!prev) audioRef.current.play();
            else audioRef.current.pause();
            return !prev;
        });
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        audioRef.current.onended = handleAudioEnd;
    }, []);

    return (
        <Box display="flex" alignItems="flex-start" sx={{ my: 1.5 }}>
            <audio ref={audioRef} src={example.audio.mp3} />
            <Tooltip title={isPlaying ? "Pause" : "Play"}>
                <IconButton
                    onClick={handleSound}
                    // color="success"
                    sx={(theme) => ({
                        background: alpha(theme.palette.text.primary, 0.1),
                        mr: 1,
                    })}
                >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
            </Tooltip>
            <Box>
                <Typography color="text.primary">{example.japanese}</Typography>
                <Typography color="text.primary">
                    ({example.meaning.english})
                </Typography>
            </Box>
        </Box>
    );
};

export default Examples;
