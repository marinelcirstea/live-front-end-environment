interface ContactPageProps {}

const ContactPage: React.FunctionComponent<ContactPageProps> = () => {
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
    </div>
  );
};

export default ContactPage;
