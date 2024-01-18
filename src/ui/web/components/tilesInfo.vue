<template>
    <div>
        <div v-for="(tile, index) in tiles" :key="index">
            {{ tile.resource.name }}:
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
            if (tile.resource.food) {
                return `${tile.resource.food}🍏`
            }
            return ''
        },
        getProductionString(tile: Tile): string {
            if (tile.resource.production) {
                return `${tile.resource.production}🛠`
            }
            return ''
        },
        getCultureString(tile: Tile): string {
            if (tile.resource.culture) {
                return `${tile.resource.culture}🎵`
            }
            return ''
        },
        getMercantilityString(tile: Tile): string {
            if (tile.resource.mercantility) {
                return `${tile.resource.mercantility}💰`
            }
            return ''
        },
    },
}

</script>
<style scoped>

</style>
