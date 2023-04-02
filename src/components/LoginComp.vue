<template>
    <div class="login">
        <div id="recaptcha-container"></div>
        <div class="login-container">
            <div class="login-container_header">
                <h1>Login</h1>
            </div>
            <div class="login-container_body">
                <div class="login-container_body_input">
                    <span class="p-input-icon-left">
                        <i class="pi pi-envelope" />
                        <InputText type="email" mask="" v-model="userMail" placeholder="Email" />
                    </span>
                </div>
                <div class="login-container_body_input">
                        <Password v-model="userPassword" :feedback="false" placeholder="Password" toggleMask />
                </div>
                <div class="login-container_body_button">
                    <Button type="button" severity="secondary" label="Login" icon="pi pi-unlock" :loading="loading" @click="handleLogin" />

                </div>
                <div v-if="showAlert">
                    <Message :life="5000" :sticky="false" :severity="alertType">{{ errorMessage }}</Message>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
export default {
    name: 'LoginComp',
    components: {
        Button,
        InputText,
        Password,
        Message
    },
    data() {
        return {

            userMail: '',
            userPassword: '',
            loading:false,
            showAlert: false,
            alertType: '',
            errorMessage: ''
        }
    },
    methods: {
        handleLogin() {
            this.loading=true
            this.$store.dispatch('LOGIN', {
                data: {
                    userMail: this.userMail,
                    userPassword: this.userPassword
                },
                onSuccess: (user) => {
                    this.$router.push({ name: 'home' }),
                        localStorage.setItem('user', JSON.stringify(user))
                        this.loading=false;
                },
                onFail: (error) => {
                    this.showAlert = true
                    this.alertType = 'error'
                    this.errorMessage = error
                    this.loading=false;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    margin-top: 25vh;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-container {
    width: 100%;
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;

    &_header {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    &_body {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &_input {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 10px;

            &_otp {
                margin: 10px;
            }
        }
    }
}
</style>