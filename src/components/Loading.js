export default function Loading() {
  const css = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
  return (
    <main className="loading" style={css}>
      <img src="/loading.gif" alt="Loading ..." />
    </main>
  )
}
