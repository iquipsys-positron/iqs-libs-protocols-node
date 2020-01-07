"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadStream {
    constructor(data) {
        this._pos = 0;
        this._data = data;
    }
    streamByte(value) {
        value = this._data.readUInt8(this._pos);
        this._pos += 1;
        return value;
    }
    streamWord(value) {
        value = this._data.readUInt16BE(this._pos);
        this._pos += 2;
        return value;
    }
    streamDWord(value) {
        value = this._data.readUInt32BE(this._pos);
        this._pos += 4;
        return value;
    }
    streamQWord(value) {
        value = this._data.readUIntBE(this._pos, 8);
        this._pos += 8;
        return value;
    }
    streamShort(value) {
        value = this._data.readInt16BE(this._pos);
        this._pos += 2;
        return value;
    }
    streamInteger(value) {
        value = this._data.readInt32BE(this._pos);
        this._pos += 4;
        return value;
    }
    streamLong(value) {
        value = this._data.readIntBE(this._pos, 8);
        this._pos += 8;
        return value;
    }
    streamString(value) {
        let length = this._data.readUInt8(this._pos);
        if (length == 0)
            value = '';
        else
            value = this._data.toString('UTF-8', this._pos + 1, this._pos + 1 + length);
        this._pos += length + 1;
        return value;
    }
    streamBoolean(value) {
        return this.streamByte(0) != 0;
    }
    streamDateTime(value) {
        let utcTimestamp = this.streamDWord(0);
        let temp = new Date();
        let ticks = (utcTimestamp - new Date().getTimezoneOffset() * 60) * 1000;
        value = new Date(ticks);
        return value;
    }
    streamNullableByte(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamByte(value) : null;
    }
    streamNullableWord(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamWord(value) : null;
    }
    streamNullableDWord(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamDWord(value) : null;
    }
    streamNullableQWord(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamQWord(value) : null;
    }
    streamNullableInteger(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamInteger(value) : null;
    }
    streamNullableLong(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamLong(value) : null;
    }
    streamNullableString(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamString(value) : null;
    }
    streamNullableBoolean(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamBoolean(value) : null;
    }
    streamNullableDateTime(value) {
        let notNull = this.streamBoolean(value != null);
        return notNull ? this.streamDateTime(value) : null;
    }
    reset() {
        this._pos = 0;
    }
}
exports.ReadStream = ReadStream;
//# sourceMappingURL=ReadStream.js.map