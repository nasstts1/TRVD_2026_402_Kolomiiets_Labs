import * as symptomRepository from "../repositories/symptomRepository";

export class RecommendationService {
  constructor(private repo = symptomRepository) {}

  async getRecommendations(symptomIds: number[]) {
    if (symptomIds.length === 0) {
      throw new Error("Вкажіть хоча б один симптом");
    }

    const doctors = await this.repo.getDoctorsBySymptoms(symptomIds);

    if (doctors.length === 0) {
      throw new Error("За вказаними симптомами лікарів не знайдено");
    }

        const sorted = doctors.sort((a, b) => {
      const aMatches = a.symptoms.filter((s: { symptomId: number }) =>
        symptomIds.includes(s.symptomId)
      ).length;
      const bMatches = b.symptoms.filter((s: { symptomId: number }) =>
        symptomIds.includes(s.symptomId)
      ).length;
      return bMatches - aMatches;
    });

    return sorted;
  }
}

export const recommendationService = new RecommendationService();