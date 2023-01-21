import { Shuffle } from "@/functions/arrays";
import AnswerModel from "./answer";
import answerModel from "./answer";

export default class QuestionModel {
  #id: number;
  #statement: string;
  #answer: answerModel[];
  #hit: boolean;

  constructor(
    id: number,
    statement: string,
    answer: answerModel[],
    hit = false
  ) {
    this.#id = id;
    this.#statement = statement;
    this.#answer = answer;
    this.#hit = hit;
  }
  get id() {
    return this.#id;
  }

  get statement() {
    return this.#statement;
  }

  get answer() {
    return this.#answer;
  }

  get hit() {
    return this.#hit;
  }

  get notAnswered() {
    return !this.answered
  }

  get answered() {
    for (let answer of this.#answer) {
      if (answer.revealed) return true;
    }
    return false;
  }

  answerWith(index: number): QuestionModel {
    const hit = this.#answer[index]?.right;
    const answers = this.#answer.map((answer, i) => {
      const answerSelected = index === i;
      const shouldRevel = answerSelected || answer.right;
      return shouldRevel ? answer.toRevel() : answer;
    });

    return new QuestionModel(this.id, this.statement, answers, hit);
  }

  shuffleAnswer(): QuestionModel {
    let shuffledAnswer = Shuffle(this.#answer);
    return new QuestionModel(
      this.#id,
      this.#statement,
      shuffledAnswer,
      this.#hit
    );
  }

  static fromObject(obj: QuestionModel): QuestionModel {
    const answer = obj.answer.map(answer => AnswerModel.fromObject(answer))
    return new QuestionModel(obj.id, obj.statement, answer, obj.hit);
  }

  toObject() {
    return {
      id: this.#id,
      statement: this.#statement,
      answered: this.answered,
      hit: this.#hit,
      answer: this.#answer.map((resp) => resp.toObject()),
    };
  }
}
