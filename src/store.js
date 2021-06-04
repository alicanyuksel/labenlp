import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputText: "",
        inputReceived: false,
        allClassesInfos: [],
        allTokenDetails: [],
        allTokenNames: [],
        allTokensLabeled: [],
        anyClasseAdded: false,
        currentClass: {},
        counterId: 0,
        counterIdToken: 0,
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
            axios
                .post("http://127.0.0.1:5000/tokenize", {text : state.inputText})
                .then(
                    (response) =>
                        (state.allTokenDetails = response.data.tokens_details,
                        state.allTokenNames = response.data.only_tokens)
                )
                .catch(error => {
                    alert("Could not send the request to the server. Are you sure it's running ?")
                });
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
        },
        saveTokenLabeled(state, payload) {
            // add our object on our array
            state.allTokensLabeled.push(payload);
            // counter ++
            state.counterIdToken++;
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
        getAllToken(state) {
            return state.allTokenDetails;
        }
    },
});
