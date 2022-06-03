/**
 * Login组件的共享属性
 */
import { createContext } from "react";
import { ISetStateProps } from './typing'

export default createContext<ISetStateProps | null>(null)
