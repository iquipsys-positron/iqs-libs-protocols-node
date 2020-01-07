"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
class WriteStream {
    constructor(size) {
        this._pos = 0;
        size = size || WriteStream.MAX_BUFFER_SIZE;
        this._data = new buffer_1.Buffer(size);
    }
    streamByte(value) {
        this._data.writeUInt8(value, this._pos);
        this._pos += 1;
        return value;
    }
    streamWord(value) {
        this._data.writeUInt16BE(value, this._pos);
        this._pos += 2;
        return value;
    }
    streamDWord(value) {
        this._data.writeUInt32BE(value, this._pos);
        this._pos += 4;
        return value;
    }
    streamQWord(value) {
        this._data.writeUIntBE(value, this._pos, 8);
        this._pos += 8;
        return value;
    }
    streamShort(value) {
        this._data.writeInt16BE(value, this._pos);
        this._pos += 2;
        return value;
    }
    streamInteger(value) {
        this._data.writeInt32BE(value, this._pos);
        this._pos += 4;
        return value;
    }
    streamLong(value) {
        this._data.writeIntBE(value, this._pos, 8);
        this._pos += 8;
        return value;
    }
    streamString(value) {
        value = value || '';
        let length = this._data.write(value, this._pos + 1);
        this._data.writeUInt8(length, this._pos);
        this._pos += length + 1;
        return value;
    }
    streamBoolean(value) {
        this.streamByte(value ? 1 : 0);
        return value;
    }
    streamDateTime(value) {
        let utcTimestamp = Math.floor(value.getTime() / 1000) + (value.getTimezoneOffset() * 60);
        this.streamDWord(utcTimestamp);
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
        return notNull ? this.streamInteger(value) : null;
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
    toBuffer() {
        return this._data.slice(0, this._pos);
    }
}
exports.WriteStream = WriteStream;
WriteStream.MAX_BUFFER_SIZE = 512;
//# sourceMappingURL=WriteStream.js.map