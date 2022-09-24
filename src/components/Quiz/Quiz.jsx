import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Kana from "./Kana/Kana";
import Vocab from "./Vocab/Vocab";
import PreQuiz from "./PreQuiz";
import PostQuiz from "./PostQuiz";
import hiragana from "../../data/hiragana.json";
import katakana from "../../data/katakana.json";
import Wrapper from "./Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { setQuizData } from "../../features/quiz/quizSlice";
import "./Quiz.css";

// Valid types
const types = ["hiragana", "katakana", "vocab"];

// Quiz Component
const Quiz = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState(-1); // -1 0 1
    // const [data, setData] = useState([]);
    const [isKana, setIsKana] = useState(true);
    const [level, setLevel] = useState(5);
    const [endState, setEndState] = useState();

    const data = useSelector((state) => {
        return type === "vocab"
            ? state.quiz[type + "-" + level]
            : state.quiz[type];
    });
    const dispatch = useDispatch();

    // Handle Quiz Start
    const handleStart = () => setStatus(0);

    // Handle Quiz End
    // Take some data here in arguments to display better results
    const handleEnd = (endState, wrongSubmissions) => {
        setStatus(1);
        setEndState({ state: endState, wrong: wrongSubmissions });
    };

    // Reset the status
    const handleReset = () => {
        setStatus(-1);
    };

    // Fetch vacab by level
    const fetchVocab = async (lev, abortController) => {
        try {
            const res = await fetch(
                "https://jlpt-keiz.vercel.app/api/words?level=" +
                    lev +
                    "&limit=200",
                {
                    signal: abortController.signal,
                }
            );
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Some validation and data fetching
    useEffect(() => {
        if (!type) navigate("/");
        if (types.findIndex((t) => t === type) === -1) navigate("/");

        if (type === "hiragana") {
            if (!data) {
                dispatch(setQuizData({ data: hiragana, key: type }));
            }
            // setData(hiragana);
        } else if (type === "katakana") {
            if (!data) {
                dispatch(setQuizData({ data: katakana, key: type }));
            }
        } else {
            setIsKana(false);
        }
    }, []);

    // On level change
    useEffect(() => {
        let abortController = new AbortController();
        if (type !== "hiragana" && type !== "katakana") {
            if (!data) {
                // setData([]);
                fetchVocab(level, abortController).then((res) => {
                    if (res)
                        dispatch(
                            setQuizData({
                                data: res.words,
                                key: type + "-" + level,
                            })
                        );
                });
            }
        }
        return () => {
            abortController.abort();
        };
    }, [level]);

    return (
        <Box>
            <Typography variant="h3" color="primary" align="left">
                Quiz - {type.toUpperCase()}
            </Typography>
            <Box>
                {status === -1 && (
                    <PreQuiz
                        isKana={isKana}
                        startQuiz={handleStart}
                        type={type.toUpperCase()}
                        setLevel={setLevel}
                        level={level}
                        isDisabled={!data || data.length === 0}
                    />
                )}
                {data && data.length > 0 && status === 0 && (
                    <Wrapper
                        data={data}
                        endQuiz={handleEnd}
                        Component={isKana ? Kana : Vocab}
                    />
                )}
                {data && data.length > 0 && status === 1 && (
                    <PostQuiz state={endState} reset={handleReset} />
                )}
            </Box>
        </Box>
    );
};

export default Quiz;
