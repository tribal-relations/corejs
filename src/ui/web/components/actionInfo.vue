<template>
    <div>
        <q-card @click="onCardClick">
            <q-card-section>
                {{ action.name }}
            </q-card-section>
        </q-card>
    </div>
    <div v-if="isModalOpened">
        <q-dialog v-model="isModalOpened">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">
                        {{ action.name }}
                    </div>
                    <q-space />
                    <q-btn v-close-popup icon="close" flat round dense />
                </q-card-section>

                <q-card-section>
                    {{ action.description }}
                    <div v-for="(parameter, index) in action.parameters" :key="index">
                        <q-select
                            v-if="parameter.enum !== Number && parameter.name !== 'Tile Resource Name'"
                            v-model="parameters[parameter.name].model"
                            :options="parameters[parameter.name].options"
                            :label="parameter.name"
                        />
                        <q-select
                            v-if="parameter.name === 'Tile Resource Name'"
                            v-model="parameters[parameter.name].model"
                            :options="getTribeResourceNames(parameters['Tribe Name'].model)"
                            :label="parameter.name"
                        />
                        <q-input
                            v-if="parameter.enum === Number"
                            v-model="parameters[parameter.name].model"
                            :label="parameter.name"
                        />
                    </div>

                    <q-btn label="Confirm action" @click="onConfirmAction" />
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">

import GameplayAction from '../../../domain/entity/action/GameplayAction'
import Turn from '../../../domain/entity/Turn'
import ActionName from '../../../domain/enum/ActionName'
import type TribeName from '../../../domain/enum/TribeName'
import { container } from '../../../NaiveDiContainer'
import GamePage from '../logic/GamePage'

const gamePageConst: GamePage = container.resolveSafely(GamePage)

export default {
    props: {
        action: { type: GameplayAction, required: true },
        currentTurn: { type: Turn, required: true },
    },
    data() {
        return {
            isActionClicked: false,
            isModalOpened: false,
            parameters: {
                // options: []
                // model: ''
            },
            gamePage: gamePageConst,
        }
    },
    mounted() {
        this.setParameters()
        this.setOptions()
    },
    methods: {
        setParameters() {
            for (const paramIndex in this.action.parameters) {
                this.parameters[this.action.parameters[paramIndex].name] = {
                    options: [],
                    model: '',
                }
            }
        },
        setOptions() {
            if (this.action.parameters.length && this.action.parameters[0].name === 'Tribe Name') {
                this.parameters['Tribe Name'].options = this.gamePage.getCurrentTribeNames()
            }
            if (this.action.name === ActionName.Research) {
                this.parameters['Technology Name'].options = this.gamePage.getPossibleTechnologiesForTribe(this.currentTurn.player.tribe)
            }
        },
        getTribeResourceNames(tribeName: TribeName) {
            if (!tribeName) {
                return []
            }
            return this.gamePage.getTribeResourceNamesByTribeName(tribeName)
        },
        onCardClick() {
            this.isActionClicked = true
            if (this.action.parameters.length) {
                this.isModalOpened = true
            } else {
                console.log('action without parameters - confirm immediately')
            }
        },
        onConfirmAction() {
            // TODO create PlayerActionInterface with correct parametes
            console.log('action confirmed', this.parameters)
            // this.gamePage.processTurn(decision, this.currentTurn)
        },
    },
}

</script>
<style scoped>

</style>
