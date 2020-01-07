import { Buffer } from "buffer";

import { IStream } from './IStream';

export class WriteStream implements IStream {
    private static MAX_BUFFER_SIZE = 512;
    private _data: Buffer;
    private _pos: number = 0;

    public constructor(size?: number) {
        size = size || WriteStream.MAX_BUFFER_SIZE;
        this._data =  new Buffer(size);
    }

    public streamByte(value: number): number {
        this._data.writeUInt8(value, this._pos);
        this._pos += 1;
        return value;
    }

    public streamWord(value: number): number {
        this._data.writeUInt16BE(value, this._pos);
        this._pos += 2;
        return value;
    }

    public streamDWord(value: number): number {
        this._data.writeUInt32BE(value, this._pos);
        this._pos += 4;
        return value;
    }

    public streamQWord(value: number): number {
        this._data.writeUIntBE(value, this._pos, 8);
        this._pos += 8;
        return value;
    }

    public streamShort(value: number): number  {
        this._data.writeInt16BE(value, this._pos);
        this._pos += 2;
        return value;
    }

    public streamInteger(value: number): number {
        this._data.writeInt32BE(value, this._pos);
        this._pos += 4;
        return value;
    }
    
    public streamLong(value: number): number {
        this._data.writeIntBE(value, this._pos, 8);
        this._pos += 8;
        return value;
    }

    public streamString(value: string): string {
        value = value || '';
        let length = this._data.write(value, this._pos + 1);
        this._data.writeUInt8(length, this._pos);
        this._pos += length + 1;
        return value;
    }

    public streamBoolean(value: boolean): boolean {
        this.streamByte(value ? 1 : 0);
        return value;
    }

    public streamDateTime(value: Date): Date {
        let utcTimestamp = Math.floor(value.getTime() / 1000) + (value.getTimezoneOffset() * 60);
        this.streamDWord(utcTimestamp);
        return value;
    }

    public streamNullableByte(value: number): number {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamByte(value) : null;
    }

    public streamNullableWord(value: number): number {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamWord(value) : null;
    }

    public streamNullableDWord(value: number): number {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamDWord(value) : null;
    }

    public streamNullableQWord(value: number): number {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamQWord(value) : null;
    }

    public streamNullableInteger(value: number): number {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamInteger(value) : null;
    }
    
    public streamNullableLong(value: number): number {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamInteger(value) : null;
    }

    public streamNullableString(value: string): string {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamString(value) : null;
    }

    public streamNullableBoolean(value: boolean): boolean {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamBoolean(value) : null;
    }

    public streamNullableDateTime(value: Date): Date {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamDateTime(value) : null;
    }
    
    public reset(): void {
        this._pos = 0;
    }

    public toBuffer(): Buffer {
        return this._data.slice(0, this._pos);
    }

}