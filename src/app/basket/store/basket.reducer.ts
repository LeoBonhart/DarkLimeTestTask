import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/products/product/product';
import * as actions from './basket.actions';


export const basketFeatureKey = 'basket';

export interface IBasket extends IProduct {
  productId?: string;
  count?: number;
}

export interface State extends EntityState<IBasket> {
  updateDate: number;
  lastId: string;
  openBasket: boolean;
}

export const basketAdapter = createEntityAdapter<IBasket>();


export const initialState: State = basketAdapter.getInitialState({
  updateDate: Date.now(),
  lastId: '',
  openBasket: false
});

/**
 * Функция создания id продукта корзины
 */
const createBasketId = (product: IProduct) => `${product.id}_${product.size}`;

const basketReducer = createReducer(
  initialState,
  on(actions.addToBasket, (state, { product }) => {
    let productId = product.id; // сохраняю id продукта, на всякий случай
    let id = createBasketId(product); // подменяю id
    return {...basketAdapter.addOne({...product, id, productId}, state), lastId: id};
  }),
  on(actions.increaseProductInBasket, (state, { id }) => {
    let count = state.entities[id]?.count ?? 0;
    return basketAdapter.updateOne({ id,  changes: { count: count + 1 }}, state);
  }),
  on(actions.decreaseProductInBasket, (state, { id }) => {
    let count = state.entities[id]?.count;
    return count ? basketAdapter.updateOne({ id,  changes: { count: count - 1 }}, state) : state;
  }),
  on(actions.removeFromBasket, (state, {id}) => {
    return basketAdapter.removeOne(id, state)
  }),
  on(actions.removeFromBasket, (state, {id}) => {
    return basketAdapter.removeOne(id, state)
  }),
  on(actions.clearBasket, (state) => {
    return basketAdapter.removeAll(state)
  }),
  on(actions.updateBasket, (state, { update }) => {
    return basketAdapter.updateOne(update, state)
  }),
  on(actions.updateDate, (state, { date }) => ({
    ...state,
    updateDate: date
  })),
  on(actions.openBasket, (state) => ({
    ...state, openBasket: true
  })),
  on(actions.closeBasket, (state) => ({
    ...state, openBasket: false
  })),
  on(actions.toggleBasket, (state) => ({
    ...state
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return basketReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = basketAdapter.getSelectors();

export const selectBasketIds = selectIds;

export const selectBasketEntities = selectEntities;

export const selectAllBasket = selectAll;

export const selectBasketTotal = selectTotal;

