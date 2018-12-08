import { observable, reaction, toJS } from "mobx";
import { List } from "../models/list";
import exampleStore from "./example-store.json";

const MAIN_STORE_KEY = "@BillSplit-Store";

import { AsyncStorage } from "react-native";
export class MainStore {
  @observable list = new List();
  @observable currentBill = null;
  static fromJSON(store) {
    const instance = new MainStore();
    instance.list = List.fromJSON(store.list);
    return instance;
  }
  updateFromJSON(store) {
    this.list = List.fromJSON(store.list);
  }
}
export const preloadStoreFromStorage = async store => {
  const serialized = await AsyncStorage.getItem(MAIN_STORE_KEY);
  const json = JSON.parse(serialized);
  if (json) {
    store.updateFromJSON(json);
  }
};
// export let store = MainStore.fromJSON(exampleStore);
// AsyncStorage.removeItem(MAIN_STORE_KEY);
export let store = new MainStore();
preloadStoreFromStorage(store);

const deeplyObservableStore = observable(store);
reaction(
  () => toJS(deeplyObservableStore),
  () => {
    AsyncStorage.setItem(MAIN_STORE_KEY, JSON.stringify(store));
  }
);
