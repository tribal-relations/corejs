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

import GameplayAction from '../../../domain/entity/action/GameplayAction.ts'
import Turn from '../../../domain/entity/Turn.ts'
import type TribeName from '../../../domain/enum/TribeName.ts'
import { container } from '../../../NaiveDiContainer.ts'
import ActionInfo from '../logic/ActionInfo.ts'

const actionInfo: ActionInfo = container.resolveSafely(ActionInfo)

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
            actionInfo,
        }
    },
    mounted() {
        this.parameters = this.actionInfo.initializeParameters(this.action, this.currentTurn)
    },
    methods: {
        getTribeResourceNames(tribeName: TribeName) {
            if (!tribeName) {
                return []
            }
            return this.actionInfo.getTribeResourceNamesByTribeName(tribeName)
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
            // this.actionInfo.processTurn(decision, this.currentTurn)
        },
    },
}

</script>
<style scoped>

</style>
