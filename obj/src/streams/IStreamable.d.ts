import { IStream } from './IStream';
export interface IStreamable {
    stream(stream: IStream): void;
}
