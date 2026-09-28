import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {OptionBadge} from '../components/OptionBadge';
import {CheckIcon, ArrowRightIcon} from '../components/icons';
import type {Quiz} from '../data/quizzes';

type Props = {
  quiz: Quiz;
  onFinish: (score: number, total: number) => void;
};

const optionKeys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

export function QuizScreen({quiz, onFinish}: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = quiz.questions[questionIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const progress = ((questionIndex + 1) / quiz.questions.length) * 100;

  const isLastQuestion = questionIndex === quiz.questions.length - 1;

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const timer = setTimeout(() => {
      if (isLastQuestion) {
        const score = quiz.questions.reduce((acc, question) => {
          return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
        }, 0);
        onFinish(score, quiz.questions.length);
      } else {
        setQuestionIndex(index => index + 1);
        setSubmitted(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [submitted, isLastQuestion, quiz, answers, onFinish]);

  const handleSelect = (optionIndex: number) => {
    if (submitted) {
      return;
    }
    setAnswers(previous => ({
      ...previous,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (selectedAnswer === undefined) {
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    const selectedOption = currentQuestion.options[selectedAnswer];
    const selectedLabel = optionKeys[selectedAnswer];

    return (
      <View className="flex-1 items-center justify-center bg-background px-6 dark:bg-background-dark">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-success/10 dark:bg-success-dark/20">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-success dark:bg-success-dark">
            <CheckIcon size={32} color="#ffffff" />
          </View>
        </View>

        <Text className="mt-8 text-center text-4xl font-bold text-text-primary dark:text-text-primary-dark lg:text-5xl">
          Answer submitted
        </Text>

        <Text className="mt-3 text-center text-lg text-text-secondary dark:text-text-secondary-dark">
          You chose {selectedLabel} · {selectedOption}
        </Text>

        <View className="mt-8 w-full max-w-xl rounded-2xl border border-border bg-card p-6 dark:border-border-dark dark:bg-card-dark">
          <View className="flex-row items-center gap-4">
            <View className="relative h-4 w-4">
              <View className="absolute inset-0 rounded-full bg-warning/30 dark:bg-warning-dark/30" />
              <View className="absolute inset-1 rounded-full bg-warning dark:bg-warning-dark" />
            </View>
            <Text className="flex-1 text-text-secondary dark:text-text-secondary-dark">
              Waiting for your teacher to show the next question…
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background px-6 py-6 dark:bg-background-dark">
      {/* Progress header */}
      <View className="mb-6 flex-row items-center gap-4">
        <Text className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
          Question {questionIndex + 1} of {quiz.questions.length}
        </Text>
        <View className="h-2 flex-1 overflow-hidden rounded-full bg-border dark:bg-border-dark">
          <View
            className="h-full rounded-full bg-primary dark:bg-primary-dark"
            style={{width: `${progress}%`}}
          />
        </View>
      </View>

      {/* Concept tag & question */}
      <View className="items-center">
        <View className="rounded-lg border border-border bg-surface px-4 py-1.5 dark:border-border-dark dark:bg-surface-dark">
          <Text className="text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark">
            Concept
          </Text>
        </View>

        <Text className="mt-5 max-w-4xl text-center text-2xl font-bold text-text-primary dark:text-text-primary-dark lg:text-4xl">
          {currentQuestion.question}
        </Text>
      </View>

      {/* Options grid */}
      <View className="mt-8 flex-1 flex-row flex-wrap justify-center gap-4">
        {currentQuestion.options.map((option, index) => {
          const key = optionKeys[index];
          const selected = selectedAnswer === index;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => handleSelect(index)}
              className={`w-full flex-row items-center gap-4 rounded-2xl border-2 bg-card p-5 dark:bg-card-dark md:w-[48%] ${
                selected
                  ? 'border-success bg-success/5 dark:border-success-dark dark:bg-success-dark/10'
                  : 'border-border dark:border-border-dark'
              }`}>
              <OptionBadge option={key} />
              <Text
                className={`flex-1 text-lg font-semibold lg:text-xl ${
                  selected
                    ? 'text-text-primary dark:text-text-primary-dark'
                    : 'text-text-primary dark:text-text-primary-dark'
                }`}>
                {option}
              </Text>
              {selected && (
                <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-success dark:border-success-dark">
                  <CheckIcon
                    size={16}
                    className="text-success dark:text-success-dark"
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom action bar */}
      <View className="mt-4 flex-row items-center justify-between">
        <Text className="text-text-secondary dark:text-text-secondary-dark">
          {selectedAnswer === undefined
            ? 'Tap an answer to choose it'
            : `You chose ${optionKeys[selectedAnswer]} · ${
                currentQuestion.options[selectedAnswer]
              }. Tap another to change.`}
        </Text>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={selectedAnswer === undefined}
          className={`flex-row items-center gap-2 rounded-xl px-6 py-3.5 ${
            selectedAnswer === undefined
              ? 'bg-border dark:bg-border-dark'
              : 'bg-primary dark:bg-primary-dark'
          }`}>
          <Text
            className={`text-base font-semibold ${
              selectedAnswer === undefined
                ? 'text-text-muted dark:text-text-muted-dark'
                : 'text-white'
            }`}>
            Submit answer
          </Text>
          <ArrowRightIcon
            size={18}
            color={selectedAnswer === undefined ? '#64748b' : '#ffffff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
