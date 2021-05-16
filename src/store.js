import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputText: "",
        inputReceived: false,
       
    },
    mutations: {
        saveInputSentence(state, payload) {
            state.inputText = payload.value;
            
        },
        isInputReceived(state, payload) {
            state.inputReceived = payload.value;
        }
    },
    getters: {
        getInputText(state) {
            return state.inputText;
        }
    }
});