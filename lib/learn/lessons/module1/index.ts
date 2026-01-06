import { Module } from '../types';
import { lesson1_1 } from './lesson-1-1';
import { lesson1_2 } from './lesson-1-2';
import { lesson1_3 } from './lesson-1-3';
import { lesson1_4 } from './lesson-1-4';
import { lesson1_5 } from './lesson-1-5';

export const module1: Module = {
  id: '1',
  title: 'Module 1: Foundations',
  description: 'Your first week - setting up and exploring data',
  lessons: [lesson1_1, lesson1_2, lesson1_3, lesson1_4, lesson1_5]
};

export { lesson1_1, lesson1_2, lesson1_3, lesson1_4, lesson1_5 };
