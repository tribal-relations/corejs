<template>
    <div>
        <div class="header-container text-h6 bg-cyan-3">
            <div>Round {{ regularRound.game.currentRoundNumber }}</div>

            <div>
                {{
                    actionsTaken
                }}/{{ regularRound.howManyActionsCanTribePerformThisTurn(regularRound.game.currentTurn.player.tribe) }}
                actions
                taken
            </div>

            <div>
                <q-btn
                    :label="btnLabel"
                    class="bg-amber-1"
                    no-caps
                    @click="onNextTurnClick"
                />
            </div>
        </div>
        <div class="q-pa-md row items-start q-gutter-md">
            <span
                v-for="player in regularRound.game.players"
                :key="player.name"
            >
                <playerInfo
                    :isCurrentTurn="regularRound.game.currentTurn.player.name === player.name"
                    :player="player"
                />
            </span>
        </div>
        <hr>
        <div class="q-pa-md row items-start q-gutter-md">
            <span
                v-for="action in getPossibleActions()"
                :key="action.name"
            >
                <actionInfo :action="action" :currentTurn="regularRound.game.currentTurn" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">

import ActionInfo from './actionInfo.vue'
import PlayerInfo from './playerInfo.vue'
import type GameplayAction from '../../../domain/entity/action/GameplayAction.ts'
import GameplayActionRepository from '../../../domain/repository/GameplayActionRepository.ts'
import { container } from '../../../NaiveDiContainer.ts'
import RegularRound from '../logic/RegularRound.ts'

const regularRound: RegularRound = container.resolveSafely(RegularRound)
const gameplayActionRepository: GameplayActionRepository = container.resolveSafely(GameplayActionRepository)

export default {
    components: {
        PlayerInfo, ActionInfo,
    },
    props: {},
    data() {
        return {
            actionsTaken: 0,
            roundNumber: 0,
            btnLabel: 'Next turn',
            regularRound,
        }
    },
    methods: {
        onNextTurnClick() {
            if (this.regularRound.game.currentTurn) {
                this.btnLabel = 'Next action'
                this.actionsTaken++
                const actionsCount = this.regularRound.howManyActionsCanTribePerformThisTurn(
                    this.regularRound.game.currentTurn.player.tribe,
                )
                if (this.actionsTaken - 1 === actionsCount) {
                    this.btnLabel = 'Next turn'
                }

                if (this.actionsTaken >= actionsCount) {
                    this.regularRound.onNextTurnClick()
                    this.actionsTaken = 0
                }
            }
        },
        getPossibleActions(): GameplayAction[] {
            // TODO synchronize with cli version
            return Object.values(gameplayActionRepository.getAll())
        },
    },
}

</script>
<style scoped>

.header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-radius: 1em;
}

</style>
