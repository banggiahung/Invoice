<template>
    <header class="d-flex">
        <div class="d-flex brand">
            <img src="../assets/file-invoice-dollar-solid.png" alt="" height="50">
        </div>

    </header>
</template>

<script>
export default {
    name: 'NavBar',


}
</script>

<style lang="scss" scoped>
header {
    z-index: 99;
    background-color: #1e2139;
    flex-direction: row;
}

@media(min-width: 900px) {
    .header {
        min-height: 100%;
        min-width: 90px;
        flex-direction: column;
        border-radius: 0 20px 20px 0;
    }
}

.brand {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    height: 5rem;
}

@media(min-width: 900px) {
    .brand {
        width: 100%;

    }
}

.brand img {
    width: auto;
    height: 30px;
}
</style>