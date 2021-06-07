import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
    inputText: "",
    inputReceived: false,
    allClassesInfos: [],
    allTokenDetails: [],
    allTokensIdsSelected: [],
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
};

const initialStateCopy = JSON.parse(JSON.stringify(state));

export const store = new Vuex.Store({
    state: state,
    mutations: {
        setInputReceived(state, payload) {
            state.inputReceived = payload.value;
        },
        saveInputSentence(state, payload) {
            state.inputText = payload.value;
            axios
                .post("http://127.0.0.1:5000/tokenize", {text : state.inputText})
                .then(
                    (response) =>
                        (state.allTokenDetails = response.data.tokenDetails)
                )
                .catch(function() {
                    alert("Could not send the request to the server. Are you sure it's running ?")
                });
        },
        saveTokens(state, allTokenList) {
            // TODO
            for (let i=0; i < allTokenList.length; i++) {
                console.log(allTokenList[i].token);
            }
        },
        resetAll() {
            store.replaceState(initialStateCopy);
        },
        setCurrentClass(state, payload) {
            state.currentClass = payload;
        },
        addClass(state, payload) {
            // to check if the label already exists or empty
            if (
                payload.name != "" &&
                payload.name.length <= 20 &&
                !state.allClassesInfos.some(
                    (item) => item.name === payload.name
                )
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
            // if the class deleted was the current class
            // we have to reset our state "currentClass"
            if (state.currentClass.id === payload) {
                state.currentClass = {}
            }
        },
    },
    getters: {
        isInputReceived(state) {
            return state.inputReceived;
        },
        getInputText(state) {
            return state.inputText;
        },
        getAllClasses(state) {
            return state.allClasses;
        },
        getNumberOfClasses(state) {
            return state.allClassesInfos.length;
        },
        getAllToken(state) {
            return state.allTokenDetails;
        },
        getCurrentClass(state) {
            return state.currentClass;
        }
    },
});
