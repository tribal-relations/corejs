import 'reflect-metadata'
import { container } from 'tsyringe'
import TribalRelationsGame from './outer/TribalRelationsGame.ts'

const trGame: TribalRelationsGame = container.resolve(TribalRelationsGame)
trGame.startConsole()
