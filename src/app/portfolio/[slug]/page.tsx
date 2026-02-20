export default async function PortfolioDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold font-montserrat text-secondary mb-8">Portfolio Detail: {slug}</h1>
            <p className="text-lg text-text-sub">
                상세 프로젝트 케이스 스터디 내용이 들어갈 자리입니다.
            </p>
        </div>
    );
}
