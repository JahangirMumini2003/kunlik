// ===== App composition =====
function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Hero />
        <TaskBoard />
        <MobileFlow />
        <Benefits />
        <Dashboard />
        <B2BBenefits />
        <ROICalc />
        <Criteria />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
