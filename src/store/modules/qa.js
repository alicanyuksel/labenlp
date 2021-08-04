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
        exportAnnotation(state) {
            const filename = "qa_annotations.json";

            let output = {
                context: state.inputText,
                qas: state.allAnnoationDetails,
            };
            
            const jsonOutput = JSON.stringify(output, null, 4);
            let element = document.createElement("a");
            element.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," + encodeURIComponent(jsonOutput)
            );
            element.setAttribute("download", filename);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
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
