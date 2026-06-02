// ===== App composition — Rizq Kunlik for Business (B2B) =====
function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Hero />
        <TalentPool />
        <ScenarioIntro />
        <Dashboard />
        <MobileFlow />
        <Comparison />
        <ROICalc />
        <B2BBenefits />
        <Segments />
        <Security />
        <Legality />
        <Loyalty />
        <PilotCTA />
      </main>
      <Footer />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
