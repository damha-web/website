export const STATS = {
    hospitalClients: 145,
    regularEmployees: 48,
    fieldExperienceYears: 10,
    clientRetentionRate: 95,
    clientBreakdown: {
        general: 6,
        hospital: 25,
        oriental: 7,
        nursing: 7,
        dental: 5,
        clinic: 95,
    },
} as const;

/** About 페이지용 클라이언트 요약 문자열 생성 */
export function getClientSummary(): string {
    const { hospitalClients, clientBreakdown: b } = STATS;
    return `병원 ${hospitalClients}개 (종합병원 ${b.general}, 일반병원 ${b.hospital}, 한방병원 ${b.oriental}, 요양병원 ${b.nursing}, 치과병원 ${b.dental}, 의원 ${b.clinic}+)`;
}
