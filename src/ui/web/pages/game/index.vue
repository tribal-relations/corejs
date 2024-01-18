<template>
    <div class="page-container">
        <div v-if="isStartingRound">
            <startingRound
                :onStartClick="onStartClick"
                :defaultPlayerNames="gamePage.defaultPlayerNames"
            />
        </div>

        <div v-if="isRegularRound">
            <regularRound />
        </div>
        <div v-if="isFinished">
            <gameFinished :game="gamePage.game" />
        </div>

        <div v-if="!isFinished" class="fixed-bottom-right">
            <q-btn
                label="Finish this game"
                no-caps
                @click="onFinishClick"
            />
        </div>
    </div>
</template>

<script lang="ts">
import EndGameManager from '../../../../app/EndGameManager.ts'
import { container } from '../../../../NaiveDiContainer.ts'
import GameFinished from '../../components/gameFinished.vue'
import RegularRound from '../../components/regularRound.vue'
import StartingRound from '../../components/startingRound.vue'
import GamePage from '../../logic/GamePage.ts'

const gamePage: GamePage = container.resolveSafely(GamePage)
const endGameManager: EndGameManager = container.resolveSafely(EndGameManager)

export default {
    components: {
        StartingRound,
        GameFinished,
        RegularRound,
    },
    data() {
        return {
            isStartingRound: true,
            isRegularRound: false,
            isRelationsRound: false,
            isFinished: false,
            endGameManager,
            gamePage,
        }
    },
    mounted() {
        document.title = 'Tribal Relations'
    },
    methods: {
        onStartClick(playerNames) {
            this.gamePage.onStartClick(playerNames)
            this.isStartingRound = false
            this.isRegularRound = true
        },

        onFinishClick() {
            this.isFinished = true
            this.isStartingRound = false
            this.isRegularRound = false
            this.endGameManager.initiateFinish()
        },
    },
}

</script>
<style scoped>
.page-container {
    margin-left: 5em;
    margin-right: 5em;
}
</style>
