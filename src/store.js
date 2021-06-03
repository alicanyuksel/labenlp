import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputText: "",
        inputReceived: false,
        allClassesInfos: [],
        allTokens: [],
        anyClasseAdded: false,
        currentClass: {},
        counterId: 0,
        someColors: [
            "red",
            "blue",
            "brown",
            "yellow",
            "green",
            "purple",
            "orange",
        ],
    },
    mutations: {
        saveInputSentence(state, payload) {
            state.inputText = payload.value;
            state.allTokens = state.inputText.split(" ");
        },
        isInputReceived(state, payload) {
            state.inputReceived = payload.value;
        },
        resetAll(state) {
            state.inputText = "";
            state.inputReceived = false;
            state.allClassesInfos = [];
            state.anyClasseAdded = false;
        },
        setCurrentClass(state, payload) {
            state.currentClass = payload;
        },
        addClass(state, payload) {
            // to check if the label already exists or empty           
            if (
                payload.name != "" &&
                payload.name.length <= 20 &&
                !state.allClassesInfos.some(item => item.name === payload.name)
            ) {
                state.allClassesInfos.push({
                    // we put a counter to avoid duplication of id when removing
                    id: state.counterId + 1,
                    name: payload.name,
                    bgColor: payload.color,
                });
                state.counterId++;
                state.anyClasseAdded = true;
            }
        },
        deleteClass(state, payload) {
            state.allClassesInfos = state.allClassesInfos.filter(
                (c) => c.id != payload
            );
        },
    },
    getters: {
        getInputText(state) {
            return state.inputText;
        },
        getAllClasses(state) {
            return state.allClasses;
        },
        getNumberOfClasses(state) {
            return state.allClassesInfos.length;
        },
    },
});
