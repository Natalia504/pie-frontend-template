import { call } from "redux-saga/effects";
import { mockCall } from "../../api/mockCall";
import { SagaIterator } from "redux-saga";

export function* incrementSaga(): SagaIterator {
  try {
    const res = yield call(mockCall);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
