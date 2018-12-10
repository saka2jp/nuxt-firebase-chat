<template>
  <section class="container">
    <form @submit.prevent="login">
      <input class="loginName" v-model="loginName" type="text" placeholder="ログイン名を入力してください"/>
      <button class="btnLogin" type="submit">ログイン</button>
    </form>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        loginName: "",
      }
    },
    methods: {
      login() {
        this.$router.push({ name: 'talk', params: { loginName: this.loginName }});
      }
    }
  }
</script>

<style>
  .container {
    background-color: #eeeeee;
    min-height: 100vh;
    text-align: center;
  }

  .loginName {
    margin: 5vw auto;
    padding: 10px;
    width: 80vw;
    font-size: 1.1rem;
  }

  .btnLogin {
    margin: 0 auto;
    background-color: #333333;
    width: 50vw;
    border-radius: 5px;
    padding: 10px;
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
</style>
