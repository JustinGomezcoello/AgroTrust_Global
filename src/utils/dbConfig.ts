let storedReference: string | null = null;

export function saveReference(ref: string): void {
  storedReference = ref;
}

export function getReference(): string | null {
  return storedReference;
}