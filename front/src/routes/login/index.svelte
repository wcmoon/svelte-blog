<script lang="ts">
import Cookies from 'js-cookie'
import request from "../../utils/request";

let username = '';
let password = '';

async function submit() {
  let res = await request('/api/auth/login', {
    method: 'post',
    body: {
      username,
      password
    }
  }) as {token:string};
  if (!res) return;
  Cookies.set('token', res.token);
  location.href = '/';
}
</script>


<section>
  <h1>LOGIN</h1>
  <form action="">
    <input bind:value="{username}" type="text" class="form-item" placeholder="Account" />
    <input bind:value="{password}" type="password" class="form-item" placeholder="Password" />
    <input type="button" value="LOGIN" on:click={submit} />
  </form>
</section>

<style lang="less">
section {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: ' ';
    width: 100vw;
    height: 100vh;
    background-image: url("$lib/login/bg.jpeg");
    background-size: 2736px  1824px;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: .4;
    z-index: -1;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;

    input {
      width: 330px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: 1px solid rgba(230, 230, 230, 1);
      padding: 0;
    }

    .form-item {
      text-indent: 30px;
      margin-bottom: 30px;
    }

    input[type=button] {
      cursor: pointer;
    }
  }

}
</style>
