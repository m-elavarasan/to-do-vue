<template>
    <div class="header-container">
        <div class="header-container_title">
            <h3>TO DO</h3>
        </div>
        <div class="header-container_menu">
            <div class="header-container_menu_item">
                <a href="#">Home</a>
            </div>
            <div class="header-container_menu_item">
                <a href="#">About</a>
            </div>
            <!-- <div class="header-container_menu_item">
                <a href="#">Contact</a>
            </div> -->
        </div>
        <div class="header-container_avatar">
            <Dropdown dropdownIcon="pi pi-user" v-model="selectedValue" :options="user_menu" optionLabel="label" :placeholder="user.email" @change="handleChanges"></Dropdown>
        </div>
</div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
export default {
    name: "HeaderComp",
    components: {
        Dropdown
    },
    data() {
        return {
            selectedValue: "",
            user: {},
            user_menu: [
                { label: 'Logout', value: 'Logout' }
            ]
        };
    },
    created() {
        const userString = localStorage.getItem('user')
        if (userString) {
        this.user = JSON.parse(userString)
    }
    },
    methods: {
        handleChanges(event) {
            if (event.value.value === 'Logout') {
                this.handleLogout()
            }
        },
        handleLogout() {
            this.$store.dispatch('LOGOUT', {
                onSuccess: () => {
                    this.$router.push({ name: 'login' })

                },
                onFail: (error) => {
                    console.log(error)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f1f1f1;
    border-bottom: 1px solid #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;

    &_title {
        width: 100px;
    }

    &_avatar {
        position: fixed;
        right: 1%;

        @media screen and (max-width: 520px) {
            display: none;
        }
    }

    &_menu {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;

        &_item {
            width: 100%;
            text-align: center;

            a {
                color: #000;
                text-decoration: none;

                &:hover {
                    color: var(--primary-color);
                    text-decoration: none;
                }
            }
        }
    }

}
</style>