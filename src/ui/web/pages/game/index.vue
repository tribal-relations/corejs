<template>
    <div class="page-container">
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
                :rules="[val => isPlayerNameValid(val, index) || 'Field is required']"
            />

            <!--            <q-btn-->
            <!--                label="➕"-->
            <!--                @click="onAddPlayerNameInputClick"-->
            <!--            />-->
        </div>
        <div>
            <div class="container">
                <q-btn
                    color="secondary"
                    label="Start 🚀"
                    @click="onStartClick"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { container } from '../../../../NaiveDiContainer.ts'
import BrowserGameProcess from '../../../../outer/BrowserGameProcess'
import type WebUi from '../../WebUi'

export default {
    data() {
        return {
            playerNames: [],
            playerNameInputs: 4,
            areRulesShown: false,
            browserGameProcess: container.resolveSafely(BrowserGameProcess),
        }
    },
    mounted() {
        document.title = 'Tribal Relations'
        this.browserGameProcess.start()
    },
    methods: {
        onAddPlayerNameInputClick() {
            this.playerNameInputs++
        },
        onStartClick() {
            console.log(this.playerNames)

            const webUi: WebUi = this.browserGameProcess.playerInterface
            webUi.startTurns(this.playerNames)
        },
        isPlayerNameValid(name, index) {
            for (let i = 0; i < this.playerNameInputs; ++i) {
                if (name === this.playerNames[i] && i !== index) {
                    return false
                }
            }
            return !!name
        },

        onFinishClick() {
            this.browserGameProcess.endGameManager.initiateFinish()
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
