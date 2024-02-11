<template>
    <div>
        <div v-for="(tile, index) in tiles" :key="index">
            {{ tile.resourceName }}:
            {{ getFoodString(tile) }}
            {{ getProductionString(tile) }}
            {{ getCultureString(tile) }}
            {{ getMercantilityString(tile) }}
        </div>
    </div>
</template>

<script lang="ts">

import type Tile from '../../../domain/entity/Tile.ts'

export default {
    props: {
        tiles: { type: Array, default: () => [] },
    },
    data() {
        return {
        }
    },
    methods: {
        getFoodString(tile: Tile): string {
            if (tile.food) {
                return `${tile.food}🍏`
            }
            return ''
        },
        getProductionString(tile: Tile): string {
            if (tile.production) {
                return `${tile.production}🛠`
            }
            return ''
        },
        getCultureString(tile: Tile): string {
            if (tile.culture) {
                return `${tile.culture}🎵`
            }
            return ''
        },
        getMercantilityString(tile: Tile): string {
            if (tile.mercantility) {
                return `${tile.mercantility}💰`
            }
            return ''
        },
    },
}

</script>
<style scoped>

</style>
