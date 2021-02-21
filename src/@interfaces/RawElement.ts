import { ElementType } from './ElementType';
export type RawElement = {
    namespace: string,
    key: string,
    type: ElementType,
    data: any
}