import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizSlice";
import dictReducer from "../features/dictionary/dictSlice";
import kanjiReducer from "../features/kanji/kanjiSlice";

const store = configureStore({
    reducer: {
        quiz: quizReducer,
        dict: dictReducer,
        kanji: kanjiReducer,
    },
});

export default store;
