import { useState, useCallback } from 'react';
import { useSelector } from 'umi';
import produce, { Draft, enableES5 } from 'immer';
import equal from 'fast-deep-equal';

enableES5();

export function useDeepEqualSelector<TState = {}, TSelected = unknown>(
  selector: (state: TState) => TSelected,
) {
  return useSelector(selector, (left, right) => equal(left, right));
}

export function useImmer<S = any>(
  initialValue: S | (() => S),
): [S, (f: (draft: Draft<S>) => void | S) => void];
export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(initialValue);
  return [
    val,
    useCallback((updater) => {
      updateValue(produce(updater));
    }, []),
  ];
}
