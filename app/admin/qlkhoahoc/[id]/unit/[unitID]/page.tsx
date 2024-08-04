interface ProductPageProps {
  params: {
    id: string;
    unitID: string;
  };
}

export default async function CoursePage({ params }: ProductPageProps) {
  const { id, unitID } = params;
  return (
    <div>
      <p>{id}</p>
      <p>{unitID}</p>
    </div>
  );
}
