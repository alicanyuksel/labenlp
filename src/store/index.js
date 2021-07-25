import Vuex from "vuex";
import Vue from 'vue'
import { nerStore } from "./modules/ner.js"
import { qaStore } from "./modules/qa.js"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
    ner: nerStore,
    qa: qaStore
    }
  });
  