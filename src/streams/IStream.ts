export interface IStream {
    streamByte(value: number): number;
    streamWord(value: number): number;
    streamDWord(value: number): number;
    streamQWord(value: number): number;
    streamShort(value: number): number;
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
}