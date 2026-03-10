export interface SymptomDTO {
  id: number;
  name: string;
  description: string | null;
}

export const toSymptomDTO = (symptom: any): SymptomDTO => ({
  id: symptom.id,
  name: symptom.name,
  description: symptom.description,
});