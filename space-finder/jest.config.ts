import {Config} from '@jest/types';

const baseTestDirectory = '<rootDir>/src/test/services';

const config: Config.InitialOptions ={
   preset: 'ts-jest',
   testEnvironment: 'node',
   testMatch: [
    `${baseTestDirectory}/**/*test.ts`
   ]

}

export default config;