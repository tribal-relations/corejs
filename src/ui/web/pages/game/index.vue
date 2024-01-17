<template>
    <div class="page-container">
        <div v-if="isStartingRound">
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
                        @click="onStartClick"
                    />
                </div>
            </div>
        </div>

        <div v-if="isRegularRound">
            <div class="header-container text-h6 bg-cyan-3">
                <div>Round {{ gamePage.game.currentRoundNumber }}</div>

                <div>{{ actionsTaken }}/{{ gamePage.howManyActionsCanTribePerformThisTurn(gamePage.game.currentTurn.player.tribe) }} actions taken</div>

                <div>
                    <q-btn
                        class="bg-amber-1"
                        :label="btnLabel"
                        no-caps
                        @click="onNextTurnClick"
                    />
                </div>
            </div>
            <div class="q-pa-md row items-start q-gutter-md">
                <span
                    v-for="player in gamePage.game.players"
                    :key="player.name"
                >
                    <playerInfo
                        :isCurrentTurn="gamePage.game.currentTurn.player.name === player.name"
                        :player="player"
                    />
                </span>
            </div>
            <hr>
            <div class="q-pa-md row items-start q-gutter-md">
                <span
                    v-for="action in gamePage.game.possibleActions"
                    :key="action.name"
                >
                    <actionInfo :action="action" :currentTurn="gamePage.game.currentTurn" />
                </span>
            </div>
        </div>
        <div v-if="isFinished">
            <div>
                <h3>Game over</h3>
                <h6>Winner: {{ gamePage.game.specificGame.winner }}</h6>
            </div>
            <div>
                <div
                    v-for="playerName in gamePage.game.players"
                    :key="playerName"
                >
                    {{ gamePage.game.currentTurn.player[playerName].tribe.name }} ({{ playerName }}) points:
                    {{ gamePage.game.currentTurn.player[playerName].tribe.points }}
                </div>
            </div>
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
import EndGameManager from '../../../../app/EndGameManager'
import { container } from '../../../../NaiveDiContainer.ts'
import ActionInfo from '../../components/actionInfo.vue'
import PlayerInfo from '../../components/playerInfo.vue'
import GamePage from '../../logic/GamePage'

const gamePageConst: GamePage = container.resolveSafely(GamePage)
const endGameManagerConst: EndGameManager = container.resolveSafely(EndGameManager)

export default {
    components: {
        PlayerInfo, ActionInfo,
    },
    data() {
        return {
            actionsTaken: 0,
            roundNumber: 0,
            btnLabel: 'Next turn',
            isStartingRound: true,
            isRegularRound: false,
            isRelationsRound: false,
            isFinished: false,
            currentStep: '',
            playerNames: [
                'John',
                'Jane',
                'Jack',
                'Joe',
            ],
            playerNameInputs: 4,
            areRulesShown: false,
            endGameManager: endGameManagerConst,
            gamePage: gamePageConst,
        }
    },
    mounted() {
        document.title = 'Tribal Relations'
    },
    methods: {
        onStartClick() {
            this.gamePage.onStartClick(this.playerNames)
            this.isStartingRound = false
            this.isRegularRound = true
        },

        isPlayerNameValid(name, index) {
            for (let i = 0; i < this.playerNameInputs; ++i) {
                if (name === this.playerNames[i] && i !== index) {
                    return false
                }
            }
            return !!name
        },
        onNextTurnClick() {
            this.btnLabel = 'Next action'
            this.actionsTaken++
            if (this.actionsTaken - 1 === this.gamePage.howManyActionsCanTribePerformThisTurn(this.gamePage.game.currentTurn.player.tribe)) {
                this.btnLabel = 'Next turn'
            }

            if (this.actionsTaken >= this.gamePage.howManyActionsCanTribePerformThisTurn(this.gamePage.game.currentTurn.player.tribe)) {
                this.gamePage.onNextTurnClick()
                this.actionsTaken = 0
            }
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

.header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-radius: 1em;
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
