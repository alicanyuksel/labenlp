// import axios from "axios";

const getDefaultState = () => {
    return {
        inputText: "",
        inputReceived: false,
        allQuestionsDetails: {},
        anyQuestionAdded: false,
        currentQuestion: "",
        counterId: 0,
    }
}

export const qaStore = {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        setInputReceived(state, payload) {
            state.inputReceived = payload.value;
        },
        saveInput(state, payload) {
            state.inputText = payload.value;
        },
        addQuestion(state, payload) {
            state.allQuestionsDetails["question"] = payload.question;
        },
        resetAll(state) {
            Object.assign(state, getDefaultState())            
        },
    },
    getters: {
        isInputReceived(state) {
            return state.inputReceived;
        },
        isAnyQuestionAdded(state) {
            return state.anyQuestionAdded;
        },
        getInputText(state) {
            return state.inputText;
        },
        getCurrentQuestion(state) {
            return state.currentQuestion;
        }
    },
};
