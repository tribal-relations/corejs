<template>
    <div>
        <h1>Welcome to Tribal Relations</h1>
    </div>
    <div
        class="button"
        @click="onStartClick"
    >
        start game button
    </div>
    <div>
        rules
    </div>
</template>

<script lang="ts">

import {container} from 'src/NaiveDiContainer.ts'
import TribalRelationsGame from '../../../outer/TribalRelationsGame'

export default {
    methods: {
        onStartClick() {
            const trGame = container.resolve(TribalRelationsGame)
            trGame.startBrowser()
        },
    },
}

</script>