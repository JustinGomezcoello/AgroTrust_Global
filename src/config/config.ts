import crypto from 'crypto';

export function generateUUID(): string {
  return crypto.randomUUID().replace(/-/g, '');
}

let storedReference: string | null = null;

export function saveReference(ref: string): void {
  storedReference = ref;
}

export function getReference(): string | null {
  return storedReference;
}