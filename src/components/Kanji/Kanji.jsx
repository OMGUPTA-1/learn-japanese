import {
    Box,
    CircularProgress,
    Grid,
    InputLabel,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKanjiData } from "../../features/kanji/kanjiSlice";
import Examples from "./Examples";

const Kanji = ({ kanji }) => {
    // const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cached data
    const data = useSelector((state) => state.kanji[kanji]);
    const dispatch = useDispatch();

    // Fetch some kanji
    const fetchKanji = async (k, abortController) => {
        const res = await fetch(
            "https://kanjialive-api.p.rapidapi.com/api/public/kanji/" + k,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                    "X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com",
                },
                signal: abortController.signal,
            }
        );
        if (res.ok) {
            return await res.json();
        }
    };

    // On kanji change
    useEffect(() => {
        let abortController = new AbortController();
        if (!data && kanji) {
            setLoading(true);
            fetchKanji(kanji, abortController)
                .then((res) => {
                    // setData(res);
                    dispatch(setKanjiData({ data: res, key: kanji }));
                    setLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                    // setLoading(false);
                });
        } else {
            setLoading(false);
        }
        return () => {
            abortController.abort();
        };
    }, [kanji]);

    return (
        <Box sx={{ mt: 2 }}>
            {loading ? (
                <CircularProgress />
            ) : data ? (
                <Grid
                    container
                    sx={(theme) => ({
                        borderBottom: 1,
                        borderColor: theme.palette.divider,
                    })}
                >
                    <Grid item sx={{ width: "100%", maxWidth: "300px", py: 1 }}>
                        <Typography color="secondary" variant="h2">
                            {kanji}
                        </Typography>
                        <Typography color="text.primary">
                            ({data.kanji.meaning.english})
                        </Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%", maxWidth: "300px", py: 1 }}>
                        <Box>
                            <InputLabel>Kunyomi</InputLabel>
                            <Typography color="text.primary">
                                {data.kanji.kunyomi.hiragana}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item sx={{ width: "100%", maxWidth: "300px", py: 1 }}>
                        <Box>
                            <InputLabel>Onyomi</InputLabel>
                            <Typography color="text.primary">
                                {data.kanji.onyomi.katakana}
                            </Typography>
                        </Box>
                    </Grid>
                    {data.examples.length > 0 && (
                        <Grid item xs={12} sx={{ py: 1 }}>
                            <Box>
                                <InputLabel>Examples</InputLabel>
                                <Examples examples={data.examples} />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            ) : null}
        </Box>
    );
};

export default Kanji;
