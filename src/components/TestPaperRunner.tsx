"use client";

import { useMemo, useState } from "react";
import type { McqQuestion } from "@/lib/testLibrary";

export default function TestPaperRunner({
  questions
}: {
  questions: McqQuestion[];
}) {
  const negativeMarkingPenalty = 0.25;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [negativeMarkingEnabled, setNegativeMarkingEnabled] = useState(false);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const correctCount = useMemo(
    () =>
      questions.reduce(
        (count, question) => count + (answers[question.id] === question.answer ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  const unansweredCount = totalQuestions - answeredCount;
  const incorrectCount = answeredCount - correctCount;
  const deduction = negativeMarkingEnabled ? incorrectCount * negativeMarkingPenalty : 0;
  const finalScore = correctCount - deduction;

  function formatScore(value: number) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }

  function handleSelect(questionId: number, option: string) {
    if (submitted) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionId]: option
    }));
  }

  function resetTest() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="test-paper-shell">
      <div className="test-question-list">
        {questions.map((question) => {
          const selectedAnswer = answers[question.id];
          const isCorrect = submitted && selectedAnswer === question.answer;
          const isIncorrect = submitted && selectedAnswer && selectedAnswer !== question.answer;
          const isUnanswered = submitted && !selectedAnswer;

          return (
            <article className="resource-card test-question-card" key={question.id}>
              <div className="test-question-head">
                <p className="resource-meta">Question {question.id}</p>
                {submitted ? (
                  <span
                    className={`test-question-status${
                      isCorrect
                        ? " is-correct"
                        : isIncorrect
                          ? " is-incorrect"
                          : isUnanswered
                            ? " is-unanswered"
                            : ""
                    }`}
                  >
                    {isCorrect ? "Correct" : isIncorrect ? "Incorrect" : "Unanswered"}
                  </span>
                ) : null}
              </div>
              <p className="test-question-text">{question.text}</p>
              <ol className="test-option-list" type="A">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const shouldShowCorrect = submitted && option === question.answer;
                  const shouldShowIncorrect = submitted && isSelected && option !== question.answer;

                  return (
                    <li
                      className={`test-option-item${
                        isSelected ? " is-selected" : ""
                      }${shouldShowCorrect ? " is-correct" : ""}${
                        shouldShowIncorrect ? " is-incorrect" : ""
                      }`}
                      key={option}
                    >
                      <label className="test-option-label">
                        <input
                          checked={isSelected}
                          className="test-option-input"
                          disabled={submitted}
                          name={`question-${question.id}`}
                          onChange={() => handleSelect(question.id, option)}
                          type="radio"
                        />
                        <span className="test-option-text">{option}</span>
                      </label>
                    </li>
                  );
                })}
              </ol>
              {submitted ? (
                <div className="test-answer">
                  <div className="test-answer-body">
                    <strong>Correct answer: {question.answer}</strong>
                    <p>{question.rationale}</p>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <article className="resource-card test-score-card">
        <p className="resource-meta">Test Progress</p>
        <h3>
          {submitted
            ? `Score ${formatScore(finalScore)}/${totalQuestions}`
            : `Answered ${answeredCount}/${totalQuestions}`}
        </h3>
        <p>
          {submitted
            ? "Your score is ready. Review the correct answers, deductions, and explanations above."
            : "Select one option for each question and submit whenever you want to check the score."}
        </p>
        <label className="test-toggle">
          <input
            checked={negativeMarkingEnabled}
            onChange={(event) => setNegativeMarkingEnabled(event.target.checked)}
            type="checkbox"
          />
          <span>Enable negative marking practice mode (-0.25 for each wrong answer)</span>
        </label>
        <div className="test-score-grid">
          <div>
            <span>Answered</span>
            <strong>{answeredCount}</strong>
          </div>
          <div>
            <span>Correct</span>
            <strong>{submitted ? correctCount : "-"}</strong>
          </div>
          <div>
            <span>Incorrect</span>
            <strong>{submitted ? incorrectCount : "-"}</strong>
          </div>
          <div>
            <span>Deduction</span>
            <strong>{submitted ? formatScore(deduction) : "-"}</strong>
          </div>
          <div>
            <span>Unanswered</span>
            <strong>{submitted ? unansweredCount : totalQuestions - answeredCount}</strong>
          </div>
          <div>
            <span>Final Score</span>
            <strong>{submitted ? formatScore(finalScore) : "-"}</strong>
          </div>
        </div>
        <div className="hero-actions">
          <button
            className="button primary accent"
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={submitted || answeredCount === 0}
          >
            Submit Test
          </button>
          <button className="button primary" type="button" onClick={resetTest}>
            Reset Test
          </button>
        </div>
      </article>
    </div>
  );
}
