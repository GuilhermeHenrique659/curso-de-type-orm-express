#! /bin/bash

npm install
npm run typeorm -- -d ./src/shared/typeorm/index.ts migration:run
npm run dev