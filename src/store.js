import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputText: "",
        inputReceived: false,
        allClassesNames: [],
        allClassesInfos: [],
        anyClasseAdded: false,
        someColors: [
            "red",
            "white",
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
        },
        isInputReceived(state, payload) {
            state.inputReceived = payload.value;
        },
        resetAll(state) {
            state.inputText = "";
            state.inputReceived = false;
            state.allClassesNames = [];
            state.allClassesInfos = [];
            state.anyClasseAdded = false;
        },
        addClasse(state, payload) {
            if (
                payload.name != "" &&
                !state.allClassesNames.includes(payload.name)
            ) {
                state.allClassesInfos.push({
                    name: payload.name,
                    bgColor: payload.color,
                });
                state.anyClasseAdded = true;
                state.allClassesNames.push(payload.name);
            }
        },
    },
    getters: {
        getInputText(state) {
            return state.inputText;
        },
        getAllClasses(state) {
            return state.allClasses;
        },
    },
});
