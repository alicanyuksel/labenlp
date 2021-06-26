import Vuex from "vuex";
import { nerStore } from "./modules/ner.js"

export const store = new Vuex.Store({
    modules: {
    ner: nerStore,
    }
  });
  