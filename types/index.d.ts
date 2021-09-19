import { components } from './api56';

export { components };
export interface Field {
    Value: Record<string, string | number | boolean> | string | number | boolean;
    blockId: string;
    lineId: string;
    fieldId: string;
    Name?: string;
    blockRealId?: string;
    blockName?: string;
    blockOrder?: number;
    lineRealId?: string;
    lineOrder?: number;
    multiBlock?: boolean;
    multiLine?: boolean;
}

export type FieldPath = {
    blockId: string;
    lineId: string;
    fieldId: string;
    name?: string;
    blockRealId?: string;
    blockName?: string;
    blockOrder?: number;
    lineRealId?: string;
    lineOrder?: number;
    fieldIndex?: number;
    multiBlock?: boolean;
    multiLine?: boolean;
};
export function loginAs(identifier: string): void;

export function setJsonResult(data: any): void;

export function fetchFn(params: {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    headers?: { [key: string]: string };
    body?: string;
}): { body: string; status: number; headers: { [key: string]: string } };

export function download(params: {
    url: string;
    method: 'get' | 'post';
    format: 'Binary' | 'Text';
}): { body: string; status: number; headers: { [key: string]: string } };

export function upload(params: {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    headers?: { [key: string]: string };
    body: [
        {
            fileName: string;
            data: string;
            format: 'Binary' | 'Text';
            headers: { [key: string]: string };
        },
    ];
}): { body: string; status: number };
