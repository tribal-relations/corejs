import 'reflect-metadata'
import { container } from 'tsyringe'
import TribalRelationsGame from './outer/TribalRelationsGame'

const names = ['artem', 'rinat', 'gena', 'vlad']

const trGame = container.resolve(TribalRelationsGame)
trGame.startConsole(names)
