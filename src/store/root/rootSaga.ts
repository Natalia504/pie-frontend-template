import { all, takeLeading } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import { incrementSaga } from "../sagas/incrementSaga";
import { counter } from "../counter";

export default function* rootSaga(): SagaIterator {
  yield all([takeLeading(counter.actions.increment, incrementSaga)]);
}
