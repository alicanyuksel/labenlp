// import axios from "axios";

const getDefaultState = () => {
    return {
        inputText: "",
        inputReceived: false,
        allAnnoationDetails: [],
        anyAnnotationAdded: false,
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
        addAnnotation(state, payload) {
            state.allAnnoationDetails.push(payload);
            state.anyAnnotationAdded = true;
            state.counterId += 1;
        },
        deleteAnnotation (state, payload) {
            state.allAnnoationDetails = state.allAnnoationDetails.filter(
                (c) => c.id != payload
            );

            if (state.allAnnoationDetails.length === 0) {
                state.counterId = 0;
                state.anyAnnotationAdded = false;
            }

        },
        resetAll(state) {
            Object.assign(state, getDefaultState())            
        },
    },
    getters: {
        isInputReceived(state) {
            return state.inputReceived;
        },
        isAnyAnnotationAdded(state) {
            return state.anyAnnotationAdded;
        },
        getInputText(state) {
            return state.inputText;
        },
        getCurrentQuestion(state) {
            return state.currentQuestion;
        },
        getAllAnnotations(state){
            return state.allAnnoationDetails;
        },
    },
};
