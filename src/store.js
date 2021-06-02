import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputText: "",
        inputReceived: false,
        allClassesNames: [],
        allClassesInfos: [],
        allTokens: [],
        anyClasseAdded: false,
        currentClass: {},
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
            state.allTokens = state.inputText.split(" ");
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
        setCurrentClass(state, payload) {
            state.currentClass = payload;
            console.log(state.currentClass);
        },
        addClass(state, payload) {
            if (
                payload.name != "" &&
                !state.allClassesNames.includes(payload.name)
            ) {
                state.allClassesInfos.push({
                    id: state.allClassesInfos.length + 1,
                    name: payload.name,
                    bgColor: payload.color,
                });
                state.anyClasseAdded = true;
                state.allClassesNames.push(payload.name);
            }
        },
        deleteClass() {
            return;
        }
    },
    getters: {
        getInputText(state) {
            return state.inputText;
        },
        getAllClasses(state) {
            return state.allClasses;
        },
        getNumberOfClasses(state) {
            return state.allClassesNames.length;
        }
    },
});
