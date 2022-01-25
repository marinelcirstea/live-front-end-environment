interface SeeLivePageProps {}

const SeeLivePage: React.FunctionComponent<SeeLivePageProps> = () => {
  return (
    <div
      // inline style for now
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "48px" }}>Coming soon</h1>
      <br />
      <h3>A way to show your project, live, while in development, to the world.</h3>
    </div>
  );
};

export default SeeLivePage;
