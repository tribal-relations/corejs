import "reflect-metadata";
import TribalRelationsGame from "./app/tribal-relations-game";
import {container} from "tsyringe";

const names = ['artem', 'rinat', 'gena', 'vlad']

const trGame = container.resolve(TribalRelationsGame);
trGame.startConsole(names)