import { aggregateFunctions } from "../data/postgresql/aggregates";
import { operators } from "../data/postgresql/operators";
import { dataTypes } from "../data/postgresql/types";
import { userFunctions } from "../data/postgresql/user_functions";

export const PostgreSQL = [
  ...aggregateFunctions,
  ...operators,
  ...dataTypes,
  ...userFunctions
];
