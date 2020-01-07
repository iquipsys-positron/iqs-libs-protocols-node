import { Buffer } from 'buffer';
import { IStream } from './IStream';

export class ReadStream implements IStream {
    private _data: Buffer;
    private _pos: number = 0;

    public constructor(data: Buffer) {
        this._data = data;
    }

    public streamByte(value: number): number {
        value = this._data.readUInt8(this._pos);
        this._pos += 1;
        return value;
    }

    public streamWord(value: number): number {
        value = this._data.readUInt16BE(this._pos);
        this._pos += 2;
        return value;
    }

    public streamDWord(value: number): number {
        value = this._data.readUInt32BE(this._pos);
        this._pos += 4;
        return value;
    }

    public streamQWord(value: number): number {
        value = this._data.readUIntBE(this._pos, 8);
        this._pos += 8;
        return value;
    }

    public streamShort(value) {
        value = this._data.readInt16BE(this._pos);
        this._pos += 2;
        return value;
    }

    public streamInteger(value: number): number {
        value = this._data.readInt32BE(this._pos);
        this._pos += 4;
        return value;
    }
    
    public streamLong(value: number): number {
        value = this._data.readIntBE(this._pos, 8);
        this._pos += 8;
        return value;
    }

    public streamString(value: string): string {
        let length = this._data.readUInt8(this._pos);
        if (length == 0)
            value = '';
        else
            value = this._data.toString('UTF-8', this._pos + 1, this._pos + 1 + length);

        this._pos += length + 1;
        return value;
    }

    public streamBoolean(value: boolean): boolean {
        return this.streamByte(0) != 0;
    }

    public streamDateTime(value: Date): Date {
        let utcTimestamp = this.streamDWord(0);
        let temp = new Date();
        let ticks = (utcTimestamp - new Date().getTimezoneOffset() * 60) * 1000;
        value = new Date(ticks);
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
        return notNull ? this.streamLong(value) : null;
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
}