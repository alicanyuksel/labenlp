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
        "#f29191",
        "#cee5d0",
        "#ffeb99",
        "#deedf0",
        "#bbbbbb",
        "#e4bad4",
        "#f69e7b",
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
                .post("http://127.0.0.1:5000/tokenize", {
                    text: state.inputText,
                })
                .then(
                    (response) =>
                        (state.allTokenDetails = response.data.tokenDetails)
                )
                .catch(function() {
                    alert(
                        "Could not send the request to the server. Are you sure it's running ?"
                    );
                });
        },
        saveToken(state, payload) {
            // TODO
            // get the list of startIndex
            let selectedTokenIds = payload;

            // if there is just one token selected
            if (selectedTokenIds.length === 1) {
                for (let i = 0; i < state.allTokenDetails.length; i++) {
                    if (
                        state.allTokenDetails[i].startIndex ===
                        selectedTokenIds[0]
                    ) {
                        // update our object
                        state.allTokenDetails[i].bgColor =
                            state.currentClass.bgColor;
                        state.allTokenDetails[i].label =
                            state.currentClass.name;
                    }
                }
            }
        },
        saveTokenBlock(state, payload) {
            let startIndexSelected = payload[0];
            let endIndexSelected = payload[1];

            let allSelectedTokens = [];
            let selectedTokenStartIds = [];
            let selectedTokenEndIds = [];

            // we save also all index for each selected tokens
            // beacause after that we'll insert one token block at this index
            // for example : [44,69]
            // first we find the index corresponding to startIndexSelected (44).
            // And we insert our token block at this index
            let indexToInsertTokenBlock = state.allTokenDetails.findIndex(
                (i) => i.startIndex === startIndexSelected
            );

            // for each token id selected, we loop in our array with TOKEN IDS.
            // If the user selected multiple tokens, we check that and save it in our array.
            for (const tokenId in state.allTokenDetails) {
                // for this if statement, the idea is :
                // we have for example an input like [44, 69]
                // So we have to find all the tokens between this startIndexSelected and endIndexSelected numbers
                // with a simple loop in our objects array "allTokenDetails"
                // And then, we put all tokens matched together with start and endIndex informations
                if (
                    (startIndexSelected <=
                        state.allTokenDetails[tokenId].startIndex &&
                        endIndexSelected >=
                            state.allTokenDetails[tokenId].startIndex) ||
                    (startIndexSelected >=
                        state.allTokenDetails[tokenId].startIndex &&
                        endIndexSelected <=
                            state.allTokenDetails[tokenId].startIndex)
                ) {
                    state.allTokenDetails[tokenId].isActive = false;

                    allSelectedTokens.push(
                        state.allTokenDetails[tokenId].token
                    );
                    selectedTokenStartIds.push(
                        state.allTokenDetails[tokenId].startIndex
                    );
                    selectedTokenEndIds.push(
                        state.allTokenDetails[tokenId].endIndex
                    );
                }
            }

            // add our token block with the index of the first block's word
            let tokenBlockToInsert = {
                token: allSelectedTokens.join(" "),
                label: state.currentClass.name,
                startIndex: selectedTokenStartIds[0], // first element of the array
                endIndex: selectedTokenEndIds.slice(-1)[0], // last element of the array
                bgColor: state.currentClass.bgColor,
                type: "tokenBlock",
                isActive: true,
                tokenBlockId: selectedTokenStartIds,
                tokensSelectedForBlock: allSelectedTokens, // we need that to create again these tokens after removing
            };
            // insert our token block at the index of the first block's word
            state.allTokenDetails.splice(
                indexToInsertTokenBlock,
                0,
                tokenBlockToInsert
            );
        },
        removeToken(state, payload) {
            let selectedTokenToRemove = payload;

            if (selectedTokenToRemove.length === 1) {
                for (let i = 0; i < state.allTokenDetails.length; i++) {
                    if (
                        state.allTokenDetails[i].startIndex ===
                        selectedTokenToRemove[0]
                    ) {
                        // update our object
                        state.allTokenDetails[i].bgColor = null;
                        state.allTokenDetails[i].label = null;
                    }
                }
            }
        },
        removeTokenBlock(state, payload) {
            // to get the first token id's in order to match in our array and remove it
            let tokenBlockId = payload[0][0];
            let allTokenStartIndex = payload[0];

            state.allTokenDetails = state.allTokenDetails.filter((token) =>
                token.type === "tokenBlock"
                    ? token.startIndex != tokenBlockId
                    : state.allTokenDetails
            );

            for (const idx in allTokenStartIndex) {
                for (const tokenId in state.allTokenDetails) {
                    if (
                        state.allTokenDetails[tokenId].startIndex ===
                            allTokenStartIndex[idx] &&
                        state.allTokenDetails[tokenId].type === "token"
                    ) {
                        // put the tokens active again
                        state.allTokenDetails[tokenId].isActive = true;
                    }
                }
            }
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
            if (state.allClassesInfos.length === 0) {
                state.anyClasseAdded = false;
            }

            state.allClassesInfos = state.allClassesInfos.filter(
                (c) => c.id != payload
            );
            // if the class deleted was the current class
            // we have to reset our state "currentClass"
            if (state.currentClass.id === payload) {
                state.currentClass = {};
            }
        },
        exportAnnotation(state) {
            const filename = "entities_for_spacy.json";

            const allClasses = state.allClassesInfos.map((x) => x.name);
            let allEntities = [];
            for (let idx in state.allTokenDetails) {
                if (state.allTokenDetails[idx].label !== null) {
                    allEntities.push([
                        state.allTokenDetails[idx].startIndex,
                        state.allTokenDetails[idx].endIndex,
                        state.allTokenDetails[idx].label,
                    ]);
                }
            }

            // create an object before convert it into json
            let output = {
                classes: allClasses,
                annotations: [
                    state.inputText,
                    {
                        entities: allEntities,
                    },
                ],
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
        },
        resetAll() {
            store.replaceState(initialStateCopy);
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
        },
    },
});
