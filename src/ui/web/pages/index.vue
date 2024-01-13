<template>
    <div class="page-container">
        <div>
            <h1>Tribal Relations</h1>
        </div>
        <div>
            <h6 class="text-weight-light">
                This is a boardgame about tribes and their relations. Tribes strive to conquer Rome.
                Whoever conquers the first, wins.
            </h6>
        </div>
        <div class="">
            <div class="container">
                <q-btn
                    color="secondary"
                    label="Start 🚀"
                    @click="onStartClick"
                />
                <q-btn
                    :label="`${areRulesShown ? 'Hide':'Show'} rules 📜`"
                    class="button"
                    @click="onRulesClick"
                />
                <div>
                    <div v-if="areRulesShown">
                        <q-card>
                            <q-card-section>
                                You play as a tribe. To win, you must conquer the city in the center of the map.
                                Other tribes will attempt to do the same.
                                You can ally with them or oppose them.
                                Choose wisely!
                                The game will block any impossible action. Try and see if you can learn the rules by
                                playing!
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            areRulesShown: false,
        }
    },
    mounted() {
        document.title = 'Tribal Relations'
    },
    methods: {
        onStartClick() {
            window.location.href = 'game'
        },
        onRulesClick() {
            this.areRulesShown = !this.areRulesShown
        },
    },
}

</script>
<style scoped>
.page-container {
    margin: 100px;
}

.container {
    display: flex;
    margin: 20px;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
}
</style>
