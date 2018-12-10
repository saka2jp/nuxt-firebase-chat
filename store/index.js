import Vuex from 'vuex'
// VuexFireを読み込み
import { firebaseMutations, firebaseAction } from 'vuexfire'

const createStore = () => {
  return new Vuex.Store({
    state: {
      messages: [],
    },
    // データの変更
    mutations: {
      // VuexFireでのデータ変更処理
      ...firebaseMutations
    },
    actions: {
      // 参照設定
      setMessagesRef: firebaseAction(({ bindFirebaseRef }, ref) => {
        bindFirebaseRef('messages', ref)
      })
    },
    getters: {
      // メッセージ情報の取得
      getMessages: (state) => {
        return state.messages
      },
    },
  })
}

export default createStore
