<template>
  <section class="container">
    <div class="header">トーク</div>
    <div class="chatArea clearfix">
      <div v-for="item in messageDataList" v-bind:key="item.id">
        <div v-bind:class="[item.name == $route.params.loginName ? 'rightBalloon' : 'leftBalloon']">
          {{ item.message }}
        </div>
      </div>
    </div>
    {{$route.params.loginName}}
    <form @submit.prevent="chatBox">
      <div class="chatBox">
        <input class="message" v-model="message" type="text" placeholder="メッセージを入力"/>
        <button class="btnMessage" type="submit">送信</button>
      </div>
    </form>
  </section>
</template>


<script>
  import firebase  from "~/plugins/firebase.js"
  import { mapGetters } from "vuex"

  // Firestoreの読み込み
  const db = firebase.firestore();
  // Firestoreの設定
  const settings = { timestampsInSnapshots: true }
  db.settings(settings);

  export default {
    data() {
      return {
        message: null,
        // messageDataList: null data()での管理でなくなるため、削除しました。
      }
    },
    created() {
      // コレクションの参照とバインド
      this.$store.dispatch("setMessagesRef", db.collection("messages").orderBy("id"));
    },
    computed: {
      // メッセージの取得を行い、messageDataListに格納
      ...mapGetters({ messageDataList: "getMessages" })
    },
    methods: {
      chatBox() {
        // メッセージオブジェクト
        let msg = {
          // 仮で時間をidとします。（かぶる可能性あり）
          id: Date.now(),
          // ログイン画面から引き継いでいる値
          name: this.$route.params.loginName,
          // formで入力されたテキスト
          message: this.message
        };
        // message配列にpush()で値を追加
        // this.messageDataList = this.messageDataList.push(msg);
        db.collection('messages').add(msg);
        // テキストボックスを空に
        this.message = null;
      }
    }
  }
</script>

<style>
  .clearfix::after{
    content: "";
    display: block;
    clear: both;
  }

  .container {
    padding: 60px 0 120px 0;
    background-color: #7897C5;
    min-height: 100vh;
    text-align: center;
  }

  .header {
    background-color: #333333;
    width: 100vw;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 15px 0;
    position: fixed;
    top: 0;
    height: 50px;
    z-index: 1;
  }

  .chatBox {
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    height: 100px;
  }

  .message {
    margin: 20px 0 20px 5vw;
    padding: 10px;
    width: 70vw;
    font-size: 1.1rem;
  }

  .btnMessage {
    margin: 0 auto;
    background-color: #333333;
    width: 15vw;
    border-radius: 5px;
    padding: 10px;
    margin: 20px 5vw;
    text-align: center;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #ccc;
  }

  .btnLogin:hover {
    opacity: 0.8;
  }

  .leftBalloon {
    position: relative;
    background: #fff;
    border: 1px solid #777;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    margin-right: 20%;
    clear: both;
    max-width: 500px;
    float: left;
  }

  .leftBalloon:after,
  .leftBalloon:before {
      right: 100%;
      top: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
  }

  .leftBalloon:after {
      border-color: rgba(255, 255, 255, 0);
      border-right-color: #fff;
      border-width: 7px;
      margin-top: -7px;
  }

  .leftBalloon:before {
      border-color: rgba(0, 0, 0, 0);
      border-right-color: #000;
      border-width: 8px;
      margin-top: -8px;
  }

  /*******************************
  * 右からの吹き出し
  ********************************/

  .rightBalloon {
      position: relative;
      background: #85e249;
      border: 1px solid #777;
      margin: 10px;
      padding: 10px;
      border-radius: 15px;
      margin-left: 20%;
      clear: both;
      max-width: 500px;
      float: right;
  }

  .rightBalloon:after,
  .rightBalloon:before {
      left: 100%;
      top: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
  }

  .rightBalloon:after {
      border-color: rgba(133, 226, 73, 0);
      border-left-color: #85e249;
      border-width: 7px;
      margin-top: -7px;
  }

  .rightBalloon:before {
      border-color: rgba(119, 119, 119, 0);
      border-left-color: #777;
      border-width: 8px;
      margin-top: -8px;
  }

</style>