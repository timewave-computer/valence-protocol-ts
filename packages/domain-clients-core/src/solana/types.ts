import {
  TOKEN_PROGRAM_ADDRESS,
  TOKEN_2022_PROGRAM_ADDRESS,
} from 'gill/programs';

export type TokenProgramId =
  | typeof TOKEN_PROGRAM_ADDRESS
  | typeof TOKEN_2022_PROGRAM_ADDRESS;
