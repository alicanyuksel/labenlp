import Vuex from "vuex";
import Vue from 'vue'
import { nerStore } from "./modules/ner.js"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
    ner: nerStore,
    }
  });
  