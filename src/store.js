import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputText: "",
        inputReceived: false,
        allClasses: [],
        anyClasseAdded: false,
    },
    mutations: {
        saveInputSentence(state, payload) {
            state.inputText = payload.value;
        },
        isInputReceived(state, payload) {
            state.inputReceived = payload.value;
        },
        initializeInput(state) {
            state.inputText = "";
            state.inputReceived = false;
        },
        addClasse(state, payload) {
            if (payload.value != "") {
                state.allClasses.push(payload.value);
                state.anyClasseAdded = true;
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
