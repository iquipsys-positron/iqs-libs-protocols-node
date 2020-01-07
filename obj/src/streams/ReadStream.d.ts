/// <reference types="node" />
import { IStream } from './IStream';
export declare class ReadStream implements IStream {
    private _data;
    private _pos;
    constructor(data: Buffer);
    streamByte(value: number): number;
    streamWord(value: number): number;
    streamDWord(value: number): number;
    streamQWord(value: number): number;
    streamShort(value: any): any;
    streamInteger(value: number): number;
    streamLong(value: number): number;
    streamString(value: string): string;
    streamBoolean(value: boolean): boolean;
    streamDateTime(value: Date): Date;
    streamNullableByte(value: number): number;
    streamNullableWord(value: number): number;
    streamNullableDWord(value: number): number;
    streamNullableQWord(value: number): number;
    streamNullableInteger(value: number): number;
    streamNullableLong(value: number): number;
    streamNullableString(value: string): string;
    streamNullableBoolean(value: boolean): boolean;
    streamNullableDateTime(value: Date): Date;
    reset(): void;
}
