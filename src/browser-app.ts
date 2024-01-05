
import { container } from 'src/NaiveDiContainer.ts'
import TribalRelationsGame from './outer/TribalRelationsGame.ts'

const trGame = container.resolve(TribalRelationsGame)
trGame.startBrowser()
