<template>
    <div>
        <div>
            <h1>Adding Players</h1>
        </div>
        <div>
            <q-input
                v-for="index in [...Array(playerNameInputs).keys()]"
                :key="index"
                :ref="`playerNameInputRef${index}`"
                v-model="playerNames[index]"
                :label="`player ${index+1} name`"
                :rules="[val => isPlayerNameValid(val, index) || 'Name is required and must be unique']"
            />
        </div>
        <div>
            <div class="container">
                <q-btn
                    color="secondary"
                    label="Start 🚀"
                    @click="onStartClick(playerNames)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    props: {
        onStartClick: { type: Function, required: true },
        defaultPlayerNames: { type: Array, required: true },
    },
    data() {
        return {
            playerNames: this.defaultPlayerNames,
            playerNameInputs: this.defaultPlayerNames.length ?? 4,
        }
    },
    methods: {
        isPlayerNameValid(name, index) {
            for (let i = 0; i < this.playerNameInputs; ++i) {
                if (name === this.playerNames[i] && i !== index) {
                    return false
                }
            }
            return !!name
        },
    },
}

</script>
<style scoped>
.container {
    display: flex;
    margin: 20px;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
}
</style>
