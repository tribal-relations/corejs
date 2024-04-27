<template>
    <span>
        <q-card
            :class="isCurrentTurn ? `bg-primary` : 'bg-grey-5'"
            bordered
        >
            <q-card-section>
                <div class="text-h6">
                    {{ player.tribe.name }}
                </div>
                <div class="text-subtitle2">
                    {{ player.name }}
                </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div>
                    points : {{ player.tribe.points }}⭐
                </div>

                <div>
                    population : {{ player.tribe.population }}🧑
                </div>

                <div>
                    power : {{ player.tribe.militaryPower }}🗡
                </div>

                <div>
                    culture : {{ player.tribe.culture }}🎵
                </div>

                <div>
                    technologies : {{ player.tribe.technologies }}
                </div>

                <div>
                    territory 🌏 : <tilesInfo :tiles="player.tribe.resources" />
                </div>
            </q-card-section>
        </q-card>
    </span>
</template>

<script lang="ts">
import TilesInfo from './tilesInfo.vue'
import Player from '../../../domain/entity/Player.ts'

export default {
    components: { TilesInfo },
    props: {
        player: { type: Player, required: true },
        isCurrentTurn: { type: Boolean, default: () => false },
    },
}

</script>
<style scoped>
</style>
