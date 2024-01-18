<template>
    <div>
        <div>
            <h3>Game over</h3>
            <h6>Winner: {{ game.specificGame.winner }}</h6>
        </div>
        <div>
            <div
                v-for="playerName in game.players"
                :key="playerName"
            >
                {{ game.currentTurn.player[playerName].tribe.name }} ({{ playerName }}) points:
                {{ game.currentTurn.player[playerName].tribe.points }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import CurrentGame from '../../../app/CurrentGame.ts'

export default {
    props: {
        game: { type: CurrentGame, required: true },
    },
    data() {
        return {
        }
    },
    methods: {
    },
}

</script>
<style scoped>

</style>
