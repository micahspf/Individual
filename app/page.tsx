import RequestForm from '@/components/RequestForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight mb-3">
            Individual
          </h1>
          <p className="text-lg text-neutral-600 max-w-md mx-auto">
            We can individually manufacture anything you want with no waste.
          </p>
        </div>

        {/* Request Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <h2 className="text-xl font-medium mb-6 text-center">
            What would you like made?
          </h2>
          <RequestForm />
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-neutral-500 mt-10">
          Custom 3D printing • Laser engraving • Made only when ordered
        </p>
      </div>
    </main>
  );
}
