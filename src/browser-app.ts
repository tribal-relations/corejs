import 'reflect-metadata'
import { container } from 'tsyringe'
import TribalRelationsGame from './outer/TribalRelationsGame'

const trGame = container.resolve(TribalRelationsGame)
trGame.startBrowser()
