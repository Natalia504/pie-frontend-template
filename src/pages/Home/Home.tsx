import React from "react";
import { Counter } from "@pie/components";
import { Layout } from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";

import { countSelector, counter } from "../../store/counter";
import { Action } from "redux";

const {
  actions: { increment, decrement }
} = counter;

export const Home: React.FC = () => {
  const count = useSelector(countSelector);
  const dispatch = useDispatch();
  return (
    <Layout>
      <Counter
        value={count}
        onIncrement={(): Action => dispatch(increment())}
        onDecrement={(): Action => dispatch(decrement())}
      />
    </Layout>
  );
};
