
import { container } from './src/NaiveDiContainer.ts'
import TribalRelationsGame from './outer/TribalRelationsGame.ts'

const trGame: TribalRelationsGame = container.resolve(TribalRelationsGame)
trGame.startConsole()
